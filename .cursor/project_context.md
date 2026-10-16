# Project Context — Tecnocool

## Project name
- Repo / README: **Tecnocool**
- `package.json` name: `company-hvac`
- On-screen brand: **"Company HVAC"** (placeholder). The real client is very likely **Techno Cool Associates** (see `Techno Cool Associates 1 (1).pdf` in the repo root).

## Project purpose
A marketing / corporate website for an HVAC contractor that does design consultancy, supply, installation and maintenance of air conditioning, ventilation and climate-control systems. It is an authorised partner/dealer for Daikin, LG, Trane, Kruger and DP. The site shows the company profile, product catalogue, reference projects, news/awards/events, live project progress, and a "request a quote" call to action.

Right now it is a **front-end-only prototype**. All content is hard-coded mock data, and most images are grey placeholder boxes.

## Tech stack
| Area | Choice |
|---|---|
| Framework | Next.js 15 (App Router), `reactStrictMode: true` |
| UI | React 19, TypeScript 5.8 (`strict: true`) |
| Styling | Plain CSS: global design tokens (`src/styles/variables.css`), global utility/design-system classes (`src/styles/globals.css`), CSS Modules per feature |
| Fonts | `next/font/google`: IBM Plex Sans (300/400/600) + IBM Plex Mono (400) |
| Visual language | IBM Carbon-inspired (Carbon colour tokens, square buttons, mono eyebrows) |
| Path alias | `@/*` → `./src/*` |
| Data | Static TS modules (`src/lib/content.ts` + per-feature `*.service.ts`) |
| HTTP client | `src/lib/api.ts` (`api<T>()` + `ApiError`). It exists but nothing uses it yet |
| Linting / tests | **None configured** (no ESLint, Prettier, Jest/Vitest or Playwright) |

## Folder structure
```
.
├── src/
│   ├── app/                     # Routing only: each page.tsx sets metadata and re-exports a feature page
│   │   ├── layout.tsx           # Root layout: fonts, global CSS, <SiteShell>
│   │   ├── page.tsx             # /            → features/home/home.page
│   │   ├── about/page.tsx       # /about       → features/about/about.page
│   │   ├── products/page.tsx    # /products    → features/products/products.page
│   │   ├── projects/page.tsx    # /projects    → features/projects/projects.page
│   │   ├── news/page.tsx        # /news        → features/news/news.page
│   │   ├── news/[id]/page.tsx   # /news/:id    → features/news/news-detail.page
│   │   ├── privacy/page.tsx     # /privacy     → features/legal/privacy.page
│   │   └── terms/page.tsx       # /terms       → features/legal/terms.page
│   ├── components/
│   │   ├── layout/              # SiteShell, SiteHeader (mega menu, search, mobile drawer), SiteFooter, navigation.ts
│   │   ├── ui/                  # Button, Placeholder, Tag (shared primitives)
│   │   └── icons/               # SearchIcon
│   ├── features/<feature>/      # One folder per feature (home, about, products, projects, news, legal)
│   │   ├── <feature>.service.ts # Data access (model/service layer), currently returns static data
│   │   ├── use<Feature>.ts      # Client hook (controller): state, filtering, URL params
│   │   ├── <feature>.page.tsx   # View: the page component
│   │   ├── <feature>.module.css # Feature-scoped styles
│   │   ├── components/          # Feature-only sub-components (home, legal)
│   │   ├── types.ts             # Feature-local types (legal)
│   │   └── index.ts             # Public exports of the feature
│   ├── lib/
│   │   ├── content.ts           # Central mock dataset: products, projects, articles, clients, enums
│   │   ├── api.ts               # Single HTTP client (for a future CMS/API)
│   │   └── cx.ts                # className helper: CSS-module class if one exists, otherwise the global class
│   ├── styles/
│   │   ├── variables.css        # Design tokens (colours, fonts, --pad, --header-h)
│   │   └── globals.css          # Reset + global design-system classes (.btn, .tag, .section, .grid, .img-ph…)
│   └── types/content.ts         # Shared domain types: Product, Project, Article, ArticleBlock, NewsTab
├── public/images/               # Real assets (~55 MB, 32 PNGs): products/chillers, products/units, brochures, dealers, certificates, site-workers. NOT referenced by any code yet
├── technocool image/            # Raw source images (duplicates of public/images with original names). Not used by code
├── Techno Cool Associates 1 (1).pdf  # Client company profile/brochure (source content)
├── next.config.ts, tsconfig.json, next-env.d.ts
└── .next/                       # Build output (git-ignored)
```

