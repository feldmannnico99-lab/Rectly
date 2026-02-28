# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview production build locally
```

No test suite is configured.

## Architecture

Single-page React landing page for the Rectly iOS app (German-language meeting transcription app).

**Entry:** `src/main.jsx` → `src/App.jsx` (monolithic — all sections, data, and page-level components live here)

**Routing:** Hash-based (`#datenschutz`, `#impressum`) with `useState` + `hashchange` listener. No router library.

**Styling approach — two parallel systems coexist:**
- `src/App.css` — the primary stylesheet, plain CSS with custom properties. All design tokens (colors, radii, fonts) defined here in `:root`. This is where most styling lives.
- `src/index.css` — Tailwind CSS v4 setup + shadcn/ui CSS variables (oklch color space). Used only by `src/components/ui/` components.
- Tailwind is loaded via the Vite plugin (`@tailwindcss/vite`), not PostCSS. There is no `tailwind.config.js`.
- `@` alias resolves to `./src/`.

**Key components:**

- `src/components/ModelViewer.tsx` — Three.js iPhone 3D model renderer using `@react-three/fiber` + `@react-three/drei`. Loads `/public/models/iphone-model.glb`. The `DISPLAY_Y` constant controls resting rotation (front-face orientation depends on the GLB). Cache-bust the model with `?v=N` query strings on the `useGLTF` path when the GLB file is replaced. `adjustCamera` on `<Stage>` controls how much of the canvas the model fills (lower = closer; `0.6` currently shows the full phone).

- `src/components/PhoneSlider.jsx` — Static 3-iPhone display (center + left + right). Passes a `mouseRef` into the center `ModelViewer` to drive Three.js model rotation from mouse drag events (mousedown/mousemove/mouseup). No carousel logic.

- `src/components/LightPillar.jsx` — Three.js animated background (fixed, z-index 0, behind all content).

- `src/components/RotatingText.jsx` — Framer Motion animated word rotator used in the hero headline.

- `src/components/ui/` — shadcn/ui components installed via `npx shadcn@latest add`. Use Tailwind classes internally.

**Animation library:** `motion/react` (Framer Motion v12). Used in `App.jsx` (FAQ accordion with `AnimatePresence`) and `RotatingText.jsx`.

**Icons:** `lucide-react`.

**shadcn/ui config:** `components.json` — style `new-york`, CSS variables enabled, base color `gray`.

## Important Constraints

- `vite.config.js` is the active config (ignore `vite.config.ts` — it's a leftover without the Tailwind plugin).
- The project uses **React 19** — avoid patterns deprecated in React 19 (e.g. `forwardRef` as a wrapper).
- ESLint uses the **flat config** format (ESLint 9+). Unused uppercase/underscore-prefixed vars are allowed.
- All public assets (GLB model, images, App Store badge SVG) are in `/public/`.
