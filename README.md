# Sikun Guo Academic Homepage

Personal academic homepage for **Sikun Guo**, built with **Astro** and **Tailwind CSS**, and deployed via **GitHub Pages**.

## Live site

- <https://sikun-skyler-guo.github.io>

## Purpose

This site is designed to present a coherent research agenda rather than a generic personal portfolio. It is aimed at:

- potential research collaborators,
- industry recruiters,
- and readers who want a clear view of current work across LLM parametric knowledge optimization, inference-time learning, graph neural networks, and AI for Science.

## Tech stack

- Astro
- Tailwind CSS
- GitHub Actions
- GitHub Pages

## Local development

```bash
npm install
npm run dev
```

By default, Astro will start a local dev server and print the local preview URL.

## Production build

```bash
npm run build
```

The static output is written to:

- `dist/`

## Deployment

This repository is configured for **GitHub Pages** deployment through:

- `.github/workflows/deploy.yml`

On every push to `main`, GitHub Actions builds the site and deploys the contents of `dist/` to GitHub Pages.

## Project structure

```text
personal-homepage/
├── public/                  # static assets (paper figures, CV PDF, favicon, etc.)
├── src/
│   ├── components/          # reusable UI pieces
│   ├── data/                # structured site content
│   ├── layouts/             # shared page layout
│   ├── pages/               # route-level pages
│   └── styles/              # global styling
├── .github/workflows/       # GitHub Pages deployment workflow
├── astro.config.mjs
├── package.json
└── README.md
```

## Content update workflow

Most routine updates should happen in:

- `src/data/site.ts`
- `src/data/publications.ts`
- `public/` for figures and CV assets

This keeps content changes separate from layout changes whenever possible.

## Notable content conventions

- Publication entries can include:
  - links,
  - bolded author highlighting,
  - optional figure slots,
  - and short structured summaries.
- The homepage includes a systems section for **OpenClaw**, intended to reflect system-design thinking rather than product marketing.

## Planned future improvements

- EN / ZH bilingual support
- continued refinement of the OpenClaw systems diagram
- more publication links, code links, posters, and supplemental artifacts where available
- optional custom domain setup

## Maintenance note

This repository is the source of truth for the public homepage. Local preview ports may change, but the intended public URL is:

- <https://sikun-skyler-guo.github.io>
