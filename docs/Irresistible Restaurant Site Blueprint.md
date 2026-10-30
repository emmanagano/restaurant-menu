# Irresistible Restaurant Site Blueprint

Oct 30, 2026 · @Emma

## TL;DR

Tenzo's 15 are real hospitality businesses, and they win on brand personality and easy booking. Most are weak on technical SEO, which is where a developer can beat them.

- **Platforms:** no single stack. 6 run WordPress, 4 Squarespace, and one each runs Webflow, Shopify, BentoBox, headless Sanity, and a custom build. The platform clearly matters less than the content and the booking hookup.
- **Tools:** the site is a front door to booking and ordering SaaS: SevenRooms, OpenTable, DesignMyNight, easyTable, Toast, Square, Deliveroo, Uber Eats, Grubhub, Tripleseat, GiftPro. 11 of 15 load Google Analytics or Tag Manager; 5 load the Meta Pixel.
- **Design:** a sticky nav with a booking link, one signature animation, a custom display typeface (11 of 15), and photography or illustration that matches the real venue.
- **Revenue beyond the table:** 6 sell gift cards and 6 push catering or events from the homepage.
- **SEO is the gap:** the best page titles follow one formula (offer + venue type + neighborhood + brand). But 7 of 15 have a missing, empty or meaningless H1. Only 4 use LocalBusiness schema, none use the Restaurant type, and alt-text coverage ranges from 0% to 100%.
- **Psychology:** CXL's principles map cleanly onto these sites. One distinct booking button (Von Restorff, Fitts), short nav (Hick), grouped practical info (Gestalt), and a memorable peak plus a warm ending (Peak-End Rule).
- **Blueprint:** section 7 turns all of this into a page-by-page build, a tech stack, and an SEO kit you can reuse for clients.

## The sites

Two of the 15 have changed since Tenzo wrote about them: Darwin & Wallace now redirects to its parent group's site, Portobello Pubs and Bars, and Sliders has replaced its site with a farewell page after 12 years.

