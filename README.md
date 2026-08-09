# Artificial Quotient — AI Automation Sponsorship Hub

Artificial Quotient is a high-converting, modern web application and sponsorship platform designed for AI automation tools, software products, and SaaS brands looking to partner with the **Artificial Quotient** YouTube channel and community.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript & React 19
- **Styling**: TailwindCSS 3.4 & Vanilla CSS Design System
- **Icons**: Lucide React & Custom Vector SVG Flags
- **Theming**: `next-themes` (Full Light & Dark Mode Support)
- **Authentication**: HTTP-Only Cookie Session (`admin_session`) & In-Memory Recovery Manager
- **Media Handling**: Server-Side Local Storage (`/public/uploads`) via API Upload Routes
- **Data Persistence**: Direct MySQL (`AQ-Dashboard`) & Knex.js Query Builder with JSON Fallback & Automated Snapshots (`src/data/backups/`)

---

## 📅 Development Timeline & Changelog

### 📅 Day 1 — Foundation, Subpages & Core Features

#### 1. App Subpage Routing (No Hash Anchor URLs)
- Converted legacy `#` hash URLs into dedicated, SEO-optimized App Router subpages:
  - `/sponsor` — Rates & 5-Step Campaign Workflow
  - `/stats` — Demographic & Geographic Audience Snapshot
  - `/case-studies` — What Performs & Historical Sponsor Results
  - `/tools` — Tool Vault Directory
  - `/blog` — Automation Guides & Articles
  - `/admin` — Protected Admin Management Portal

#### 2. Visual Design & Ambient Glow System
- **Radial Dot Matrix Texture**: Applied custom `radial-gradient` dot pattern on the body in `src/app/globals.css` for both light and dark themes.
- **Ambient Glow Orbs**: Fixed blur gradient orbs (`bg-brand-blue` & `bg-purple-500`) in `src/app/layout.tsx` for visual depth.
- **Transparent Container Layers**: Flowing dot matrix texture across all page components.

#### 3. Standardized Pricing & Offer Banners
- Updated Starter (`$5,999`), Growth (`$12,999`), and Premium (`$23,999`) package tiers under a "New Offer" banner with cut original prices.
- Equalized baseline heights and added interactive hover lifts (`hover:-translate-y-2 hover:shadow-xl`).

#### 4. Glassmorphic Navigation & Footer
- **4-Column Footer**: Organized links into *Sponsorship*, *Content Hub*, and *Direct Contact*.
- **YouTube Branding**: Embedded official SVG YouTube logo and live `10.1k Subscribers` badge.
- **Status Indicator**: Added live `Q3 Sponsorships Available` green status pulse.

---

### 📅 Day 2 — Next.js 15 Upgrade, Interactivity, Admin Gateway, Password Recovery, Skeletons & Media Integration

#### 1. Next.js 15 & React 19 Engine Upgrade
- Upgraded the codebase to Next.js 15 (`15.4.10` / `16.3.0` Turbopack) and React 19.
- Refactored `layout.tsx` to handle Next.js 15's async `cookies()` API.
- Fixed theme hydration warnings using `suppressHydrationWarning` on `<html>` and `<body>`.

#### 2. Card Interactivity & SVG Country Flags
- **Micro-Animations**: Added glow lines, scale effects, and icon rotations to *Audience Snapshot* and *Sponsor Results* cards.
- **Vector Country Flags**: Created inline SVG flags for USA, India, UK, and Germany, removing country code text tags (`US`, `IN`, `GB`, `DE`).
- **Official Links**: Linked all YouTube Subscribe buttons to `https://www.youtube.com/@ArtificialQuotient01`.

#### 3. Protected Admin Gateway & Navbar Lock
- Removed the Admin Portal link from the footer.
- Added a subtle Lock icon in the navbar for unauthenticated users that automatically hides when on `/admin/login`.
- Displays the full **Admin Portal** badge in the navbar only when authenticated (`isAdmin = true`).

#### 4. Glassmorphic Admin Login & Password Recovery
- Redesigned `/admin/login` with theme adaptation, password visibility toggle, and glassmorphism styling.
- **Password Recovery**: Added a "Forgot Password?" flow with master recovery key validation (`AQ-RESET-2026` or admin email) via `/api/auth/reset-password`.
- Default admin password set to `admin123` with dynamic state management (`src/lib/auth-store.ts`).

#### 5. Full Theme Color Correction for Admin Dashboard
- Updated `src/app/admin/DashboardClient.tsx` so all header cards, sidebar tabs, form inputs, and buttons adapt dynamically between light and dark modes (`bg-white/80 dark:bg-zinc-900/80`).

