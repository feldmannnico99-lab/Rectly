# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR) — runs on port 5174 by default
npm run build      # Production build → dist/
npm run lint       # ESLint check
npm run preview    # Preview production build at localhost:4173/Rectly/
```

No test suite is configured.

## Architecture

Single-page React landing page for the Rectly iOS app (meeting transcription). Deployed to GitHub Pages at `https://<user>.github.io/Rectly/` via `.github/workflows/deploy.yml`.

**Entry:** `src/main.jsx` → `src/App.jsx` (monolithic — all sections, data, and page-level components live here)

**Routing:** Hash-based (`#datenschutz`, `#impressum`, `#datenschutz-app`, `#support`, `#agb`) with `useState` + `hashchange` listener. No router library. `LegalPage` handles `datenschutz` and `impressum`; `DatenschutzAppPage`, `SupportPage`, `AGBPage` are standalone components rendered by the `page !== 'home'` branch in `App`. To add a new page: (1) add the hash to the `handleHash` `if/else` chain in the `useEffect`, (2) create a component above `FAQRow`, (3) add a branch in the `page !== 'home'` render block, (4) add `footer.{key}` strings to both `CONTENT.de` and `CONTENT.en`, (5) add `<button onClick={() => goTo(...)}` to **both** footer JSX blocks (home footer at the bottom of the return, and the legal-view footer inside the `page !== 'home'` branch).

**i18n:** `App.jsx` exports a top-level `CONTENT` object with `de` and `en` keys covering every user-facing string. `lang` state (persisted to `localStorage` as `rectly-lang`) drives a `<LangToggle>` button (fixed top-right) and is passed as a prop to `PhoneSlider`. No i18n library.

**Styling — two parallel systems:**
- `src/App.css` — primary stylesheet, plain CSS with custom properties. All design tokens in `:root`. All layout and animation for page sections.
- `src/index.css` — Tailwind CSS v4 setup + shadcn/ui CSS variables (oklch). Used only by `src/components/ui/` components.
- Tailwind is loaded via `@tailwindcss/vite` plugin. There is no `tailwind.config.js`.
- `@` alias resolves to `./src/`.

**Key components:**

- `src/components/ModelViewer.tsx` — Three.js iPhone 3D renderer (`@react-three/fiber` + `@react-three/drei`). Accepts `modelPath: string` prop. `DISPLAY_Y = Math.PI` is the resting Y rotation (front-face forward). `adjustCamera={0.6}` on `<Stage>` controls how much of the canvas the model fills (lower = model appears larger). Animation phases: `intro` → `idle` → `spin`, driven by `spinTrigger` prop changes. Mouse drag rotation comes through a `mouseRef` passed from `PhoneSlider`.

- `src/components/PhoneSlider.jsx` — Renders three `ModelViewer` instances (left/center/right). Picks model paths from `PHONE_MODELS[lang]`. All 6 GLB paths use `import.meta.env.BASE_URL` prefix. `useGLTF.preload()` is called at **module level** for all 6 paths to cache them before any Canvas mounts. The `BG` component (LightPillar) in `App.jsx` is also defined at **module level** — never inside the `App` function — to prevent WebGL context destruction on re-render.

- `src/components/LightPillar.jsx` — Three.js animated background, fixed, z-index 0.

- `src/components/RotatingText.jsx` — Framer Motion word rotator in the hero headline.

- `src/components/GradualBlur.jsx` — CSS `backdrop-filter` blur overlay, graduated across multiple divs via mask-image. Depends on `mathjs` (already in `node_modules`). Accepts `position`, `strength`, `height`, `curve`, `divCount` props plus named `preset` shortcuts (`'footer'`, `'header'`, `'intense'`, etc.). Use `target='page'` for a `position:fixed` full-page overlay.

- `src/components/ui/` — shadcn/ui components (style `new-york`, base color `gray`). Add new ones with `npx shadcn@latest add <component>`. Custom additions: `animated-glassy-pricing.tsx` (exports `PricingCard`), `multi-type-ripple-buttons.tsx`.

**Animation:** `motion/react` (Framer Motion v12) — FAQ accordion (`AnimatePresence`) and `RotatingText`.

**Icons:** `lucide-react`.

## Asset Paths

All runtime asset paths (GLB models, images, App Store badges) **must** use `import.meta.env.BASE_URL` as a prefix, not bare `/`-rooted strings. Vite sets this to `/Rectly/` in production and `/` in dev.

```js
// Correct
const path = `${import.meta.env.BASE_URL}models/iphone-de-left.glb`

// Wrong — breaks on GitHub Pages
const path = '/models/iphone-de-left.glb'
```

The 6 GLB files in `/public/models/` follow the pattern `iphone-{de|en}-{left|center|right}.glb`.

`/public/background.png` — 1920×1080 static render of the LightPillar shader (blue tones, generated via CPU ray-march at a fixed time value).

## Important Constraints

- `vite.config.js` is the active config (ignore `vite.config.ts` — leftover without the Tailwind plugin).
- `base: '/Rectly/'` is set in `vite.config.js` for GitHub Pages. `npm run preview` serves at `/Rectly/`.
- **React 19** — avoid patterns deprecated in React 19 (e.g. `forwardRef` wrappers).
- **Do not use `?v=N` query strings** on GLB paths. Vite's dev server intercepts `?v=` as its own cache-busting mechanism and returns `index.html` instead of the static file, causing a JSON parse error in the GLTF loader.
- ESLint uses flat config format (ESLint 9+). Unused uppercase/underscore-prefixed vars are allowed.
- `useGLTF.preload()` must be called at module level (not inside a component) so the GLB is cached before Suspense triggers.
- Three.js WebGL components (`LightPillar`, canvas wrappers) must be defined at module level — not inside other components — to prevent context loss on React re-renders.
