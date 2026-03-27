# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Alexander Siedler. Vite + React 19 SPA with Tailwind CSS v4, deployed to GitHub Pages via GitHub Actions.

## Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — Production build + prerender (`vite build && node prerender.mjs`)
- `npm run lint` — Type-check only (`tsc --noEmit`); no linter beyond TypeScript
- `npm run preview` — Preview production build locally

## Architecture

**Routing**: `BrowserRouter` (react-router-dom v7) with prerendering for GitHub Pages. Routes: `/`, `/blog`, `/blog/:slug`, `/about`, `/projects`, `/projects/:id`, `/contact`. All pages are lazy-loaded in `App.tsx`.

**Blog system**: Markdown files in `src/content/blog/` with YAML frontmatter (title, date, tags, summary, coverImage, draft). Loaded at build time via `import.meta.glob('?raw')` in `src/lib/blog.ts`, which has a custom frontmatter parser (no gray-matter dependency). Filenames become URL slugs (e.g., `2026-03-my-post.md` → `/blog/2026-03-my-post`). Rendered with `react-markdown` + `remark-gfm` + `rehype-highlight` + `rehype-raw`.

**Prerendering**: `prerender.mjs` uses Puppeteer + Express to crawl the built SPA and write static HTML for each route, enabling SEO and proper GitHub Pages 404 handling.

**Data layer**: Typed static data files in `src/data/` (experiences, projects, skills, certifications, personal info). No API calls.

**Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. Design tokens and conventions documented in `docs/design_rules.md`.

**Comments**: Giscus (`@giscus/react`) for blog post comments.

## Key Conventions

- TypeScript strict mode; `.tsx` for components, `.ts` for logic/data
- Components in `src/components/`, pages in `src/pages/`, layouts in `src/layouts/`
- Blog posts named `YYYY-MM-slug.md` with frontmatter schema defined in `docs/design_rules.md`
- Blog images go in `public/images/blog/`
- The `aistudio/` folder is a legacy site — do not modify or deploy it
- `docs/` contains design rules and implementation plan — reference these for styling decisions
