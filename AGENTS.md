# AI Agent Instructions for Learning Hub

> **Note to AI Agents:** This file (`AGENTS.md`) is the definitive guide for how you should interact with the Learning Hub repository. Always adhere to these rules when fulfilling user requests.

## 🎯 Primary Goal
The Learning Hub is a collection of high-quality, pure HTML/CSS/Vanilla JS reference pages. The primary focus is **deep conceptual understanding** and providing a stellar, responsive UI experience without external dependencies.

## 📐 Architecture & Constraints
1. **Zero Dependencies:** NEVER add CDNs, external scripts (like React, Vue, Tailwind via CDN), or external stylesheets.
2. **Offline-First:** All files must function completely when opened via the `file://` protocol. Use strictly relative links (e.g., `href="css/style.css"`, not `href="/css/style.css"`).
3. **No Build Step:** The project is deployed as a static site via GitHub Actions directly from the raw HTML files. Do not introduce Webpack, Vite, or npm scripts for the frontend.
4. **File Sizes:** 
   - CSS & JS should remain extremely lightweight (aim for <20KB each).
   - HTML pages have **no strict size limit**. If a topic requires deep conceptual explanations or multiple visual architecture diagrams, prioritize the learning content over file size.

## 🎨 Design System
- The UI follows a **"Dark Mode Glassmorphism"** aesthetic.
- Always use the CSS variables defined in `css/style.css` (e.g., `--bg-primary`, `--accent-purple`, `--glass-bg`).
- Use the `.card` and `.content-card` classes for standard content containers.
- Use the `.reveal` class combined with `js/common.js`'s IntersectionObserver for scroll animations.
- Rely on emojis for icons rather than importing icon libraries or SVG sprites, unless specifically adding a diagram.

## 🧠 Adding New Content
When asked to add a new topic (e.g., "Docker"):
1. **Always use the Agent Skill:** Execute the provided `skills/add-learning-hub-page` skill script to scaffold the page. 
   - Command: `python skills/add-learning-hub-page/scripts/add_page.py "Topic Name" "Description"`
   - This automatically creates the file, updates navigation, initializes search indices, and adds the topic card.
2. **Content Hierarchy:** Once scaffolded, open the HTML file and structure the content conceptually first (What is it? Architecture? Core Concepts?), and place practical reference material (CLI commands, code snippets) at the bottom.
3. **Interactive UI Elements:** Ensure every major `<section>` retains a unique `id` and the standard `bookmark-btn` and `mark-read-btn` injected by the template.

## ⚡ Global Search
- Global search is powered by `js/search-data.js`.
- Always ensure `search-data.js` is loaded **before** `common.js` in the HTML footer.
- When adding or significantly modifying content, update `search-data.js` to keep the search index accurate.

## 🚀 Workflow
- Follow the workflow outlined in `CONTRIBUTING.md`.
- Ensure changes look good on mobile (375px) and desktop.
- Before completing a task, mentally verify that no external HTTP requests were added.
