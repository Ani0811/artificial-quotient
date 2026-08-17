# Artificial Quotient — AI Automation Sponsorship Hub

Artificial Quotient is a high-converting, modern web application and sponsorship platform designed for AI automation tools, software products, and SaaS brands looking to partner with the **Artificial Quotient** YouTube channel and community.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15 / 16 (App Router, Turbopack, React 19)
- **Language & Types**: TypeScript 5
- **Styling**: TailwindCSS 3.4 & Vanilla CSS Design System (Custom Radial Matrix Glows)
- **Icons & Graphics**: Lucide React & Custom Vector SVG Country Flags
- **Theming**: `next-themes` (Light & Dark Mode Support with hydration suppression)
- **Authentication**: HTTP-Only Secure Cookie Session (`admin_session`, `admin_user_id`), Role-Based Access Control (Super Admin, Editor, Viewer), and in-house 2-Step Verification (2FA / OTP)
- **Email Delivery**: Brevo v3 Transactional REST API with multi-key pool failover & Nodemailer SMTP fallback with inline CID logo branding
- **Data Persistence**: Direct MySQL (`AQ-Dashboard`) & Knex.js Query Builder with JSON Fallback & Automated Rolling Snapshots (`src/data/backups/`)
- **SEO & Analytics**: Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console verification, dynamic XML Sitemap (`/sitemap.xml`), Robots.txt (`/robots.txt`), Web App Manifest (`/manifest.webmanifest`), and Schema.org JSON-LD Structured Data
- **Asset Resilience**: Multi-tier cascading fallback `<LogoImage />` with automatic cache-busting, smooth opacity transitions, and SVG fallback
- **Security & Networking**: Global CORS configuration with explicit HTTP OPTIONS preflight handlers, and in-memory sliding-window rate limiting

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

#### 6. Strict User Identity Verification & Security Hardening
- **Eliminated Super Admin Fallback**: Removed legacy fallback in `src/app/admin/page.tsx` that previously defaulted unassigned sessions to Primary Admin (`admin-1`).
- **Enforced Active Identity Check**: Requiring both `admin_session` and `admin_user_id` cookies to match an active user in MySQL/JSON; unauthenticated or unassigned users are strictly redirected to the login gateway.
- **Next.js App Router Compliance**: Resolved unhandled runtime cookie error by keeping cookie mutations strictly within API Route Handlers rather than mutating cookie states during page component rendering.

#### 7. Automatic DB Synchronization, Reset Security & Brand Redesign
- **Automatic JSON-to-MySQL Synchronization**: Restructured `initDatabase` inside `src/lib/db.ts` to automatically merge and sync newly added administrators from `admin-users.json` into the MySQL `admin_users` table on startup.
- **Whitespace Sanitization**: Integrated automated string trimming (`.trim()`) for names and emails on seeding and user edits to prevent authentication issues caused by trailing whitespace.
- **Reset Password Privilege Hardening**: Secured `/api/auth/reset-password` by making `email` and `recoveryKey` mandatory and verifying them strictly against the target user account, eliminating potential Super Admin privilege escalation.
- **Form Password Toggle**: Added a Show/Hide Password eye toggle button inside the New Access Password field on the reset page.
- **Viewer Role Lockdowns**: Fully disabled all interactive input fields, buttons, and upload forms inside `DashboardClient.tsx` for Viewer accounts. Restricted backend API routes (`/api/admin/data`, `/api/admin/users`) to reject edits from Viewer sessions with `403 Forbidden` responses.
- **Official Brand Email Template Overhaul**: Redesigned `src/emails/contact-template.ts` with a premium dark-emerald aesthetic, integrated the official channel logo, added standard trademark formatting (`Artificial Quotient™`), and included a formal legal notice footer.

---

### 📅 Day 7 — Visual Refinements, Marky Agent Case Study, Sponsor Brand Carousel, Custom 2-Step Verification (2FA), Premium Email Gateway & Full Mobile/Tablet Responsiveness

#### 1. Thumbnail & Card Visual Refinements
- **Flat Card Aesthetic**: Removed unwanted shadow classes (`shadow-sm`, `hover:shadow-lg`, `drop-shadow-md`) and extra container padding from the **What Performs on the Channel** cards for a clean, modern flat aesthetic.
- **100% YouTube Brightness**: Removed default dark background overlays (`bg-black/30` -> `bg-black/0`) from video thumbnails to match YouTube's exact bright visual appearance.

#### 2. Missing Case Study & Sponsor Brand Carousel
- **Marky Agent Case Study**: Added missing **Marky Agent** dedicated video case study (`680+ Signups Generated | 3.8x Est. ROI Multiplier`) to MySQL DB and JSON fallback. Updated layout grid to 3 columns (`lg:grid-cols-3`).
- **Sponsor Brands Carousel (`/#brands`)**: Created a dedicated `BrandCarousel` component below the Hero header with interactive controls, auto-scrolling ticker, and partner badges (`Revid.AI`, `Flashloop AI`, `Marky Agent`, `Make.com`).
- **Navbar & Footer Redirects**: Added a **Brands** link in the Navbar and a **Sponsor Brands** link in the Footer redirecting to `/#brands` with smooth scrolling.

