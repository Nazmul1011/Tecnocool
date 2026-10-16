# Workflow Rules — Tecnocool

## 1. Always analyze before coding
- Read `.cursor/project_context.md`, `.cursor/project_tasks.md` and `.cursor/frontend_rules.md` first.
- Look at the existing feature that is most similar (e.g. `features/products` for any filterable listing) and copy its patterns.
- Check `src/components/ui`, `globals.css` and `src/lib` for something reusable before writing new code.
- Confirm where data comes from (`src/lib/content.ts` or the service) and which types are involved (`src/types/content.ts`).
- If a requirement is unclear (brand names, contact details, real content), ask. Don't invent it.

## 2. Create an implementation plan for large features
A feature is "large" if it touches more than 3 files, adds a new route, changes shared types or components, or adds a dependency. For these, write a plan first:
- Goal and scope (in and out)
- Files to create and files to modify
- Stages, in model → service → hook → view → route order
- Risks (shared components, SEO, client/server boundary)
- How it will be tested

Wait for approval before starting.

## 3. Implement one stage at a time
- Finish one stage, check that it builds (`npm run build`) and renders (`npm run dev`), report back, then start the next.
- Don't mix unrelated changes into a stage (no drive-by refactors, renames or reformatting).

## 4. Do not modify unrelated files
- Only touch the files listed in the approved plan.
- Don't edit protected areas (see `project_context.md`, "Protected files and areas") unless the task requires it and this has been called out.
- Don't add dependencies, change config (`next.config.ts`, `tsconfig.json`, `package.json`) or move assets without approval.
- Never delete or rename anything in `public/images/`, `technocool image/` or the client PDF.

## 5. Show the files to modify before coding
Before writing code, list:
```
Create:  src/features/contact/contact.service.ts — why
Modify:  src/features/home/home.page.tsx — what changes
```

## 6. Show changed files and testing steps after coding
After each stage, report:
- **Changed files:** each path with a one-line summary of the change.
- **Checks run:** `npm run build` result (type check and build). Add `npm run lint` once ESLint is configured.
- **Manual test steps:** the exact routes, URL params and interactions to try. Examples: `/products?cat=Chillers`, filter, sort, compare; mobile width 375px; keyboard Escape on overlays.
- **Anything skipped or still open.**
