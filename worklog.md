---
Task ID: 2-backend
Agent: general-purpose (contact backend)
Task: Build contact form API route + Prisma schema for storing messages

Work Log:
- Read existing project state: confirmed `prisma/schema.prisma` already had `User` and `Post` models on SQLite; `src/lib/db.ts` already exported a `PrismaClient` singleton (left unchanged — it already follows the standard globalThis pattern).
- Appended a `ContactMessage` model to `prisma/schema.prisma` (cuid id, name, email, subject with `@default("General Inquiry")`, message, createdAt `@default(now())`, read `@default(false)`) without touching the existing models.
- Ran `bun run db:push` — succeeded: database synced in 23ms, Prisma Client v6.19.2 regenerated. New `ContactMessage` table now exists in `/home/z/my-project/db/custom.db`.
- Created `/home/z/my-project/src/app/api/contact/route.ts` with:
  - A `POST` Route Handler that parses JSON, validates with a `zod` schema (name 2–80, valid email, subject 2–120 with `default("General Inquiry")`, message 10–2000), returns 422 with `zodError.flatten()` on validation failure, inserts via `db.contactMessage.create` inside try/catch (500 on DB error), and returns 201 with the success message on insert.
  - A `GET` health-check handler returning `{ ok: true, service: "contact", method: "POST" }`.
  - No `"use client"`, no server actions, no z-ai-web-dev-sdk import.
- Ran `bun run lint` — passed with zero errors/warnings across the project.
- Ran `bunx tsc --noEmit` to confirm no TypeScript errors in the files I created/edited (only pre-existing errors in `examples/` and `skills/` dirs, which are outside my scope and eslint-ignored).

Stage Summary:
- Prisma schema now contains a `ContactMessage` model and the SQLite DB is in sync.
- Contact API endpoint live at `POST /api/contact` (with `GET /api/contact` for health checks).
- `src/lib/db.ts` singleton was already correct — no changes needed.
- Lint clean; TypeScript clean for all touched files.
- Backend is ready for the frontend agent to wire up the contact form to `POST /api/contact` with the documented JSON shape.

---
Task ID: 1-frontend (main)
Agent: Z.ai Code (lead frontend)
Task: Build the complete premium dark-mode portfolio for Jibril Nuredin (all 10 sections + design system + interactions)

Work Log:
- Audited existing scaffold: Next.js 16 + Tailwind v4 (oklch tokens) + framer-motion + next-themes + full shadcn/ui (New York). Dev server already running on :3000.
- Redesigned `src/app/globals.css` with a dark-first palette: deep near-black background (oklch 0.07), electric-blue primary (oklch 0.62 0.2 255), soft white text. Added utilities: `.glass`, `.glass-strong`, `.glass-blue`, `.text-gradient`, `.text-gradient-blue`, `.glow-blue`, `.grid-bg`, `.dot-bg`, mask helpers, 3D perspective. Added keyframes (aurora, float-slow, shimmer, pulse-ring, marquee) + custom scrollbar + reduced-motion guard.
- Updated `src/app/layout.tsx`: hardcoded `className="dark"` on `<html>` (no theme flash / hydration risk), premium SEO metadata + OpenGraph/Twitter/robots, JSON-LD Person schema, theme-color viewport, Sonner toaster.
- Created `src/lib/portfolio-data.ts` — single source of truth for all content (journey, services, projects+filters, skills, interests, leadership pillars, testimonials, socials, vision).
- Built shared primitives: `reveal.tsx` (scroll Reveal + stagger variants), `section-heading.tsx`, `use-active-section.ts`, `use-scrolled.ts`.
- Built all 10 sections as `src/components/portfolio/*`:
  - `loading-screen.tsx` — elegant loader (JN monogram + shimmer bar), fades ~1.6s, respects reduced-motion.
  - `navbar.tsx` — glass sticky nav, scroll-aware, active-section highlight (layoutId pill), animated mobile sheet.
  - `hero.tsx` — aurora + grid background, word-by-word headline reveal, identity glass card, View Projects / Contact Me CTAs.
  - `journey.tsx` — scroll-driven gradient progress line, alternating timeline.
  - `what-i-do.tsx` — 6 service cards with cursor spotlight hover.
  - `projects.tsx` — animated filtering (AnimatePresence + layout), abstract CSS project mockups, case-study Dialog (Problem/Solution/Impact/Tech).
  - `peak-craft.tsx` — featured PR panel + leadership pillars.
  - `skills.tsx` — interactive category tabs + animated proficiency bars.
  - `beyond-coding.tsx` — interest cards.
  - `vision.tsx` — aspirational statement + stats.
  - `testimonials.tsx` — testimonial cards (prepared for future).
  - `contact.tsx` — react-hook-form + zod, posts to /api/contact, Sonner toasts, social links.
  - `footer.tsx` — sticky (mt-auto) footer with nav, socials, back-to-top.
