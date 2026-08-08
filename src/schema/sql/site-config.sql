-- Site Config Table Schema & Raw SQL Queries

-- 1. Create Table
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Select Site Config
SELECT * FROM site_config WHERE id = 'default';

-- 3. Upsert Site Config (Parameterized)
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
