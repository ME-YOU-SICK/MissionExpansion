# Mission Expansion

Mission Expansion is a premium **Next.js App Router** app scaffold for lifelong learning, combining a high-performance WebGL knowledge graph with lesson/quiz workflows and platform plumbing (auth, state, styling, and backend-ready config).

## Local Run Guide

### 1) Prerequisites
- **Node.js 20+** (recommended: latest LTS)
- **npm 10+**

Check versions:
```bash
node -v
npm -v
```

### 2) Install dependencies
```bash
npm install
```

### 3) Environment variables
Create `.env.local` in the project root.

Minimum Clerk variables (required because `ClerkProvider` + middleware are enabled):
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

Optional (for future DB wiring):
```bash
DATABASE_URL=postgres://...
```

### 4) Start dev server
```bash
npm run dev
```
Then open:
- `http://localhost:3000/` (auto-redirects to `/dashboard`)
- `http://localhost:3000/dashboard`
- `http://localhost:3000/graph`
- `http://localhost:3000/lesson/psychology-behavioral`
- `http://localhost:3000/quiz/psychology-behavioral-quiz`

### 5) Build and run production mode
```bash
npm run build
npm run start
```

---

## Troubleshooting

### A) `experimental.typedRoutes has been moved to typedRoutes`
This repo already uses the correct key in `next.config.mjs`:
```js
typedRoutes: true
```
If you still see this warning, clear stale caches and restart:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### B) `Cannot apply unknown utility class border-border`
This repo is already patched to avoid that Tailwind v4 PostCSS issue in global CSS.
If it reappears, ensure your `src/app/globals.css` does **not** use `@apply border-border` and instead uses direct CSS variable border color.

### C) Tailwind PostCSS plugin error
If you see:
> trying to use `tailwindcss` directly as a PostCSS plugin

Make sure `postcss.config.mjs` uses:
```js
plugins: {
  '@tailwindcss/postcss': {},
  autoprefixer: {}
}
```
and `@tailwindcss/postcss` is installed.

### D) Raw unstyled HTML (purple links / serif font)
Verify all three are true:
1. `src/app/globals.css` includes:
   - `@tailwind base;`
   - `@tailwind components;`
   - `@tailwind utilities;`
2. `tailwind.config.ts` content includes:
   - `./src/**/*.{js,ts,jsx,tsx,mdx}`
3. `src/app/layout.tsx` applies the Inter class from `next/font/google` to `<body>`.


### E) 404 on lesson/quiz pages from navigation
This repo now routes sidebar links to concrete seeded routes:
- `/lesson/psychology-behavioral`
- `/quiz/psychology-behavioral-quiz`

Index shortcuts are also available:
- `/lesson` → redirects to `/lesson/psychology-behavioral`
- `/quiz` → redirects to `/quiz/psychology-behavioral-quiz`


---

## Useful scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
```

## Tech Stack (Current)
- Next.js App Router + TypeScript
- Tailwind CSS + design token variables
- Zustand stores for UI/graph/learning/quiz state
- React Query + Clerk provider plumbing
- Three.js + react-force-graph-3d for the Knowledge Web
