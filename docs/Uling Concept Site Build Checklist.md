# Uling Concept Site: Build Checklist

Oct 30, 2026 · @Emma

Everything needed to build the Uling mock restaurant site (a modern Kapampangan grill and bar in San Fernando, Pampanga) as a portfolio piece. It's a fictional business, so label it a "concept / demo" in the footer and don't create a Google Business Profile or map listing for it.

## 1. Brand and content

Copy, menu, locations, sample reviews and offers are done in the [Uling Content Deck](https://claude.ai/artifact/UuhCqXaJbh9jD7hpn2NZE7).

- [ ] **Identity:** name, logo (wordmark plus icon), color palette with one accent reserved for "Book", a display typeface plus a body face (check the licenses), and an illustration motif such as charcoal and banana-leaf linework.
- [ ] **Photography:** free stock (Unsplash, Pexels, Pixabay, Wikimedia Commons) plus your own shots of the Kapampangan dishes stock doesn't cover, following the deck's shot list. No AI images. Log every photo's source, photographer and license for the credits page. Optional: one short muted video loop for the hero.
- [ ] **Copy:** hero slogan, H1 search phrase, a hook line, the founder story, dish descriptions, the catering and events pitch, FAQ answers, microcopy for buttons and errors, and a newsletter line.
- [ ] **Menu data:** categories, about 25–40 dishes, prices in ₱, dietary tags (spicy, pork-free, vegetarian, contains seafood) and a few "signature" flags.
- [ ] **Location data for 2 branches:** fictional addresses, hours, phone numbers and map coordinates.
- [ ] **Social proof:** fictional reviews and press, clearly marked as sample content. Use no real publication logos.
- [ ] **Offers:** 3 catering packages, 2–3 private-event packages, and gift card amounts.

## 2. Design (Figma)

- [ ] Moodboard and design tokens: colors, type scale, spacing, radii, shadows.
- [ ] A component library: buttons, cards, nav, form fields, tags, accordion, stepper and modal.
- [ ] Mobile-first wireframes, then high-fidelity mobile and desktop designs for every page.
- [ ] A motion spec: scroll reveals, header shrink, and a prototype of the signature interaction.

## 3. Pages

- [ ] Home, built from the 10-section blueprint
- [ ] Menu
- [ ] Book a table
- [ ] Catering
- [ ] Private events
- [ ] Gift cards
- [ ] A location template and 2 location pages
- [ ] About
- [ ] FAQ
- [ ] Contact
- [ ] 404
- [ ] Privacy, plus a short "About this concept" note
- [ ] Credits, generated from the `images` table

## 4. Components and features

- [ ] Sticky header that adapts to the background, plus a mobile menu and a floating "Book" button
- [ ] Hero with video and two CTAs
- [ ] Signature-dish carousel that bleeds off the screen edge
- [ ] The peak interaction, such as an ember cursor trail or sizzle cards
- [ ] Filterable HTML menu with category tabs
- [ ] Multi-step booking form (date, time, party size, details, confirmation) with a progress indicator and validation
- [ ] Location card with an "open now" badge, today's hours highlighted, a map, and `tel:` and directions links
- [ ] Review carousel
- [ ] Static Instagram-style grid
- [ ] Newsletter signup
- [ ] Gift card selector
- [ ] Catering and events enquiry forms
- [ ] FAQ accordion
- [ ] Footer

## 5. Tech stack and accounts

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router), TypeScript strict, Tailwind CSS |
| Data | Supabase (Postgres with RLS, Storage), seeded from the content deck |
| Motion | GSAP with ScrollTrigger; Lenis only if you approve smooth scroll |
| Images | `next/image`, files in Supabase Storage or `/public`, credits in the `images` table |
| Forms | Server actions with zod validation, writing to insert-only Supabase tables; booking, gift cards and pick-up are demo flows |
| Maps | Leaflet and OpenStreetMap, or a Google Maps embed, pinned to public landmarks |
| Hosting | Netlify on a subdomain such as uling.emmanagano.com, from a GitHub repo; you push and deploy |
| Analytics | GA4 through Tag Manager, or Plausible, with the events in CLAUDE.md; Microsoft Clarity for heatmaps |

**Accounts to set up:**

- [ ] Figma
- [ ] GitHub
- [ ] Netlify
- [ ] Supabase
- [ ] Google Search Console for your domain

**Project setup:**

- [ ] Put `CLAUDE.md` in the repo root
- [ ] Export the content deck to `docs/content-deck.md`
- [ ] Run the initialization prompt in Claude Code (scaffold, foundations, migration and seed files)
- [ ] Create the Supabase project, add keys to `.env.local`, run the migration and seed
- [ ] Add the same environment variables in Netlify
- [ ] Create the GitHub repo, push, and connect it to Netlify

## 6. SEO

- [ ] A keyword map with one primary phrase per page
- [ ] A title and meta description for every page, following the formula: \[signature offer\] \[venue type\] in \[neighborhood\], \[city\] | \[brand\]
- [ ] One real H1 per page, and H2s named after what people search for
- [ ] JSON-LD:
  - [ ] `Restaurant` on each location page
  - [ ] `Menu` on the menu page
  - [ ] `FAQPage` on the FAQ
  - [ ] `BreadcrumbList` and `Organization` site-wide
- [ ] Open Graph images, canonical tags, `sitemap.xml` and `robots.txt`
- [ ] Descriptive alt text on every image

## 7. Accessibility and performance

- [ ] WCAG AA contrast, visible focus states, a keyboard-navigable booking flow, and tap targets of 44 px or more
- [ ] `prefers-reduced-motion` fallbacks, and layouts that survive 1.5× line height
- [ ] Performance budget on mobile: LCP under 2.5 s, CLS under 0.1, INP under 200 ms
- [ ] Self-hosted, subsetted fonts and a preloaded hero image
- [ ] No jQuery and no carousel plugins

## 8. Testing

- [ ] Lighthouse and Lighthouse CI
- [ ] axe DevTools for accessibility
- [ ] Google's Rich Results Test and the Schema Markup Validator
- [ ] Cross-browser testing on real Android and iPhone devices
- [ ] A quick 5-person usability test: "Find the menu and book for 4 on Saturday."

## 9. Portfolio deliverables

- [ ] A case-study page covering the problem, the research findings, the CXL principle behind each design choice, before-and-after Lighthouse scores, and the schema
- [ ] A README with setup steps and an architecture note
- [ ] Screenshots and a short screen-recorded walkthrough
