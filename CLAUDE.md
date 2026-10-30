# CLAUDE.md — Uling Concept Site

## Project

Uling is a **fictional** modern Kapampangan grill and bar with two branches in San Fernando, Pampanga. It's a portfolio piece that shows production-grade frontend, SEO, accessibility and performance work.

- Every page footer says it's a concept/demo site. Never present the business as real.
- All reviews, press, addresses and phone numbers are sample data. Never use real publication logos, real people's names as reviewers, or real business addresses.
- The goal: fast, accessible, SEO-complete pages with one primary action, "Book a table".

## Stack

- **Next.js** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS** for all styling (check `package.json` for the version: v4 uses `@theme` in CSS, v3 uses `tailwind.config`)
- **Supabase** (Postgres, Storage, RLS) for menu, locations, packages, FAQ, testimonials, bookings, enquiries, newsletter
- **Netlify** for hosting (Next.js runtime, deploy previews per PR)
- **GitHub** for the repo, PRs and CI
- Motion: **GSAP + ScrollTrigger** (and Lenis only if smooth scroll is approved). Nothing else for animation.
- Validation: **zod**

Don't add dependencies without asking. Prefer the platform (CSS, Next.js built-ins) over libraries.

## Commands

```bash
npm run dev        # local dev
npm run build      # production build (must pass before any PR)
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npx supabase gen types typescript --project-id <id> > src/types/supabase.ts
```

Run `lint`, `typecheck` and `build` before saying a task is done.

## Structure

```
src/
  app/                  # routes (App Router)
    (site)/             # public pages
    api/                # route handlers (only when a server action won't do)
  components/
    ui/                 # primitives: Button, Card, Tag, Accordion, Stepper (Modal: not built yet, add when needed)
    sections/           # page sections: Hero, SignatureDishes, VisitUs…
  lib/
    supabase/           # server.ts, client.ts (via @supabase/ssr)
    seo/                # metadata helpers, JSON-LD builders
    validation/         # zod schemas
    analytics.ts        # event helper
  types/supabase.ts     # generated types; never edit by hand
supabase/migrations/    # SQL migrations; the only way the schema changes
```

## Pages

`/` · `/menu` · `/book` · `/catering` · `/private-events` · `/gift-cards` · `/locations/[slug]` · `/about` · `/faq` · `/contact` · `/privacy` · `/credits` · `not-found`

## Rendering rules

- **Server Components by default.** Add `"use client"` only for interactivity (filters, stepper, carousel, motion), and keep those components small, as leaves.
- All content (menu, hours, locations, FAQ) is rendered on the server into HTML. **Never fetch page content client-side.** Crawlers and no-JS users must see the full content.
- Use static generation with revalidation for content pages. This project runs Next 16 with `cacheComponents`, where `revalidate` and `dynamicParams` segment configs fail the build: put `"use cache"` + `cacheLife("hours")` in the data functions (`src/lib/content.ts`) instead. `/book` and the forms can be dynamic.
- Use `generateStaticParams` for `/locations/[slug]`.

## Supabase rules

- Use `@supabase/ssr`: `createServerClient` in Server Components and server actions, and `createBrowserClient` only when truly needed.
- **The service role key is server-only.** Never import it in client code or prefix it with `NEXT_PUBLIC_`. Use it only in scripts and seeding.
- **RLS is on for every table.**
  - Content tables (`dishes`, `categories`, `locations`, `packages`, `faqs`, `testimonials`): `select` for `anon`, no writes.
  - Submission tables (`bookings`, `enquiries`, `newsletter`): `insert` only for `anon`, no `select`, `update` or `delete`.
- Schema changes go through `supabase/migrations/*.sql` only. Regenerate types after every migration.
- Writes go through **server actions** that:
  1. validate with zod,
  2. check a honeypot field,
  3. rate-limit by IP (simple table or in-memory),
  4. return typed `{ ok, errors }` results.
- Images live in Supabase Storage or `/public`. Add the Storage host to `images.remotePatterns`.

## Data model (starting point)