- Composed everything in `src/app/page.tsx` with a `min-h-screen flex flex-col` wrapper (sticky-footer rule).
- Added `src/app/sitemap.ts` for SEO.
- Fixed mobile horizontal overflow by adding `overflow-hidden` to sections containing decorative glow blobs (Projects, PeakCraft, Skills, Vision, Contact).

Stage Summary:
- Full 10-section premium dark-mode portfolio shipped on `/`, fully responsive, sticky footer, no hydration errors.
- Agent Browser verification (desktop + mobile 390px): page fully renders, no console/runtime errors, no horizontal overflow (scrollWidth === innerWidth).
- Golden path verified end-to-end: project filter (AI→1 result), case-study dialog (full Problem/Solution/Impact), and contact form → POST /api/contact 201 → persisted in SQLite ("Ada Lovelace" row confirmed).
- VLM visual audit (hero + full-page): "all sections have content, no layout issues, cohesive premium dark-mode design."
- `bun run lint` clean.

---
Task ID: 3-hero-roles
Agent: Z.ai Code (lead frontend)
Task: Add PR role, SMM, and Content Creator to the Hero identity card roles; add Canva to the tool chips

Work Log:
- Viewed the user's uploaded screenshot (Hero identity card) via VLM to confirm target area.
- Updated `src/components/portfolio/hero.tsx`:
  - Identity card subtitle: "Builder · Designer · Leader" → "Engineer · PR Lead · SMM · Creator".
  - Meta lines: replaced single `lead: peak_craft.pr` with explicit `pr: peak_craft.head`, `smm: social_media_mgr`, `content: creator` (kept role/edu/focus).
  - Stack chips: added "Canva" → React, Next.js, Node, Figma, Canva, MongoDB, Tailwind.
  - Subheadline: expanded to "...designer, PR lead, social media manager, and content creator...".
  - Meta row under CTAs: added a third pill "SMM · Content Creator" (with PenTool icon), imported PenTool from lucide-react.
  - Fixed a duplicate divider line introduced during the edit.
- `bun run lint` clean.
- Agent Browser verification: all new text renders (Engineer · PR Lead · SMM · Creator; pr/smm/content meta lines; Canva chip; SMM · Content Creator pill), no runtime errors.
- VLM visual audit: card layout clean (no overlap/cutoff), Canva visible, PR/SMM/content-creator roles shown.

Stage Summary:
- Hero identity card now reflects the full role set (Engineer, PR Lead, SMM, Content Creator) and Canva is part of the toolkit — consistent across the card subtitle, mono meta lines, the subheadline, and the meta pill row.

---
Task ID: 4-avatar-particles
Agent: Z.ai Code (lead frontend)
Task: Add an avatar image to Jibril Nuredin's profile card; add a cursor-reactive particle background to the hero section

