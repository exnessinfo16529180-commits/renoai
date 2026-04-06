# RenoAI — AI-платформа для ремонта

Premium mobile-first MVP website for RenoAI, built with Next.js, Tailwind CSS, and Framer Motion.

---

## What is RenoAI?

RenoAI is an AI-powered renovation platform that combines design, budget estimation, and project management into one seamless experience. The website presents the product in a premium, minimal, and investor-ready format.

---

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** — smooth animations
- **Lucide React** — icons
- **TypeScript**

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Media Asset Placement

The website supports video and image backgrounds. Place your media files in the correct locations for automatic use:

### Intro / Hero Video

```
/public/assets/intro-video.mp4
```

- Used as the full-screen background video in the Hero section
- Should be cinematic, atmospheric, and muted-friendly
- Recommended: 1920x1080 or 4K, loopable, under 10MB compressed
- The page gracefully falls back to the static image if the video is missing or fails to load

### Hero Background Image

```
/public/assets/final-hero-bg.jpg
```

- Used as a static fallback if the video is unavailable
- Recommended: 2560x1440 minimum, landscape orientation
- Should show a premium interior / renovation context
- The page gracefully falls back to an animated gradient if the image is also missing

### Fallback Behavior

| Condition | What shows |
|-----------|-----------|
| Video present & loads | Full video background |
| Video missing / error | Static hero image |
| Both missing | Premium dark gradient with grid overlay |

No code changes needed — just place the files and refresh.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Brand design system, CSS variables
├── components/
│   ├── LoadingIntro.tsx    # Animated loading screen on first visit
│   ├── HeroSection.tsx     # Hero with video/image background + CTAs
│   ├── AboutSection.tsx    # Value proposition — 3 cards
│   ├── HowItWorks.tsx      # 4-step process flow
│   ├── ProductFlow.tsx     # Interactive mobile app preview
│   ├── Benefits.tsx        # Why RenoAI — benefit cards
│   ├── FinalCTA.tsx        # Final call-to-action section
│   ├── Footer.tsx          # Minimal premium footer
│   └── StickyCTA.tsx       # Sticky bottom CTA bar (mobile)
└── lib/
    └── utils.ts            # Utility function (cn)

public/
└── assets/
    ├── intro-video.mp4     # ← Place your video here
    └── final-hero-bg.jpg   # ← Place your hero image here
```

---

## Brand Colors

| Name | Hex |
|------|-----|
| Background | `#081512` |
| Brand Green | `#123C33` |
| Secondary Green | `#0F3D2E` |
| Gold Accent | `#C89B3C` |
| Main Text | `#F5F7F6` |
| Muted Text | `#9BA8A3` |

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect Next.js — no configuration needed
4. Click **Deploy**

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Manual Deployment Commands

```bash
# Install
npm install

# Build
npm run build

# Start production server
npm start
```

### Environment Variables

No environment variables required for the MVP version.

---

## Customization

- **Colors**: Edit CSS variables in `src/app/globals.css` under `@theme`
- **Copy**: All Russian text is directly in each component file
- **CTAs**: Button actions (href/onClick) are placeholders — wire them to your backend
- **Contact email**: Update `hello@renoai.kz` in `Footer.tsx`
- **Social links**: Update hrefs in `Footer.tsx`

---

## License

Private — RenoAI © 2026