- `categories` (id, name, slug, sort)
- `dishes` (id, category_id, name, slug, description, price_php, tags text[] — spicy, pork_free, vegetarian, seafood —, is_signature, image_id, sort)
- `images` (id, path, alt, width, height, source — unsplash | pexels | pixabay | wikimedia | own —, source_url, photographer, license, credit_line)
- `locations` (id, name, slug, address, barangay, city, region, lat, lng, phone, hours jsonb, maps_url, parking, feature, image_id)
- `packages` (id, type — catering | event | gift_card —, name, description, price_php, sort)
- `faqs` (id, question, answer, sort)
- `testimonials` (id, quote, author, source_label, rating) — sample data only
- `bookings` (id, location_id, date, time, party_size, name, email, phone, notes, created_at)
- `enquiries` (id, type, name, email, phone, event_date, guests, message, created_at)
- `newsletter` (id, email unique, created_at)

## Content rules

- **The content deck is the source of truth.** It lives at `docs/content-deck.md` (exported from the Uling Content Deck). Use its copy word for word: headlines, H1s, menu, packages, FAQ, reviews, microcopy, titles and meta descriptions. **Don't invent or rewrite copy.** If something is missing, add a `TODO(content)` comment and ask.
- Seed Supabase from the deck (`supabase/seed.sql`): categories, dishes (with tags and prices), locations, packages, FAQs and testimonials. Short UI strings (buttons, form messages, status labels, aria labels) live in `src/content/microcopy.ts`.
- **Voice:** warm, proud, a little playful; short sentences; name the dish, the place and the feeling. No stacked adjectives ("exquisite culinary artistry"). Kapampangan words appear only where the deck uses them, always with their meaning in context.
- **Menu tags** map to the deck's letters: S → `is_signature`, H → `spicy`, V → `vegetarian`, PF → `pork_free`, SF → `seafood`. Filters show the words ("Spicy"), never the letters alone.
- Prices are whole pesos stored as integers and formatted with `Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })`.
- Hours are stored in 24-hour format and displayed as "11 AM – 10 PM", with today highlighted and "Open now / Closes at …" computed in the Asia/Manila time zone.
- **Fictional data stays fictional.** Use the deck's addresses (invented streets), +63 900 000 000X numbers and the `hello@uling.example` email. Map pins go on public landmarks or an illustrated map, never on a real business. Characters (Lola Pacing, Chef Migo) and reviewers are fictional; the reviews section is labeled "Sample reviews".
- Every page footer carries the concept disclaimer and the photo credit line from the deck. The FAQ keeps the "Is Uling a real restaurant?" answer.
- Booking, gift card and pick-up flows end in a clear "Demo only" note. Never send a real payment or confirmation.

## Image rules

- Images are free stock (Unsplash, Pexels, Pixabay, Wikimedia Commons) or the designer's own. **No AI-generated images.**
- Every image has a row in `images` with its source URL, photographer, license and credit line. A `/credits` page lists them all, generated from that table. Wikimedia Commons images use the exact attribution their license requires.
- Alt text comes from the deck's menu table; for other shots, describe what's actually visible, not what the dish should be.
- Reject images with visible logos, signage or brand packaging. Never caption a photo of a real person as Uling staff, a chef or a customer.
- Use the deck's aspect ratios: hero 16:9 with a 4:5 mobile crop, dish cards 1:1 (halo-halo 4:5), story and location 3:2, Open Graph 1200 × 630. Use `next/image` with art-directed sources for the hero.

## Design rules

- Mobile-first. Design and build at 375 px, then scale up.
- Use design tokens only (colors, spacing, radii, type scale) from the Tailwind theme. **No hard-coded hex values or magic numbers in components.**
- **The accent color is reserved for the "Book a table" CTA.** Nothing else uses it.
- Header nav: max 5 links plus the Book button, which also sits as a floating button on mobile.
- Hero: one visual headline, one supporting line, two buttons (Book a table, See the menu). Nothing else.
- Tap targets ≥ 44 × 44 px. Body text ≥ 16 px.
- One "peak" interaction for the whole site (the signature moment). Don't add other showy animations.
- Use warm off-white backgrounds, not pure `#fff`.

## Motion rules