Work Log:
- Reviewed user's two uploaded images via VLM: image 1 = current profile card (context), image 2 = the avatar to use.
- Copied the uploaded avatar to `public/avatar.png` (645x637 PNG, RGBA).
- Created `src/components/portfolio/particle-field.tsx`: a canvas-based particle constellation.
  - DPR-aware sizing to the hero parent, density scales with area (40–110 particles), capped for perf.
  - Particles drift slowly with baseline random motion + friction; wrap around edges.
  - Cursor repulsion: particles within 130px of the cursor are pushed away; connecting lines drawn between particles within 120px (opacity by distance); extra brighter lines link particles to the cursor.
  - Electric-blue dot/line colors to match brand.
  - Respects `prefers-reduced-motion` (renders a single static frame).
  - Cleans up listeners + cancels rAF on unmount.
- Updated `src/components/portfolio/hero.tsx`:
  - Imported and mounted `<ParticleField />` inside the hero (between ambient aurora layer and bottom fade).
  - Replaced the "JN" gradient-initials avatar block with an `<img src="/avatar.png">` (rounded-xl, object-cover, ring-1 ring-white/15), keeping the green online-status dot.
- `bun run lint` clean.
- Agent Browser verification: avatar image loads (naturalWidth 645, complete=true), particle canvas present (1440x900), no runtime errors.
- Canvas pixel sampling confirms active drawing (~91–96 lit sample points) and the count shifts on mousemove → cursor reactivity is live.
- VLM visual audit: avatar visible in card, particles + connecting lines visible in background, layout clean.

Stage Summary:
- Jibril's profile card now shows the uploaded avatar instead of "JN" initials.
- Hero background is now a dynamic, cursor-reactive particle constellation (electric-blue dots + connection lines that respond to mouse movement), layered over the existing aurora/grid ambiance.

---
Task ID: 5-card-follow-cursor
Agent: Z.ai Code (lead frontend)
Task: Make the floating identity card in the hero follow the cursor

Work Log:
- Reviewed the uploaded screenshot via VLM — confirmed the target is the floating profile/identity card.
- Refactored `src/components/portfolio/hero.tsx` identity card:
  - Added cursor-follow motion values (mvX/mvY normalized -1..1 from card-relative pointer position).
  - `rotateX`/`rotateY` springs (±10°) → the card tilts in 3D toward the cursor.
  - `shiftX`/`shiftY` springs (±6px) → subtle magnetic translate so the card drifts toward the cursor.
  - `transformPerspective: 1000` on the style for proper 3D.
  - Cursor-following radial glare inside the card (data-card-glare + --mx/--my CSS vars), visible on hover.
  - Entrance animation kept (opacity + y); rotate now driven by motion values instead of the old fixed `rotateX: 8 → 0`.
  - `prefers-reduced-motion` guard: tilt/shift/glare disabled when reduced motion is requested.
  - onMouseLeave resets motion values to 0 so the card settles back to neutral.
- `bun run lint` clean.
- Agent Browser verification: card renders, no runtime errors. Transform matrix confirmed identity at rest and a matrix3d with rotation (~7.5°) + translation after cursor move → tilt + magnetic follow is live.
- VLM visual audit: card rendered correctly (avatar, name, roles, tech tags all visible), subtle 3D tilt present, blue glare highlight visible, no layout problems.

Stage Summary:
- The floating identity card now actively follows the cursor: it tilts in 3D toward the pointer, drifts slightly toward it (magnetic), and a blue glare tracks the cursor across the card surface. Settles back to neutral when the cursor leaves. Respects reduced-motion.

---
Task ID: 6-global-particles
Agent: Z.ai Code (lead frontend)
Task: Apply the cursor-reactive particle field to all sections (make it a global dynamic background)

