# Personal Homepage

Local academic homepage scaffold for Sikun Guo.

## Stack

- Astro
- Tailwind CSS v4
- Data-driven content via `src/data/*.ts`

## Pages

- `/` Home
- `/research`
- `/publications`
- `/projects`
- `/cv`

## Run locally

```bash
cd /Users/sikunmacmini/.openclaw/workspace/personal-homepage
npm install
npm run dev
```

Then open the local Astro URL shown in the terminal, usually `http://localhost:4321`.

## Build

```bash
npm run build
```

## Where to edit content

- Site/profile metadata: `src/data/site.ts`
- Publications: `src/data/publications.ts`
- Projects: `src/data/projects.ts`
- News: `src/data/news.ts`
- Page templates: `src/pages/*.astro`
- Shared layout/components: `src/layouts/`, `src/components/`

## Manual refinement still needed

1. Continue refining publication summaries and add any missing public links, code, posters, or BibTeX entries.
2. Decide whether to keep `/projects` as a hidden future page, remove it entirely, or relaunch it later as `Systems & Resources`.
3. Add bilingual EN/ZH content structure when the English copy stabilizes.
4. Decide final deployment URL and update `site.url` before launch.

## Notes

- Initial content was derived from `resumes/Sikun_Guo_Resume_2026-03-12.txt`.
- The design is intentionally restrained and recruiter/collaborator friendly rather than startup-like.
- Everything was created locally inside the workspace.