#### 3. Custom 2-Step Verification (2FA / OTP) From Scratch
- **Zero 3rd-Party Integrations**: Built an in-house **2-Step Verification (2FA)** system from scratch without relying on external auth providers (Auth0, Clerk, or Twilio).
- **In-Memory OTP Store (`src/lib/otp-store.ts`)**: Implemented a server-side memory map for generating 6-digit One-Time Passwords with a 5-minute expiration window.
- **Verification Endpoint (`/api/auth/verify-2fa`)**: Added a dedicated verification route that checks the OTP code, clears it upon consumption, and issues authenticated session cookies.
- **Interactive 2FA Login Flow (`/admin/login`)**: Updated the login page to transition into a 6-digit OTP verification state upon valid password entry.

#### 4. Premium Dark Security Email Gateway with Embedded Logo
- **Nodemailer Service (`src/lib/email-service.ts`)**: Integrated `nodemailer` with custom SMTP settings and `tls: { rejectUnauthorized: false }` for self-signed certificate compatibility.
- **Inline CID Logo Attachment**: Attached `/public/logo/logo.jpeg` as an inline CID attachment (`cid:aqlogo@artificialquotient`) for 100% reliable rendering across all email clients (Gmail, Outlook, Apple Mail).
- **Dark Theme HTML Email**: Designed a dark-theme email template featuring a gradient top bar, `🔒 SECURITY GATEWAY` badge, large cyan monospaced 6-digit code (`#38bdf8`), 5-minute expiration indicator, and security alert notice.
- **Smart Fallback Destination**: Updated fallback login authentication to send OTP codes to `CONTACT_RECEIVER_EMAIL` when logging in without an explicit email address.

#### 5. Full Mobile & Tablet Responsiveness Overhaul

##### Navbar — React Portal Drawer
- **Root Cause Fixed**: The old drawer was rendered inside `<nav>` which creates a CSS stacking context, causing page content to bleed over the drawer regardless of `z-index`. Fixed by extracting a `MobileDrawer` component that uses `createPortal(drawer, document.body)` to render the panel directly on `<body>`, completely outside any stacking context.
- **Body Scroll Lock**: `useEffect` locks `document.body.style.overflow = "hidden"` while the drawer is open to prevent background scroll.
- **Solid Branded Backdrop**: Inline `backgroundColor: "#061612"` on the panel with `zIndex: 99999` guarantees opaque rendering on all browsers.
- **Tap-Outside Dismiss**: Semi-transparent backdrop overlay closes the drawer on tap, with smooth `animate-slide-in` / `animate-fade-in` transitions.

##### Hero Section — Compact Mobile Sizing
- **Heading**: `text-3xl → text-2xl` on mobile (scales back to `text-6xl` on desktop).
- **Body text**: `text-base → text-sm` on mobile.
- **CTA Buttons**: Padding `py-3.5 px-6 → py-3 px-5`, font size `text-base → text-sm` on mobile.
- **Section Padding**: `pt-16 pb-10 → pt-10 pb-8` on mobile.
- **YouTube Channel Card**: Logo `w-14 h-14 → w-10 h-10`, stat numbers `text-3xl → text-xl`, label text `text-xs → text-[10px]`, card padding `p-6 sm:p-8 → p-4 sm:p-6` on mobile.

##### Site-Wide Section Decluttering
Reduced vertical padding and internal gaps across all homepage sections on mobile/tablet viewports:

| Component | Before | After (mobile) |
|---|---|---|
| `audience-snapshot.tsx` | `py-20`, card `p-8` | `py-12 sm:py-16`, card `p-5 sm:p-8` |
| `what-performs.tsx` | `py-20`, `gap-6` | `py-12 sm:py-16`, `gap-4 sm:gap-6` |
| `sponsor-results.tsx` | `py-20`, card `p-8` | `py-12 sm:py-16`, card `p-5 sm:p-8` |
| `rate-card.tsx` | `py-20`, `gap-8` | `py-12 sm:py-16`, `gap-4 sm:gap-6` |
| `brand-carousel.tsx` | `py-16`, `mb-10` | `py-12 sm:py-16`, `mb-6 sm:mb-10` |

##### Admin Dashboard — Mobile-First UX
- **Compact Header**: Split the single overflowing flex row into three responsive stacked rows: logo + title + action buttons, info badges, and view mode toggle. Action button labels (`Live Site`, `Sign Out`) are hidden on mobile; only icons show. DB status truncates to "DB Connected" on small screens.
- **Horizontal Tab Strip**: On `< md` screens the vertical sidebar collapses into a horizontally scrollable pill tab strip with short labels and icons. The full vertical sidebar is retained at `md+`.
- **Tighter Padding**: Content panel padding `p-7 → p-4 sm:p-7`; outer container gaps `gap-8 → gap-4 sm:gap-8`; outer wrapper padding `py-10 px-6 → py-4 sm:py-10 px-3 sm:px-6 lg:px-8`.

---

### 📅 Day 8 — Tablet Responsiveness (iPad Air, Mini & Pro), Zero-Dependency Rate Limiting, OpenGraph SEO & Performance Optimizations