Work Log:
- Rewrote `src/components/portfolio/particle-field.tsx` to be a global layer:
  - Canvas is now `position: fixed; inset: 0; z-index: -1` — a single full-viewport layer behind all page content.
  - Sizes to `window.innerWidth/innerHeight` (viewport), DPR-aware.
  - Density scales with viewport area (36–100 particles), tuned slightly down for always-on perf.
  - Cursor tracking via window mousemove (clientX/clientY) so reactivity works anywhere on the page, not just the hero.
  - Added `visibilitychange` pause (stops rAF when tab hidden) to save CPU.
  - Kept prefers-reduced-motion guard (single static frame) and full listener cleanup.
  - Kept electric-blue dots + connection lines + cursor-link lines; alphas kept subtle so text stays readable.
- Removed `<ParticleField />` (and its import) from `src/components/portfolio/hero.tsx` — the hero now only keeps its aurora/grid ambient layer; particles come from the global instance.
- Mounted `<ParticleField />` as the first child of the page wrapper in `src/app/page.tsx` so it spans every section.
- Stacking verified: particles (z-[-1]) sit above section ambient blobs (z-[-10]) but below all content → soft color washes, then crisp particles, then content.
- `bun run lint` clean.
- Agent Browser verification: single canvas, position fixed, z-index -1, full viewport (1440x900), no runtime errors. Pixel sampling confirms active drawing and cursor reactivity (lit samples 29 at rest → 43 with cursor active).
- VLM visual audit: particles + connection lines confirmed visible in Skills section and Contact section (representative of all sections since canvas is fixed). Text readability confirmed intact (headline/buttons/card clearly readable; particles subtle).

Stage Summary:
- The particle constellation is now a global, always-on dynamic background behind every section of the portfolio. Move the cursor anywhere on the page and particles repel + link to it. Pauses when the tab is hidden and respects reduced-motion.

---
Task ID: 7-tilt-everywhere
Agent: Z.ai Code (lead frontend)
Task: Make every card-like element across all sections follow the cursor (3D tilt + glare) like the hero identity card

Work Log:
- Created `src/components/portfolio/tilt.tsx` with three exports:
  - `useTilt<T>(max)` hook: generic over host element type (div/button/anchor). Returns `{ ref, onMouseMove, onMouseLeave, style }`. Uses useMotionValue + useSpring + useTransform for smooth rotateX/rotateY (±max°) toward the cursor, transformPerspective: 1000, and sets `--tilt-mx/--tilt-my` CSS vars for a cursor-following glare. Handlers memoized via useCallback, style via useMemo, destructured at call sites to satisfy the react-hooks/refs lint rule.
  - `TiltGlare` component: absolute radial-gradient overlay using the inherited `--tilt-mx/my` vars, `rounded-[inherit]`, visible on `group-hover/tilt`.
  - `TiltCard` component: a motion.div that wires the hook + glare, adds `group/tilt`, and spreads framer props (variants/initial/animate/transition) so it can participate in stagger entrances.
