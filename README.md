# Artificial Quotient — AI Automation Sponsorship Hub

Artificial Quotient is a high-converting, modern web application and sponsorship platform designed for AI automation tools, software products, and SaaS brands looking to partner with the **Artificial Quotient** YouTube channel and community.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14.2.18 (App Router)
- **Language**: TypeScript & React 18.3
- **Styling**: TailwindCSS 3.4 & Vanilla CSS Design System
- **Icons**: Lucide React & Custom SVG Logos
- **Theming**: `next-themes` (Dark & Light Mode Support)
- **Authentication**: HTTP-Only Cookie Session (`admin_session`)

---

## 🌟 Key Features Implemented

### 1. Clean App Subpage Routing (No Hash Anchor URLs)
- Replaced legacy `/#` hash URLs with dedicated, SEO-optimized App Router subpages:
  - `/sponsor` — Rates & 5-Step Campaign Workflow
  - `/stats` — Demographic & Geographic Audience Snapshot
  - `/case-studies` — What Performs & Historical Sponsor Results
  - `/tools` — Tool Vault Directory
  - `/blog` — Automation Guides & Articles
  - `/admin` — Protected Admin Management Portal

### 2. Global Background Aesthetics & Ambient Glows
- **Radial Dot Matrix Texture**: Applied a custom `radial-gradient` dot pattern on the `body` in `src/app/globals.css` that naturally illuminates both light and dark themes.
- **Ambient Glow Orbs**: Fixed blur gradient orbs (`bg-brand-blue` & `bg-purple-500`) positioned in `src/app/layout.tsx` to provide visual depth.
- **Transparent Container Layers**: Removed solid background block overlays from component sections so the global matrix texture flows smoothly across the page.

### 3. Protected Admin Portal & Cookie Auth Flow
- **Server Component Cookie Verification**: `src/app/admin/page.tsx` checks for an HTTP-only `admin_session` cookie server-side and redirects unauthenticated users to `/admin/login`.
- **Conditional Navbar Admin Link**: The navbar reads the auth state in `layout.tsx` and dynamically renders the **Admin Portal** link *only* when an active session is detected.
- **API Authentication Routes**: `/api/auth/login` and `/api/auth/logout` handlers handle cookie setting and expiration.

### 4. Interactive Sponsorship Cards & Micro-Animations
- **Equalized Rate Cards**: Standardized baseline heights and hover lifts (`hover:-translate-y-2 hover:shadow-xl`) across `Integration` and `Dedicated Video` tiers.
- **Direct Mailto Booking Links**: Interactive booking buttons configured with pre-filled `mailto:sponsor@artificialquotient.com?subject=...` parameters.
- **Micro-Animations**: Step badges and workflow icons (`src/components/campaign-workflow.tsx`) feature smooth hover rotations, scaling, and color shifts.
- **Adaptive Light/Dark Cards**: Color-corrected components (e.g. `AudienceSnapshot`'s "High Buyer Intent" card) so text, pills, and backgrounds adapt dynamically across themes.

### 5. Redesigned Glassmorphic Footer
- **4-Column Modern Layout**: Organizes links into *Sponsorship*, *Content Hub*, and *Direct Contact*.
- **Authentic YouTube Branding**: Embedded official SVG YouTube logo button alongside a live **10.1k Subscribers** badge.
- **Status Indicator**: Features a live `Q3 Sponsorships Available` green status pulse.

---

## 📂 Project Structure

```
artificial-quotient/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/         # Protected Admin Login Form
│   │   │   ├── DashboardClient.tsx
│   │   │   └── page.tsx       # Server Auth Check & Dashboard
│   │   ├── api/
│   │   │   └── auth/          # Login & Logout Cookie Handlers
│   │   ├── sponsor/           # Sponsorship Subpage
│   │   ├── stats/             # Audience Stats Subpage
│   │   ├── case-studies/      # Case Studies Subpage
│   │   ├── tools/             # Tool Vault
│   │   ├── blog/              # Blog & Articles
│   │   ├── globals.css        # Global CSS & Dot Matrix Utilities
│   │   ├── layout.tsx         # Root Layout, ThemeProvider & Ambient Glows
│   │   └── page.tsx           # Home Landing Page
│   └── components/
│       ├── audience-snapshot.tsx
│       ├── campaign-workflow.tsx
│       ├── footer.tsx         # Modern 4-Column Glassmorphic Footer
│       ├── hero.tsx
│       ├── navbar.tsx         # Sticky Header with Conditional Admin Link
│       ├── rate-card.tsx
│       ├── sponsor-results.tsx
│       ├── theme-provider.tsx
│       └── what-performs.tsx
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
