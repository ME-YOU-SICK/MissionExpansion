# Mission Expansion — Next.js Architecture Scaffold

This repository now contains a **structural scaffold only** for a premium, large-scale Next.js App Router build.

## Directory Tree

```text
.
├── App Idea
├── README.md
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── src
    ├── app
    │   ├── (app)
    │   │   ├── dashboard
    │   │   │   └── page.tsx
    │   │   ├── graph
    │   │   │   └── page.tsx
    │   │   ├── lesson
    │   │   │   └── [lessonId]
    │   │   │       └── page.tsx
    │   │   └── quiz
    │   │       └── [quizId]
    │   │           └── page.tsx
    │   ├── (marketing)
    │   │   ├── about
    │   │   │   └── page.tsx
    │   │   ├── pricing
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── api
    │   │   ├── ai
    │   │   │   └── generate-content
    │   │   │       └── route.ts
    │   │   └── progress
    │   │       └── update
    │   │           └── route.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── features
    │   │   ├── knowledge-web
    │   │   ├── lessons
    │   │   └── onboarding
    │   ├── layout
    │   ├── ui
    │   └── webgl
    ├── lib
    │   ├── ai-prompts
    │   ├── spaced-repetition
    │   └── utils
    ├── providers
    │   └── app-providers.tsx
    ├── server
    │   ├── actions
    │   └── db
    ├── store
    │   └── slices
    └── types
        └── schemas
```

## Why this structure

- `components/webgl` is intentionally isolated to keep Three.js / force-graph rendering boundaries separate from normal React DOM composition.
- `components/features/*` organizes product code by business domain, while `components/ui` and `components/layout` stay reusable and cross-cutting.
- `lib/spaced-repetition`, `lib/ai-prompts`, and `lib/utils` preserve strict separation between heavy domain math, prompt engineering assets, and generic helpers.
- `server/db` and `server/actions` prepare for Drizzle + server action workflows without polluting client bundles.

## Status

Scaffold complete. No feature logic or visual component implementation has been added yet.
