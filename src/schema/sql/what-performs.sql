-- What Performs Cards Table Schema & Raw SQL Queries

-- 1. Create Table
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

-- 2. Select All Cards Ordered
SELECT * FROM what_performs_cards ORDER BY display_order ASC;

-- 3. Truncate Table
TRUNCATE TABLE what_performs_cards;

-- 4. Insert Single Card (Parameterized)
INSERT INTO what_performs_cards
  (id, title, views, clicks, type, thumb, thumbnail, yt_url, highlight, is_hidden, display_order)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
