-- Site Config Table Schema & Raw SQL Queries

-- 1. Create Table (Updated with Audience/Shopping Interests & YouTube Analytics Stats)
CREATE TABLE IF NOT EXISTS site_config (
  id VARCHAR(32) PRIMARY KEY,
  subscribers VARCHAR(64) NOT NULL,
  subscribers_sub VARCHAR(128),
  monthly_views VARCHAR(64) NOT NULL,
  monthly_views_sub VARCHAR(128),
  new_subs VARCHAR(64) NOT NULL,
  new_subs_sub VARCHAR(128),
  videos_count VARCHAR(64) NOT NULL,
  videos_count_sub VARCHAR(128),
  retention VARCHAR(64),
  channel_banner VARCHAR(255),
  demographics_json TEXT,
  geographies_json TEXT,
  rates_json TEXT,
  audience_interests_json TEXT,
  shopping_interests_json TEXT,
  unique_viewers VARCHAR(64),
  watch_time_hours VARCHAR(64),
  avg_view_duration VARCHAR(64),
  avg_percentage_viewed VARCHAR(64),
  returning_viewers VARCHAR(64),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Migration Alter Statements (For existing databases)
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS audience_interests_json TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS shopping_interests_json TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS unique_viewers VARCHAR(64);
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS watch_time_hours VARCHAR(64);
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS avg_view_duration VARCHAR(64);
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS avg_percentage_viewed VARCHAR(64);
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS returning_viewers VARCHAR(64);

-- 3. Select Site Config
SELECT * FROM site_config WHERE id = 'default';

-- 4. Upsert Site Config (Parameterized)
INSERT INTO site_config
  (id, subscribers, subscribers_sub, monthly_views, monthly_views_sub, new_subs, new_subs_sub, videos_count, videos_count_sub, retention, channel_banner, demographics_json, geographies_json, rates_json, audience_interests_json, shopping_interests_json, unique_viewers, watch_time_hours, avg_view_duration, avg_percentage_viewed, returning_viewers)
VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
  rates_json = VALUES(rates_json),
  audience_interests_json = VALUES(audience_interests_json),
  shopping_interests_json = VALUES(shopping_interests_json),
  unique_viewers = VALUES(unique_viewers),
  watch_time_hours = VALUES(watch_time_hours),
  avg_view_duration = VALUES(avg_view_duration),
  avg_percentage_viewed = VALUES(avg_percentage_viewed),
  returning_viewers = VALUES(returning_viewers);

