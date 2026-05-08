# Learning Hub – Standards & Conventions

> This document defines the coding standards, design principles, and technical requirements for the Learning Hub project.

---

## 🎯 Core Principles

1. **Zero Dependencies** — No external libraries, CDNs, or frameworks. Pure HTML, CSS, and vanilla JavaScript only.
2. **Offline-First** — Every page must work when opened via `file://` protocol without internet.
3. **Mobile-First** — Design for 375px width first, then enhance for larger screens.
4. **Content-First Learning** — Prioritize deep, comprehensive learning materials and visual architecture diagrams over artificial size limits. The primary goal is deep conceptual understanding.
5. **Accessibility** — Semantic HTML, proper heading hierarchy, ARIA labels where needed.
6. **Performance** — Minimal file sizes for assets (CSS/JS), zero external HTTP requests.

---

## 📐 Design Standards

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a1a` | Page background |
| `--bg-surface` | `rgba(255,255,255,0.03)` | Card backgrounds |
| `--accent-purple` | `#7c3aed` | Primary accent |
| `--accent-cyan` | `#06b6d4` | Secondary accent |
| `--text-primary` | `#f0f0f5` | Headings, important text |
| `--text-secondary` | `#94a3b8` | Body text, descriptions |
| `--text-muted` | `#64748b` | Subdued text, labels |

### Typography
- **Font stack**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Code font**: `'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace`
- **Base size**: Browser default (16px)
- **Line height**: 1.7 for body text

### Visual Effects
- **Glassmorphism**: Cards use `backdrop-filter: blur(16px)` with semi-transparent backgrounds
- **Gradient orbs**: Floating animated background elements for visual depth
- **Micro-animations**: Hover effects (scale, glow) and scroll-reveal transitions
- **Border radius**: 8px (small), 12px (medium), 16px (large), 24px (extra-large)

### Responsive Breakpoints
- **Mobile**: 0–480px (single column, compact spacing)
- **Tablet**: 481–768px (flexible columns, hamburger menu)
- **Desktop**: 769px+ (multi-column grid, full navigation)

---

## 🏗️ HTML Standards

### Page Structure
Every page MUST follow this skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] – Learning Hub</title>
  <meta name="description" content="[Page description for SEO]">
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="page--[topic]">
  <div id="bg-orbs-placeholder"></div>
  <div id="nav-placeholder"></div>

  <main class="main-content">
    <div class="container">
      <!-- Page content here -->
    </div>
  </main>

  <div id="footer-placeholder"></div>
  <script src="js/common.js"></script>
