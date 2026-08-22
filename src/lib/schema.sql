-- MySQL Schema for AQ-Dashboard database

CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'Editor',
  permissions_json TEXT,
  recovery_key VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Active',
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_config (
  id VARCHAR(32) PRIMARY KEY,
  subscribers VARCHAR(64) NOT NULL,
  subscribers_sub VARCHAR(128),
  impressions VARCHAR(64) NOT NULL,
  impressions_sub VARCHAR(128),
  open_rate VARCHAR(64) NOT NULL,
  open_rate_sub VARCHAR(128),
  demographics_json TEXT,
  geographies_json TEXT,
  rates_json TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sponsor_case_studies (
  id VARCHAR(64) PRIMARY KEY,
  partner_name VARCHAR(128) NOT NULL,
  campaign_type VARCHAR(64) NOT NULL,
  quote TEXT NOT NULL,
  quote_font VARCHAR(64),
  stat1_label VARCHAR(64) NOT NULL,
  stat1_value VARCHAR(64) NOT NULL,
  stat2_label VARCHAR(64) NOT NULL,
  stat2_value VARCHAR(64) NOT NULL,
  description TEXT,
  deliverables TEXT,
  yt_url VARCHAR(255),
  roi_breakdown VARCHAR(128),
  publish_date VARCHAR(64),
  logo_url VARCHAR(255),
  is_hidden BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS what_performs_cards (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  views VARCHAR(64) NOT NULL,
  clicks VARCHAR(64) NOT NULL,
  type VARCHAR(64) NOT NULL,
  thumb VARCHAR(32),
  thumbnail VARCHAR(255),
  yt_url VARCHAR(255),
  highlight VARCHAR(64),
  is_hidden BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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

CREATE TABLE IF NOT EXISTS tool_items (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  logo VARCHAR(255),
  category VARCHAR(64) NOT NULL,
  discount VARCHAR(128),
  description TEXT,
  try_url VARCHAR(255),
  display_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
