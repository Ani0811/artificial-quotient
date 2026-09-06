import { getKnex } from "@/lib/db";

export async function getRawSiteConfig() {
  const k = getKnex();
  const rows: any = await k.raw("SELECT * FROM site_config WHERE id = ?", ["default"]);
  const row = rows[0]?.[0] || rows[0];
  if (!row) return null;

  return {
    stats: {
      subscribers: row.subscribers,
      subscribersSub: row.subscribers_sub,
      monthlyViews: row.monthly_views,
      monthlyViewsSub: row.monthly_views_sub,
      newSubs: row.new_subs,
      newSubsSub: row.new_subs_sub,
      videosCount: row.videos_count,
      videosCountSub: row.videos_count_sub,
      retention: row.retention,
      channelBanner: row.channel_banner,
    },
    demographics: row.demographics_json ? JSON.parse(row.demographics_json) : [],
    geographies: row.geographies_json ? JSON.parse(row.geographies_json) : [],
    rates: row.rates_json ? JSON.parse(row.rates_json) : {},
  };
}

export async function upsertRawSiteConfig(data: any) {
  const k = getKnex();
  if (!data.stats) return;

  const sql = `
    INSERT INTO site_config
      (id, subscribers, subscribers_sub, monthly_views, monthly_views_sub, new_subs, new_subs_sub, videos_count, videos_count_sub, retention, channel_banner, demographics_json, geographies_json, rates_json)
    VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      subscribers = VALUES(subscribers),
      subscribers_sub = VALUES(subscribers_sub),
      monthly_views = VALUES(monthly_views),
      monthly_views_sub = VALUES(monthly_views_sub),
      new_subs = VALUES(new_subs),
      new_subs_sub = VALUES(new_subs_sub),
      videos_count = VALUES(videos_count),
      videos_count_sub = VALUES(videos_count_sub),
      retention = VALUES(retention),
      channel_banner = VALUES(channel_banner),
      demographics_json = VALUES(demographics_json),
      geographies_json = VALUES(geographies_json),
      rates_json = VALUES(rates_json);
  `;

  await k.raw(sql, [
    data.stats.subscribers || "",
    data.stats.subscribersSub || "",
    data.stats.monthlyViews || "",
    data.stats.monthlyViewsSub || "",
    data.stats.newSubs || "",
    data.stats.newSubsSub || "",
    data.stats.videosCount || "",
    data.stats.videosCountSub || "",
    data.stats.retention || "",
    data.stats.channelBanner || "",
    JSON.stringify(data.demographics || []),
    JSON.stringify(data.geographies || []),
    JSON.stringify(data.rates || {}),
  ]);
}
