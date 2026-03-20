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

const actionSpecs = [
  ['CV downloads', 'click-cv-download'],
  ['Email clicks', 'click-email'],
  ['Google Scholar clicks', 'click-google-scholar'],
  ['GitHub clicks', 'click-github'],
];

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

async function getPublicCounter() {
  const url = `${dashboardUrl}counter/TOTAL.json?no_branding=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Counter endpoint ${response.status}`);
  return response.json();
}

function normalizeCount(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value.replace(/,/g, '')) || 0;
  return 0;
}

function titleForPath(item) {
  if (item.title && item.title.trim()) return item.title.trim();
  return item.path;
}

function labelForDevice(id) {
  return {
    phone: 'Phone',
    tablet: 'Tablet',
    desktop: 'Desktop',
    desktophd: 'Desktop HD',
    unknown: 'Unknown',
  }[id] ?? id;
}

const commonParams = {
  start: start.toISOString(),
  end: end.toISOString(),
};

const counter = await getPublicCounter();
const total = await getJson(withParams('stats/total', commonParams));
const hits = await getJson(withParams('stats/hits', { ...commonParams, limit: 8 }));
const toprefs = await getJson(withParams('stats/toprefs', { ...commonParams, limit: 6 }));
const locations = await getJson(withParams('stats/locations', { ...commonParams, limit: 6 }));
const sizes = await getJson(withParams('stats/sizes', commonParams));

const keyActionsRaw = [];
for (const [label, actionPath] of actionSpecs) {
  const result = await getJson(
    withParams('stats/hits', {
      ...commonParams,
      path_by_name: true,
      include_paths: [actionPath],
      limit: 1,
    }),
  );
  const hit = Array.isArray(result.hits) ? result.hits.find((item) => item.path === actionPath) : undefined;
  keyActionsRaw.push({
    label,
    path: actionPath,
    count: normalizeCount(hit?.count),
  });
}

const summary = {
  generatedAt: new Date().toISOString(),
  rangeDays,
  siteUrl,
  dashboardUrl,
  totals: {
    allTimeVisits: normalizeCount(counter.count),
    last30DaysVisits: normalizeCount(total.total),
    last30DaysEvents: normalizeCount(total.total_events),
  },
  topPages: (hits.hits ?? [])
    .filter((item) => !item.event && typeof item.path === 'string' && item.path.startsWith('/'))
    .slice(0, 5)
    .map((item) => ({
      path: item.path,
      title: titleForPath(item),
      count: normalizeCount(item.count),
    })),
  topReferrers: (toprefs.stats ?? [])
    .filter((item) => normalizeCount(item.count) > 0)
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      name: item.name || item.id,
      count: normalizeCount(item.count),
    })),
  topLocations: (locations.stats ?? [])
    .filter((item) => normalizeCount(item.count) > 0)
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      name: item.name || item.id,
      count: normalizeCount(item.count),
    })),
  topDevices: (sizes.stats ?? [])
    .filter((item) => normalizeCount(item.count) > 0)
    .map((item) => ({
      id: item.id,
      name: labelForDevice(item.id),
      count: normalizeCount(item.count),
    })),
  keyActions: keyActionsRaw,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Wrote analytics summary to ${path.relative(repoRoot, outputPath)}`);
