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
  audienceInterests?: any[];
  shoppingInterests?: any[];
  heroConfig?: any;
  channelSnapshots?: any[];
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
      t.text("audience_interests_json");
      t.text("shopping_interests_json");
      t.string("unique_viewers", 64);
      t.string("unique_viewers_sub", 128);
      t.string("watch_time_hours", 64);
      t.string("avg_view_duration", 64);
      t.string("avg_percentage_viewed", 64);
      t.string("returning_viewers", 64);
      t.text("hero_config_json");
      t.text("channel_snapshots_json");
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  } else {
    // Add columns if they do not exist
    if (!(await k.schema.hasColumn("site_config", "unique_viewers"))) {
      await k.schema.alterTable("site_config", (t) => {
        t.string("unique_viewers", 64);
        t.string("watch_time_hours", 64);
        t.string("avg_view_duration", 64);
        t.string("avg_percentage_viewed", 64);
        t.string("returning_viewers", 64);
      });
    }
    if (!(await k.schema.hasColumn("site_config", "unique_viewers_sub"))) {
      await k.schema.alterTable("site_config", (t) => {
        t.string("unique_viewers_sub", 128);
      });
    }
    if (!(await k.schema.hasColumn("site_config", "audience_interests_json"))) {
      await k.schema.alterTable("site_config", (t) => {
        t.text("audience_interests_json");
      });
    }
    if (!(await k.schema.hasColumn("site_config", "shopping_interests_json"))) {
      await k.schema.alterTable("site_config", (t) => {
        t.text("shopping_interests_json");
      });
    }
    if (!(await k.schema.hasColumn("site_config", "hero_config_json"))) {
      await k.schema.alterTable("site_config", (t) => {
        t.text("hero_config_json");
      });
    }
    if (!(await k.schema.hasColumn("site_config", "channel_snapshots_json"))) {
      await k.schema.alterTable("site_config", (t) => {
        t.text("channel_snapshots_json");
      });
    }
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
      uniqueViewers: row.unique_viewers,
      uniqueViewersSub: row.unique_viewers_sub,
      watchTimeHours: row.watch_time_hours,
      avgViewDuration: row.avg_view_duration,
      avgPercentageViewed: row.avg_percentage_viewed,
      returningViewers: row.returning_viewers,
    },
    demographics: row.demographics_json ? JSON.parse(row.demographics_json) : [],
    geographies: row.geographies_json ? JSON.parse(row.geographies_json) : [],
    rates: row.rates_json ? JSON.parse(row.rates_json) : {},
    audienceInterests: row.audience_interests_json ? JSON.parse(row.audience_interests_json) : [],
    shoppingInterests: row.shopping_interests_json ? JSON.parse(row.shopping_interests_json) : [],
    heroConfig: row.hero_config_json ? JSON.parse(row.hero_config_json) : null,
    channelSnapshots: row.channel_snapshots_json ? JSON.parse(row.channel_snapshots_json) : [],
  };
}

export async function upsertSiteConfig(data: any) {
  const k = getKnex();
  if (!data.stats && !data.heroConfig) return;

  const stats = data.stats || {};
  await k("site_config")
    .insert({
      id: "default",
      subscribers: stats.subscribers || "",
      subscribers_sub: stats.subscribersSub || "",
      monthly_views: stats.monthlyViews || "",
      monthly_views_sub: stats.monthlyViewsSub || "",
      new_subs: stats.newSubs || "",
      new_subs_sub: stats.newSubsSub || "",
      videos_count: stats.videosCount || "",
      videos_count_sub: stats.videosCountSub || "",
      retention: stats.retention || "",
      channel_banner: stats.channelBanner || "",
      unique_viewers: stats.uniqueViewers || "",
      unique_viewers_sub: stats.uniqueViewersSub || "",
      watch_time_hours: stats.watchTimeHours || "",
      avg_view_duration: stats.avgViewDuration || "",
      avg_percentage_viewed: stats.avgPercentageViewed || "",
      returning_viewers: stats.returningViewers || "",
      demographics_json: JSON.stringify(data.demographics || []),
      geographies_json: JSON.stringify(data.geographies || []),
      rates_json: JSON.stringify(data.rates || {}),
      audience_interests_json: JSON.stringify(data.audienceInterests || []),
      shopping_interests_json: JSON.stringify(data.shoppingInterests || []),
      hero_config_json: JSON.stringify(data.heroConfig || {}),
      channel_snapshots_json: JSON.stringify(data.channelSnapshots || []),
    })
    .onConflict("id")
    .merge();
}

