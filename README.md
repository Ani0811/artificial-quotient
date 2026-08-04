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
- Redesigned `/admin/login` with theme adaptation, panda branding (`🐼`), password visibility toggle, and glassmorphism styling.
- **Password Recovery**: Added a "Forgot Password?" flow with master recovery key validation (`AQ-RESET-2026` or admin email) via `/api/auth/reset-password`.
- Default admin password set to `admin123` with dynamic state management (`src/lib/auth-store.ts`).

#### 5. Full Theme Color Correction for Admin Dashboard
- Updated `src/app/admin/DashboardClient.tsx` so all header cards, sidebar tabs, form inputs, and buttons adapt dynamically between light and dark modes (`bg-white/80 dark:bg-zinc-900/80`).

#### 6. Lazy Loading, Skeletons & Performance
- **Global Loader**: Created `src/app/loading.tsx` featuring an animated spinning panda logo (`🐼`).
- **Custom Skeletons**: Built skeleton components (`src/components/skeletons.tsx`) for homepage sections.
- **Staggered Lazy Loading**: Dynamically imported homepage sections in `src/app/page.tsx` with staggered delays and `ssr: false` to demonstrate fluid skeleton loading on refresh (F5).

#### 7. Inline Media Integration
- Created `/api/admin/upload` API handler supporting file uploads to `/public/uploads/`.
- Integrated inline file upload buttons and live image previews directly inside form fields for AI Tool Vault (Tool Logo), Script-to-Blog Hub (Article Cover), and Channel Banner.

---

## 📂 Project Structure

```
artificial-quotient/
├── public/
│   └── uploads/               # Uploaded Media Storage
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/         # Admin Login & Password Reset Page
│   │   │   ├── DashboardClient.tsx # Theme-Corrected Admin Dashboard
│   │   │   └── page.tsx       # Server Auth Check
│   │   ├── api/
│   │   │   ├── admin/upload/  # Media File Upload, List & Delete API
│   │   │   └── auth/          # Login, Logout & Reset Password APIs
│   │   ├── sponsor/           # Sponsorship Subpage
│   │   ├── stats/             # Audience Stats Subpage
│   │   ├── case-studies/      # Case Studies Subpage
│   │   ├── tools/             # Tool Vault
│   │   ├── blog/              # Blog & Articles
│   │   ├── globals.css        # Global CSS & Dot Matrix Utilities
│   │   ├── layout.tsx         # Root Layout, Async Cookies & Ambient Glows
│   │   ├── loading.tsx        # Global Loading Screen & Animated Logo
│   │   └── page.tsx           # Home Landing Page with Lazy Loading
│   ├── components/
│   │   ├── audience-snapshot.tsx # Interactive Cards with SVG Flags
│   │   ├── campaign-workflow.tsx
│   │   ├── footer.tsx         # Modern 4-Column Glassmorphic Footer
│   │   ├── hero.tsx
│   │   ├── navbar.tsx         # Dynamic Lock Gateway Header
│   │   ├── rate-card.tsx
│   │   ├── skeletons.tsx      # Skeleton Loaders for Homepage Sections
│   │   ├── sponsor-results.tsx # Animated Sponsor Metric Cards
│   │   └── theme-provider.tsx
│   └── lib/
│       └── auth-store.ts      # Admin Password State Manager
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
