# Contributing to Learning Hub

> **Quick Reference**: This document covers everything you need to add new content, pages, or prompts.

---

## 📝 Adding a New Prompt

The simplest contribution — just edit one file:

1. Open `prompts.html`
2. Find the `promptsData` array near the bottom of the file
3. Add a new object to the array:

```javascript
{
  title: "Your Prompt Title",
  category: "Code",          // One of: Code, DevOps, Architecture, Documentation, Learning, Prompt Engineering
  text: "Your prompt text goes here...\n\nUse \\n for newlines.",
  tags: ["tag1", "tag2", "tag3"]
}
```

4. Save and open `prompts.html` in your browser to verify

**That's it!** No build step, no server restart needed.

---

## 📄 Adding a New Topic Page

1. **Copy the template:**
   ```bash
   cp PAGE_TEMPLATE.html newtopic.html
   ```

2. **Edit `newtopic.html`:**
   - Update `<title>` tag
   - Update `<meta name="description">` tag
   - Update the `<h1>` hero title
   - Update the hero subtitle
   - Replace `page--template` with `page--newtopic` on the `<body>` tag
   - Add your content sections using the card/table components

3. **Add to navigation:**
   - Open `js/common.js`
   - Find the `NAV_PAGES` array
   - Add: `{ name: 'New Topic', href: 'newtopic.html' }`

4. **Add to landing page:**
   - Open `index.html`
   - Add a new topic card in the `topic-grid` section (copy an existing card)

5. **Test:**
   - Open `newtopic.html` via `file://` — verify it renders
   - Open `index.html` — verify the card links work
   - Test on mobile viewport (375px width)

---

## 🎨 Design Components Reference

Use these CSS classes in your pages:

### Glass Card
```html
<div class="card content-card">
  <div class="content-card__title">📌 Title</div>
  <div class="content-card__body">Content here...</div>
</div>
```

### Card Grid (responsive)
```html
<div class="topic-grid">
  <div class="card content-card">...</div>
  <div class="card content-card">...</div>
</div>
```

### Code Block (with copy button)
```html
<div class="code-block">
  <pre><code>your code here</code></pre>
</div>
```

### Table (scrollable on mobile)
```html
<div class="card">
  <div class="table-wrapper">
    <table>
      <thead><tr><th>Col 1</th><th>Col 2</th></tr></thead>
      <tbody>
        <tr><td>Data</td><td>Data</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

### Section with Header
```html
<section class="section reveal">
  <div class="section__header">
    <h2 class="section__title">Section Title</h2>
    <p class="section__subtitle">Optional subtitle</p>
  </div>
  <!-- Content here -->
</section>
```

### Info Box
```html
<div class="info-box">
  <div class="info-box__title">💡 Title</div>
  <div class="info-box__text">Helpful information here.</div>
</div>
```

---

## 🔄 Git Branching Strategy

```
main  ← Production (GitHub Pages deploys from here)
  └── dev  ← Development (test changes here first)
```

### Workflow

1. **Work on `dev` branch:**
   ```bash
   git checkout dev
   # make changes
   git add .
   git commit -m "Add Docker topic page"
   git push origin dev
   ```

2. **Test on dev environment** — Verify via GitHub Pages (configure to deploy from `dev` branch for testing)

3. **Merge to production:**
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

4. **Production deploys automatically** from the `main` branch via GitHub Pages

---

## ✅ Checklist Before Merging

- [ ] Page opens correctly via `file://` protocol
- [ ] All navigation links work
- [ ] Content renders properly on mobile (375px viewport)
- [ ] No external HTTP requests (CDN, fonts, etc.)
- [ ] Code blocks display correctly
- [ ] Tables are scrollable on mobile
- [ ] New page is added to `js/common.js` NAV_PAGES array
- [ ] New page card is added to `index.html`
- [ ] HTML passes basic validation (no unclosed tags)

---

## 📁 File Naming Convention

- Topic pages: lowercase, single word if possible: `redis.html`, `kafka.html`
- Multi-word topics: use hyphens: `api-gateway.html`, `design-patterns.html`
- No spaces, no uppercase in filenames
- CSS in `css/` directory
- JavaScript in `js/` directory
