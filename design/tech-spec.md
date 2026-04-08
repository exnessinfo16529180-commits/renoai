# RenoAI — Technical Specification

## 1. Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Installation |
|-----------|---------|--------------|
| Button | CTAs, actions | `npx shadcn add button` |
| Card | Content containers | `npx shadcn add card` |
| Badge | Labels, tags | `npx shadcn add badge` |
| Input | Form fields | `npx shadcn add input` |
| Tabs | Budget tier switcher | `npx shadcn add tabs` |
| Progress | Progress bars | `npx shadcn add progress` |
| Separator | Visual dividers | `npx shadcn add separator` |
| Sheet | Mobile navigation drawer | `npx shadcn add sheet` |
| ScrollArea | Custom scroll | `npx shadcn add scroll-area` |

### Custom Components to Build
| Component | Purpose | Location |
|-----------|---------|----------|
| Navigation | Fixed header with blur | `src/sections/Navigation.tsx` |
| Hero | Full-screen hero section | `src/sections/Hero.tsx` |
| FlowSteps | 9-step interactive flow | `src/sections/FlowSteps.tsx` |
| StepCard | Individual step card | `src/components/StepCard.tsx` |
| DashboardPreview | UI mockup preview | `src/sections/DashboardPreview.tsx` |
| TrustSection | Safety features | `src/sections/TrustSection.tsx` |
| AudienceCards | 3 audience types | `src/sections/AudienceCards.tsx` |
| FinalCTA | Bottom call-to-action | `src/sections/FinalCTA.tsx` |
| Footer | Site footer | `src/sections/Footer.tsx` |
| GlowButton | Button with glow effect | `src/components/GlowButton.tsx` |
| GlassCard | Glassmorphism card | `src/components/GlassCard.tsx` |
| AnimatedSection | Scroll reveal wrapper | `src/components/AnimatedSection.tsx` |
| StyleCard | Interior style preview | `src/components/StyleCard.tsx` |
| BudgetToggle | Budget tier selector | `src/components/BudgetToggle.tsx` |
| ContractorCard | Brigade card | `src/components/ContractorCard.tsx` |
| Timeline | Project progress UI | `src/components/Timeline.tsx` |

### Custom Hooks
| Hook | Purpose | Location |
|------|---------|----------|
| useScrollReveal | Intersection observer for animations | `src/hooks/useScrollReveal.ts` |
| useScrollProgress | Track scroll position | `src/hooks/useScrollProgress.ts` |

---

## 2. Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero text stagger reveal | Framer Motion | `motion.div` with staggerChildren | Medium |
| Hero background parallax | Framer Motion | useScroll + useTransform | Medium |
| CTA glow pulse | CSS | @keyframes pulse animation | Low |
| Scroll reveal (sections) | Framer Motion | whileInView + viewport | Medium |
| Card hover effects | Framer Motion | whileHover scale + glow | Low |
| Step cards stagger | Framer Motion | staggerChildren variant | Medium |
| Progress bar fill | Framer Motion | animate width on inView | Low |
| Dashboard float | Framer Motion | infinite y animation | Low |
| Background glow pulse | CSS | @keyframes glow pulse | Low |
| Mobile menu slide | Framer Motion | AnimatePresence + slide | Medium |
| Button hover scale | Framer Motion | whileHover scale | Low |
| Border glow on hover | CSS | transition box-shadow | Low |
| Icon pulse | CSS | @keyframes pulse | Low |

---

## 3. Animation Library Choices

### Primary: Framer Motion
**Rationale:**
- Best React integration
- Declarative API
- Built-in scroll animations (whileInView)
- AnimatePresence for mount/unmount
- Gesture support (hover, tap)
- Layout animations

**Use for:**
- All scroll-triggered reveals
- Hover interactions
- Stagger animations
- Page transitions
- Complex sequences

### Secondary: CSS Animations
**Rationale:**
- Lightweight for simple effects
- No JS overhead
- Infinite loops (pulse, glow)

**Use for:**
- Glow pulse effects
- Simple hover transitions
- Background animations

---

## 4. Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   └── images/
│       ├── hero-bg.png
│       ├── style-minimal.jpg
│       ├── style-scandi.jpg
│       ├── style-loft.jpg
│       ├── room-before.jpg
│       └── room-after.jpg
├── src/
│   ├── sections/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── FlowSteps.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── TrustSection.tsx
│   │   ├── AudienceCards.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   ├── components/
│   │   ├── StepCard.tsx
│   │   ├── GlowButton.tsx
│   │   ├── GlassCard.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── StyleCard.tsx
│   │   ├── BudgetToggle.tsx
│   │   ├── ContractorCard.tsx
│   │   └── Timeline.tsx
│   ├── hooks/
│   │   ├── useScrollReveal.ts
│   │   └── useScrollProgress.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── components/
│   └── ui/           # shadcn components
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 5. Dependencies

### Core (Auto-installed)
- React 18+
- TypeScript
- Vite
- Tailwind CSS 3.4.19
- shadcn/ui base

### Animation
```bash
npm install framer-motion
```

### Icons
```bash
npm install lucide-react
```

### Fonts
- Inter (Google Fonts via CDN or local)

---

## 6. Color Configuration (Tailwind)

```javascript
// tailwind.config.js extend colors
colors: {
  emerald: {
    950: '#081C15',
    900: '#0F2F26',
    800: '#0B3D2E',
    700: '#166A4E',
    600: '#1F7A5C',
  },
  amber: {
    400: '#D4A853',
  }
}
```

---

## 7. Key Implementation Notes

### Glassmorphism Effect
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
```

### Glow Effect
```css
.glow-button {
  box-shadow: 0 0 20px rgba(31, 122, 92, 0.3),
              0 0 40px rgba(31, 122, 92, 0.1);
}
```

### Scroll Reveal Pattern
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

### Stagger Pattern
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

---

## 8. Responsive Strategy

### Mobile-First Approach
- Base styles for mobile
- `sm:` (640px) for small tablets
- `md:` (768px) for tablets
- `lg:` (1024px) for desktop
- `xl:` (1280px) for large desktop

### Key Breakpoints
- Navigation: hamburger → full menu at `lg`
- Flow steps: carousel → grid at `md`
- Dashboard: stacked → side-by-side at `lg`
- Audience cards: 1 col → 2 col → 3 col

---

## 9. Performance Considerations

- Use `will-change: transform, opacity` on animated elements
- Lazy load images below fold
- Use `viewport={{ once: true }}` for scroll animations
- Respect `prefers-reduced-motion`
- Optimize images (WebP format, appropriate sizes)