- Use GSAP only in client components, and register ScrollTrigger once.
- Clean up every animation on unmount (`gsap.context()` + `revert()`).
- **Respect `prefers-reduced-motion`.** Disable or simplify all motion when it's set.
- Animate only `transform` and `opacity`. Never animate layout properties.

## SEO rules (every page)

- Export `metadata` or `generateMetadata`. Titles follow `[Signature offer] [venue type] in [neighborhood], [city] | Uling`, max ~60 characters.
- Meta descriptions run 140–160 characters: dishes, location, occasion, and an action verb.
- **Exactly one H1 per page** containing the page's search phrase. H2s describe sections in searchable words.
- Set a canonical URL, Open Graph title, description and image, and a Twitter card on every page.
- JSON-LD via `<script type="application/ld+json">`, built with helpers in `lib/seo`:
  - `Restaurant` on each location page: name, servesCuisine, priceRange, address, geo, telephone, openingHoursSpecification, acceptsReservations, hasMenu, image, sameAs.
  - `Menu` with `MenuSection` and `MenuItem` on `/menu`.
  - `FAQPage` on `/faq`.
  - `BreadcrumbList` on inner pages, and `Organization` in the root layout.
- Generate `app/sitemap.ts` and `app/robots.ts` from Supabase data.
- Every image has descriptive `alt` text (the dish or space, not "image"). Decorative images use `alt=""`.
- The menu is HTML, never a PDF.

## Accessibility rules (WCAG 2.2 AA)

- Use semantic HTML first: `header`, `nav`, `main`, `footer`, `button` for actions, and `a` for navigation.
- Contrast must be ≥ 4.5:1 for text and ≥ 3:1 for UI. Never convey meaning with color alone (dietary tags have text or an icon plus a label).
- Visible `:focus-visible` styles on every interactive element, and a skip link.
- Every input has a label, errors are linked with `aria-describedby`, and form status is announced with `aria-live`.
- The booking stepper is fully keyboard-operable and announces the current step.
- Layouts must survive 1.5× line height and 200% zoom.

## Performance budget (mobile, Lighthouse)

- LCP < 2.5 s, CLS < 0.1, INP < 200 ms. Lighthouse scores of 95+ for Performance, Accessibility, Best Practices and SEO.
- Use `next/image` for every image, with `sizes` set. Give the hero image `priority` and serve AVIF/WebP.
- Use `next/font` with self-hosted brand fonts: max 2 families, subset, `display: swap`.
- No jQuery, no carousel libraries, no UI kits. Build the carousel with CSS scroll-snap.
- Lazy-load anything below the fold. Load GSAP only in the components that use it.

## Analytics

- Track only these events through `lib/analytics.ts`: `book_click`, `book_submit`, `menu_view`, `menu_filter`, `call_click`, `directions_click`, `enquiry_submit`, `newsletter_submit`.
- Collect no personal data in analytics payloads.

## Netlify

- Environment variables live in Netlify settings; mirror the names in `.env.example`. Never commit `.env*`.
- Every PR gets a deploy preview. Check the preview before merging.
- Set security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, a basic CSP) in `netlify.toml` or `next.config`.

## Git and deploys

- **Emma pushes and deploys; Claude never does.** Don't run `git push`, `git merge` into `main`, `netlify deploy`, or anything else that publishes code or changes a remote.
- Claude may stage changes and suggest a commit message using Conventional Commits (`feat: add filterable menu`), but leaves committing to Emma unless asked.
- Branch names follow `feat/…`, `fix/…`, `chore/…`; keep each change to one concern.
- Never stage secrets, `.env*` files or build output.

## Definition of done

A task is done only when:

1. `lint`, `typecheck` and `build` pass.
2. It works at 375 px and 1440 px.
3. Keyboard navigation and reduced motion work.
4. Metadata, H1 and JSON-LD are in place (for pages).
5. There are no console errors, and Lighthouse shows no regressions.

## Don'ts

- Don't fetch content client-side or use `useEffect` for data that the server can render.
- Don't put secrets or the Supabase service role key in client code.
- Don't disable RLS, even temporarily.
- Don't use `any`. Type everything, using the generated Supabase types.
- Don't add libraries, change the stack, or restructure folders without asking.
- Don't use the accent color anywhere except the Book CTA.
- Don't present sample data as real.