## Startup flow
1. `npm install` then `npm run dev` (dev), or `npm run build && npm start` (prod).
2. `src/app/layout.tsx` loads the fonts, imports `variables.css` and `globals.css`, and wraps every route in `<SiteShell>` (Header + `<main>` + Footer).
3. Each `src/app/**/page.tsx` exports `metadata` and re-exports the default page from `src/features/...`.
4. Feature pages are `"use client"`. They call their `use<Feature>()` hook, which calls `<feature>.service.ts`, which reads from `src/lib/content.ts` (or inline data).
5. Pages that read `useSearchParams()` (products, projects, news) wrap their screen in `<Suspense fallback={null}>`.

## Main modules / features
| Feature | Route | What it does |
|---|---|---|
| Layout | all | Sticky header with topbar, desktop mega-menus (data in `navigation.ts`), search panel (sends you to `/products?q=`), mobile drawer, "Get a quote" button → `/#quote`; footer |
| Home | `/` | Hero carousel (5 brand slides), about intro, brand marquee, stats band, product categories, reference projects, client marquee, news preview, **Live sites** progress tracker (`#live`), awards & events tabs, quote CTA (`#quote`, a `mailto:` link) |
| About | `/about` | Stats, mission/values, history timeline (interactive milestone), leadership, partners and certifications |
| Products | `/products` | Category tiles, brand/application filters, search, sort by capacity/name, compare (max 3). URL params `cat`, `q` |
| Projects | `/projects` | Sector filter, search, grid/list toggle, "load more", client feedback. URL param `sector` |
| News | `/news`, `/news/[id]` | Tabs (All/News/Awards/Events, URL `tab`), search, pagination (6 per page), featured article, newsletter form (fake). Detail page: reading progress bar, block renderer (p/h2/quote/facts/figures), share, prev/next, related |
| Legal | `/privacy`, `/terms` | Shared `LegalDocument` component driven by `LegalDocumentModel` |

## Database / ORM
**None.** All data is static TypeScript in `src/lib/content.ts` and in the service files. No database, ORM, CMS or env variables.

## API structure
**None implemented.** There are no `app/api/*` route handlers, server actions or external calls. `src/lib/api.ts` is the planned single HTTP client: a future CMS/API should be called **only** from `*.service.ts` files through `api()`.

## Auth flow
**None.** No login, sessions or protected routes. Not needed for a public marketing site unless an admin/CMS is added later.

## Deployment notes
- Standard Next.js app. Vercel (zero-config) or `next build && next start` on Node 18.18+ both work.
- No `output: "export"` is set. Every page is a client component reading static data, so static export would be possible if `/news/[id]` got `generateStaticParams`.
- No environment variables are needed today.
- `public/images` is ~55 MB of uncompressed PNGs. Optimise them (WebP/AVIF, `next/image`) before production.
- There is no `robots.txt`, `sitemap`, `not-found.tsx`, favicon/OG images, or analytics.

## Protected files and areas
Do **not** change these unless the task explicitly asks for it:
- `src/styles/variables.css`: design tokens. Add new tokens, but don't rename or remove existing ones.
- `src/styles/globals.css`: global design-system classes that every feature uses.
- `src/lib/cx.ts`, `src/lib/api.ts`: core helpers. Their contracts must stay stable.
- `src/types/content.ts`: shared domain types. Changes ripple across services, hooks and views.
- `src/lib/content.ts`: the source data. Edit content only when asked, and keep the shapes the same.
- `src/components/layout/*`: the header, footer and shell are on every page.
- `src/app/layout.tsx`: fonts, global CSS order, metadata template.
- `src/app/**/page.tsx`: keep these as thin re-exports plus metadata.
- `next.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`: config and dependencies. Change them only with approval.
- `public/images/**`, `technocool image/**`, `Techno Cool Associates 1 (1).pdf`: client assets. Never delete, rename or overwrite them.
