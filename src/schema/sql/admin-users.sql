-- Admin Users Table Schema & Raw SQL Queries

-- 1. Create Table
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

-- 2. Select All Active Admin Users
SELECT * FROM admin_users ORDER BY created_at ASC;

-- 3. Select Admin User By Email
SELECT * FROM admin_users WHERE email = ? LIMIT 1;

-- 4. Truncate Table
TRUNCATE TABLE admin_users;

-- 5. Insert Admin User (Parameterized)
INSERT INTO admin_users
  (id, name, email, password, role, permissions_json, recovery_key, status, last_login)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
