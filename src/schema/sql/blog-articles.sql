-- Blog Articles Table Schema & Raw SQL Queries

-- 1. Create Table
CREATE TABLE IF NOT EXISTS blog_articles (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  excerpt TEXT NOT NULL,
  yt_url VARCHAR(255),
  author VARCHAR(128),
  cover VARCHAR(255),
  content TEXT,
  display_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Select All Blog Articles Ordered
SELECT * FROM blog_articles ORDER BY display_order ASC;

-- 3. Truncate Table
TRUNCATE TABLE blog_articles;

-- 4. Insert Blog Article (Parameterized)
INSERT INTO blog_articles
  (id, title, category, excerpt, yt_url, author, cover, content, display_order)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
