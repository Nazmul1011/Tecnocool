# Project Tasks — Tecnocool

## What seems completed
- App Router routing for all 8 pages: `/`, `/about`, `/products`, `/projects`, `/news`, `/news/[id]`, `/privacy`, `/terms`.
- Feature-based architecture (service → hook → page → module CSS) used the same way across every feature.
- Global design system: tokens, buttons, tags, sections, grids, breadcrumbs, image placeholders.
- Site header: mega menus, search panel, mobile drawer, Escape to close, scroll lock, closes on route change.
- Footer with legal links.
- Home page sections: hero carousel, brand marquee, stats, categories, references, clients, news preview, live sites, awards/events, quote CTA.
- Products catalogue: category, brand and application filters, search, sort, compare (max 3), URL params `cat` and `q`.
- Projects listing: sector filter, search, grid/list view, load more, URL param `sector`.
- News listing and detail: tabs, search, pagination, featured article, block renderer, reading progress, prev/next, related articles.
- Legal pages (privacy, terms) built from a shared component.
- Per-page `<title>` metadata through the root title template.
- Real image assets added to `public/images` (latest commit).

## What seems incomplete
- **Branding:** the site still says "Company HVAC", `info@company.com`, `+00 000 000 0000` and "Name Surname". It needs the real Techno Cool Associates name, logo, contacts, leadership and history (source: the PDF).
- **Images:** every visual is a `<Placeholder>`. None of the 32 images in `public/images` are used, and `next/image` is not used anywhere.
- **Product data doesn't match the assets.** `content.ts` lists 16 generic products. The image set shows specific chillers (absorption, magnetic-bearing, screw, scroll…) and indoor units (cassette, duct, wall, floor…).
- **Quote / contact:** "Request a quote" is only a `mailto:`. There is no quote form, contact page or form backend.
- **Newsletter:** the submit only sets local state. Nothing is sent anywhere.
- **Share buttons:** the LinkedIn, Facebook and X links point to `#share` with no real share URLs.
- **EN / AR toggle** in the topbar is plain text. There is no i18n or RTL support.
- **Global search** only searches products. It ignores projects and news, even though the placeholder text promises them.
- **Menu links with no destination:** "Careers" and "Press & media" go to generic pages, and the "Company profile" download has no file.
- **SEO:** `/news/[id]` has a static "News" title. There is no `generateMetadata`, `generateStaticParams`, sitemap, robots, OG images or favicon.
- **No `not-found.tsx`.** A missing article shows an inline message with a 200 status.
- **No CMS/API.** `lib/api.ts` is unused.
- **No lint, format or test tooling.**

## What should be built next
1. **Rebrand to Techno Cool Associates:** name, logo mark, contacts, metadata, footer and topbar, using the PDF as the source.
2. **Wire up the real images:** a shared image component on top of `next/image` (or extend `Placeholder` with an optional `src`). Use it for product, dealer/partner, certificate, site-worker and brochure images.
3. **Align the product catalogue with the real range:** update `content.ts` products and categories, and add an `image` field to the `Product` type.
4. **Quote / contact form:** a real form (name, company, email, phone, project type, message) with validation, sent to an email service or route handler.
5. **SEO basics:** `generateMetadata` and `generateStaticParams` for news, `not-found.tsx`, `sitemap.ts`, `robots.ts`, favicon/OG.
6. Make the newsletter and share buttons work, and decide whether search covers all content.
7. Optimise the images (compress / convert to WebP). Decide whether `technocool image/` should stay in git.
8. Add ESLint (`next lint`) and Prettier. Later, add smoke tests (Playwright) for the main routes.
9. Later: a headless CMS behind the `*.service.ts` files through `lib/api.ts`, and i18n/RTL if Arabic is required.

## Bugs / risk areas
- **Client-only rendering everywhere.** Every feature page is `"use client"`, so content is rendered with client JS. The data is static, so SSR/SSG with server components would help SEO and performance. Changing this is a larger refactor; plan it before touching it.
- **`/news/[id]` uses `useParams`.** There is no 404 status and no per-article metadata.
- **Duplicated data.** Product category → brand mapping exists in both `navigation.ts` (`productCategories`) and `home.service.ts` (`categoryBrands`). Sectors exist in both `navigation.ts` and `content.ts`. These can drift apart.
- **Hard-coded colours** like `#525252` and `#0f62fe` appear in inline styles in some views (e.g. `news-detail.page.tsx`, `news.page.tsx`) instead of tokens.
- **`neighbours()` naming in `news.service.ts`.** "previous" is the *older* article (index + 1). Check this matches the UI wording.
- **Brand name mismatch.** The site uses "DP", but the asset is `dealers/db-usa.png` ("DB USA"). Confirm the correct brand with the client.
- **Repo bloat.** About 55 MB of PNGs are duplicated between `public/images` and `technocool image/`, and there is a 5.6 MB PDF in the repo root.
- **`new Date().getFullYear()` in the footer** could cause a hydration mismatch around New Year. Low risk.
- **AI-generated images** (`ChatGPT Image …`) are used for products and site workers. Check that the client is happy using them publicly.
- **No tests and no lint.** Regressions will only be caught by hand.

## Priority order
| # | Task | Why |
|---|---|---|
| P0 | Rebrand (name, contacts, metadata) | The site can't be shown to the client with placeholder identity |
| P0 | Shared image component and real images | The biggest visual gap; the assets already exist |
| P1 | Product data aligned with real range and images | The catalogue is the core content |
| P1 | Working quote/contact form | The main conversion path |
| P1 | SEO basics (news metadata, 404, sitemap, robots) | Needed for launch |
| P2 | Newsletter, share links, global search scope | Polish |
| P2 | Image optimisation and repo cleanup | Performance and repo size |
| P2 | ESLint/Prettier, smoke tests | Quality |
| P3 | Server components / SSG refactor | Performance and SEO, larger change |
| P3 | CMS integration, i18n/RTL | Future scope |
