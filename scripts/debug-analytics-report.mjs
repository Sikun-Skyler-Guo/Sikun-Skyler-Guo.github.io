const siteCode = process.env.GOATCOUNTER_SITE_CODE ?? 'sikunskylerguo';
const dashboardUrl = `https://${siteCode}.goatcounter.com/`;
const apiBase = `${dashboardUrl}api/v0`;
const token = process.env.GOATCOUNTER_API_TOKEN;
const hitsLimit = Number(process.env.GOATCOUNTER_HITS_LIMIT ?? 100);
const pageLimit = Number(process.env.GOATCOUNTER_PAGE_LIMIT ?? 8);
const refLimit = Number(process.env.GOATCOUNTER_REF_LIMIT ?? 8);

if (!token) {
  throw new Error('Missing GOATCOUNTER_API_TOKEN');
}

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

function rangeDays(days, endOffsetDays = 0) {
  const end = new Date();
  end.setUTCMinutes(0, 0, 0);
  end.setUTCDate(end.getUTCDate() - endOffsetDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  start.setUTCHours(0, 0, 0, 0);
  return { start: start.toISOString(), end: end.toISOString() };
}

function trimDaily(stats = [], maxItems = 10) {
  return stats
    .filter((item) => Number(item?.daily ?? 0) > 0)
    .map((item) => ({ day: item.day, daily: item.daily }))
    .slice(-maxItems);
}

function withShare(items = [], total = 0) {
  return items
    .filter((item) => Number(item?.count ?? 0) > 0)
    .map((item) => ({
      name: item.name || item.id || item.path || 'Unknown',
      count: item.count ?? 0,
      share: total > 0 ? Number(((item.count ?? 0) / total).toFixed(3)) : null,
    }));
}

function summarizeHits(hits = []) {
  const pages = [];
  const engagementEvents = [];
  const diagnosticEvents = [];

  for (const hit of hits) {
    const item = {
      path: hit.path,
      pathId: hit.path_id,
      title: hit.title || '',
      count: hit.count ?? 0,
      max: hit.max ?? 0,
      recentDaily: trimDaily(hit.stats),
    };

    if (hit.event) {
      if (/^verify-(arrival|human)\//.test(hit.path || '')) {
        diagnosticEvents.push(item);
      } else {
        engagementEvents.push(item);
      }
    } else {
      pages.push(item);
    }
  }

  return {
    pages,
    engagementEvents,
    diagnosticEvents,
  };
}

async function fetchReferrersForPaths(paths, commonParams) {
  const results = [];
  for (const pathInfo of paths) {
    const refs = await getJson(withParams(`stats/hits/${pathInfo.pathId}`, {
      ...commonParams,
      limit: refLimit,
    }));
    results.push({
      path: pathInfo.path,
      title: pathInfo.title,
      count: pathInfo.count,
      referrers: (refs.refs ?? [])
        .filter((item) => Number(item?.count ?? 0) > 0)
        .map((item) => ({
          name: item.name || item.id || 'Unknown',
          count: item.count ?? 0,
        })),
    });
  }
  return results;
}

async function fetchWindow(label, days, endOffsetDays = 0) {
  const commonParams = rangeDays(days, endOffsetDays);
  const total = await getJson(withParams('stats/total', commonParams));
  const [locations, languages, browsers, systems, toprefs, hits] = await Promise.all([
    getJson(withParams('stats/locations', { ...commonParams, limit: 10 })),
    getJson(withParams('stats/languages', { ...commonParams, limit: 10 })),
    getJson(withParams('stats/browsers', { ...commonParams, limit: 10 })),
    getJson(withParams('stats/systems', { ...commonParams, limit: 10 })),
    getJson(withParams('stats/toprefs', { ...commonParams, limit: 10 })),
    getJson(withParams('stats/hits', { ...commonParams, limit: hitsLimit, group: 'day' })),
  ]);

  const splitHits = summarizeHits(hits.hits ?? []);
  const topPageRefs = await fetchReferrersForPaths(splitHits.pages.slice(0, 3), commonParams);

  return {
    label,
    range: commonParams,
    totalVisitors: total.total ?? 0,
    totalEventVisitors: total.total_events ?? 0,
    totalUtcVisitors: total.total_utc ?? 0,
    dailyVisitors: trimDaily(total.stats, 14),
    topLocations: withShare((locations.stats ?? []).slice(0, 8), total.total_utc ?? total.total ?? 0),
    topLanguages: withShare((languages.stats ?? []).slice(0, 8), total.total_utc ?? total.total ?? 0),
    topBrowsers: withShare((browsers.stats ?? []).slice(0, 8), total.total_utc ?? total.total ?? 0),
    topSystems: withShare((systems.stats ?? []).slice(0, 8), total.total_utc ?? total.total ?? 0),
    topReferrers: withShare((toprefs.stats ?? []).slice(0, 8), total.total_utc ?? total.total ?? 0),
    topPages: splitHits.pages.slice(0, pageLimit),
    topEngagementEvents: splitHits.engagementEvents.slice(0, pageLimit),
    diagnosticVerifyEvents: splitHits.diagnosticEvents.slice(0, pageLimit),
    topPageReferrers: topPageRefs,
    moreHitsAvailable: Boolean(hits.more),
    returnedHits: Array.isArray(hits.hits) ? hits.hits.length : 0,
  };
}

const last7 = await fetchWindow('last7', 7, 0);
const prev7 = await fetchWindow('prev7', 7, 7);
const last30 = await fetchWindow('last30', 30, 0);

const report = {
  generatedAt: new Date().toISOString(),
  dashboardUrl,
  windows: { last7, prev7, last30 },
};

console.log(JSON.stringify(report, null, 2));