#### 6. Lazy Loading, Skeletons & Performance
- **Global Loader**: Created `src/app/loading.tsx` featuring an animated spinning loader.
- **Custom Skeletons**: Built skeleton components (`src/components/skeletons.tsx`) for homepage sections.
- **Staggered Lazy Loading**: Dynamically imported homepage sections in `src/app/page.tsx` with staggered delays and `ssr: false` to demonstrate fluid skeleton loading on refresh (F5).

#### 7. Inline Media Integration
- Created `/api/admin/upload` API handler supporting file uploads to `/public/uploads/`.
- Integrated inline file upload buttons and live image previews directly inside form fields for AI Tool Vault (Tool Logo), Script-to-Blog Hub (Article Cover), and Channel Banner.

---

### 📅 Day 3 — Header Redesign, Dynamic Server Store & Automated Backups, Multi-Item Upsert/Delete Managers, Video Embeds & Branding Overhaul

#### 1. Redesigned Single-Line Admin Header & Layout Expansion
- Redesigned the Admin Management Portal header into a compact single-line control bar with segmented view mode pills (`Split View`, `Form Only`, `Preview Only`), eliminating visual clutter and button line wrapping on medium viewports.
- Expanded the workspace container max-width to `1700px` for comfortable side-by-side editing and real-time previews.
- Scaled up typography, input field padding, and form label font sizes across all tabs for optimal textual readability.

#### 2. Server-Side Data Persistence & Automated Rolling Backups
- Centralized site configuration in `src/data/site-data.json` accessible via `/api/admin/data`.
- Updated `POST /api/admin/data` to automatically create timestamped backup snapshots in `src/data/backups/site-data-YYYY-MM-DD.json` with a 20-file rolling limit.
- Added a dedicated **Backup & System** dashboard tab supporting offline **JSON Export** downloads and instant **JSON Restore** file uploads.

#### 3. Complete Zero-Hardcoded-Data Refactoring & Skeletons
- Refactored `AI Tool Vault` (`/tools`), `Script-to-Blog Hub` (`/blog`), `What Performs`, `Audience Snapshot`, and `Sponsor Results` to load 100% dynamically from the server data store.
- Removed all static fallbacks and added smooth skeleton loading states for subpages.

#### 4. Multi-Item Array Managers (Full Upsert & Delete Capabilities)
- Converted single-item forms into full multi-item array managers with **Add New**, **Edit**, **Upsert**, and **Delete** actions for:
  - Sponsor Case Studies
  - What Performs Cards
  - AI Tool Vault Directory
  - Script-to-Blog Hub Articles

#### 5. YouTube Video Redirects, Thumbnails & Local File Uploads
- Enabled YouTube video redirects on **What Performs** cards upon clicking the play overlay.
- Added automatic YouTube thumbnail cover extraction (`img.youtube.com/vi/[id]/hqdefault.jpg`) when a YouTube URL is entered, combined with direct local image file upload support via `/api/admin/upload`.

#### 6. Official Brand Logo Overhaul
- Replaced all legacy panda emoji placeholders (`🐼`) across the primary navigation (**Navbar**, **Footer**, **Admin Header**, **Loading Screen**, and **Browser Favicon Metadata**) with the official `/logo/logo.jpeg` brand asset.

---

### 📅 Day 4 — YouTube Channel Card Redesign & Universal Brand Logo Integration

#### 1. YouTube Channel Snapshot Card Redesign (Hero Section)
- **Official Brand Logo Integration**: Replaced placeholder 🐼 emoji in the `Hero` component with the official `/logo/logo.jpeg` brand asset housed inside a glowing squircle container with a verified channel checkmark badge.
- **Glassmorphic Card Architecture**: Upgraded the floating snapshot card with multi-layered dark glassmorphism (`backdrop-blur-2xl`), a top gradient accent bar (`emerald-500` via `teal-400` to `blue-500`), ambient radial glow orbs, and 3D hover rotation transitions.
- **Branded Subscribe CTA**: Designed a YouTube brand red gradient Subscribe button featuring an authentic YouTube SVG icon and hover micro-interactions.
- **Enhanced Performance Gauge**: Modernized the channel metrics grid for Subscribers (`10.1k`), Monthly Views (`69.5k`), active status badges (`Active`, `Growing`), and an animated viewer retention progress bar (`27% Avg. Retention`).

#### 2. Platform-Wide Brand Identity Standardization
- Replaced all remaining legacy 🐼 emoji placeholders with the official `/logo/logo.jpeg` brand asset across all subpages:
  - Admin Login Page (`/admin/login`)
  - 404 Error Page (`/not-found`)
  - Script-to-Blog Article Post (`/blog/[slug]`)
- Integrated official channel favicon assets (`public/favicon.ico` & `src/app/icon.jpeg`).

