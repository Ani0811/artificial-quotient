-- Brand Items Table Schema & Raw SQL Queries

-- 1. Create Table
CREATE TABLE IF NOT EXISTS brand_items (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  category VARCHAR(64) NOT NULL,
  tagline TEXT,
  logo_text VARCHAR(128),
  yt_url VARCHAR(255),
  logo_url VARCHAR(255),
  is_hidden BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Select All Brand Items Ordered
SELECT * FROM brand_items ORDER BY display_order ASC;

-- 3. Truncate Table (used during sync)
TRUNCATE TABLE brand_items;

-- 4. Insert Brand Item (Parameterized)
INSERT INTO brand_items
  (id, name, category, tagline, logo_text, yt_url, logo_url, is_hidden, display_order)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
