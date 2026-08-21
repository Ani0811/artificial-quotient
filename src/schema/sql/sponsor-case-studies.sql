-- Sponsor Case Studies Table Schema & Raw SQL Queries

-- 1. Create Table
CREATE TABLE IF NOT EXISTS sponsor_case_studies (
  id VARCHAR(64) PRIMARY KEY,
  partner_name VARCHAR(128) NOT NULL,
  campaign_type VARCHAR(128) NOT NULL,
  quote TEXT NOT NULL,
  quote_font VARCHAR(64),
  stat1_label VARCHAR(64) NOT NULL,
  stat1_value VARCHAR(64) NOT NULL,
  stat2_label VARCHAR(64) NOT NULL,
  stat2_value VARCHAR(64) NOT NULL,
  description TEXT,
  deliverables TEXT,
  yt_url VARCHAR(255),
  roi_breakdown TEXT,
  publish_date VARCHAR(64),
  logo_url VARCHAR(255),
  website_url VARCHAR(255),
  thumbnail_url VARCHAR(255),
  is_hidden BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Select All Case Studies Ordered
SELECT * FROM sponsor_case_studies ORDER BY display_order ASC;

-- 3. Truncate Table
TRUNCATE TABLE sponsor_case_studies;

-- 4. Insert Case Study (Parameterized)
INSERT INTO sponsor_case_studies
  (id, partner_name, campaign_type, quote, quote_font, stat1_label, stat1_value, stat2_label, stat2_value, description, deliverables, yt_url, roi_breakdown, publish_date, logo_url, website_url, thumbnail_url, is_hidden, display_order)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
