---
title: Eden Landing Page — Use Cases
status: draft
date: 2026-03-28
---

# Eden Landing Page — Use Cases

## System Purpose

A single-page marketing landing page for Eden, a cloud Mac service. The page presents the product value proposition, pricing tiers, and a request-access form. It must load fast, look sharp on all screen sizes, and convert visitors into access requests.

## Actors

| Actor | Description |
|-------|-------------|
| **Visitor** | Anyone who lands on the page — potential customer |

## Preconditions

- Page is deployed and publicly accessible on Vercel
- No authentication required

---

## UC-1: View Landing Page

**Goal:** Visitor understands Eden's value proposition and pricing at a glance.

**Trigger:** Visitor navigates to the Eden URL.

**Main Flow:**

1. Page loads. Visitor sees the navbar, hero section with headline ("Get a Mac in the cloud / For $5/month."), subtext, and two CTA buttons.
2. Visitor scrolls down to the product showcase — a Mac Mini image and the "Use your favorite Mac apps" carousel.
3. Visitor scrolls to the pricing section — four tier cards (Small $5, Medium $10, Large $20, XL $40) with specs.
4. Visitor scrolls to the bottom CTA — "Ready to get your Mac?" with action buttons.
5. Visitor sees the footer with product, company, and community links.

**Extensions:**

- 1a. Page loads on a mobile device: Layout adapts — stacked sections, smaller typography, hamburger nav, vertically stacked pricing cards.
- 1b. Page loads on a tablet: Layout adapts — intermediate sizing, 2-column pricing grid.

---

## UC-2: Browse App Carousel

**Goal:** Visitor sees which Mac apps are supported.

**Trigger:** Visitor reaches the "Use your favorite Mac apps" section.

**Main Flow:**

1. Visitor sees a horizontally scrolling carousel of app names (OpenClaw, Claude Code, Codex, OpenCode, Cursor).
2. Carousel auto-scrolls continuously. Visitor can also scroll manually by dragging or swiping.

**Extensions:**

- 2a. On mobile: Carousel is swipeable with touch gestures. Scroll indicators visible.
- 2b. On desktop: Carousel scrolls via mouse drag or trackpad. Auto-scroll pauses on hover.

---

## UC-3: Request Access via "Get Your Mac"

**Goal:** Visitor submits their information to request access to Eden.

**Trigger:** Visitor clicks any "Get Your Mac" button (hero section or bottom CTA).

**Main Flow:**

1. A modal dialog opens over the page with the title "Request Access".
2. Visitor fills in the form:
   - First name (text, required)
   - Last name (text, required)
   - Email (email, required)
   - Size interested in (single-select: Small, Medium, Large, XL)
   - Use cases (multiple-choice checkboxes: e.g., AI Agents, Development, CI/CD, Testing, Design, Other)
3. Visitor clicks "Submit".
4. Form validates all required fields. Validation passes.
5. Success message displays. Modal closes after a brief delay (or visitor dismisses it).

**Extensions:**

- 4a. Validation fails (missing required field or invalid email): Inline error messages appear on the offending fields. Form does not submit.
- 1a. Visitor clicks outside the modal or presses Escape: Modal closes without submitting.
- 1b. Visitor clicks the modal's close button (X): Modal closes without submitting.

**Notes:** No backend for now — form submission is client-side only (logs to console or shows success). Backend integration is a future concern.

---

## UC-4: Request Access via Pricing Card

**Goal:** Visitor requests access with a specific tier pre-selected.

**Trigger:** Visitor clicks "Get started ›" on any pricing card.

**Main Flow:**

1. The request access modal opens (same as UC-3).
2. The "Size interested in" field is pre-populated with the tier the visitor clicked (Small, Medium, Large, or XL).
3. Flow continues from UC-3 step 2.

---

## UC-5: Navigate via Navbar

**Goal:** Visitor jumps to a page section quickly.

**Trigger:** Visitor clicks a navbar link (Features, Pricing, Docs, Blog).

**Main Flow:**

1. Visitor clicks "Pricing".
2. Page smooth-scrolls to the pricing section.

**Extensions:**

- 1a. On mobile, visitor taps the hamburger icon: A mobile menu slides open with the same links. Tapping a link scrolls to the section and closes the menu.
- 1b. "Docs" and "Blog" links: These are placeholder links for now (no destination). They are `#` anchors or disabled.

---

## UC-6: Navigate via Footer

**Goal:** Visitor finds secondary links (About, Blog, GitHub, etc.).

**Trigger:** Visitor scrolls to the footer.

**Main Flow:**

1. Visitor sees footer columns: Product (Features, Pricing, Docs), Company (About, Blog, Contact), Community (GitHub, X, Discord).
2. Visitor clicks a link.

**Notes:** All footer links are placeholder `#` anchors for now.

---

## UC-7: View Page on Slow Connection

**Goal:** Page remains usable even on slower connections.

**Trigger:** Visitor loads the page on a 3G or throttled connection.

**Main Flow:**

1. HTML and critical CSS load first. Text content is readable before images/fonts finish loading.
2. Product image loads progressively (or shows a placeholder).
3. Fonts load — system-ui is the primary font so there is no FOIT for body text. Inter loads async for the carousel section.

**Notes:** This is a performance concern, not a UI flow. Addressed through build optimization (Vite code splitting, font preloading, image optimization).
