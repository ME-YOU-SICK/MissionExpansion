# Mission Expansion

Mission Expansion is scaffolded as a premium **Next.js App Router** platform for lifelong learning, combining a high-performance WebGL knowledge graph with rigorous learning-state, retention, and backend content pipelines.

## Tech Stack & Architecture

### 1) WebGL & Graph
- **@react-three/fiber**: React renderer for Three.js so our graph scene can be composed declaratively while staying performant.
- **@react-three/drei**: Provides production-ready helpers (controls, effects, abstractions) to accelerate premium 3D scene development.
- **three**: Core 3D engine used to render and animate the Knowledge Web.
- **react-force-graph-3d**: Supplies force-directed graph rendering primitives for large, interactive node-link datasets.
- **d3-force**: Handles graph physics simulation (repulsion, attraction, stabilization) for natural node layout.

### 2) UI & Styling
- **tailwindcss**: Utility-first styling system for fast, consistent, design-token-driven UI implementation.
- **tailwind-merge**: Resolves conflicting Tailwind classes when building dynamic component APIs.
- **clsx**: Conditionally composes class names for ergonomic variant-based styling.
- **tailwindcss-animate**: Standardized animation utility layer compatible with modern utility-first workflows.
- **@radix-ui/react-slot**: Composition primitive for building accessible, polymorphic UI foundations.
- **class-variance-authority**: Centralizes component variant logic (size, intent, state) in a typed, scalable API.
- **lucide-react**: Clean, consistent icon set aligned with premium product aesthetics.

### 3) Animations
- **framer-motion**: Declarative interaction and layout animation system for smooth UI transitions.
- **gsap**: High-performance imperative timeline engine for advanced motion choreography.
- **@gsap/react**: React integration for GSAP lifecycle-safe animations.
- **@studio-freight/lenis**: Smooth scrolling engine for polished, high-end motion feel.
- **use-sound**: Lightweight hook for audio micro-interactions and feedback loops.
- **canvas-confetti**: Controlled reward/celebration effects for mastery milestones.

### 4) Forms, State & Logic
- **react-hook-form**: Performant form state management for quiz flows and complex user input.
- **zod**: Runtime schema validation for reliable, typed domain contracts.
- **date-fns**: Deterministic date/time utilities for retention and spaced repetition scheduling.
- **zustand**: Lightweight global state store for client-side learning/session state slices.
- **@hookform/resolvers**: Bridges schema validators like Zod into form validation pipelines.

### 5) Data & DB
- **@tanstack/react-query**: Fetching/caching/mutation orchestration for resilient client-server data workflows.
- **drizzle-orm**: Type-safe ORM for PostgreSQL-backed domain modeling and persistence.
- **superjson**: Preserves rich JS data types across serialization boundaries.
- **postgres**: Minimal PostgreSQL driver for runtime DB connectivity.

### 6) Auth
- **@clerk/nextjs**: Managed authentication and session infrastructure for secure user access.

### 7) AI
- **ai**: Vercel AI SDK abstraction for provider-agnostic AI workflows in app/server contexts.
- **openai**: Official OpenAI client for staged content generation pipelines.

### 8) Dev & DB Tools
- **drizzle-kit**: Migration and schema tooling for Drizzle workflows.
- **eslint**: Static analysis and code quality enforcement.
- **prettier**: Consistent automated formatting across the repository.
- **vitest**: Fast unit/integration test runner for logic-heavy modules.
- **@testing-library/react**: User-centric React component testing utilities.

## Current Scaffold Focus

This iteration intentionally provides **configuration and platform plumbing only**:
- Next.js App Router structure in `src/app`
- Provider composition in `src/providers/app-providers.tsx`
- Clerk middleware at repository root (`middleware.ts`)
- Drizzle configuration skeleton (`drizzle.config.ts`)
- Shared utility foundation (`src/lib/utils/cn.ts`)

No feature UIs, graph rendering components, or learning algorithms are implemented in this step.
