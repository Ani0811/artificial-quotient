-- Seed Data SQL Script for MySQL Workbench
-- Execute this script after creating the tables to populate them with the default site data and admin users.

USE `AQ-Dashboard`;

-- 1. Seed Admin Users
INSERT INTO admin_users 
  (id, name, email, password, role, permissions_json, recovery_key, status, last_login)
VALUES 
  (
    'admin-1', 
    'Primary Admin', 
    'admin@artificialquotient.com', 
    'admin123', 
    'Super Admin', 
    '["stats", "case-studies", "what-performs", "tools", "backup", "users"]', 
    'AQ-SEC-9842', 
    'Active', 
    '2026-08-08 14:30:00'
  ),
  (
    'admin-2', 
    'Campaign Manager', 
    'partnerships@artificialquotient.com', 
    'partner123', 
    'Editor', 
    '["case-studies", "what-performs", "tools"]', 
    'AQ-SEC-4173', 
    'Active', 
    '2026-08-07 11:15:00'
  )
ON DUPLICATE KEY UPDATE 
  name=VALUES(name), 
  password=VALUES(password), 
  role=VALUES(role), 
  permissions_json=VALUES(permissions_json), 
  recovery_key=VALUES(recovery_key), 
  status=VALUES(status);


-- 2. Seed Site Config (YouTube Stats)
INSERT INTO site_config
  (id, subscribers, subscribers_sub, monthly_views, monthly_views_sub, new_subs, new_subs_sub, videos_count, videos_count_sub, retention, channel_banner, demographics_json, geographies_json, rates_json)
VALUES 
  (
    'default', 
    '10,100+', 
    '+12.4% this month', 
    '850,000+', 
    '~120K monthly views', 
    '+1,200', 
    'High velocity growth', 
    '222', 
    'Active weekly cadence', 
    '27', 
    '', 
    '{"age25_34":"39.9%","age18_24":"28.5%","malePercent":"84.7%","femalePercent":"15.3%"}', 
    '{"usa":"24.1%","india":"21.6%","uk":"4.6%","germany":"3.9%"}', 
    '{"dedicatedRate":"$500","integrationRate":"$300"}'
  )
ON DUPLICATE KEY UPDATE
  subscribers=VALUES(subscribers),
  subscribers_sub=VALUES(subscribers_sub),
  monthly_views=VALUES(monthly_views),
  monthly_views_sub=VALUES(monthly_views_sub),
  new_subs=VALUES(new_subs),
  new_subs_sub=VALUES(new_subs_sub),
  videos_count=VALUES(videos_count),
  videos_count_sub=VALUES(videos_count_sub),
  retention=VALUES(retention),
  channel_banner=VALUES(channel_banner),
  demographics_json=VALUES(demographics_json),
  geographies_json=VALUES(geographies_json),
  rates_json=VALUES(rates_json);


-- 3. Seed Sponsor Case Studies
INSERT INTO sponsor_case_studies
  (id, partner_name, campaign_type, quote, quote_font, stat1_label, stat1_value, stat2_label, stat2_value, description, deliverables, yt_url, roi_breakdown, publish_date, logo_url, display_order)
VALUES 
  (
    '1', 
    'Revid.AI', 
    'Dedicated Video', 
    'The highest converting sponsorship we\'ve ran this quarter. Incredible audience fit.', 
    'Caveat', 
    'Signups Generated', 
    '450+', 
    'Est. ROI Multiplier', 
    '3.2x', 
    'Full end-to-end dedicated video breakdown showcasing how Revid.AI automates viral short-form video generation using Make.com and custom AI prompts.', 
    '10-minute dedicated YouTube video, custom workflow blueprint JSON download, and featured link in newsletter.', 
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    '3.2x Return on Investment within 30 days of campaign launch', 
    'Q2 2026', 
    '', 
    0
  ),
  (
    '2', 
    'Flashloop', 
    'Integration', 
    'We saw an immediate spike in traffic during the first 48 hours of upload.', 
    'Dancing Script', 
    'Link Clicks', 
    '1,200+', 
    'Cost Per Click', 
    '$0.25', 
    'Mid-roll integration highlighting Flashloop\'s API speed and web automation webhooks for automated content pipelines.', 
    '60-second video integration, pinned YouTube comment with tracked affiliate link, and Tool Vault placement.', 
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    'Instant 1,200+ direct clicks with $0.25 effective CPC', 
    'Q2 2026', 
    '', 
    1
  )
ON DUPLICATE KEY UPDATE
  partner_name=VALUES(partner_name),
  campaign_type=VALUES(campaign_type),
  quote=VALUES(quote),
  quote_font=VALUES(quote_font),
  stat1_label=VALUES(stat1_label),
  stat1_value=VALUES(stat1_value),
  stat2_label=VALUES(stat2_label),
  stat2_value=VALUES(stat2_value),
  description=VALUES(description),
  deliverables=VALUES(deliverables),
  yt_url=VALUES(yt_url),
  roi_breakdown=VALUES(roi_breakdown),
  publish_date=VALUES(publish_date),
  logo_url=VALUES(logo_url),
  display_order=VALUES(display_order);


-- 4. Seed What Performs Cards
INSERT INTO what_performs_cards
  (id, title, views, clicks, type, thumb, thumbnail, yt_url, highlight, display_order)
VALUES 
  (
    '1', 
    'Revid.AI', 
    '18.2k', 
    '1.4k+', 
    'Dedicated Video', 
    '🎬', 
    '/uploads/1786181270594_Screenshot__1_.png', 
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    'High Conversion', 
    0
  ),
  (
    '2', 
    'Flashloop AI', 
    '12.5k', 
    '950+', 
    'Integration', 
    '⚡', 
    '', 
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    'Solid ROI', 
    1
  ),
  (
    '3', 
    'Marky Agent', 
    '21.1k', 
    '2.1k+', 
    'Dedicated Video', 
    '🤖', 
    '', 
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    'Viral Reach', 
    2
  )
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  views=VALUES(views),
  clicks=VALUES(clicks),
  type=VALUES(type),
  thumb=VALUES(thumb),
  thumbnail=VALUES(thumbnail),
  yt_url=VALUES(yt_url),
  highlight=VALUES(highlight),
  display_order=VALUES(display_order);


-- 5. Seed Tool Items
INSERT INTO tool_items
  (id, name, logo, category, discount, description, try_url, display_order)
VALUES 
  (
    '1', 
    'Make.com', 
    '', 
    'Automation', 
    '20% OFF 1st Year', 
    'The ultimate visual automation platform for building advanced workflows without code.', 
    'https://make.com', 
    0
  )
ON DUPLICATE KEY UPDATE
  name=VALUES(name),
  logo=VALUES(logo),
  category=VALUES(category),
  discount=VALUES(discount),
  description=VALUES(description),
  try_url=VALUES(try_url),
  display_order=VALUES(display_order);