#### 1. Tablet Responsive Layout Overhaul (iPad Air, Mini & Pro)
- **Navbar Breakpoint Adjustment (`lg:`)**: Changed `Navbar` mobile drawer breakpoint from `md` (768px) to `lg` (1024px) so iPad Air (820px) and iPad Mini (768px) use the clean Mobile Drawer panel instead of overcrowding desktop navigation links.
- **Admin Dashboard Layout Breakpoint**: Switched Admin Dashboard main grid breakpoint to `lg:` (1024px) for horizontal tab navigation, and `xl:` (1280px) for Split View. On iPad Pro (1024px), the Form and Live Pre-Publish Preview now stack vertically with full width rather than squishing side-by-side.
- **Live Pre-Publish Preview Responsiveness**: Added `flex-wrap` and text truncation to the live preview panel header to prevent title and "Real-time" badge collision. Updated preview stat grids to responsive `grid-cols-1 sm:grid-cols-2`.
- **Case Study Preview Card Fixes**: Fixed floating hyphen (`"-"`) quotation rendering bug when case study quotes are empty (`""`). Added responsive `flex-wrap` to partner titles and campaign stat rows.
- **Multi-Column Footer for Mobile & Tablet**: Updated footer link columns (`Explore`, `Sponsorships`, `Management`) from single-column vertical stacking to responsive multi-column grids (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`).

#### 2. Zero-Dependency In-Memory Rate Limiting (`src/lib/rate-limit.ts`)
- **In-Memory Sliding-Window Rate Limiter**: Built a lightweight sliding-window IP rate limiting utility in `src/lib/rate-limit.ts` with zero external infrastructure or Redis requirements.
- **API Endpoint Protection**: Applied rate limiting (`5 attempts / minute per IP`) to `/api/auth/login` and `/api/contact` returning `HTTP 429 Too Many Requests` to prevent brute-force attacks and email spamming.

#### 3. High-Impact Performance & PageSpeed Enhancements
- **Removed Artificial Load Delays**: Purged legacy `delayImport` artificial timeouts (up to 1.8s) from `src/app/page.tsx`, allowing instant component rendering for superior PageSpeed, LCP, and FCP scores.
- **Image Optimization & CLS Prevention**: Added explicit `width`, `height`, `decoding="async"`, and `loading="lazy"` / `loading="eager"` attributes across logos and YouTube video thumbnail images (`hero.tsx`, `navbar.tsx`, `footer.tsx`, `sponsor-results.tsx`, `what-performs.tsx`) to eliminate Cumulative Layout Shift (CLS).
- **Public API Edge Caching**: Added `Cache-Control: public, s-maxage=30, stale-while-revalidate=59` headers to `GET /api/admin/data` for fast stale-while-revalidate responses.

#### 5. Dynamic Brands Carousel & Admin Management Integration
- **Knex Schema & MySQL Table (`src/schema/brand-items.ts`)**: Added `brand_items` table schema with `id`, `name`, `category`, `tagline`, `logo_text`, `yt_url`, `logo_url`, `display_order`, and `updated_at`.
- **Raw SQL Queries & Seeding (`src/schema/sql/brand-items.sql`, `seed-data.sql`)**: Created dedicated raw SQL query definitions (`CREATE TABLE`, `SELECT`, `TRUNCATE`, parameterized `INSERT`) and updated database seeding scripts.
- **Admin Management Portal (`Brands & Partners` Tab)**: Created full CRUD UI in `DashboardClient.tsx` allowing admins to dynamically add, edit, or delete sponsor brands, logo text/emojis, taglines, category tags, and external links with real-time pre-publish preview.
- **Dynamic Frontend Carousel (`brand-carousel.tsx`)**: Transformed the static carousel into a dynamic component driven by database state with index-based cycling accent gradients and graceful empty states.

#### 6. Brevo Transactional Email Integration & Anti-Spam Optimization
- **Brevo API Integration (`BREVO_API_KEY`)**: Integrated Brevo v3 Transactional Email REST API into `src/lib/email-service.ts` (for 2FA codes) and `src/app/api/contact/route.ts` (for contact form submissions) with automatic fallback to SMTP.
- **Inbox Placement & Anti-Spam Optimization**: Cleaned email subjects, removed bracketed OTP patterns (`[123456]`), and optimized HTML MIME headers to prevent verification emails from being routed to spam folders.

---

### 📅 Day 9 — YouTube Analytics Data Expansion, Revid.AI & Flashloop.AI Case Studies, Direct Partner Links, Dynamic 1-3 Card Layouts & Interactive Pagination

#### 1. YouTube Analytics Data Expansion (8 Key Channel Stats & Extended Demographics)
- **8-Card Channel Metrics Grid**: Expanded `AudienceSnapshot` to render 8 lifetime and monthly performance stat cards: *Subscribers (Lifetime)*, *Videos Published (Lifetime)*, *Unique Viewers*, *Views*, *Watch Time (Hours)*, *Average View Duration*, *Average Percentage Viewed*, and *Returning Viewers*.
- **7 Age Demographics**: Expanded demographics mapping across the full range of YouTube age buckets (`13-17`, `18-24`, `25-34`, `35-44`, `45-54`, `55-64`, `65+`).
- **Vector Country Flags**: Added custom vector SVG flags for top audience reach: India, USA, Pakistan, Nigeria, and Bangladesh.

#### 2. Revid.AI & Flashloop.AI Sponsor Case Studies
- **Revid.AI Case Study**: Integrated collaboration agreement data (2 Videos @ $700 contract), campaign goal narrative, list of videos produced (*AI Music Videos* & *Talking Lip-Sync Avatars*), and keyword ranking results.
- **Flashloop.AI Case Study**: Integrated Flashloop AI ([https://www.flashloop.app/](https://www.flashloop.app/)) case study showcasing next-gen video models (Veo 3, Kling 3.0, Seedance 2.0), 1,200+ direct clicks, $0.25 effective CPC, and tool vault placement.

#### 3. Direct Partner Website Links & Responsive Card Headers
- **Clickable Partner Badges**: Made partner brand badges on case study cards directly clickable external links opening official partner websites ([https://www.revid.ai/](https://www.revid.ai/), [https://www.flashloop.app/](https://www.flashloop.app/)).
- **Modal Website CTA**: Added a **"Visit Official Website ↗"** action button inside the interactive Case Study breakdown modal.
- **Header Flex Responsiveness**: Refactored card headers to flex-wrap layouts (`flex flex-wrap items-center justify-between gap-3`), eliminating badge line breaks and text overlapping across all viewports.

#### 4. Dynamic Layout Adaptability (1-Card, 2-Card & 3-Card Layouts)
- **Adaptive Grid Helper (`getGridLayout`)**: Built dynamic layout container styling based on visible card count:
  - *1 Card*: Single centered card layout (`max-w-xl mx-auto`).
  - *2 Cards*: Dual centered cards layout (`max-w-4xl mx-auto`).
  - *3 Cards*: Full 3-column grid (`lg:grid-cols-3`).

#### 5. Interactive Case Study Pagination
- **Pagination Bar**: Added smooth interactive pagination controls to `sponsor-results.tsx`:
  - Items per page set to 3 (`ITEMS_PER_PAGE = 3`).
  - Previous / Next buttons with disabled states.
  - Active page number pills (`bg-emerald-600`).
  - Live item counter (`Showing 1–3 of X Case Studies`).
  - Smooth section scroll on page navigation.

#### 6. Database & Knex Migrations
- Added `website_url VARCHAR(255)`, `unique_viewers`, `watch_time_hours`, `avg_view_duration`, `avg_percentage_viewed`, `returning_viewers` to `site_config` and `sponsor_case_studies` Knex modules and raw SQL files (`site-config.sql`, `sponsor-case-studies.sql`, `seed-data.sql`).
- Updated Admin Dashboard case studies editor with a dedicated **Partner Official Website URL** input field.

---

### 📅 Day 10 — Brand Carousel Infinite Wrap Engine, Logo Synchronization & Multi-Layer Asset Fallbacks

#### 1. Glitch-Free Brand Carousel Infinite Wrap Engine (`src/components/brand-carousel.tsx`)
- **Resolved Blank Screen Defect**: Fixed issue where rapid clicking of carousel navigation buttons caused cards to scroll into empty space beyond translated CSS keyframe offsets.
- **6-Set Buffer with Dynamic Normalization (`normalizeScroll`)**: Multiplies items across 6 identical sets with automated boundary wrapping (scrolling past Set 4 or before Set 1 seamlessly shifts `scrollLeft` by 2 sets imperceptibly).
- **Smooth `requestAnimationFrame` Auto-Glide**: Powered the ambient ticker with sub-pixel continuous velocity (~35px/s) with immediate pause on mouse hover / mobile touch and automatic resumption.
- **Rapid Navigation Resilience**: Users can click Previous (`<`) or Next (`>`) indefinitely at any speed without running out of cards or encountering empty views.

#### 2. Universal Brand Logo Synchronization & Favicon Purge (`logo-removebg-preview.png`)
- **Purged Legacy Favicon Files**: Removed `public/favicon.svg` (which was serving a legacy 🐼 SVG text element) and `src/app/icon.jpeg` that caused browser tabs to display the old icon.
- **Navbar Squircle Framing (`object-contain`)**: Updated navbar logo container from circular mask (`rounded-full` + `object-cover`) to a sleek squircle badge (`rounded-xl` + `object-contain p-0.5`), preventing text/edge clipping of the brand logo.
- **Multi-Layer `onError` Fallback Handlers**: Added automatic path fallback cascades across `Navbar`, `Hero`, `Footer`, `Loading`, and `NotFound` components (`/logo/logo-removebg-preview.png` → `/logo-removebg-preview.png` → `/logo.png`) for 100% reliability on shared hosting environments (GreenGeeks/cPanel).
- **SEO & Canonical Metadata Configuration**: Configured `metadataBase: new URL("https://artificial-quotient.com")` with cache-busted icon definitions (`?v=4`) and explicit `<head>` tags in `src/app/layout.tsx`.

#### 3. Sponsorship Form Gateway Integration (`src/components/rate-card.tsx`)
- **Replaced Email Links with Sponsorship Form**: Converted direct `mailto:` links on both the **60s Integration** ("Book Integration") and **Dedicated Video** ("Book Dedicated Video") pricing cards to open the official Google Sponsorship Application Form (`https://forms.gle/4uTUZkEi5o3iqYrs5`) in a new tab.

#### 4. Case Studies Header Single-Row Alignment & Typography Standardization (`src/components/sponsor-results.tsx`)
- **Single-Row Badge Framing**: Refined card padding and badge layout (`flex items-center justify-between gap-2` with compact pill dimensions) to guarantee partner badges and campaign type tags remain on a single horizontal line across all cards without wrapping.
- ---

### 📅 Day 11 — Google-Ready SEO & Analytics Engine, Search Console, Dynamic Sitemap, Structured Data & Metadata Architecture

#### 1. Dynamic XML Sitemap & Robots.txt (`src/app/sitemap.ts`, `src/app/robots.ts`)
- **Dynamic XML Sitemap**: Built automatic sitemap generation serving `/sitemap.xml` with all core public routes (`/`, `/sponsor`, `/stats`, `/case-studies`, `/tools`, `/contact`), dynamic `lastModified` timestamps, `changeFrequency` configurations, and weighted priorities.
- **Search Engine Crawl Directives**: Implemented `/robots.txt` directives explicitly permitting Googlebot and web crawlers to index public pages while disallowing private administrative and API routes (`/admin`, `/api`). Added absolute sitemap references.

#### 2. JSON-LD Structured Data & Rich Snippets Engine (`src/components/seo/structured-data.tsx`)
- **Schema.org Structured Data**: Injected semantic JSON-LD structured data into the `<head>` to qualify for Google rich search results:
  - `Organization` & `WebSite` Schema (Brand identity, search queries, channel links, official logo).
  - `ContactPage` Schema for `/contact`.
  - `ItemList` / `SoftwareApplication` Schema for the AI Tool Vault (`/tools`).
  - `FAQPage` & `OfferCatalog` Schema for campaign packages and sponsorship rates (`/sponsor`).

#### 3. Google Analytics 4 (GA4) & Google Tag Manager (GTM) (`src/components/analytics/google-analytics.tsx`)
- **Non-Blocking Analytics**: Created a lightweight analytics integration supporting `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_GTM_ID` using Next.js `Script` with `strategy="afterInteractive"` to prevent any impact on Core Web Vitals (LCP/FID).
- **Client Route Tracking**: Implemented automated pageview tracking across Next.js App Router client-side navigation.

#### 4. Subpage Metadata Layouts & Social Share Cards
- **Dedicated Subpage Layouts**: Added metadata layout wrappers with custom `title`, `description`, `canonical`, and OpenGraph/Twitter social cards for:
  - `/contact` (`src/app/contact/layout.tsx`)
  - `/tools` (`src/app/tools/layout.tsx`)
  - `/admin` (`src/app/admin/layout.tsx` with `robots: { index: false, follow: false }`)
- **Web App Manifest (`src/app/manifest.ts`)**: Built dynamic web app manifest (`/manifest.webmanifest`) specifying app icons, standalone display mode, background/theme colors (`#061612`), and PWA compatibility.

---

### 📅 Day 12 — Single-Source Homepage Data Prefetching, Global CORS Preflight Engine, Resilient `<LogoImage />` & Multi-Key Brevo Failover Pool

#### 1. Single-Source-of-Truth Homepage Data Prefetching (`src/app/page.tsx`)
- **Reduced DB Connection Contention**: Eliminated 5 separate client-side API requests from child components (`AudienceSnapshot`, `WhatPerforms`, `SponsorResults`, `RateCard`, `BrandCarousel`).
- **Cascaded Data Architecture**: Configured `src/app/page.tsx` as a single-source server component that fetches site-wide MySQL/JSON data once and distributes it directly down to all child sections, eliminating connection contention, race conditions, and waterfall loading on the homepage.

#### 2. Global CORS & HTTP OPTIONS Preflight Handlers
- **Global Next.js CORS Headers (`next.config.mjs`)**: Configured standard CORS headers across API routes (`Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`, `Access-Control-Allow-Headers: Content-Type, Authorization`).
- **OPTIONS Preflight Handlers**: Added explicit `OPTIONS` preflight request handlers to `/api/admin/data` and `/api/contact` returning `204 No Content` to allow seamless cross-origin and headless tool integration without browser preflight errors.

#### 3. Smooth Scroll-To-Top Navbar Logo & URL Hash Normalization (`src/components/navbar.tsx`)
- **Smooth Scroll-To-Top**: Clicking the Navbar brand logo while on the home page executes `window.scrollTo({ top: 0, behavior: "smooth" })`.
- **URL Hash Normalization**: Cleans lingering hash tags (e.g. `#brands`, `#workflow`) from the browser address bar via `window.history.pushState` without triggering hard page reloads.

#### 4. Resilient Multi-Layer `<LogoImage />` Component (`src/components/ui/logo-image.tsx`)
- **Universal Logo Component**: Extracted a dedicated, reusable `<LogoImage />` component integrated across all core application areas (`Navbar`, `Hero`, `Footer`, `Loading`, `NotFound`, `Admin Dashboard`, `Admin Login`).
- **4-Tier Fallback Cascade**: Automatically cascades across multiple potential asset locations (`/logo/logo-removebg-preview.png` → `/logo-removebg-preview.png` → `/logo/logo.png` → `/logo.png`) and gracefully falls back to an inline branded SVG icon if all image files fail.
- **Cache-Busting & Zero Layout Shift**: Appends version queries to prevent stale browser caching and applies smooth opacity transitions on asset load.

#### 5. Multi-Key Brevo API Key Failover Pool & SMTP Resilience (`src/lib/email-service.ts`, `src/app/api/contact/route.ts`)
- **Multi-Key Failover Pool**: `BREVO_API_KEY` now accepts comma-, semicolon-, or newline-separated lists of Brevo API keys.
- **Automated Failover Rotation**: If an API key encounters quota limits, rate limits, or auth errors (`401`, `403`, `429`, `500`), the email engine instantly rotates to the next available key and retries delivery.
- **Nodemailer SMTP Fallback**: If all Brevo API keys are exhausted, the system automatically falls back to Nodemailer SMTP, guaranteeing 100% deliverability for 2FA OTP codes and sponsorship inquiries.

---

### 📅 Day 13 — Mobile GPU Marquee Engine, Preloaded Brand Logo, Dynamic World Geographies, Database Countries Datalist, Streamlined Case Studies & Legal Suite (Terms & Privacy)

#### 1. Hardware GPU-Accelerated Mobile Marquee Engine (`src/components/brand-carousel.tsx`, `src/app/globals.css`)
- **Resolved Mobile Animation Lag**: Fixed frame-rate drops on high-refresh mobile devices (e.g. 120Hz ProMotion screens) caused by main-thread layout thrashing from continuous JavaScript `requestAnimationFrame` mutations on `scrollLeft`.
- **Pure CSS 3D GPU Transforms**: Replaced the JS loop with hardware-composited `@keyframes marquee-scroll` using `translate3d(0, 0, 0)` → `translate3d(-50%, 0, 0)`, `will-change: transform`, and `transform: translateZ(0)`.
- **66% DOM Reduction**: Reduced duplicate card sets from 6 sets down to 2 perfectly looping seamless tracks.
- **Mobile Touch Freeze & Direction Toggle**: Added touch/hover freeze (`pause-marquee` on `onTouchStart` / `onTouchEnd`) and directional chevron navigation controls.

#### 2. First-Time Logo Preloading & Instant Delivery (`src/components/ui/logo-image.tsx`)
- **Next.js `<Image priority>` Optimization**: Replaced multi-step state cycling with Next.js `next/image` with `priority={true}`, generating `<link rel="preload">` in the initial HTML `<head>` for instant, failure-free asset delivery on cold visits.

#### 3. Database-Backed Global Countries Engine (`src/schema/countries.ts`, `src/lib/countries.ts`, `/api/admin/countries`)
- **MySQL `countries` Table**: Created dedicated MySQL table (`code VARCHAR(10) PRIMARY KEY`, `name VARCHAR(100) NOT NULL INDEX`, `flag_emoji VARCHAR(10)`, `display_order INT`) with automated schema initialization and startup seeding of ~240 countries from `src/data/countries.json`.
- **Database Countries REST API**: Created `/api/admin/countries` and included country datasets in `/api/admin/data` payload.
- **Admin Autocomplete Datalist**: Integrated `<datalist id="countries-autocomplete-list">` dynamically populated from MySQL, allowing admins to search, select, upsert, and delete any country worldwide with real-time percentage and flag preview.
- **Cross-Platform Flag Rendering (`CountryFlag`)**: Upgraded `CountryFlag` in `src/components/audience-snapshot.tsx` to serve high-res flag images (FlagCDN with Retina 2x) for all 240+ countries alongside custom SVG flags, eliminating Windows OS emoji rendering limitations.

#### 4. Streamlined Case Study Metrics & Direct Sponsorship Gateway (`src/components/sponsor-results.tsx`, `src/app/admin/DashboardClient.tsx`)
- **Simplified Card & Modal Architecture**: Removed the secondary contract/cost metrics from both the Case Study cards and the detailed breakdown modal, highlighting the core primary performance metric.
- **Sponsorship Application Gateway**: Linked the "Book Similar Campaign" action button directly to the official Google Sponsorship Application Form (`https://forms.gle/4uTUZkEi5o3iqYrs5`).
- **Admin Case Studies Editor**: Streamlined the admin editor to two clear inputs: Primary Metric Label and Primary Metric Value.

#### 5. Roboto Typography Suite for Case Studies (`src/components/font-provider.tsx`)
- Added **Roboto (Clean Geometric)**, **Roboto Serif (Editorial Serif)**, **Roboto Slab (Modern Slab)**, and **Roboto Mono (Monospace)** to the quote font options with dynamic Google Font font-face loader.

#### 6. Comprehensive Legal & Compliance Suite (`/terms`, `/privacy`, `src/components/footer.tsx`, `src/app/sitemap.ts`)
- **Terms & Conditions Page (`/terms`)**: Built a full legal document covering creator sponsorship scopes (Dedicated Videos, Integrations, Packages), booking timelines, FTC endorsement compliance, editorial independence, revision policy, payment terms, and intellectual property.
- **Privacy Policy Page (`/privacy`)**: Implemented a privacy-first policy tailored for the portfolio and admin hub, outlining data protection, zero-sale commitment, third-party service disclosures, and user rights.
- **Footer & SEO Indexing**: Integrated **Legal & Admin** column and bottom copyright links in `footer.tsx`, and registered `/terms` and `/privacy` in `sitemap.ts`.

---

## 📂 Project Structure

```
artificial-quotient/
├── public/
│   ├── logo/
│   │   ├── logo-removebg-preview.png # Official Transparent Brand Logo
│   │   ├── logo.png                  # Static Brand Logo Alias
│   │   ├── revid.png                 # Partner Brand Logo
│   │   ├── flashloop.png             # Partner Brand Logo
│   │   └── easypeasy.png             # Partner Brand Logo
│   ├── logo.png                      # Root Logo Fallback
│   ├── favicon.ico                   # Browser Favicon
│   └── uploads/                      # Uploaded Media Storage
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/                # Admin Login & 2FA Page
│   │   │   ├── layout.tsx            # Admin Metadata Layout (noindex)
│   │   │   ├── loading.tsx           # Dedicated Admin Loading Screen
│   │   │   ├── DashboardClient.tsx   # Theme-Corrected Admin Management Portal
│   │   │   └── page.tsx              # Server Auth & RBAC Check
│   │   ├── api/
│   │   │   ├── admin/countries/      # Database World Countries CRUD API
│   │   │   ├── admin/data/           # Dynamic Site Data & Backup API (CORS & OPTIONS)
│   │   │   ├── admin/upload/         # Media File Upload API
│   │   │   ├── admin/users/          # Admin User Management API
│   │   │   ├── auth/                 # Login, Logout, 2FA & Reset Password APIs
│   │   │   └── contact/              # Sponsorship Inquiry API (Brevo/SMTP)
│   │   ├── contact/                  # Contact & Sponsorship Booking Page
│   │   ├── privacy/                  # Privacy Policy Page
│   │   ├── terms/                    # Terms & Conditions Page
│   │   ├── sponsor/                  # Sponsorship Subpage
│   │   ├── stats/                    # Audience Stats Subpage
│   │   ├── case-studies/             # Case Studies Subpage
│   │   ├── tools/                    # AI Tool Vault Directory
│   │   ├── globals.css               # Global CSS & GPU Marquee Keyframes
│   │   ├── layout.tsx                # Root Layout, Analytics, Async Cookies & Ambient Glows
│   │   ├── loading.tsx               # Global Loading Screen & Animated Logo
│   │   ├── manifest.ts               # Dynamic Web App Manifest (/manifest.webmanifest)
│   │   ├── not-found.tsx             # 404 Error Page
│   │   ├── page.tsx                  # Home Landing Page with Single-Source Prefetching
│   │   ├── robots.ts                 # Dynamic Crawler Rules (/robots.txt)
│   │   └── sitemap.ts                # Dynamic XML Sitemap Generator (/sitemap.xml)
│   ├── components/
│   │   ├── analytics/
│   │   │   └── google-analytics.tsx  # GA4 & Google Tag Manager Integration
│   │   ├── seo/
│   │   │   └── structured-data.tsx   # Schema.org JSON-LD Structured Data Components
│   │   ├── ui/
│   │   │   └── logo-image.tsx        # Preloaded Multi-Tier Cascading Brand Logo Component
│   │   ├── audience-snapshot.tsx     # Dynamic Stats, World Geographies & Cross-Platform Flags
│   │   ├── brand-carousel.tsx        # Hardware GPU Marquee Engine with Touch Freeze
│   │   ├── campaign-workflow.tsx     # 5-Step Campaign Process Cards
│   │   ├── font-provider.tsx         # Google Fonts Provider (Roboto, Caveat, etc.)
│   │   ├── footer.tsx                # Multi-Column Footer with Legal & Admin Links
│   │   ├── hero.tsx                  # Glassmorphic YouTube Channel Card
│   │   ├── navbar.tsx                # Header Navigation with Smooth Scroll-To-Top
│   │   ├── rate-card.tsx             # Pricing Packages with Google Form Gateway Links
│   │   ├── scroll-to-top.tsx         # Floating Scroll Restoration Button
│   │   ├── skeletons.tsx             # Skeleton Loaders for Homepage Sections
│   │   ├── sponsor-results.tsx       # Streamlined Case Studies with Modal & Pagination
│   │   ├── theme-provider.tsx        # Dark/Light Theme Context
│   │   ├── theme-toggle.tsx          # Interactive Theme Switch Button
│   │   └── what-performs.tsx         # Video Performance Cards with YouTube Links
│   ├── data/
│   │   ├── admin-users.json          # Seed Admin User Accounts
│   │   ├── countries.json            # ISO World Countries & Flag Emoji Dataset
│   │   ├── site-data.json            # Primary Dynamic Site Data Store
│   │   └── backups/                  # Server-Side Rolling Snapshot Backups
│   ├── emails/
│   │   └── contact-template.ts       # Responsive Dark Email Template with Inline CID Logo
│   ├── lib/
│   │   ├── auth-store.ts             # Admin Password & Role State Manager
│   │   ├── countries.ts              # Country Code & Alias Resolution Engine
│   │   ├── db.ts                     # Knex MySQL Connection Pool & Schema Initializer
│   │   ├── email-service.ts          # Brevo Multi-Key Pool & Nodemailer SMTP Engine
│   │   ├── otp-store.ts              # In-Memory 2FA One-Time Password Store
│   │   ├── rate-limit.ts             # Sliding-Window Rate Limiter (IP Protection)
│   │   ├── schema.sql                # Complete MySQL Database Schema Script
│   │   └── scroll.ts                 # Smooth Scroll Utilities
│   ├── schema/                       # Knex.js Domain Models & Auto-Table Initializers
│   │   ├── admin-users.ts
│   │   ├── brand-items.ts
│   │   ├── countries.ts              # MySQL Countries Table Schema & Queries
│   │   ├── index.ts
│   │   ├── site-config.ts
│   │   ├── sponsor-case-studies.ts
│   │   ├── tool-items.ts
│   │   ├── what-performs.ts
│   │   ├── raw/                      # Parameterized SQL Helper Modules
│   │   └── sql/                      # Standalone Reference SQL Scripts & Seed Data
│   └── types/
│       └── index.ts                  # Centralized TypeScript Type Definitions
├── next.config.mjs
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

2. **Configure Environment Variables (`.env`)**:
   Create a `.env` file in the project root:
   ```env
   NODE_ENV=development
   PORT=3000

   # Database Settings (Direct MySQL)
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=AQ-Dashboard

   # Security & Authentication
   ADMIN_MASTER_KEY=AQ-RESET-2026

   # Transactional Email (Brevo Multi-Key Pool & Fallback)
   # You can supply a single key or a comma-separated list of keys for automatic failover
   BREVO_API_KEY=xkeysib-key1,xkeysib-key2
   CONTACT_RECEIVER_EMAIL=anirudha.basuthakur@gmail.com

   # SMTP Fallback Settings (Optional)
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=465
   SMTP_USER=contact@yourdomain.com
   SMTP_PASS=your_smtp_password
   SMTP_SECURE=true
   SMTP_FROM="Artificial Quotient <contact@yourdomain.com>"

   # SEO & Analytics
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_site_verification_token
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build & Verification**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deploying to GreenGeeks (cPanel Hosting)

Artificial Quotient is optimized for deployment on **GreenGeeks Hosting** using **Setup Node.js App** (Phusion Passenger) and **MySQL Databases**.

### 1. Database Setup in GreenGeeks cPanel
1. Log into your **GreenGeeks cPanel**.
2. Open **Databases** → **MySQL® Database Wizard**.
3. Create a database (e.g., `cpaneluser_aq_dashboard`) and database user (e.g., `cpaneluser_aq_user`) with a strong password. Assign **ALL PRIVILEGES**.
4. *(Optional)* Open **phpMyAdmin**, select your database, and import `src/lib/schema.sql`. (The application will also auto-initialize schemas and seed missing data on first launch).

### 2. Configure "Setup Node.js App" in cPanel
1. In cPanel, navigate to **Software** → **Setup Node.js App**.
2. Click **CREATE APPLICATION**:
   - **Node.js version**: `20.x`
   - **Application mode**: `Production`
   - **Application root**: `artificial-quotient`
   - **Application URL**: Choose your primary domain or subdomain
   - **Application startup file**: `server.js`
3. Click **CREATE**.

### 3. Upload Code & Environment Configuration
1. Run local production build:
   ```bash
   npm run build
   ```
2. Create an archive of the project root directory (excluding `node_modules` and `.git`).
3. Upload and extract the archive into the `artificial-quotient` folder via cPanel **File Manager**.
4. Create `.env` in the `artificial-quotient` folder:
   ```env
   NODE_ENV=production
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=cpaneluser_aq_user
   MYSQL_PASSWORD=your_database_password
   MYSQL_DATABASE=cpaneluser_aq_dashboard
   ADMIN_MASTER_KEY=AQ-RESET-2026

   # Transactional Email (Brevo Multi-Key Failover Pool)
   BREVO_API_KEY=xkeysib-production-key1,xkeysib-production-key2
   CONTACT_RECEIVER_EMAIL=anirudha.basuthakur@gmail.com

   # Production SEO & Analytics
   NEXT_PUBLIC_SITE_URL=https://artificial-quotient.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_search_console_verification_code
   ```
5. Click **Run NPM Install** in cPanel Node.js App Manager.

### 4. Launch & Restart Application
1. Click **RESTART APPLICATION** in cPanel Setup Node.js App (or create/touch `tmp/restart.txt`).
2. Open your live website domain and verify operation.
3. Validate crawler endpoints in your browser:
   - Sitemap: `https://artificial-quotient.com/sitemap.xml`
   - Crawl Directives: `https://artificial-quotient.com/robots.txt`
   - Web App Manifest: `https://artificial-quotient.com/manifest.webmanifest`
4. Register `https://artificial-quotient.com` in **Google Search Console** and submit `sitemap.xml`.