- Key fix: removed all Tailwind `hover:-translate-y-*` utilities from tilt cards (they write to `transform`, which conflicts with framer-motion's motion-value transform); kept hover bg/ring feedback instead.
- Applied tilt to every card section:
  - `journey.tsx`: timeline cards → TiltCard (the card from the user's screenshot).
  - `what-i-do.tsx`: service cards → TiltCard (removed the old custom spotlight; TiltCard glare replaces it).
  - `beyond-coding.tsx`: interest cards → TiltCard.
  - `testimonials.tsx`: testimonial cards → TiltCard.
  - `peak-craft.tsx`: featured PR panel + leadership pillars → TiltCard (pillars max=6).
  - `skills.tsx`: skill-bars panel → TiltCard.
  - `projects.tsx`: project cards → useTilt<HTMLButtonElement> hook on the existing motion.button (kept `layout` for filtering) + TiltGlare, max=6.
  - `contact.tsx`: social link cards → new SocialCard component using useTilt<HTMLAnchorElement> + TiltGlare on motion.a, max=6. (Form panel intentionally left flat to avoid tilting inputs while typing.)
- `bun run lint` clean (after destructuring ref/handlers at all call sites to satisfy react-hooks/refs).
- Agent Browser verification: no runtime errors. Tilt confirmed active on Journey card (matrix3d ~3.4° rotation), What I Do card, and Projects card (~2.4°). Mobile: no horizontal overflow (390=390), tilt works on touch-sized viewport.
- Project filter still works with tilt (Design → 2 cards, layout animation coexists with tilt motion values).
- VLM visual audit: project cards show subtle 3D tilt + soft blue glare following the cursor; layout clean.

Stage Summary:
- Every card across the portfolio (Journey, What I Do, Projects, Peak Craft, Skills, Beyond Coding, Testimonials, Contact socials) now follows the cursor with the same 3D tilt + cursor-tracking blue glare as the hero identity card. Entrance/stagger animations preserved; filter layout animations preserved; reduced-motion respected; lint clean; mobile overflow-free.

---
Task ID: 8-pcic-live-project
Agent: Z.ai Code (lead frontend)
Task: Showcase the real PCIC Management System (live at pcic.tech) as a featured project with the 3 uploaded screenshots + live links; add pcic.tech / pcic.tech/peak-projects links

Work Log:
- Reviewed the 3 uploaded screenshots via VLM — all are real pages of the PCIC Management System (Dashboard, Events, Members) at pcic.tech.
- Copied the screenshots to public/projects/: pcic-dashboard.png, pcic-events.png, pcic-members.png.
- Extended the `Project` type in `src/lib/portfolio-data.ts` with optional `screenshots[]`, `liveUrl`, and `featured` fields.
- Replaced the placeholder "Peak Craft Community Platform" project with a real **PCIC Management System** project: live tagline, real Problem/Solution/Impact copy (spreadsheets → one platform; 27+ members; 81% active rate), metrics (Status: Live / Members managed: 27+ / Active rate: 81%), year 2025, featured:true, liveUrl https://pcic.tech, and the 3 screenshots with captions.
- Added `pcic` and `peakProjects` links to the `socials` object (pcic.tech + pcic.tech/peak-projects).
- Updated `src/components/portfolio/projects.tsx`:
  - New `ProjectThumbnail`: shows the first real screenshot (object-cover, object-top, subtle hover scale + dark gradient) when `screenshots` exist, else falls back to the abstract mockup. Adds an animated green "Live" badge when `liveUrl` exists.
  - New `ScreenshotGallery`: used in the dialog — large main image with caption overlay + thumbnail switcher (clickable, animated crossfade between screenshots, active thumbnail ringed in blue). Falls back to mockup when no screenshots.
  - Card thumbnail now uses `ProjectThumbnail`; dialog now uses `ScreenshotGallery` (keyed by project id so the gallery index resets per project).
  - Dialog header now shows a "Featured" badge for featured projects.
  - Added a "Visit live site" button at the bottom of the dialog for projects with `liveUrl` (links to pcic.tech, opens new tab, shows the domain).
- Updated `src/components/portfolio/peak-craft.tsx` featured panel: added two live links — a primary "Live: pcic.tech" button (→ socials.pcic) and a secondary "Peak Projects" button (→ socials.peakProjects).
- `bun run lint` clean.
- Agent Browser verification: PCIC card renders with real dashboard screenshot (naturalWidth 1920, complete), green Live badge present, name "PCIC Management System". Dialog opens with 3-thumbnail gallery (Dashboard/Events/Members) — thumbnail switcher confirmed (click Events → Events caption/image). "Visit live site" link → https://pcic.tech. Peak Craft section has both "Live: pcic.tech" and "Peak Projects" links (→ pcic.tech/peak-projects). No runtime errors. Mobile: no horizontal overflow (390=390).
- VLM visual audit: top-left project card titled "PCIC Management System" shows a real software dashboard screenshot (not an abstract mockup) with a green "Live" badge in the top-right.

Stage Summary:
- The PCIC Management System is now the flagship featured project with real Dashboard/Events/Members screenshots (gallery + thumbnails in the case-study dialog), a "Live" badge, a "Visit live site" CTA to pcic.tech, and real impact metrics. The Peak Craft leadership section now links to pcic.tech (Live) and pcic.tech/peak-projects. Other projects keep their abstract mockups via the fallback. Lint clean, mobile-verified.

---
Task ID: 9-hu-student-debt
Agent: Z.ai Code (lead frontend)
Task: Add the HU Student Debt System as a second featured project with 4 real screenshots

Work Log:
- Reviewed the 4 uploaded screenshots via VLM: (1) admin login page, (2) admin dashboard with collections/outstanding debt, (3) student mobile app Make-a-Payment screen, (4) student mobile app dashboard.
- Copied screenshots to public/projects/: debt-admin-login.png, debt-admin-dashboard.png, debt-mobile-payment.png, debt-mobile-dashboard.png.
- Added a new "HU Student Debt System" project to `src/lib/portfolio-data.ts` (inserted right after PCIC):
  - Real Problem/Solution/Impact grounded in Ethiopian Council of Ministers Regulation No. 447/2024 (cost-sharing for tuition/boarding/food).
  - Solution describes all 3 surfaces: React admin dashboard (payment review, student/graduate mgmt, cost config, ERCA tax export, withdrawal approvals, Fayda national-ID verification, finance reports), Flutter student app (debt overview, cost-sharing statements w/ PDF export, Chapa online payment + receipt upload, push notifications, multi-stage withdrawal workflow), Node.js/Express backend.
  - Tech: React, Flutter, Node.js, Express, MongoDB, Firebase.
  - Metrics: Surfaces 3 · Regulation No. 447/2024 · Payments Chapa + receipts.
  - featured: true, year 2025, liveUrl → GitHub, accent emerald/blue, and the 4 screenshots with captions ordered admin-first then mobile.
- No component changes needed — the existing ProjectThumbnail + ScreenshotGallery (built in task 8) automatically render the real screenshots, Live badge, Featured badge, 4-thumbnail switcher, and Visit-live-site link.
- `bun run lint` clean.
- Agent Browser verification: 7 project cards total; both featured cards (PCIC + HU Student Debt) show real screenshots with Live badges. HU Student Debt dialog opens with 4-thumbnail gallery — confirmed switching through all 4 (admin dashboard → admin login → student app dashboard → student app payment), Featured badge present, Visit-live-site link present. No runtime errors. Mobile: no horizontal overflow (390=390).
- VLM visual audit: both PCIC and HU Student Debt cards show real software screenshots with green Live badges; the debt card shows the collections/outstanding-debt admin dashboard.

Stage Summary:
- The portfolio now has two flagship featured projects with real product screenshots and Live badges: PCIC Management System (3 screenshots) and HU Student Debt System (4 screenshots spanning web admin + Flutter mobile app). Both use the same screenshot-gallery dialog with thumbnail switching and a Visit-live-site CTA. Lint clean, mobile-verified.

---
Task ID: 10-libraryhub
Agent: Z.ai Code (lead frontend)
Task: Add LibraryHub as a third featured project with real screenshot + live demo + GitHub source links

Work Log:
- Reviewed the uploaded screenshot via VLM: the LibraryHub bookstore landing page (bookshelf hero, "Unleash the power of reading books", Login/Get Started + Join-waitlist/Learn-more CTAs).
- Copied the screenshot to public/projects/libraryhub-hero.png.
- Extended the `Project` type in `src/lib/portfolio-data.ts` with an optional `repoUrl` field (alongside the existing `liveUrl`).
- Added a new "LibraryHub" project (inserted after HU Student Debt System):
  - Real Problem/Solution/Impact grounded in the user's description: static multi-page bookstore, 32 books, dual buy/rent pricing, search + genre filter, cart with totals, client-side User/Admin auth, featured books, About/Contact pages, static JS data (no backend), GitHub Pages hosting + GitHub Actions CI/CD + HTTPS.
  - Tech: HTML5, CSS3, JavaScript (ES6), Font Awesome, GitHub Actions.
  - Metrics: Books 32 · Model Buy or Rent · Hosting GitHub Pages.
  - featured: true, year 2024, accent amber/orange, liveUrl https://jbril43.github.io/bookstore/, repoUrl https://github.com/JBRIL43/bookstore, 1 screenshot with caption.
- Updated `src/components/portfolio/projects.tsx` dialog footer: when `repoUrl` is present, render a secondary "View source" button (Github icon, glass style) next to the primary "Visit live site" button. Wrapped both in a flex container. Imported Github from lucide-react.
- `bun run lint` clean.
- Agent Browser verification: 8 project cards total; 3 featured (PCIC, HU Student Debt, LibraryHub) all show real screenshots with Live badges. LibraryHub dialog: Featured badge, hero screenshot, full solution copy, and both links — "Visit live site" → https://jbril43.github.io/bookstore/ and "View source" → https://github.com/JBRIL43/bookstore (hrefs confirmed exact). No runtime errors. Mobile: no horizontal overflow (390=390).
- VLM visual audit: LibraryHub card shows a real bookstore landing page screenshot with a green Live badge.

Stage Summary:
- The portfolio now has three flagship featured projects with real product screenshots + Live badges: PCIC Management System, HU Student Debt System, and LibraryHub. LibraryHub additionally exposes both a live-demo link (jbril43.github.io/bookstore/) and a source-code link (github.com/JBRIL43/bookstore) via the new "View source" button. Lint clean, mobile-verified.

---
Task ID: 11-stock-management
Agent: Z.ai Code (lead frontend)
Task: Add the Stock Management System as a fourth featured project with real dashboard screenshot + GitHub link

Work Log:
- Reviewed the uploaded screenshot via VLM: a Stock/Inventory Management System admin dashboard — sidebar (Dashboard, Stock IN, Stock OUT, Balance, Revenue, Items, Export Report), 6 metric cards (Total Items 37, Total Stock IN 1754, Total Stock OUT 71, Total Revenue 546,300, Total Profit 121,800, Low Stock <5 = 1), and a searchable stock-balance table with In Stock / Low Stock status.
- Copied the screenshot to public/projects/inventory-dashboard.png.
- Added a new "Stock Management System" project to `src/lib/portfolio-data.ts` (inserted after LibraryHub):
  - Real Problem/Solution/Impact grounded in the screenshot: role-based admin dashboard, real-time metrics (items, stock IN/OUT, revenue, profit, low-stock alerts <5), searchable stock-balance table with status indicators, Stock IN/OUT/Balance/Revenue/Items modules, exportable reports + printable views.
  - Tech: React, Node.js, MongoDB, JavaScript.
  - Metrics: Items tracked 37 · Revenue 546,300 · Stock moves IN/OUT.
  - featured: true, year 2025, accent cyan/blue, liveUrl + repoUrl both → https://github.com/JBRIL43/inventory_management, 1 screenshot with caption.
- No component changes needed — existing ProjectThumbnail + ScreenshotGallery + Visit-live-site/View-source buttons (built in tasks 8 & 10) handle the new project automatically.
- `bun run lint` clean.
- Agent Browser verification: 9 project cards total; 4 featured (PCIC, HU Student Debt, LibraryHub, Stock Management) all show real screenshots with Live badges. Stock Management dialog: Featured badge, dashboard screenshot with caption, full Problem/Solution copy, and both links (Visit live site + View source) → https://github.com/JBRIL43/inventory_management (hrefs confirmed). No runtime errors. Mobile: no horizontal overflow (390=390).
- VLM visual audit: Stock Management card shows the real inventory dashboard screenshot (Total Items/Revenue/Profit metrics + stock-balance table) with a green Live badge.

Stage Summary:
- The portfolio now has four flagship featured projects with real product screenshots + Live badges: PCIC Management System, HU Student Debt System, LibraryHub, and Stock Management System. Each has a full case-study dialog with live/source links. Lint clean, mobile-verified.
