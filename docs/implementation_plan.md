# GitHub Pages — Blog & Portfolio Site

Alexander Siedler's personal site, primarily a **blog** with integrated **CV/portfolio** sections. Built as a Vite/React SPA deployed via GitHub Pages.

---

## Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Build** | Vite 6.x | Fast HMR, native ESM, excellent React support |
| **UI** | React 19 + TypeScript | Familiar from existing aistudio site |
| **Routing** | react-router-dom v7 (HashRouter) | GitHub Pages doesn't support server-side routing; HashRouter works out of the box |
| **Blog rendering** | react-markdown + gray-matter | Parse Markdown frontmatter + render to React |
| **Styling** | Vanilla CSS (design tokens) | Full control, no framework dep |
| **Fonts** | Google Fonts (Inter, Newsreader, JetBrains Mono) | Professional typography |
| **Deploy** | GitHub Actions → `gh-pages` | Automated on push to `main` |

---

## Architecture Overview

```
d:\projekts\githubpage\
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions → GitHub Pages
├── public/
│   ├── images/
│   │   ├── profile/                # Profile photos
│   │   └── blog/                   # Blog post cover images
│   └── favicon.svg
├── src/
│   ├── content/
│   │   └── blog/                   # Markdown blog posts (.md)
│   │       └── 2026-03-hello-world.md
│   ├── data/
│   │   ├── experiences.ts           # Work experience
│   │   ├── projects.ts              # Projects/portfolio
│   │   ├── skills.ts                # Technical & soft skills
│   │   ├── certifications.ts        # Certifications
│   │   └── personal.ts              # Name, email, links, bio
│   ├── hooks/
│   │   ├── useTheme.ts              # Dark/light mode hook
│   │   └── useBlogPosts.ts          # Load & parse all blog posts
│   ├── layouts/
│   │   └── PageLayout.tsx           # Header + main + Footer wrapper
│   ├── components/
│   │   ├── Header.tsx               # Nav bar + dark mode toggle
│   │   ├── Footer.tsx               # Links, copyright, social icons
│   │   ├── Hero.tsx                 # Homepage hero section
│   │   ├── BlogCard.tsx             # Blog post preview card
│   │   ├── ProjectCard.tsx          # Portfolio project card
│   │   ├── Timeline.tsx             # CV timeline
│   │   ├── SkillBar.tsx             # Skill rating bar
│   │   ├── CertBadge.tsx            # Certification badge
│   │   ├── TagList.tsx              # Tags display
│   │   ├── ThemeToggle.tsx          # Dark/light switch
│   │   └── SEOHead.tsx              # Document head via react-helmet
│   ├── pages/
│   │   ├── Home.tsx                 # Homepage
│   │   ├── BlogList.tsx             # Blog listing
│   │   ├── BlogPost.tsx             # Single blog post
│   │   ├── About.tsx                # CV / About page
│   │   ├── Projects.tsx             # Portfolio page
│   │   └── Contact.tsx              # Contact page
│   ├── styles/
│   │   ├── global.css               # Design tokens + reset + base
│   │   ├── typography.css           # Font imports + type scale
│   │   └── components.css           # Shared component classes
│   ├── lib/
│   │   └── blog.ts                  # Markdown loading + parsing utils
│   ├── App.tsx                      # Router + layout
│   └── main.tsx                     # Entry point
├── index.html                       # Vite HTML entry
├── vite.config.ts
├── tsconfig.json
├── package.json
└── docs/                            # Planning docs (this file, design_rules)
```

---

## Proposed Changes

### 1. Project Scaffolding

#### [NEW] [package.json](file:///d:/projekts/githubpage/package.json)
Dependencies: `react`, `react-dom`, `react-router-dom`, `react-markdown`, `gray-matter`, `react-helmet-async`, `remark-gfm`, `rehype-raw`
Dev deps: `@vitejs/plugin-react`, `typescript`, `vite`, `@types/react`, `@types/react-dom`, `vite-plugin-static-copy` (for markdown files)

#### [NEW] [vite.config.ts](file:///d:/projekts/githubpage/vite.config.ts)
- React plugin, `assetsInclude: ['**/*.md']` for raw markdown imports
- Base URL for GitHub Pages

#### [NEW] [index.html](file:///d:/projekts/githubpage/index.html)
- Root HTML with font links, viewport meta, `<div id="root">`

---

### 2. Blog Infrastructure

**How blog posts work in Vite/React:**

1. Blog posts live as `.md` files in `src/content/blog/`
2. Each file has YAML frontmatter (title, date, tags, summary, coverImage)
3. `src/lib/blog.ts` uses Vite's `import.meta.glob('../../content/blog/*.md', { query: '?raw', import: 'default' })` to load all posts at build time
4. `gray-matter` parses frontmatter from raw markdown strings
5. `react-markdown` renders the markdown body with `remark-gfm` (tables, strikethrough) and `rehype-raw` (embedded HTML)
6. Blog post URLs use the filename slug: `/#/blog/2026-03-hello-world`

---

### 3. Pages

| Page | Route | Content |
|---|---|---|
| **Home** | `/#/` | Hero, latest 3 posts, featured project, brief bio |
| **Blog** | `/#/blog` | All posts sorted by date, tag filter |
| **Post** | `/#/blog/:slug` | Full markdown post with reading time |
| **About** | `/#/about` | CV timeline, skills, education, certs |
| **Projects** | `/#/projects` | Project cards grid |
| **Contact** | `/#/contact` | Email, LinkedIn, mailto form |

---

### 4. Data Migration

All data from `aistudio/constants.tsx` migrated to typed files in `src/data/`:
- `personal.ts` — name, role, company, location, links, bio
- `experiences.ts` — 5 work experiences
- `projects.ts` — 9 projects + portfolio groups
- `skills.ts` — 11 technical + 7 soft skills
- `certifications.ts` — 5 certifications

Education data (M.Sc., B.Sc.) embedded in `About.tsx` since it's small and static.

---

### 5. Deployment

#### [NEW] [.github/workflows/deploy.yml](file:///d:/projekts/githubpage/.github/workflows/deploy.yml)
```yaml
on: push (main) → npm ci → npm run build → deploy dist/ to gh-pages
```

---

## Verification Plan

### Automated
1. `npm run build` completes without errors
2. `npm run dev` starts and serves on localhost

### Manual (Browser)
1. All 6 pages render and navigate correctly
2. Blog posts load from markdown, code blocks highlighted
3. Dark/light mode toggle works site-wide
4. Responsive at 375px / 768px / 1440px
5. Profile photo renders on homepage
