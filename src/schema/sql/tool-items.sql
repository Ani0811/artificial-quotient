-- Tool Items Table Schema & Raw SQL Queries

-- 1. Create Table
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

-- 2. Select All Tool Items Ordered
SELECT * FROM tool_items ORDER BY display_order ASC;

-- 3. Truncate Table
TRUNCATE TABLE tool_items;

-- 4. Insert Tool Item (Parameterized)
INSERT INTO tool_items
  (id, name, logo, category, discount, description, try_url, display_order)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);
