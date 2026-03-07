# Design Rules & Coding Guidelines

Reference document for any agent implementing the GitHub Pages blog & portfolio site.

---

## Visual Identity

### Color System
| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-bg` | `#fafaf9` (warm white) | `#0c0a09` (warm black) | Page background |
| `--color-bg-alt` | `#f5f5f4` | `#1c1917` | Section backgrounds, cards |
| `--color-surface` | `#ffffff` | `#292524` | Elevated cards, modals |
| `--color-text` | `#1c1917` | `#fafaf9` | Primary text |
| `--color-text-secondary` | `#78716c` | `#a8a29e` | Subtitles, captions |
| `--color-border` | `#e7e5e4` | `#44403c` | Borders, dividers |
| `--color-accent` | `#6366f1` (indigo) | `#818cf8` | Links, buttons, highlights |
| `--color-accent-hover` | `#4f46e5` | `#a5b4fc` | Hover states |
| `--color-accent-subtle` | `#eef2ff` | `rgba(99,102,241,0.15)` | Tag backgrounds, badges |

### Typography
| Font | Stack | Use |
|---|---|---|
| **Inter** | `'Inter', system-ui, sans-serif` | UI, headings, nav |
| **Newsreader** | `'Newsreader', Georgia, serif` | Blog body text |
| **JetBrains Mono** | `'JetBrains Mono', 'Fira Code', monospace` | Code blocks, tech tags |

### Type Scale (1.25 ratio)
| Element | Size | Weight | Line Height |
|---|---|---|---|
| `h1` | 2.5rem (40px) | 800 | 1.2 |
| `h2` | 2rem (32px) | 700 | 1.25 |
| `h3` | 1.5rem (24px) | 600 | 1.3 |
| `h4` | 1.25rem (20px) | 600 | 1.4 |
| `body` | 1rem (16px) | 400 | 1.6 |
| `small` | 0.875rem (14px) | 400 | 1.5 |
| `caption` | 0.75rem (12px) | 500 | 1.4 |

---

## Layout Rules

### Breakpoints
| Name | Width | Behavior |
|---|---|---|
| Mobile | `< 640px` | Single column, hamburger nav |
| Tablet | `640px – 1024px` | Two columns where appropriate |
| Desktop | `> 1024px` | Full layout, sticky nav |

### Sizing Constraints
- **Max content width**: `72rem` (1152px)
- **Max prose width**: `42rem` (672px) — blog post text column
- **Page padding**: `1rem` mobile, `2rem` tablet+

### Grid Patterns
- **Blog listing**: 1 col mobile → 2 cols tablet → 3 cols desktop
- **Projects**: 1 col mobile → 2 cols tablet → 2-3 cols desktop
- **CV Timeline**: Single column, full width with left timeline accent

---

## Component Rules

### Cards
- Border radius: `var(--radius-lg)` (1.25rem)
- Border: 1px solid `var(--color-border)`
- Background: `var(--color-surface)`
- Subtle shadow: `var(--shadow-sm)`, elevate to `var(--shadow-md)` on hover
- Transition: `var(--transition-base)` for all interactive states

### Buttons
- **Primary**: `var(--color-accent)` bg, white text, `var(--radius-md)` radius
- **Secondary**: Transparent bg, `var(--color-accent)` border and text
- **Ghost**: No border, accent text color, subtle hover background
- All buttons: `font-weight: 600`, `padding: 0.75rem 1.5rem`

### Navigation
- Sticky top, glassmorphism effect (`backdrop-filter: blur(12px)`)
- Height: `4rem`
- Active link: accent color + subtle underline or bottom border
- Mobile: full-screen overlay menu with smooth slide-in

### Tags/Chips
- Small rounded pills: `var(--radius-full)`
- Background: `var(--color-accent-subtle)`
- Text: `var(--color-accent)`, `font-weight: 600`, `font-size: 0.75rem`
- Uppercase, letter-spacing: `0.05em`

---

## Animation Guidelines

### Allowed Animations
- **Hover transitions**: scale, shadow, color — duration `var(--transition-fast)`
- **Page entrance**: fade-in on scroll via `IntersectionObserver`
- **Skill bars**: Width animation from 0% to target on scroll into view
- **Theme toggle**: Smooth color transitions via CSS transitions on all color vars

### Disallowed
- No bouncing animations on primary content
- No auto-playing carousels
- No animations that block interaction
- Respect `prefers-reduced-motion` — disable animations when set

---

## Blog Post Rules

### Frontmatter Schema
```yaml
---
title: "Post Title Here"
date: 2026-03-07
tags: ["AI", "Microsoft 365", "Collaboration"]
summary: "One-sentence summary for listing cards and meta descriptions."
coverImage: "/images/blog/post-cover.jpg"  # optional
draft: false                                # optional, hides from listing
---
```

### Content Guidelines
- Write in English (primary audience: international tech community)
- Use `##` for sections, `###` for subsections — never use `#` in body (reserved for title)
- Keep paragraphs short (3-5 sentences)
- Use code blocks with language tags for syntax highlighting
- Images: place in `public/images/blog/`, reference with relative paths

### Topics (expected focus areas)
- AI & Enterprise (RAG, Copilot, OpenWebUI, Azure AI)
- Microsoft 365 & Collaboration Platforms
- Low-Code / Power Platform
- IT Project Management & Leadership
- Process Automation & Integration (SAP, Jira, SharePoint)

---

## Accessibility Requirements

- All images must have descriptive `alt` text
- Color contrast: minimum WCAG AA (4.5:1 for text, 3:1 for large text)
- Keyboard navigation: all interactive elements must be focusable and operable
- Skip-to-content link at top of page
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- Focus indicators: visible outline on keyboard focus (accent color)

---

## Code Style

### React Components
- Functional components with TypeScript (`.tsx`)
- Use React hooks for state and side effects
- Keep components small and focused — one file per component
- Co-locate component CSS modules or use shared `components.css`

### TypeScript
- Strict mode enabled
- All data files typed with exported interfaces
- Props typed with `interface Props {}` pattern
- Use `React.FC<Props>` or explicit return types

### CSS
- **No utility frameworks** — use design tokens from `global.css`
- Import `global.css` in `main.tsx`
- Component-specific styles in `src/styles/components.css`
- Class naming: BEM-lite (`.card`, `.card__title`, `.card--featured`)

### File Naming
- Components: `PascalCase.tsx` (e.g., `BlogCard.tsx`)
- Pages: `PascalCase.tsx` (e.g., `BlogList.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useTheme.ts`)
- Data: `camelCase.ts` (e.g., `experiences.ts`)
- Blog posts: `YYYY-MM-slug.md` (e.g., `2026-03-hello-world.md`)

### Routing
- Use `react-router-dom` v7 with `HashRouter` (GitHub Pages compatible)
- Route paths: `/`, `/blog`, `/blog/:slug`, `/about`, `/projects`, `/contact`

---

## Deployment

- **Build command**: `npm run build`
- **Output**: `./dist/` directory (static HTML/CSS/JS)
- **Deploy target**: GitHub Pages via GitHub Actions
- **Custom domain**: Configure in repo settings after first deploy
- **Existing `aistudio/` folder**: Keep as-is (legacy), do not deploy — new site builds from `src/`
