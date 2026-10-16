# Frontend Rules — Tecnocool

## Existing frontend architecture
- **Next.js 15 App Router, React 19, TypeScript (strict).**
- `src/app/**/page.tsx` handles **routing only**. Each file exports `metadata` and re-exports the default page from a feature:
  ```ts
  export const metadata: Metadata = { title: "Products" };
  export { default } from "@/features/products/products.page";
  ```
- **Feature-first folders** in `src/features/<feature>/`:
  - `<feature>.service.ts`: data access (service/model)
  - `use<Feature>.ts`: client hook (controller): state, derived lists, URL params
  - `<feature>.page.tsx`: view (default export)
  - `<feature>.module.css`: scoped styles
  - `components/`: sub-components used only by this feature
  - `types.ts`: types used only by this feature
  - `index.ts`: public exports
- **Shared code:** `src/components/{layout,ui,icons}`, `src/lib`, `src/types/content.ts`, `src/styles`.
- Root layout wraps everything in `SiteShell` (Header + main + Footer).

## Shared component reuse rule
- Always check `src/components/ui` (`Button`, `Placeholder`, `Tag`), `src/components/icons`, and the global classes in `globals.css` (`.btn`, `.tag`, `.section`, `.section-head`, `.grid-auto-*`, `.breadcrumb`, `.page-hero`, `.eyebrow`, `.h-display`, `.h-section`, `.lead`, `.news-card`, `.img-ph`…) **before** creating anything new.
- Use `Button` for every CTA, and give it `href` for links. Don't hand-roll `<a class="btn">`, except where existing code already does.
- Use `Tag` for type/status labels. Add new tones to `TAG_CLASS` and `.tag.<tone>` instead of styling tags inline.
- If a UI piece is needed by **two or more features**, move it to `src/components/ui`. If only one feature uses it, keep it in `features/<feature>/components`.
- Create new icons as small components in `src/components/icons`, following the `SearchIcon` pattern (`size`, `fill`, `aria-hidden`).
- When real images are added, build **one** shared image component (based on `next/image`, falling back to `Placeholder`) and reuse it everywhere. Don't scatter raw `<img>` tags.

## Model / controller / service / view order
When building or changing a feature, work in this order:
1. **Model / types:** shared shapes in `src/types/content.ts`, feature-only shapes in `features/<f>/types.ts`. Data lives in `src/lib/content.ts` (shared) or the service (feature-only).
2. **Service:** `<feature>.service.ts`. Pure functions (`listX`, `getX`, formatters, matchers). No React. Today it reads static data; later it calls `api()` from `src/lib/api.ts`.
3. **Controller (hook):** `use<Feature>.ts` with `"use client"`. Holds state, derived/filtered lists, URL param syncing (`useSearchParams`), and pagination. Returns one object.
4. **View:** `<feature>.page.tsx` plus `components/`. Rendering only: it reads from the hook and does not import `content.ts` directly.
5. **Route:** a thin `src/app/<route>/page.tsx` with `metadata` and a re-export.
6. **Export:** add the public functions to `features/<f>/index.ts`.

## UI design rules
- **Carbon-inspired look.** Square corners, IBM Plex Sans and Plex Mono, light (300) headings, mono `.eyebrow` labels, blue `--blue-60` as the only accent, grey surfaces (`--gray-10` sections, `--gray-90/100` dark bands).
- **Use only the tokens in `variables.css`** (`var(--blue-60)`, `var(--gray-70)`, `var(--pad)`…). Don't add new hard-coded hex colours. If a new colour is truly needed, add a token.
- **Styling:** feature styles go in the feature's CSS Module. Use `cx(styles, ...)` to combine module and global classes. Keep inline `style={{}}` to one-off layout tweaks, and don't add new ones for colours.
- **Spacing:** sections use `.section` (`112px var(--pad)`). Horizontal padding always uses `var(--pad)` (32px, or 16px on mobile).
- **Breakpoints in use:** 960px (header switches to mobile, `--header-h` 64px) and 672px (`--pad` 16px). Every new UI must work at 375px wide with no horizontal scroll.
- **Section heading pattern:** `.section-head` → `.eyebrow` ("NN — Label") + `h2.h-section` + an optional `.link-quiet` "View all →".
- **CTA pattern:** text + `→` inside `Button`, with two `<span>` children.
- **Accessibility:** `aria-label` on icon-only buttons, `aria-expanded` on toggles, `aria-hidden` and `tabIndex={-1}` on duplicated marquee items, Escape closes overlays. Keep all of these.
- Use the `&apos;` / `&ldquo;` entity style the existing code uses in JSX text.

## State management rules
- **Local React state only** (`useState`, `useMemo`, `useEffect`). There is no global store; don't add Redux, Zustand or Context unless it's planned and approved.
- State lives in the feature's `use<Feature>` hook, not spread across view components. Small UI-only toggles (e.g. `copied`, `subscribed`) can stay in the view.
- **The URL is the source of truth for shareable filters.** Read `cat`, `q`, `sector` and `tab` with `useSearchParams` and re-sync them in a `useEffect` when the param changes. Any page using `useSearchParams` must be wrapped in `<Suspense>`.
- When a filter or search changes, reset pagination / "load more" (`setPage(1)`, `setShown(9)`), as the existing hooks do.
- Compute derived lists during render. Don't copy them into extra state.

## API service rules
- **`src/lib/api.ts` is the only HTTP client.** Don't call `fetch` or Axios in pages, hooks or components.
- Only `*.service.ts` files may call `api()`. Hooks call services, and views call hooks.
- Services return typed domain objects from `src/types/content.ts`. Map raw API/CMS responses to these types inside the service.
- Handle `ApiError` in the hook (loading and error state) and show an error state in the view. Don't swallow errors silently.
- Put any base URL or keys in `NEXT_PUBLIC_*` (client) or server-only env vars, and never hard-code them. Document every new env var in `project_context.md`.
- Keep service function signatures stable (`listProducts()`, `getArticle(id)`…) so that moving from static data to an API doesn't change the views.

## Protected frontend areas
Don't change these without explicit approval:
- `src/styles/variables.css`, `src/styles/globals.css` (design system)
- `src/components/layout/*` (header, footer, shell, `navigation.ts`)
- `src/components/ui/*` (add variants instead of changing existing behaviour)
- `src/lib/cx.ts`, `src/lib/api.ts`
- `src/types/content.ts` (adding optional fields is OK; renaming or removing is not)
- `src/app/layout.tsx` (fonts, global CSS import order, title template)
- `public/images/**`, `technocool image/**` (client assets: don't rename, move or delete)
