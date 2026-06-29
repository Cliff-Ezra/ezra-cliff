# ezra.cliff() — portfolio

The personal site & portfolio of **Ezra Cliff Esau**, a full-stack engineer based in Nairobi. Designed to reads like a dev workspace (IDE/terminal-flavoured interface) built on a custom design system based off of [**Expo:**](https://expo.dev/solutions/enterprise), with a README-style home page, a filterable work showcase, and an MDX-powered blog.

🔗 **Live:** [ezra-cliff.vercel.app](https://ezra-cliff.vercel.app)

---

## Highlights

- **IDE / terminal aesthetic** — README-as-home, a status-bar footer, terminal touches
- **Work showcase** — Project grid/showcase plus per-project case-study pages, sourced from a single data file.
- **MDX blog** — Long-form posts with syntax highlighting (Shiki), reading-time estimates, auto-generated heading slugs, and a table of contents.
- **Two-mode deploy** — production shows publicly available pages while a staging branch serves the items under development before being made publicly available, toggled by one env var (see [Deployment](#deployment)).

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + a custom design system (`app/styles/`) |
| Fonts | Inter + JetBrains Mono via `next/font` |
| Motion | [Motion](https://motion.dev) |
| Icons | lucide-react |
| Content | MDX (`next-mdx-remote`, `gray-matter`, `remark-gfm`, `rehype-slug`, `rehype-pretty-code` / `shiki`) |
| Email | [Resend](https://resend.com) |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## Project structure

```text
app/
├── page.tsx                 # mode switch: portfolio (staging) vs coming-soon/public pages
├── layout.tsx               # fonts, metadata, no-flash theme script
├── globals.css              # Tailwind + design-system tokens
├── styles/                  # design tokens (colors, type, spacing, shape…)
├── lib/                     # data + helpers (projects, writing, site, cover…)
├── components/
│   ├── ui/                  # design-system primitives (Button, Tag, Icon, motion…)
│   ├── home/                # home page (Readme, TopNav, StatusBar, MobileNav…)
│   ├── work/                # project grid + case-study pages
│   ├── writing/             # MDX blog index + article view
│   ├── about/ · contact/    # inner pages
│   └── layout/PageShell.tsx # shared chrome for inner routes
├── work/ · writing/ · about/ · contact/   # routes
└── api/contact/route.ts     # contact form handler (Resend)
content/
└── writing/*.mdx            # blog posts
```

## Getting started

```bash
git clone https://github.com/Cliff-Ezra/ezra-cliff.git
cd ezra-cliff
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To see the full site locally (without restrictions set to see just the publicly available pages/coming soon page), set `NEXT_PUBLIC_SITE_MODE=staging` in `.env.local`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_MODE` | – | `staging` renders the portfolio; anything else (or unset) renders the coming-soon page |
| `RESEND_API_KEY_EZ_PORTFOLIO` | for contact form | Resend API key (server-only) |

## Content

No CMS — content lives in code:

- **Projects** — edit `app/lib/projects.ts`. The work-page filter chips and counts are derived from this array; add or reorder an entry and everything updates.
- **Writing** — drop a new `content/writing/<slug>.mdx` file with frontmatter (`title`, `summary`, `date`, `category`, `tags`, optional `featured` / `cover` / `draft`). Reading time, slugs, and the table of contents are generated automatically.

## Deployment

Hosted on Vercel with a two-branch setup:

- **`main` → production** — `NEXT_PUBLIC_SITE_MODE` unset, so visitors see the coming-soon page/publicly available pages.
- **`staging` → preview** — `NEXT_PUBLIC_SITE_MODE=staging`, serving the full portfolio.

The same codebase renders both; promoting the site is just a matter of flipping the env var on production.

## Credits

- Visual language adapted from the **Astro** developer-platform design system (original tokens & components in `app/styles/` + `app/components/ui/`).
- Type: [Inter](https://rsms.me/inter/) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/). Icons: [Lucide](https://lucide.dev).

---

© Ezra Cliff Esau · [github.com/Cliff-Ezra](https://github.com/Cliff-Ezra) · [LinkedIn](https://www.linkedin.com/in/cliff-ezra-0a3609215/)
