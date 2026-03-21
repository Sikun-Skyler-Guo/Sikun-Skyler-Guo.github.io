import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, 'src/data/analytics-summary.json');

const siteCode = process.env.GOATCOUNTER_SITE_CODE ?? 'sikunskylerguo';
const siteUrl = process.env.GOATCOUNTER_SITE_URL ?? 'https://sikun-skyler-guo.github.io';
const dashboardUrl = `https://${siteCode}.goatcounter.com/`;
const apiBase = `${dashboardUrl}api/v0`;
const token = process.env.GOATCOUNTER_API_TOKEN;
const rangeDays = Number(process.env.GOATCOUNTER_RANGE_DAYS ?? 30);
const locationPageCandidates = ['locations', 'location', 'countries', 'country'];

if (!token) {
  throw new Error('Missing GOATCOUNTER_API_TOKEN');
}

const end = new Date();
end.setUTCMinutes(0, 0, 0);
const start = new Date(end);
start.setUTCDate(start.getUTCDate() - rangeDays + 1);
start.setUTCHours(0, 0, 0, 0);

function withParams(endpoint, params = {}) {
  const url = new URL(endpoint, apiBase + '/');
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) url.searchParams.append(key, item);
    } else if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(url, attempt = 0) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 429 && attempt < 4) {
    const resetSeconds = Number(response.headers.get('x-rate-limit-reset') ?? '1');
    const waitMs = Math.max(resetSeconds * 1000, 1250);
    await sleep(waitMs);
    return getJson(url, attempt + 1);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    const suffix = body ? ` :: ${body.slice(0, 240)}` : '';
    const error = new Error(`GoatCounter API ${response.status} for ${url.pathname}${url.search}${suffix}`);
    error.status = response.status;
    error.body = body;
    error.url = url.toString();
    throw error;
  }

  return response.json();
}

async function readExistingSummary() {
  try {
    const raw = await readFile(outputPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function fetchStatsWithFallback(pages, params) {
  const attempts = [];

  for (const page of pages) {
    try {
      const data = await getJson(withParams(`stats/${page}`, params));
      return { page, data, attempts };
    } catch (error) {
      attempts.push({
        page,
        status: error?.status ?? 'unknown',
        message: error?.message ?? String(error),
      });

      if (![400, 404].includes(error?.status)) {
        error.attempts = attempts;
        throw error;
      }
    }
  }

  const error = new Error(
    `No supported GoatCounter stats page succeeded for candidates: ${pages.join(', ')}`,
  );
  error.attempts = attempts;
  throw error;
}

function normalizeTopLocations(stats) {
  return (stats ?? [])
    .filter((item) => Number(item.count ?? 0) > 0)
    .slice(0, 8)
    .map((item) => ({
      name: item.name || item.id || 'Unknown',
    }));
}

const commonParams = {
  start: start.toISOString(),
  end: end.toISOString(),
};

const previousSummary = await readExistingSummary();
let topLocations = previousSummary?.topLocations ?? [];
let locationStatsPage = null;

try {
  const { page, data, attempts } = await fetchStatsWithFallback(locationPageCandidates, {
    ...commonParams,
    limit: 12,
  });
  locationStatsPage = page;
  topLocations = normalizeTopLocations(data.stats);
  console.log(`Loaded top locations from GoatCounter stats/${page}`);
  if (attempts.length) {
    console.log(`Earlier fallback attempts: ${JSON.stringify(attempts)}`);
  }
} catch (error) {
  console.warn(`Warning: could not refresh top locations. ${error.message}`);
  if (error?.attempts?.length) {
    console.warn(`Fallback attempts: ${JSON.stringify(error.attempts)}`);
  }
  if (previousSummary?.topLocations?.length) {
    console.warn('Falling back to the previous public-safe topLocations snapshot.');
  } else {
    console.warn('No previous analytics snapshot found; writing an empty location list.');
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  rangeDays,
  siteUrl,
  dashboardUrl,
  ...(locationStatsPage ? { locationStatsPage } : {}),
  topLocations,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Wrote public-safe analytics summary to ${path.relative(repoRoot, outputPath)}`);
