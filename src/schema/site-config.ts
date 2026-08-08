import { getKnex } from "@/lib/db";

export interface SiteConfig {
  id: string;
  subscribers: string;
  subscribersSub?: string;
  monthlyViews: string;
  monthlyViewsSub?: string;
  newSubs: string;
  newSubsSub?: string;
  videosCount: string;
  videosCountSub?: string;
  retention?: string;
  channelBanner?: string;
  demographics?: any;
  geographies?: any;
  rates?: any;
}

export async function createSiteConfigTable() {
  const k = getKnex();
  if (!(await k.schema.hasTable("site_config"))) {
    await k.schema.createTable("site_config", (t) => {
      t.string("id", 32).primary();
      t.string("subscribers", 64).notNullable();
      t.string("subscribers_sub", 128);
      t.string("monthly_views", 64).notNullable();
      t.string("monthly_views_sub", 128);
      t.string("new_subs", 64).notNullable();
      t.string("new_subs_sub", 128);
      t.string("videos_count", 64).notNullable();
      t.string("videos_count_sub", 128);
      t.string("retention", 64);
      t.string("channel_banner", 255);
      t.text("demographics_json");
      t.text("geographies_json");
      t.text("rates_json");
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
}

export async function getSiteConfig() {
  const k = getKnex();
  const row = await k("site_config").where("id", "default").first();
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

export async function upsertSiteConfig(data: any) {
  const k = getKnex();
  if (!data.stats) return;

  await k("site_config")
    .insert({
      id: "default",
      subscribers: data.stats.subscribers || "10,100+",
      subscribers_sub: data.stats.subscribersSub || "",
      monthly_views: data.stats.monthlyViews || "850,000+",
      monthly_views_sub: data.stats.monthlyViewsSub || "",
      new_subs: data.stats.newSubs || "+1,200",
      new_subs_sub: data.stats.newSubsSub || "",
      videos_count: data.stats.videosCount || "222",
      videos_count_sub: data.stats.videosCountSub || "",
      retention: data.stats.retention || "27",
      channel_banner: data.stats.channelBanner || "",
      demographics_json: JSON.stringify(data.demographics || []),
      geographies_json: JSON.stringify(data.geographies || []),
      rates_json: JSON.stringify(data.rates || {}),
    })
    .onConflict("id")
    .merge();
}
