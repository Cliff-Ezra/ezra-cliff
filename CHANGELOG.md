# Ezra Cliff Portfolio — Changelog

Version format: `v0.MINOR.PATCH`
- MINOR → a new page, major feature, or significant redesign
- PATCH → bug fixes, copy changes, small component tweaks

---

## v0.7.1 — Bio Copy + Experience Timeline Refinement (6 July 2026)

**Branch:** `about` → PR #9 → `staging`

### Components
- `ExperienceTimeline` now renders each role's details as discipline-labelled
  bullet groups (label-less groups still render flat)

### Data
- Remodelled `experience.ts` details as grouped `DetailGroup[]` and repopulated
  the content from the role-specific CVs
- Discipline labels per role: Health-E-Net → Frontend · Backend · Data & BI ·
  AI/ML; USAID → Frontend · Backend; Veritas → Frontend · Backend · DevOps / CI

### Content
- Rewrote the home-page and About bios to convey end-to-end breadth — in-browser
  ML, offline-first apps, distributed Go/Laravel backends, and data pipelines
- Swapped the CV for the full-stack résumé and updated `site.cv`

---

## v0.7.0 — Homepage Redesign + Mobile Navigation (29 June 2026)

**Branch:** `homepage` → PR #8 → `staging`

### Pages
- Redesigned homepage with dynamic Latest Projects and Latest Writing sections
- Updated website footer with improved layout and links

### Components
- Added `MobileDrawer` component for mobile navigation overlay
- Added `RevealItem` and `Stagger` animation primitives for entrance effects
- Replaced static `MobileNav` with the new `MobileDrawer` component in `PageShell`
- Removed legacy `Explorer` and `BashPrompt` components

---

## v0.6.0 — Writing / Blog System (27–28 June 2026)

**Branch:** `writing` → PR #6 + PR #7 ****→ `staging`

### Pages
- Added `/writing` index page listing all blog posts
- Added `/writing/[slug]` dynamic route for individual articles

### Components
- Added `ArticleView` — long-form article layout with prose styling
- Added `CoverImage` — hero image component for post pages
- Added `FeaturedPost` — highlighted post card for the writing index
- Added `PostCard` — standard post listing card
- Added `TableOfContents` — auto-generated TOC from article headings
- Added `WritingIndex` — writing section index layout
- Added `WritingShell` — shared layout shell for writing routes
- Added `mdx-components` — custom MDX component overrides (headings, code, links)

### Content
- Added sample articles to seed the writing section
- Added cover images for the writing section
- Added prose styles for long-form article typography

### Fixes
- Fixed background colors on code blocks to include CSS fallback values

---

## v0.5.0 — Contact Page + 404 (19 June 2026)

**Branch:** `contact_and_others` → PR #5 → `staging`

### Pages
- Added `/contact` page with contact form and contact details
- Added global 404 page (`not-found.tsx`)

### API
- Added `POST /api/contact` route using Resend for email delivery
- Added email builder utility for formatting outbound contact messages

### Infrastructure
- Added Resend API key to environment configuration
- Updated package dependencies for Resend SDK

### Fixes
- Fixed CV download button to use dynamic `SITE_URL` environment variable instead of hardcoded URL

---

## v0.4.0 — About + CV Page (19 June 2026)

**Branch:** `about` → PR #4 → `staging`

### Pages
- Added `/about` page with profile section, experience timeline, and skills grid
- CV page now serves the resume PDF for download

### Components
- Added `PageShell` — shared layout wrapper for all content routes (About, Contact, CV, etc.)

### Content
- Added experience data (roles, companies, dates, descriptions)
- Added skills data (grouped by category)
- Added profile image to public assets
- Added resume PDF to `/public/documents`
- Updated LinkedIn URL and contact details in site config

### Infrastructure
- Added `react-icons` for language and stack icon support
- Re-organised `/public` directory structure
- Removed unused SVG files

---

## v0.3.0 — /work Projects Page (18–19 June 2026)

**Branch:** `work` → PR #3 → `staging`

### Pages
- Added `/work` index page listing all projects with filter bar
- Added `/work/[slug]` route scaffold for individual project detail pages

### Components
- Added `WorkIndex` — project grid with category filter chips and project count
- Added `WorkShell` — layout shell for the /work section
- Added `ProjectCard` — project card with cover gradient, tech tags, and GitHub/live links
- Added `ProjectDetail` + `ProjectRoute` — detail page layout (sticky rail + scrollable story)
- Added `ScrollReveal` — intersection-observer-based scroll animation component
- Added `coverGradient` utility — generates placeholder cover gradients per project

### Data
- Added `projects.ts` data structure (slug, name, summary, category, tech stack, repo, liveUrl, caseStudy flag)
- Added GitHub link helpers for constructing repo and profile URLs

### Components (shared)
- Added `GithubMark` and `LinkedinMark` brand icon components
- Enhanced `TopNav` with active link highlighting based on current pathname

---

## v0.2.0 — Design System + Homepage (16–17 June 2026)

**Branch:** `homepage` → PR #1 + PR #2 → `staging`

### Pages
- Built homepage with VS Code-inspired IDE shell layout
- Added hero section with staggered text reveal animation
- Added featured projects cards section (3 cards with hover states)
- Added skills ticker (horizontal marquee)
- Added contact teaser section and footer

### Components
- Added `BashPrompt` — terminal-style status bar element
- Added `ContactLinks` — icon links for GitHub, LinkedIn, and Email in the status bar
- Added `Reveal` — scroll-triggered entrance animation wrapper
- Added `ThemeToggle` — light/dark mode switch

### Infrastructure
- Initialized project with Next.js + Tailwind CSS + TypeScript
- Applied Astro-inspired theme: design tokens, Inter + JetBrains Mono fonts, color system, light/dark
- Added `Button`, `Tag`, `Badge`, `Icon` (Lucide) primitive components
- Wired Vercel Analytics into root layout
- Added production favicon
- Added `suppressHydrationWarning` to body to prevent SSR mismatch

### Fixes
- Fixed `ThemeToggle` border handling and positioning
- Fixed metadata for portfolio title and description

---

## v0.1.0 — Initial Experiments (3–4 May 2026)

**Branch:** `main` (pre-redesign)

### Pages
- Monkey landing page (initial placeholder homepage)
- Ghost hero concept with animated background

### Components
- `GhostHero` — animated ghost background component (interactive on desktop)
- Animated ghost favicon (frame-cycling SVG)

### Infrastructure
- Initial project scaffold from Create Next App
- Vercel Analytics integrated
- `.gitignore` updated for spellchecker config (`cspell.json`)