---

### 📅 Day 5 — Direct MySQL Database Integration, Knex.js Query Builder, Modular Schema Architecture, Admin User Management & UI Polish

#### 1. Direct MySQL Engine & Auto-Initialization
- **MySQL Integration**: Replaced JSON-only persistence with direct MySQL database persistence (`AQ-Dashboard`) using `mysql2/promise` and `knex`.
- **Automatic Schema Initializer**: Configured automatic `CREATE DATABASE IF NOT EXISTS \`AQ-Dashboard\`` and table initializers for all 6 core entities (`site_config`, `sponsor_case_studies`, `what_performs_cards`, `tool_items`, `blog_articles`, `admin_users`).
- **Data Seeding**: Built automated initial data seeding routines from JSON backups into MySQL tables.

#### 2. Knex.js Query Builder Migration & Anti-Injection Security
- **Programmatic Queries**: Replaced raw string concatenation with **Knex.js** query builder methods (`select()`, `insert()`, `truncate()`, `onConflict().merge()`) to guarantee 100% protection against SQL injection vulnerabilities without the overhead of heavy ORMs.
- **Server External Packages**: Configured Next.js `serverExternalPackages: ["knex"]` in `next.config.mjs` to bypass bundling optional unused database drivers (`tedious`, `pg`, `sqlite3`, `oracledb`).

#### 3. Modular Schema Architecture (`src/schema/`)
- **Organized Domain Schemas**: Created dedicated schema modules under `src/schema/` separating domain models into distinct, maintainable files:
  - `src/schema/site-config.ts`
  - `src/schema/what-performs.ts` (with YouTube metrics, views, clicks)
  - `src/schema/sponsor-case-studies.ts`
  - `src/schema/tool-items.ts`
  - `src/schema/blog-articles.ts`
  - `src/schema/admin-users.ts`
  - `src/schema/index.ts` (Central barrel export)
- **Raw SQL Reference Files**: Included pure `.sql` scripts (`src/schema/sql/`) and raw parameterized TypeScript helper modules (`src/schema/raw/`) alongside Knex modules for easy reference and MySQL Workbench execution.

#### 4. Interactive Sponsor Case Studies Modal & Extended Campaign Analytics
- **Case Study Detail Modal**: Clicking any Case Study card opens a responsive, scrollable modal displaying campaign video embeds, custom quote font styling, ROI multipliers, campaign overviews, deliverables, and publish dates.
- **Font Customization**: Supported Google Font dynamic loading for custom campaign quote typography (`Caveat`, `Dancing Script`, etc.).

#### 5. Admin Users & Permissions Management Tab
- **Admins & Permissions Tab**: Added a dedicated management panel in `DashboardClient.tsx` displaying active administrator count, user management tables, status toggles (`Active` / `Inactive`), role permissions (`Super Admin`, `Editor`, `Viewer`), and master security recovery key generator.
- **Responsive Split-View Layout**: Redesigned form grids to 2-column responsive layouts (`grid-cols-1 md:grid-cols-2`) for 100% viewport responsiveness in Split View mode.

#### 6. Forgot Password PIN Security System
- **Security PIN Recovery Keys**: Enhanced the Forgot Password flow to require security PIN keys (e.g. `AQ-SEC-9842`) tied to active admin accounts, replacing legacy static recovery keys.

#### 7. Scroll To Top & UX Polish
- **Floating Scroll-To-Top Button**: Built a glassmorphic `ScrollToTop` floating component (`src/components/scroll-to-top.tsx`) with scroll position detection (`window.scrollY > 300`) and smooth scroll restoration.
- **Dashboard Auto-Scroll on Save**: Integrated a `useEffect` handler and React `bannerRef` to the admin dashboard that triggers an automated smooth center-scroll to the green success status banner whenever updates are saved.
- **Hover Styling Correction**: Fixed visual button hover states in `rate-card.tsx` so text remains visible (`hover:text-white`) against blue background fills.

---

### 📅 Day 6 — Blog Purge, User Identity Cookies, Role-Based Access Control (RBAC), Self-Service Recovery & Password Management

#### 1. Complete Removal of Blog Section
- Completely purged the legacy `/blog` subpage, components (`src/app/blog/`), DB schema tables (`blog_articles`), seed data, and navigation links from **Navbar** and **Footer**.

