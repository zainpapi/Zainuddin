# ZAIN.DEV — Comic Portfolio of Zain Uddin

A hand-coded, zero-build comic-book portfolio. Two sites in one:
**Cadet Zain** (light comic mode) and **Phantom Ops** (dark alter-ego, press `/`).

## Stack

- Vanilla HTML/CSS/JS — no framework, no bundler
- GSAP 3.12.5 + ScrollTrigger (animations, pinned sections)
- Lenis 1.1.18 (smooth scroll)
- Hand-rolled verlet physics on `<canvas>` (the swinging ghost / phantom drone)
- 1 serverless function (`api/pip.js`) powering **Pip**, the AI guide bot

## Run locally

Any static server from this folder works, e.g.:

```bash
npx serve .
# or
python -m http.server 3000
```

Note: the chatbot needs the serverless function, so locally it falls back
to the built-in offline brain (still works — no key needed).

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Other** (it's a static site + one serverless function).
4. (Optional) For the smart Pip brain, add env vars:
   - `OPENROUTER_API_KEY` — free keys at openrouter.ai
   - `PIP_MODEL` — e.g. `meta-llama/llama-3.2-3b-instruct:free`
   Without a key, Pip uses the offline canned brain.

## Customize

- Copy lives in `index.html` (and the theme swaps in `js/app.js` → `TEXT_SWAPS` / `IMG_SWAPS`)
- Colors live in `css/style.css` (`:root` + `body.phantom`)
- Art: all `assets/*.svg` are hand-drawn pop-art SVGs — edit freely
- When you get a public email, swap the contact button + JSON-LD in `index.html`

## Structure

```
site/
├── index.html          # the whole page + SEO + JSON-LD
├── css/style.css       # design system + both themes
├── css/pip.css         # chatbot styles
├── js/app.js           # physics + scroll choreography + theme engine
├── js/pip.js           # chatbot frontend (talks to /api/pip)
├── api/pip.js          # serverless brain (key stays server-side)
└── assets/             # avatar, project shots, SVG comic art, OG image
```
