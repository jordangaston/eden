---
title: Eden Landing Page — Technical Design
status: draft
date: 2026-03-28
---

# Eden Landing Page — Technical Design

## Overview

A static, single-page React + Tailwind CSS landing page for Eden (cloud Mac service). Deployed to Vercel. Optimized for fast load times and responsive across mobile, tablet, and desktop.

---

## Architecture

### Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Build | Vite 6 + TypeScript | Fast builds, native ESM, zero-config Vercel deploy |
| UI | React 19 | Component model, ecosystem, Vercel integration |
| Styling | Tailwind CSS v4 | Utility-first, design-token mapping, small CSS output |
| Fonts | system-ui (primary), Inter via Google Fonts (carousel) | system-ui = zero FOIT; Inter loaded async |
| Deploy | Vercel | Edge CDN, automatic preview deploys, speed |

### Project Structure

```
eden/
├── public/
│   └── mac-mini.webp              # Product image (WebP for size)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # UC-5
│   │   ├── Hero.tsx                # UC-1, UC-3
│   │   ├── ProductShowcase.tsx     # UC-1 (image + fade)
│   │   ├── AppCarousel.tsx         # UC-2
│   │   ├── Pricing.tsx             # UC-1, UC-4
│   │   ├── PricingCard.tsx         # UC-4 (individual card)
│   │   ├── CallToAction.tsx        # UC-1, UC-3
│   │   ├── Footer.tsx              # UC-6
│   │   └── RequestAccessModal.tsx  # UC-3, UC-4
│   ├── App.tsx                     # Root layout
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind directives + custom properties
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Component Design

### Color Tokens (index.css)

Defined as CSS custom properties consumed by Tailwind:

```
--color-bg:               #111111
--color-text-primary:     #F0F0F0
--color-green-accent:     #4ED87C
--color-green-text:       #4ADE80
--color-blue-link:        #2997FF
--color-text-55:          rgba(255,255,255,0.55)
--color-text-40:          rgba(255,255,255,0.40)
--color-text-30:          rgba(255,255,255,0.30)
--color-text-25:          rgba(255,255,255,0.25)
--color-card-bg:          rgba(255,255,255,0.04)
--color-card-bg-highlight:rgba(255,255,255,0.08)
--color-border-subtle:    rgba(255,255,255,0.08)
--color-border-highlight: rgba(255,255,255,0.12)
--color-divider:          rgba(255,255,255,0.06)
```

### Navbar (UC-5)

- **Desktop (lg+):** Horizontal flex, centered. Logo left-aligned within center group, nav links with gap-10.
- **Mobile (<lg):** Logo left, hamburger button right. Tapping hamburger opens a full-width slide-down menu. Links scroll to sections via `id` anchors + `scrollIntoView({ behavior: 'smooth' })`.
- **State:** `isMenuOpen: boolean` (React useState).

### Hero (UC-1, UC-3)

- Flex column, centered. Responsive typography:
  - Headline: `text-5xl md:text-7xl xl:text-[96px]`
  - Price line: same scale, green color
  - Subtext: `text-lg md:text-2xl xl:text-[28px]`
- "Get Your Mac" button calls `onRequestAccess()` prop (opens modal).
- "Learn more" scrolls to pricing section.

### ProductShowcase (UC-1)

- Mac Mini image in a relative container.
- Left/right gradient overlays: `absolute inset-y-0` divs with `bg-gradient-to-r from-[#111111] to-transparent` (and reverse).
- Bottom fade: similar vertical gradient.
- Image: `<img>` tag with `loading="eager"` (above fold), WebP format, explicit width/height for CLS prevention.

### AppCarousel (UC-2)

- **Structure:** Outer container with `overflow-x: hidden`. Inner track is a flex row containing the app names duplicated (for infinite loop effect).
- **Animation:** CSS `@keyframes scroll` — translates the track left by 50% (since content is doubled), then resets. Continuous loop.
- **Pause:** `hover:animation-play-state: paused` on desktop. Touch users scroll naturally with `overflow-x: auto` as fallback.
- **Mobile:** Touch-swipeable. The auto-scroll animation works on all sizes.
- **No JS library needed.** Pure CSS animation with duplicated content for seamless loop.

### Pricing (UC-1, UC-4)

- Section wrapper with heading + subheading + card grid.
- **Card grid responsive:**
  - Mobile: single column (`grid-cols-1`)
  - Tablet: 2 columns (`md:grid-cols-2`)
  - Desktop: 4 columns (`lg:grid-cols-4`)
- Gap: 12px (`gap-3`)
- Max-width: 1100px, centered.

### PricingCard (UC-4)

Props:
```typescript
interface PricingCardProps {
  tier: 'Small' | 'Medium' | 'Large' | 'XL'
  price: number
  specs: { cores: number; ram: string; storage: string; bandwidth: string }
  highlighted?: boolean
  onGetStarted: (tier: string) => void
}
```

- `highlighted` adds brighter background + border (Medium card).
- `onGetStarted` opens request access modal with tier pre-selected (UC-4).
- Tier label gets green color when highlighted.

### CallToAction (UC-1, UC-3)

- Same pattern as Hero section: heading, subtext, two buttons.
- "Get Your Mac" opens modal. "See pricing" scrolls to pricing section.

### RequestAccessModal (UC-3, UC-4)

- Uses native `<dialog>` element via `ref.showModal()` / `ref.close()`.
- Backdrop: default `<dialog>` backdrop styled with `::backdrop { background: rgba(0,0,0,0.7) }`.
- Closes on Escape (native behavior), backdrop click (via `onClick` on dialog checking `event.target === dialogRef`), or X button.

**Form fields:**

| Field | Type | Element | Required |
|-------|------|---------|----------|
| First name | text | `<input>` | yes |
| Last name | text | `<input>` | yes |
| Email | email | `<input type="email">` | yes |
| Size | single-select | `<select>` or radio group | yes |
| Use cases | multi-select | Checkboxes | no |

**Use case options:** AI Agents, Development, CI/CD, Testing, Design, Other.

**Size options:** Small ($5/mo), Medium ($10/mo), Large ($20/mo), XL ($40/mo).

**Pre-selection (UC-4):** Modal accepts an optional `defaultTier` prop. When opened from a pricing card, the size field is pre-populated.

**Submission:** Client-side only. On valid submit → show success state inside modal → auto-close after 2 seconds. `console.log` the form data. Backend integration deferred.

**Validation:** HTML5 native validation (`required`, `type="email"`). Styled with Tailwind's `invalid:` variant for visual feedback.

**Styling:** Dark card matching the page aesthetic — `bg-[#1a1a1a]` with subtle border, rounded-2xl. Inputs styled with dark backgrounds, subtle borders, white text. Green submit button matching CTA style.

### Footer (UC-6)

- Two rows inside a max-width 1000px container.
- Row 1: brand info (left) + link columns (right), separated by bottom border.
  - **Mobile:** Stack vertically — brand on top, then columns in a 2x2 or 3-col grid.
  - **Desktop:** Flex row, space-between.
- Row 2: copyright (left) + Privacy/Terms (right).
- All links are `#` anchors for now.

---

## Responsive Breakpoints

| Breakpoint | Width | Key changes |
|------------|-------|-------------|
| Default (mobile) | < 768px | Single column, stacked layout, hamburger nav, smaller type |
| `md` | ≥ 768px | 2-col pricing grid, larger hero text, expanded nav |
| `lg` | ≥ 1024px | 4-col pricing grid, full horizontal nav |
| `xl` | ≥ 1440px | Design-spec sizes (96px headline, exact spacing) |

Typography scale:

| Element | Mobile | md | lg/xl |
|---------|--------|----|-------|
| Hero headline | 48px | 72px | 96px |
| Hero price | 48px | 72px | 96px |
| Section headings | 36px | 48px | 56px |
| CTA heading | 40px | 52px | 64px |
| Body/subtext | 18px | 20px | 28px (hero), 21px (other) |

---

## Performance Strategy (UC-7)

### Build-time
- Vite tree-shakes unused code. Tailwind v4 purges unused utilities.
- Single JS bundle (no code splitting needed — it's one page).
- WebP product image, explicit dimensions.

### Load-time
- **Font strategy:** system-ui primary = instant render. Inter preloaded with `<link rel="preload" as="font">` for carousel only.
- **Image:** `loading="eager"` for hero product image (above fold). `fetchpriority="high"`.
- **CSS:** Inlined critical path via Vite's CSS handling.

### Vercel
- Automatic edge CDN distribution.
- `vercel.json` with cache headers for static assets (immutable hashing from Vite).
- No server-side rendering needed — pure static deploy (`vite build` → `dist/`).

---

## Data Model

### Pricing tiers (static, in-code constant)

```typescript
const PRICING_TIERS = [
  { tier: 'Small', price: 5, cores: 1, ram: '2 GB', storage: '10 GB', bandwidth: '10 Mbps' },
  { tier: 'Medium', price: 10, cores: 2, ram: '4 GB', storage: '25 GB', bandwidth: '25 Mbps', highlighted: true },
  { tier: 'Large', price: 20, cores: 4, ram: '8 GB', storage: '50 GB', bandwidth: '50 Mbps' },
  { tier: 'XL', price: 40, cores: 8, ram: '16 GB', storage: '100 GB', bandwidth: '100 Mbps' },
] as const
```

### App names (static, in-code constant)

```typescript
const APP_NAMES = ['OpenClaw', 'Claude Code', 'Codex', 'OpenCode', 'Cursor'] as const
```

### Use case options (static, in-code constant)

```typescript
const USE_CASES = ['AI Agents', 'Development', 'CI/CD', 'Testing', 'Design', 'Other'] as const
```

### Form state

```typescript
interface RequestAccessForm {
  firstName: string
  lastName: string
  email: string
  tier: 'Small' | 'Medium' | 'Large' | 'XL'
  useCases: string[]
}
```

---

## Open Questions

1. **Product image asset** — Do we have the actual Mac Mini image, or should we use a placeholder?
2. **Form backend** — When ready, where should form submissions go? (API route, email service, CRM?)
3. **Analytics** — Should we add Vercel Analytics or any tracking?
4. **Additional app names** — The carousel has 5 names currently. More to add for the infinite scroll effect?
5. **"Docs" and "Blog" links** — Will these eventually route to separate pages/subdomains?