</body>
</html>
```

### Required Elements
- `lang="en"` on `<html>` tag
- `charset` and `viewport` meta tags
- Descriptive `<title>` with " – Learning Hub" suffix
- `meta description` for SEO
- Exactly one `<h1>` per page
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- Semantic elements: `<main>`, `<section>`, `<nav>`, `<footer>`
- All interactive elements must have unique `id` attributes

### Linking Rules
- All links MUST be **relative** (no absolute URLs)
- Use `href="page.html"` not `href="/page.html"` or `href="./page.html"`
- CSS: `href="css/style.css"`
- JS: `src="js/common.js"`

---

## 🎨 CSS Standards

### File Organization
- All shared styles go in `css/style.css`
- No inline styles except for minor one-off adjustments
- Use CSS custom properties (variables) for all colors, spacing, transitions
- No `!important` unless absolutely necessary

### Naming Convention (BEM-inspired)
```
.block                    → .card
.block__element           → .card__title
.block--modifier          → .card--highlighted
```

### Responsive Design
- Use `clamp()` for fluid typography
- Use CSS Grid with `auto-fill`/`auto-fit` for responsive grids
- Test at: 375px, 768px, 1024px, 1440px

### Animations
- Always use `transition` for interactive states (hover, focus)
- Use `@keyframes` for continuous animations
- Prefer `transform` and `opacity` for GPU-accelerated animations
- Keep durations between 0.2s–0.5s for micro-interactions

---

## ⚡ JavaScript Standards

### General Rules
- Pure vanilla JavaScript only
- No ES6 modules (use IIFE pattern for encapsulation)
- No arrow functions (for maximum browser compatibility)
- No `const`/`let` — use `var` for broadest support
- All shared utilities go in `js/common.js`
- Page-specific scripts go in `<script>` tag at bottom of page

### Common.js Responsibilities
- Dynamic navigation injection
- Mobile menu toggle
- Scroll-to-top button
- Scroll-reveal animations (IntersectionObserver)
- Copy-to-clipboard utility
- HTML escaping utility
- Footer injection

### Adding to Navigation
To add a new page to the nav, edit the `NAV_PAGES` array in `js/common.js`:

```javascript
var NAV_PAGES = [
  { name: 'Home', href: 'index.html' },
  { name: 'Prompts', href: 'prompts.html' },
  // Add new page here:
  { name: 'Docker', href: 'docker.html' }
];
```

---

## 💾 State Management & Interactive Features

To provide a dynamic learning experience without a backend, we rely purely on `localStorage` through a wrapper object in `common.js`:

### 1. Data Structures
- **Bookmarks (`lh_bookmarks`)**: An array of objects `[{ id, title, content, link, timestamp }]`.
- **Progress (`lh_progress`)**: A nested object mapped by page ID and section ID: `{ "kafka": { "sec-architecture": true } }`.
- **Theme (`lh_theme`)**: A simple string (`light` or `dark`).

### 2. Implementation Rules
- **No Global Scope Pollution:** All storage logic must live inside `window.LearningHubStorage`.
- **Graceful Degradation:** Features should gracefully handle disabled `localStorage` or incognito modes.
- **Performance:** Avoid excessive read/writes. Batch DOM manipulations where possible.

---

## 🚀 Deployment

### GitHub Pages Setup

1. Go to repository **Settings → Pages**
2. Set source to **"GitHub Actions"**
3. Save

### Environment Strategy

| Branch | Environment | Purpose |
|--------|------------|---------|
| `dev` | Development | Testing new pages and changes |
| `main` | Production | Live site for end users |

### Workflow
1. Create feature branch from `dev`
2. Make changes, test locally via `file://`
3. Push to `dev`, test on dev environment
4. When ready, create PR from `dev` → `main`
5. Review and merge → auto-deploys to production

---

## 🧪 Testing Requirements

### Before Every Commit
1. Open modified pages via `file://` protocol
2. Verify navigation links work
3. Check mobile viewport (375px)
4. Verify no console errors in browser DevTools
5. Ensure no external network requests (DevTools → Network tab)

### Optional Validation
```bash
# Start local server for testing
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| Edge | Latest 2 versions |
| Mobile Safari | iOS 14+ |
| Mobile Chrome | Android 10+ |

---

## 📏 Performance Budget

- Total CSS: < 20KB
- Total JS: < 15KB
- Individual HTML page: Uncapped (Ensure sufficient depth for learning concepts)
- Optimize images where necessary, prefer lightweight formats like WebP or PNG
- No external fonts loaded (system font stack)
- Zero external HTTP requests

---

## 🤖 AI Agent Instructions

When interacting with this repository via AI coding assistants, agents must refer to the global instructions file located at `AGENTS.md` in the repository root. This file contains specific guardrails and context to ensure AI-generated code adheres to these standards.

### Adding New Content via Agent Skills
To maintain the structural integrity of the project (Section IDs, Bookmarks, Search), any new pages MUST be added using the included `agentskills.io` compatible skill script:
1. Run `python skills/add-learning-hub-page/scripts/add_page.py "<Topic Name>" "<Description>"`
2. This script automates scaffolding, updating the `PAGE_TEMPLATE.html`, injecting into `js/common.js` and `js/search-data.js`, and generating the `index.html` card.
