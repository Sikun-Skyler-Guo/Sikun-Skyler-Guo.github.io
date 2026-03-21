const siteCode = process.env.GOATCOUNTER_SITE_CODE ?? 'sikunskylerguo';
const dashboardUrl = `https://${siteCode}.goatcounter.com/`;
const apiBase = `${dashboardUrl}api/v0`;
const token = process.env.GOATCOUNTER_API_TOKEN;
const rangeDays = Number(process.env.GOATCOUNTER_RANGE_DAYS ?? 14);
const hitsLimit = Number(process.env.GOATCOUNTER_HITS_LIMIT ?? 200);
const verifyFilter = (process.env.GOATCOUNTER_VERIFY_FILTER ?? '').trim().toLowerCase();

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
    throw new Error(`GoatCounter API ${response.status} for ${url.pathname}${url.search}${body ? ` :: ${body.slice(0, 240)}` : ''}`);
  }

  return response.json();
}

function parseVerifyPath(path) {
  const [kind, rest = ''] = String(path || '').split('/', 2);
  const [probeId = 'unknown', refSlug = 'unknown', langSlug = 'unknown', tzSlug = 'unknown', uaSlug = 'unknown'] = rest.split('__');
  return { kind, probeId, refSlug, langSlug, tzSlug, uaSlug };
}

function summarizeDaily(stats = []) {
  return stats
    .filter((item) => Number(item?.daily ?? 0) > 0)
    .map((item) => ({ day: item.day, daily: item.daily }))
    .slice(-10);
}

const hits = await getJson(withParams('stats/hits', {
  start: start.toISOString(),
  end: end.toISOString(),
  limit: hitsLimit,
}));

const verifyHits = (hits.hits ?? [])
  .filter((hit) => hit?.event && /^verify-(arrival|human)\//.test(hit.path || ''))
  .filter((hit) => !verifyFilter || String(hit.path || '').toLowerCase().includes(verifyFilter))
  .map((hit) => ({
    path: hit.path,
    title: hit.title || '',
    count: hit.count ?? 0,
    max: hit.max ?? 0,
    parsed: parseVerifyPath(hit.path),
    recentDaily: summarizeDaily(hit.stats),
  }));

const report = {
  generatedAt: new Date().toISOString(),
  dashboardUrl,
  rangeDays,
  hitsLimit,
  verifyFilter: verifyFilter || null,
  totalReturnedHits: Array.isArray(hits.hits) ? hits.hits.length : 0,
  more: Boolean(hits.more),
  verifyHits,
};

console.log(JSON.stringify(report, null, 2));

if (!verifyHits.length) {
  console.log('No verify-arrival/verify-human events were found in the returned hit set.');
  if (hits.more) {
    console.log('Note: GoatCounter reported more hits beyond this limit, so raise GOATCOUNTER_HITS_LIMIT if needed.');
  }
}
