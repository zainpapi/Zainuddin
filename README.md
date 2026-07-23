# Zain Uddin — 3D Portfolio

A premium, glassmorphic portfolio with a real-time 3D layer: a flowing aurora shader, refractive glass objects (true light-bending glass via `MeshTransmissionMaterial`), frosted-glass UI panels, and buttery smooth scroll. Built to be a deliberate departure from my earlier cyberpunk-themed portfolio — calmer, more editorial, more premium.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **three** + **@react-three/fiber** + **@react-three/drei** — declarative WebGL
- **@react-three/postprocessing** — bloom + vignette
- **framer-motion** — scroll reveals, 3D card tilt
- **lenis** — smooth scrolling
- **Tailwind CSS v4** — styling (CSS-based config in `app/globals.css`)
- Fonts: **Space Grotesk** (display) + **Inter** (body) via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build & run:

```bash
npm run build
npm run start
```

## Editing content

All content lives in **`src/data/site.ts`** — no need to touch components.

- `site` — your name, role, tagline, positioning line, email, socials
- `skills` — the four skill clusters shown in the Skills grid
- `projects` — the projects shown in the Work section (each links to a live site)
- `journey` — the timeline milestones
- `navLinks` — the top navigation

To add a project, append an object to the `projects` array:

```ts
{
  id: "new-project",
  name: "New Project",
  year: "2026",
  role: "Developer",
  description: "What it does, in one or two sentences.",
  stack: ["Next.js", "TypeScript"],
  href: "https://your-live-url.example",
  accent: "indigo", // "indigo" | "violet" | "teal"
}
```

## How it's structured

```
app/
├── layout.tsx           # fonts, metadata, skip-link, SmoothScroll
├── page.tsx             # composes the canvas + all sections
└── globals.css          # theme tokens, glass utilities, type scale

src/
├── three/               # the WebGL background layer
│   ├── BackgroundCanvas.tsx  # fixed <Canvas>: lights, env, postprocessing
│   ├── AuroraShader.tsx      # flowing aurora (custom fragment shader)
│   ├── GlassObjects.tsx      # refractive glass shapes (transmission material)
│   ├── ParticleField.tsx     # floating depth particles
│   └── ParallaxRig.tsx       # mouse/scroll parallax group
├── components/
│   ├── sections/        # Hero, Statement, Skills, Projects, Journey, Contact
│   ├── GlassCard.tsx    # reusable frosted-glass card w/ 3D cursor tilt
│   ├── Nav.tsx · Loader.tsx · ScrollHint.tsx · Icon.tsx
│   ├── AuroraIntensity.tsx   # ramps the aurora up near the Contact finale
│   └── SmoothScroll.tsx      # Lenis provider
├── lib/                 # motion variants + media-query hooks
└── data/                # all editable content
```

## Performance & accessibility

- Background `<Canvas>` is lazy-loaded (`ssr: false`) so first paint is fast.
- DPR capped (`[1, 1.75]` desktop, `[1, 1.4]` touch); lower particle count + simpler materials on touch.
- `prefers-reduced-motion`: disables Lenis smoothing, the aurora drift, card tilt, and postprocessing.
- All content is real semantic HTML over the canvas — the 3D is decorative, never the only carrier of information. Skip-link, focus-visible rings, keyboard-navigable links, and landmark roles throughout.

## Deploy

Optimized for **Vercel**:

1. Push this folder to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset auto-detects Next.js — no env vars needed. Deploy.

Any static host that runs `next build` / `next start` (or the `@vercel/next` adapter) works too.
