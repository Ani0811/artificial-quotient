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
  (id, subscribers, subscribers_sub, monthly_views, monthly_views_sub, new_subs, new_subs_sub, videos_count, videos_count_sub, retention, channel_banner, demographics_json, geographies_json, rates_json, audience_interests_json, shopping_interests_json, unique_viewers, watch_time_hours, avg_view_duration, avg_percentage_viewed, returning_viewers)
VALUES 
  (
    'default', 
    '10.0K', 
    '+12.4% this month', 
    '69.5K', 
    '~120K monthly views', 
    '+1,200', 
    'High velocity growth', 
    '229', 
    'Active weekly cadence', 
    '27', 
    '', 
    '{"age13_17":"3.4%","age18_24":"22.4%","age25_34":"39.9%","age35_44":"19.9%","age45_54":"9.3%","age55_64":"3.6%","age65_plus":"1.5%","malePercent":"84.4%","femalePercent":"15.6%"}', 
    '{"india":"21.8%","usa":"10.7%","pakistan":"4.5%","nigeria":"2.7%","bangladesh":"2.5%","uk":"0%","germany":"0%"}', 
    '{"dedicatedRate":"$500","integrationRate":"$300"}',
    '[{"name":"Social Media Enthusiasts","level":"Medium"},{"name":"Technophiles","level":"Medium"},{"name":"Mobile Enthusiasts","level":"Medium"},{"name":"Comics & Animation Fans","level":"Medium"},{"name":"Movie Lovers","level":"Medium"}]',
    '[{"name":"Software","level":"High"},{"name":"Design Software","level":"Very High"},{"name":"Audio & Music Software","level":"Very High"},{"name":"Business & Productivity Software","level":"Very High"},{"name":"Video Editing & Production Software","level":"Very High"}]',
    '55.0K',
    '1.8K',
    '1:39',
    '27.1%',
    '6.6%'
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
  rates_json=VALUES(rates_json),
  audience_interests_json=VALUES(audience_interests_json),
  shopping_interests_json=VALUES(shopping_interests_json),
  unique_viewers=VALUES(unique_viewers),
  watch_time_hours=VALUES(watch_time_hours),
  avg_view_duration=VALUES(avg_view_duration),
  avg_percentage_viewed=VALUES(avg_percentage_viewed),
  returning_viewers=VALUES(returning_viewers);


-- 3. Seed Sponsor Case Studies
INSERT INTO sponsor_case_studies
  (id, partner_name, campaign_type, quote, quote_font, stat1_label, stat1_value, stat2_label, stat2_value, description, deliverables, yt_url, roi_breakdown, publish_date, logo_url, website_url, display_order)
VALUES 
  (
    '1', 
    'Revid.AI', 
    '2 Dedicated Videos', 
    'Our goal is to provide people searching for these tools (Revid AI) with a detailed breakdown of how to generate content, such as AI music videos and talking lip-sync avatars.', 
    'Caveat', 
    'Videos Created', 
    '2 Videos', 
    'Contract Value', 
    '$700', 
    'Goal: Our goal is to provide people searching for these tools (Revid AI) with a detailed breakdown of how to generate content, such as AI music videos and talking avatars.', 
    'Videos Made:\n1. Revid AI Music To Video Review: Best AI Music Video Generator For Suno AI Songs?\n2. Revid AI Audio To Video Review: Make Talking AI Avatars With Perfect Lip Sync!', 
    'https://youtu.be/G_MW3vpfLxA?si=J-vDcmEjOt_P_M6u', 
    'Results:\n• Videos ranking on relevant keywords\n• Links getting clicks\n• Insightful visitor feedback', 
    'Contract: 2 Videos @ $700', 
    '', 
    'https://www.revid.ai/',
    0
  ),
  (
    '2', 
    'Flashloop AI', 
    'Viral Integration', 
    'Our goal is to demonstrate Flashloop AI\'s next-gen video models (Veo 3, Kling 3.0, Seedance 2.0) and show creators how to turn viral AI animation trends into millions of views.', 
    'Caveat', 
    'Link Clicks', 
    '1,200+', 
    'Cost Per Click', 
    '$0.25', 
    'Goal: Show content creators and digital agencies how to use Flashloop AI (https://www.flashloop.app/) to recreate viral AI trends (old cartoon styles, sports anime, talking character drama) and instantly generate high-converting short-form video content using state-of-the-art models like Veo 3 and Kling 3.0.', 
    'Videos Made:\n1. Flashloop AI Review: How To Generate Viral AI Animations & Talking Avatars\n2. Recreating Trending AI Cartoons & Anime Styles in Minutes with Flashloop AI\n3. Full Mid-Roll Integration & Pinned Comment Tracked Link on YouTube', 
    'https://youtu.be/CO59xAteGRM?si=JMLIywF1ydT1MOsJ', 
    'Results:\n• Instant 1,200+ direct clicks with $0.25 effective CPC\n• High conversion rate to Flashloop free trial & paid subscription\n• Featured placement in Tool Vault & MCP ecosystem showcase', 
    'Dedicated Video Integration', 
    'https://www.flashloop.app/',
    1
  ),
  (
    '3',
    'Marky Agent',
    'Dedicated Video',
    'Our goal was to showcase Marky Agent\'s powerful AI workflow automation capabilities, driving high-intent signups and demonstrating real-world productivity use cases.',
    'Caveat',
    'Signups Generated',
    '680+',
    'Est. ROI Multiplier',
    '3.8x',
    'Goal: Show content creators, marketers, and power users how to utilize Marky Agent (Easy-Peasy.AI) to automate complex tasks, analyze documents, and construct custom AI tools effortlessly.',
    'Videos Made:\n1. Marky Agent Tutorial: Build Custom AI Workflows & Automate Tasks\n2. Tracked Pinned Comment Link & Workflow Blueprint Download',
    'https://youtu.be/Oo9H89i6SYk?si=flMdazfrd1ef-feb',
    'Results:\n• 3.8x Return on Investment within 30 days\n• 680+ high-intent platform signups\n• High organic search visibility for AI workflow agents',
    'Dedicated Video Integration',
    '',
    'https://easy-peasy.ai/marky',
    2
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
    'How To Keep Character Voices Consistent In Grok AI Lip Sync! (FREE & Easy)', 
    '5.2k', 
    '480+', 
    'Dedicated Video', 
    '🎤', 
    'https://img.youtube.com/vi/N9iVUmvgWzU/maxresdefault.jpg', 
    'https://youtu.be/N9iVUmvgWzU?si=7bJlv0ZR7b7GWO7K', 
    'Voice Consistency', 
    0
  ),
  (
    '2', 
    'How To Create MOVIE Recap/Explanation Videos Without Copyright (ChatGPT + Elevenlabs!)', 
    '11.0k', 
    '1.2k+', 
    'Dedicated Video', 
    '🎬', 
    'https://img.youtube.com/vi/6d0sSSXXTqA/maxresdefault.jpg', 
    'https://youtu.be/6d0sSSXXTqA?si=Fvd5scO2V-8dZN_h', 
    'Viral Reach', 
    1
  ),
  (
    '3', 
    'Poppy AI Review (+ Free Alternative): Best YouTube Script Generator In 2026?', 
    '5.4k', 
    '620+', 
    'Dedicated Video', 
    '🤖', 
    'https://img.youtube.com/vi/B80v1fzWYxE/maxresdefault.jpg', 
    'https://youtu.be/B80v1fzWYxE?si=fF7FZvXdjRgvV1J0', 
    'SaaS Review', 
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


-- 6. Seed Brand Items
INSERT INTO brand_items
  (id, name, category, tagline, logo_text, yt_url, logo_url, display_order)
VALUES
  (
    'revid',
    'Revid.AI',
    'AI Video Generator',
    'Automated viral short-form video generation platform.',
    '🎬 Revid.AI',
    'https://youtu.be/G_MW3vpfLxA?si=J-vDcmEjOt_P_M6u',
    '',
    0
  ),
  (
    'flashloop',
    'Flashloop AI',
    'Character Animation',
    'Talking fruit & consistent character video creator.',
    '⚡ Flashloop',
    'https://youtu.be/CO59xAteGRM?si=JMLIywF1ydT1MOsJ',
    '',
    1
  ),
  (
    'marky',
    'Marky Agent',
    'Autonomous AI Agent',
    'File analysis, task automation & custom app builder.',
    '🤖 Marky Agent',
    'https://youtu.be/Oo9H89i6SYk?si=flMdazfrd1ef-feb',
    '',
    2
  )
ON DUPLICATE KEY UPDATE
  name=VALUES(name),
  category=VALUES(category),
  tagline=VALUES(tagline),
  logo_text=VALUES(logo_text),
  yt_url=VALUES(yt_url),
  logo_url=VALUES(logo_url),
  display_order=VALUES(display_order);

