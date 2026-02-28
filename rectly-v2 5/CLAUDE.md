# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rectly is a bilingual (German/English) static marketing website for an iOS meeting recording app. No build tools, no package manager, no framework — pure HTML, CSS, and vanilla JavaScript served via Apache. Domain: `rectly.app`.

## Architecture

### Localization
- Root `index.html` auto-redirects based on `navigator.language`
- `/de/` and `/en/` directories contain localized versions of all pages
- **Always update both language versions together** when making content changes
- Page pairs: `de/index.html` ↔ `en/index.html`, `de/datenschutz.html` ↔ `en/privacy.html`
- Both localized index pages share identical HTML structure — only text content differs
- Assets are referenced with `../assets/` relative paths from language subdirectories

### File Layout
- `assets/css/style.css` — single shared stylesheet for all pages
- `assets/js/main.js` — scroll-reveal (IntersectionObserver), smooth scrolling, FAQ accordion
- `assets/js/emoji-background.js` — canvas-based animated particle background (OOP `EmojiBackground` class, mouse-reactive)
- `assets/images/` — all images (logos, screenshots, icons, flags, App Store badges)
- `.htaccess` — Apache config (HTTPS redirect, `.html` extension stripping, caching, gzip, security headers)
- `404.html` — bilingual 404 page (root-level)

### Page Sections (index.html)
Each localized index follows: Hero → Features (two cards: local mode + API mode) → Pricing (Free/Basis/Pro cards) → FAQ (accordion) → Footer. Sections are separated by `<hr class="section-divider">`.

Key CSS classes:
- `pricing-card-highlight` — highlighted pricing card (Basis plan)
- `pricing-card-badge` — "Popular"/"Beliebt" badge on highlighted card
- `pricing-inherit` — list items that reference a lower tier ("Alles aus Free")
- `pricing-note` — parenthetical notes on feature limitations
- `feature-card` with `feature-card-icon`, `feature-card-title`, `feature-card-text`

### Design System
CSS custom properties in `:root` (see `style.css`):
- **Palette:** `--primary: #0066ff`, `--primary-light: #3388ff`, `--accent: #00ffff`
- **Backgrounds:** `--bg-deep: #08080d`, `--bg-dark: #0e0e15`, `--bg-surface: #14141e`
- **Text:** `--text-primary: #eef0f4`, `--text-secondary: #8b919c`, `--text-muted: #4e5460`
- **Glass:** `--glass-bg`, `--glass-border`, `--glass-hover` (subtle white transparency layers)
- **Glow:** `--glow-sm`, `--glow-md`, `--glow-lg` (blue box-shadow presets)
- **Layout:** `--container-max: 1100px`, `--radius-sm/md/lg/xl`
- **Motion:** `--ease: cubic-bezier(0.22, 1, 0.36, 1)`, `--duration: 0.5s`
- **Fonts:** Outfit (headings), Inter (body) — loaded via Google Fonts

### Scroll Reveal Pattern
Add `data-reveal` to any element for fade-in-on-scroll. Optional `data-delay="200"` for staggered reveals. JS adds `.revealed` class via IntersectionObserver.

### Responsive Breakpoints
Four breakpoints in `style.css` (max-width): 1024px, 768px, 480px, 360px.

## Deployment

Static file deployment — no build step. Files are served directly by Apache.

## SEO

`sitemap.xml` contains hreflang alternate links for both languages. `robots.txt` is configured. Update `sitemap.xml` when adding new pages. Clean URLs use `.html` extension stripping via `.htaccess`.