| # | Site | What it is | Platform | Booking / ordering tools seen |
| --- | --- | --- | --- | --- |
| 1 | [Warpigs](https://www.warpigs.dk/) | Texas BBQ brewpub, Copenhagen | Webflow | easyTable (bookings), Mealo (food orders) |
| 2 | [Bottega Caruso](https://www.bottegacaruso.com/) | Family-run Italian, Margate | Squarespace | Own /reservations page, Vouchable gift vouchers |
| 3 | [The Fat Duck](https://www.thefatduck.co.uk/) | 3-Michelin-star tasting menu, Bray | Custom build (GSAP, jQuery, Mapbox) | SevenRooms, GiftPro gift shop |
| 4 | [Darwin & Wallace](https://darwinandwallace.co.uk/) → Portobello | Group of 21 London and south-coast pubs | WordPress | Each venue's own /book page |
| 5 | [Bresca](https://www.brescadc.com/) | Contemporary bistro, Washington DC | BentoBox | OpenTable, Toast gift cards |
| 6 | [The Salad Project](https://www.saladproject.co.uk/food) | Fast-casual salad chain, UK | Shopify | Own app, vmos pick-up, Deliveroo, Storekit catering |
| 7 | [Arts District Kitchen](https://artsdistrictkitchen.com/) | Kitchen inside a brewery, Las Vegas | WordPress | None online; menu on page |
| 8 | [Lox in a Box](https://www.loxinabox.com.au/) | Polish bagel deli, Sydney | Squarespace | Own /order page, Square gift cards |
| 9 | [Madre Taberna Moderna](https://www.madretabernamoderna.com/) | Tapas bar, Barcelona | WordPress + Elementor | Own /reservas page |
| 10 | [Dinner Ladies](https://www.dinnerladiesltd.com/) | Event and workplace caterer, UK | Squarespace | Enquiry form |
| 11 | [Sliders](https://sliders.dk/en) | Burger bar, Copenhagen (closed) | WordPress | Farewell page only |
| 12 | [Middle Child](https://middlechildphilly.com/) | Sandwich restaurants, Philadelphia | Headless (Sanity CMS) | Toast, Grubhub, merch store |
| 13 | [Malai](https://www.malai.co/) | Ice cream and cake shops, Brooklyn | Squarespace | Square pick-up, Uber Eats, Grubhub, Caviar, Goldbelly |
| 14 | [Osteria Angelina](https://angelina.london/osteria/) | Italian–Japanese, Spitalfields | WordPress | SevenRooms (embedded), Tripleseat events, GiftPro |
| 15 | [Simmons Bar](https://www.simmonsbar.co.uk/) | 14 cocktail bars, London | WordPress + WP Rocket | DesignMyNight, own /book-now page |

The pattern: off-the-shelf CMS for the marketing pages, plus specialist hospitality SaaS for anything transactional.

## Design and UI/UX patterns

The sites look nothing alike, but they solve the same four problems the same way: make booking unmissable, show the real place, give the brand one memorable trick, and sell more than a table.

### Navigation that never loses the booking link

- **Sticky, adaptive header.** Warpigs' menu flips between white and black text to match the section behind it, and its logo shrinks into the bar as you scroll ([Tenzo](https://www.gotenzo.com/resources/insight/the-15-best-restaurant-websites-to-get-inspired-by-with-tips/)). Arts District Kitchen highlights the active section in gold.
- **Reservations always one tap away.** Madre keeps "Reservas" in a permanent bar and repeats "Reserva tu mesa" after the menu. Simmons repeats "Book now" three times on the homepage. Bresca's nav is just Menus, Reservations, Gift cards.
- **Short top-level nav:** typically Menu, Book, Locations or Find us, Catering or Events, Gift cards.
- **Split nav when there are many services.** The Salad Project runs two bars: one for how you get food (pick-up, delivery, catering) and one for the brand (food, stores, rewards).

### Booking that stays on-site

- Osteria Angelina embeds SevenRooms in a panel that slides across the page. Darwin & Wallace (per Tenzo) showed live times and venues without leaving the site. The Fat Duck sells "tickets" via its own /book-your-ticket page.
- Where booking does leave the site, the link goes to the venue's own page on the provider (Bresca's OpenTable listing, Warpigs' easyTable widget), not to a generic homepage.

### Photography and illustration that match the venue

- Real interiors and dishes, color-matched to the brand: Warpigs' palette mirrors its dining room; Lox in a Box carries its retro color way into every photo.
- Illustration as a brand layer: The Fat Duck's watercolor "Wonderland" motifs, Dinner Ladies' doodles that explain services, Angelina's drawn floor plan, Simmons' Pac-Man and polaroid graphics, Bottega Caruso's hand-drawn circles and underlines.

### One signature motion moment

Each site picks one interaction to be remembered by, rather than animating everything:

- Bresca: fixed background image with content boxes scrolling over it.
- Malai: two halves of the screen scrolling in opposite directions.
- Middle Child: a "sandwich train", scrolling text, a blinking logo.
- Simmons: a skull that follows your cursor (the page loads Three.js, GSAP and Lottie).
- Sliders: menu text that faded into the dish photo on hover.

### Custom typography

11 of 15 render a custom or licensed display face: Warpigs' own font, Bartender (Arts District), Clarke and Highway (Lox), Bourton and Cambon (Madre), Mollie Rocky (Dinner Ladies), GT Walsheim (Middle Child), Canela with Gotham (Malai), Neue Plak (Angelina), TT Rounds Neue (Simmons), BentonSans (Sliders), and The Salad Project's "brandheading". Free Google Fonts appear mostly as body text (Montserrat, Raleway, Josefin Sans, Cormorant Garamond).

### More to buy than a table

- **Gift cards** on 6: Fat Duck, Bresca, Lox, Malai, Angelina, Bottega Caruso.
- **Catering or events** pushed from the homepage on 6: Warpigs, Salad Project, Lox, Dinner Ladies, Middle Child, Malai. Angelina and Simmons add private dining and party packages.
- **Merch, cookbooks, wine shops:** Middle Child, Malai, Bottega Caruso.

### Social and email

- 13 of 15 link to Instagram; Bottega Caruso and Darwin & Wallace (per Tenzo) embed a feed. Simmons and Sliders add TikTok; Simmons embeds a Spotify playlist.
- Email capture on at least 7: Bottega ("Stay in the loop"), Bresca, Arts District, Salad Project, Dinner Ladies, Malai, Angelina.

### Menus: mostly HTML, a few PDFs

Madre, Arts District and The Salad Project write menus directly on the page with prices and descriptions. Osteria Angelina's main "Menu" link is a PDF, and The Fat Duck and Simmons also link PDFs. Tenzo singles out Madre's on-page menu because the reader can book right after reading it.

## Tech stacks and tools

The stack is boring on purpose: a CMS the owner can edit, plus best-in-class hospitality SaaS bolted on. The craft goes into front-end details and integrations, not exotic frameworks.

| Layer | Tools found | Sites |
| --- | --- | --- |
| CMS / platform | WordPress (6) | Portobello, Arts District, Madre (Elementor), Sliders, Angelina, Simmons (WP Rocket caching, Bunny CDN) |
|  | Squarespace (4) | Bottega Caruso, Lox in a Box, Dinner Ladies, Malai |
|  | Webflow, Shopify, BentoBox, Sanity (headless), custom | Warpigs, Salad Project, Bresca, Middle Child, Fat Duck |
| Reservations | SevenRooms, OpenTable, DesignMyNight, easyTable | Fat Duck and Angelina; Bresca; Simmons; Warpigs |
| Ordering and delivery | Toast, Square, Mealo, vmos, Storekit, Deliveroo, Uber Eats, Grubhub, Caviar, Goldbelly, own app | Middle Child, Malai, Lox, Warpigs, Salad Project |
| Events and gifts | Tripleseat, GiftPro, Vouchable, Toast and Square gift cards | Angelina, Fat Duck, Bottega, Bresca, Lox, Malai |
| Animation and UI | GSAP, Three.js, Lottie, Swiper, Slick, jQuery | Fat Duck, Simmons, Madre, Lox, Bresca; jQuery on 8 |
| Analytics and ads | Google Tag Manager / GA4 (11), Meta Pixel (5), Google Ads, TikTok and LinkedIn pixels, Ahrefs analytics | Most; TikTok on Sliders, LinkedIn on Simmons, Ahrefs on Warpigs |
| Email | Mailchimp, Constant Contact, platform forms | Arts District, Angelina; Bresca; Squarespace sites |
| Fonts | Adobe Fonts (Typekit), Google Fonts, self-hosted brand fonts | Warpigs, Bottega; Fat Duck, Portobello, Bresca; most others |
| Compliance and extras | CookieYes, Silktide (cookies), accessiBe (accessibility overlay), Weglot (translation), Intercom (chat) | Warpigs, Fat Duck, Malai, Salad Project, Simmons |
| Multilingual | hreflang tags | Madre (ES/EN), Sliders (DA/EN) |

Two cautions from the audit:

- **Client-side rendering can hide everything from crawlers.** Middle Child's homepage served almost no readable text in the DOM after load (4 words). If you build headless, render on the server or statically.
- **Plugin piles cost speed.** The heaviest pages stack jQuery, carousels, chat, several pixels and an accessibility overlay. Each is a separate script request before a guest sees a menu.

## SEO strategies

The strongest sites put the search phrase in the page title and meta description: what you serve, what kind of place it is, and exactly where. The on-page technical basics are often skipped.

### Page titles: the winning formula

**\[Signature offer\] + \[venue type\] + \[neighborhood or city\] | \[Brand\]**

| Site | Title tag |
| --- | --- |
| Warpigs | Authentic Texas BBQ & Craft Beer \| Warpigs Brewpub Copenhagen |
| Bresca | Bresca \| Contemporary Bistro in Washington, DC |
| Madre | Madre: Tu Restaurante de tapas en Sagrada Familia Barcelona |
| Osteria Angelina | Angelina Osteria – Italian Japanese dining in Spitalfields, London. |
| Simmons | Simmons Bars \| Cocktails, Music, Live DJs, Happy Hour |
| Dinner Ladies | Bespoke Contract and Event Catering Company |
| The Fat Duck | The Fat Duck, Bray, Berkshire |
| Arts District Kitchen | Arts District Kitchen \| Located inside of Able Baker Brewing |

Brand-only titles waste the slot: "Bottega Caruso", "Lox In A Box", "Malai", "Middle Child".

### Meta descriptions: dishes, places, use-cases, a verb

- **Name the dishes and proof points.** Warpigs lists brisket, ribs, pulled pork, wings and "22 beers on tap".
- **Name every location.** Lox in a Box names Bondi, Coogee, Paddington and Marrickville. Warpigs names the Meatpacking District.
- **Name the occasions people search for.** Warpigs: after-work drinks, nights out, group dining. Dinner Ladies: events, weddings, office catering, supper clubs, pop-ups.
- **End with an action.** Simmons ends "Book now"; Dinner Ladies ends "Call now".
- **Use credentials.** The Fat Duck leads with three Michelin stars and best-restaurant awards.
- Angelina and The Salad Project have no meta description; Bresca uses a poetic line with no location.

### Recurring keywords and phrases

| Pattern | Examples from the sites |
| --- | --- |
| Cuisine + venue type | "Italian restaurant", "tapas bar", "contemporary bistro", "brewpub", "cocktail bar" |
| Location anchors | "in the heart of Margate", "in Sagrada Familia Barcelona", "in Spitalfields, London", "Meatpacking District" |
| Landmark or host venue | "Sagrada Familia", "inside of Able Baker Brewing" |
| Authenticity words | "authentic", "traditional", "family-run" |
| Occasion keywords | "group dining", "private dining", "weddings", "office catering", "happy hour", "live DJs" |
| Superlatives with proof | "three Michelin stars", "22 beers on tap", "21 pubs, bars & restaurants", "14 bars across London" |
| Action verbs | "Book now", "Call now", "Order now", "Reserva tu mesa", "Find us", "Visit" |

Tenzo notes Bottega Caruso's opening line works because it says "Italian restaurant" and "Margate" up front, and that Dinner Ladies' segmented service copy helps search engines and LLMs understand its niche. The audit backs this: Dinner Ladies' H2s are literally its services (Corporate Events, Weddings, Workplace Catering, Supper Clubs).

### Technical SEO: where they fall short

- **H1s:** 7 of 15 have a missing, empty or meaningless H1. Bresca's reads "HOMEPAGE", Angelina's "Home", The Fat Duck's first H1 is its cookie banner, and Madre, Simmons, Sliders and Middle Child have none with text. Portobello's H1 is a full keyword sentence.
- **Schema:** only Madre, Dinner Ladies, Malai and Sliders publish LocalBusiness. Madre's is the most complete, with price range (3.5€–17€), locality and opening hours. None uses the more specific Restaurant type, and none marks up the menu.
- **Alt text:** from 0 of 11 images (Arts District) and 1 of 14 (Warpigs) to 9 of 9 (Angelina) and 25 of 26 (Dinner Ladies).
- **Canonical tags** are missing on Warpigs, The Fat Duck and Middle Child. **Open Graph images** are missing on The Fat Duck and Angelina, so shared links show no picture.
- **Multilingual done right:** Madre and Sliders declare hreflang alternates for tourists.

## The psychology layer

The best of these sites already apply the principles in [CXL's guide](https://cxl.com/blog/psychology-of-web-design/), mostly by instinct. Making them deliberate is what turns a nice site into one people keep scrolling.

| Principle | What CXL says | Where it shows up here | How to apply it |
| --- | --- | --- | --- |
| Hick's Law | More and more complex choices mean slower decisions; filters and shortcuts help | Bresca's 3-item nav; Salad Project splitting service from brand nav | 4–5 nav items; menu categories and dietary filters; an "order" or "add" shortcut on dish cards |
| Fitts' Law | Bigger, closer targets are easier to hit; WCAG 2.2 sets a 24 × 24 px minimum | Sticky booking links on Madre, Warpigs, Simmons | A large sticky "Book" button in the mobile thumb zone; 44 px+ tap targets |
| Gestalt: proximity, common region, similarity | People group nearby, boxed or similar-looking items | Salad Project's color-coded service bar; Dinner Ladies' service blocks | Group address, hours, phone and map in one card; give each service its own consistent color or icon |
| Gestalt: continuity, common fate | Items on a line feel related; things moving together belong together | Malai's split scroll; carousels cut off at the edge | Let a dish carousel bleed off-screen to signal "more"; keep the booking bar fixed while content moves |
| Visual hierarchy | Size, contrast, color and position set reading order | Big slogan heroes; Fat Duck's plain type against rich imagery | One headline, one supporting line, one button per screen |
| Occam's Razor | Drop elements that add nothing; two clear CTAs beat many | Bresca: Menus + Reservations | Pair "Book a table" with "See the menu" and nothing else in the hero |
| Von Restorff Effect | Distinctive items are remembered and clicked | Simmons repeating one "Book now" button | Give only the booking CTA your accent color |
| Serial Position + Peak-End | First and last items are recalled best; people remember the peak and the end | Middle Child's sandwich train, Simmons' skull as the peak; sign-ups at the end | Booking first and last in the nav; one delightful "peak" interaction; end on a warm sign-off and newsletter |
| Zeigarnik (with caution) | A 2025 meta-analysis found no reliable memory benefit, but people do tend to resume interrupted tasks | Multi-step booking widgets | Show a step indicator in booking; save partial bookings |
| Color | Associations are tendencies, not rules (a 2025 review of 132 studies); never use color alone to convey meaning | Brand palettes drawn from the dining room (Warpigs) | Warm, appetizing accents; check contrast; pair color with text or icons |
| Spacing | White space focuses attention; WCAG requires layouts to survive 1.5× line height | Angelina's calm text-and-photo rhythm | Generous margins around dishes; test with increased text spacing |
| Typography | No single best font; serif reads classic, sans modern; NN/g suggests cutting about 11% more words for 50+ audiences | Custom display faces on 11 of 15 | Brand display face for headings, a highly legible body face, short copy |
| Shapes | Curves read as more pleasant; brand shapes can carry through the UI | Bottega's hand-drawn circles; Fat Duck's watercolor motifs | Reuse a logo or ingredient shape as section dividers and image masks |

CXL's closing advice matters most: treat these as hypotheses, then validate with user research and A/B tests. It also flags the Golden Ratio as a composition option with mixed evidence, not a rule.

## Blueprint: a site people can't stop exploring

One idea runs through the whole build: make the next step obvious and rewarding at every scroll, and make booking the easiest thing on the page.

### Homepage, top to bottom

1. **Sticky header** — logo, 4–5 links (Menu, Book, Find us, Events or Catering, Gift cards), and the only accent-colored button: "Book a table". It shrinks on scroll and adapts to the background. *Hick, Fitts, Von Restorff, Serial Position.*
2. **Hero** — full-bleed real photo or short muted video of the room or the signature dish; a 3–6 word slogan as the visual headline. The H1 is the search phrase ("Wood-fired Filipino grill in San Fernando, Pampanga") set smaller or as the eyebrow. Two buttons only: Book a table, See the menu. *Visual hierarchy, Occam's Razor.*
3. **Hook line** — one or two sentences in the owner's voice that name cuisine, place and why it's special. *SEO keywords in plain speech, as on Bottega Caruso.*
4. **Signature dishes** — 4–6 cards with photo, name, one-line description and price; the row bleeds off-screen to invite a swipe. *Continuity, Hick.*
5. **The peak moment** — one interaction worth remembering: a hover-to-reveal dish, a split scroll, a draggable ingredient, a cursor-following mascot. *Peak-End Rule.*
6. **Story** — founder or chef, the room, the neighborhood, with an illustration layer that echoes the brand. *Trust; Gestalt similarity through repeated motifs.*
7. **Ways to enjoy us** — cards for dine-in, takeaway or delivery, catering, private events, gift cards; each card a consistent color and icon. *Common region, similarity.*
8. **Proof** — reviews, press logos, awards, follower counts with real numbers ("4.8 on Google from 1,200 reviews"). *Social proof; big numbers via typography.*
9. **Visit us** — one card with address, map, hours (today highlighted), phone as `tel:`, parking or transit, accessibility notes. *Proximity.*
10. **Warm ending** — Instagram grid, newsletter ("Get first dibs on new dishes"), a friendly sign-off, and "Book a table" one more time. *Peak-End, Serial Position.*

### Site map

- **Menu** as HTML with category tabs, dietary filters, prices; a "Book" button after each section.
- **Book** with the provider's widget embedded in a slide-in panel or page, plus a step indicator.
- **One landing page per revenue line:** Catering, Private dining and events, Gift cards. Each has its own keyword title.
- **Location pages** (one per branch) with their own address, hours, map, schema and photos.
- **About, FAQ** (parking, kids, dietary needs, groups, corkage, cancellations), **Contact.**

### Tech stack that fits a freelance build

- **Owner-editable sites:** Webflow or Framer for small venues; WordPress (block theme, no page-builder bloat) when the client already has it.
- **Custom builds:** Astro or Next.js rendered statically or on the server, with a headless CMS (Sanity, Storyblok) for menus, hours and events. Avoid client-only rendering, the Middle Child trap.
- **Motion:** GSAP + ScrollTrigger and Lenis for smooth scroll, one Lottie or small Three.js scene for the peak moment. Respect `prefers-reduced-motion`.
- **Integrations:** whichever booking and delivery platforms the client's market uses (SevenRooms, OpenTable, TheFork or a local equivalent; local delivery apps), deep-linked to the venue's own page.
- **Measurement:** GA4 via Tag Manager with events for book-click, menu-view, call and directions; Microsoft Clarity or Hotjar for heatmaps to test the psychology hypotheses.

### SEO kit

- **Title:** `[Signature offer] [venue type] in [neighborhood], [city] | [Brand]` (under about 60 characters).
- **Meta description:** dishes + location + occasions + verb. Example: "Charcoal-grilled sisig, kare-kare and craft beer in San Fernando, Pampanga. Perfect for family lunches and barkada nights. Book a table."
- **One real H1 per page**; H2s named after what people search ("Private dining in San Fernando", "Catering for weddings").
- **Restaurant schema** in JSON-LD on every location page:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Brand Name",
  "servesCuisine": ["Filipino", "Kapampangan"],
  "priceRange": "₱₱",
  "address": {"@type": "PostalAddress", "streetAddress": "…", "addressLocality": "San Fernando", "addressRegion": "Pampanga", "addressCountry": "PH"},
  "geo": {"@type": "GeoCoordinates", "latitude": 0, "longitude": 0},
  "telephone": "+63…",
  "openingHoursSpecification": [{"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday"], "opens": "11:00", "closes": "22:00"}],
  "acceptsReservations": true,
  "hasMenu": "https://example.com/menu",
  "image": "https://example.com/hero.jpg",
  "sameAs": ["https://instagram.com/…", "https://facebook.com/…"]
}
```

- **Alt text on every image** describing the dish or space ("Grilled pork belly with atchara on a banana leaf").
- **Canonical, Open Graph image, sitemap, robots.txt** on every page; **hreflang** if you serve tourists in more than one language.
- **Google Business Profile** with the same name, address and phone as the site, linked to the menu and booking URLs.

### Performance and accessibility

- Images in AVIF or WebP, responsive `srcset`, lazy-load below the fold; preload the hero.
- Self-host and subset brand fonts; at most two families.
- One animation library, loaded only where used; no jQuery or carousel plugins on a new build.
- Contrast that passes WCAG AA, visible focus states, and layouts that survive 1.5× line height.

## Site-by-site reference

Homepage checks only, read from the live page on 30 Oct 2026.

| Site | Location in title | Meta description | Usable H1 | Schema | Images with alt | Signature feature |
| --- | --- | --- | --- | --- | --- | --- |
| Warpigs | Yes | Long, keyword-rich | Yes (3 H1s) | None | 1 / 14 | Color-adaptive sticky nav |
| Bottega Caruso | No | Short, "heart of Margate" | Slogan only | WebSite | 11 / 21 | Hand-drawn circles, Instagram grid |
| The Fat Duck | Yes | Awards-led | No (cookie banner) | None | 15 / 18 | Watercolor Wonderland art |
| Portobello (D&W) | No | Group + regions | Yes | Organization | 8 / 18 | Venue directory |
| Bresca | Yes | Poetic, no place | No ("HOMEPAGE") | Organization | 12 / 13 | Fixed-background scroll |
| Salad Project | No | Missing | Yes | None | 31 / 38 | Two-level service nav |
| Arts District Kitchen | Host venue | Mentions Las Vegas | Yes | Organization | 0 / 11 | One-page anchors, gold active state |
| Lox in a Box | No | Lists 4 suburbs | Yes | Organization | 2 / 10 | Retro palette throughout |
| Madre | Yes (landmark) | Landmark + city | No (empty) | LocalBusiness with hours, price | 15 / 20 | On-page menu + booking |
| Dinner Ladies | Service keyword | Services + "Call now" | Yes | LocalBusiness | 25 / 26 | Explanatory doodles |
| Sliders | No | — | None (closed) | LocalBusiness | 0 / 3 | Hover-reveal menu (archived) |
| Middle Child | No | "in Philadelphia" | No (empty) | None | 2 / 4 | Sandwich train animation |
| Malai | No | Brand story | Yes | LocalBusiness | 8 / 11 | Split-screen scroll |
| Osteria Angelina | Yes | Missing | No ("Home") | None | 9 / 9 | Slide-in SevenRooms panel |
| Simmons | London in description | "night out… Book now" | None | WebPage only | 11 / 64 | Cursor-following skull |

## Method and sources

Each homepage was loaded in a browser on 30 Oct 2026 and read from the live DOM: title, meta tags, headings, JSON-LD, image alt attributes, script and link hosts, and computed fonts. Platforms and tools were identified from script hosts and page markup; a tool counts as present only if its scripts or links appear on the homepage. Inner pages, page speed and booking flows weren't tested.

- [Tenzo: The 15 best restaurant websites to get inspired by](https://www.gotenzo.com/resources/insight/the-15-best-restaurant-websites-to-get-inspired-by-with-tips/)
- [CXL: How to use the psychology of web design to influence user behavior](https://cxl.com/blog/psychology-of-web-design/)
- The 15 sites, linked in the table under "The sites".
