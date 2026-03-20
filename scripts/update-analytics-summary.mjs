import { mkdir, writeFile } from 'node:fs/promises';
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
    throw new Error(`GoatCounter API ${response.status} for ${url.pathname}${url.search}`);
  }

  return response.json();
}

const commonParams = {
  start: start.toISOString(),
  end: end.toISOString(),
};

const locations = await getJson(withParams('stats/locations', { ...commonParams, limit: 12 }));

const summary = {
  generatedAt: new Date().toISOString(),
  rangeDays,
  siteUrl,
  dashboardUrl,
  topLocations: (locations.stats ?? [])
    .filter((item) => Number(item.count ?? 0) > 0)
    .slice(0, 8)
    .map((item) => ({
      name: item.name || item.id || 'Unknown',
    })),
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Wrote public-safe analytics summary to ${path.relative(repoRoot, outputPath)}`);