#### 2. User Identity Session Cookies & Granular RBAC
- **Session Identity Tracking**: Updated `/api/auth/login` and `/api/auth/reset-password` to issue an `admin_user_id` HTTP-only cookie alongside `admin_session`.
- **Server Context Propagation**: Refactored `src/app/admin/page.tsx` to read `admin_user_id` and pass the authenticated `currentUser` object to `DashboardClient.tsx`.
- **Role & Permission Enforcements**:
  - Restricts visibility of administrative tabs (**Admins & Permissions**, **Backup & System**) based on user role (`Super Admin`, `Editor`, `Viewer`) and assigned permissions array.
  - Read-Only Mode for Viewers: Automatically disables all **Save & Publish** buttons (`disabled={isViewer}`) for `Viewer` accounts with clear visual indicators.

#### 3. Self-Service Recovery & Custom Password Management
- **Editable Recovery Keys**: Made the **Password Recovery Key** field in the Admin Users tab editable so admins can set and rotate their fallback security keys directly from the UI.
- **Custom Passwords**: Enabled setting any custom password for any administrator. Removed fixed default passwords (`"password123"`) when creating new admin accounts.
- **Password Visibility Toggle**: Integrated an interactive Show/Hide Password eye toggle button (`Eye` / `EyeOff` from `lucide-react`) directly inside password inputs.

#### 4. Strengthened MySQL Password Updates & Clean Schema Abstraction
- Created a modular `updateAdminUserPassword` helper function in `src/lib/auth-store.ts` and `src/schema/admin-users.ts`.
- Refactored `api/auth/reset-password` to perform safe, targeted SQL `UPDATE` operations by user `id` rather than truncating and reinserting the table.
- Exposed pure raw SQL parameterized update queries (`UPDATE admin_users SET password = ?, last_login = ? WHERE id = ?;`) inside `src/schema/raw/raw-admin-users.ts`.

#### 5. Non-Admin Access Notification & Universal Navbar Gateway
- **Universal Admin Portal Link**: Updated `src/components/navbar.tsx` so the **Admin Portal** link is always accessible to non-admin visitors.
- **Non-Admin Notice Banner**: Non-admin visitors clicking the Admin Portal link land on `/admin/login?notice=not-admin` featuring an explicit alert banner informing them that they are not an administrator and that permission must be granted by an existing System Administrator.
- **Explicit API Responses**: Updated `/api/auth/login` to return informative error messages explaining that administrator permissions must be granted by an active System Administrator.

---

## 📂 Project Structure

```
artificial-quotient/
├── public/
│   ├── logo/
│   │   └── logo.jpeg          # Official Channel Brand Logo
│   └── uploads/               # Uploaded Media Storage
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/         # Admin Login & Password Reset Page
│   │   │   ├── loading.tsx    # Dedicated Admin Loading Screen
│   │   │   ├── DashboardClient.tsx # Theme-Corrected Admin Management Portal
│   │   │   └── page.tsx       # Server Auth Check
│   │   ├── api/
│   │   │   ├── admin/data/    # JSON Data Read, Save & Auto Backup API
│   │   │   ├── admin/upload/  # Media File Upload API
│   │   │   └── auth/          # Login, Logout & Reset Password APIs
│   │   ├── sponsor/           # Sponsorship Subpage
│   │   ├── stats/             # Audience Stats Subpage
│   │   ├── case-studies/      # Case Studies Subpage
│   │   ├── tools/             # Tool Vault
│   │   ├── globals.css        # Global CSS & Dot Matrix Utilities
│   │   ├── layout.tsx         # Root Layout, Async Cookies & Ambient Glows
│   │   ├── loading.tsx        # Global Loading Screen & Animated Logo
│   │   └── page.tsx           # Home Landing Page with Lazy Loading
│   ├── components/
│   │   ├── audience-snapshot.tsx # Dynamic Stats & Interactive SVG Flags
│   │   ├── campaign-workflow.tsx
│   │   ├── footer.tsx         # Modern Glassmorphic Footer
│   │   ├── hero.tsx           # Redesigned Glassmorphic YouTube Channel Card
│   │   ├── navbar.tsx         # Dynamic Lock Gateway Header with Official Logo
│   │   ├── rate-card.tsx
│   │   ├── skeletons.tsx      # Skeleton Loaders for Homepage Sections
│   │   ├── sponsor-results.tsx # Dynamic Sponsor Case Study Cards
│   │   ├── what-performs.tsx  # Dynamic Video Performance Cards with YouTube Links
│   │   └── theme-provider.tsx
│   ├── data/
│   │   ├── site-data.json     # Primary Dynamic Data Store
│   │   └── backups/           # Server-Side Rolling Snapshot Backups
│   ├── schema/                # Knex Schema Modules & Raw SQL Queries
│   └── lib/
│       ├── auth-store.ts      # Admin Password & Role State Manager
│       └── db.ts              # Knex MySQL Database Connection Initializer
├── tailwind.config.ts
├── README.md
└── package.json
```

---

## 🚀 Getting Started Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```
