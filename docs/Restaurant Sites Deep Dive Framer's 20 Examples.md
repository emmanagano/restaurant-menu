# Restaurant Sites Deep Dive: Framer's 20 Examples

Oct 30, 2026 · @Emma

## TL;DR

The 19 sites share one formula: a big-type hero, one repeated action button, a short "bestsellers" strip, and a practical-info block at the bottom. Only 2 of the 19 are actual places you can walk into and eat.

- **Most "restaurant examples" aren't restaurants.** Of the 9 "real" gallery picks, only Deleito (burgers) and NKORA (coffee shops) are hospitality venues. The rest are a juice brand, a festival, a defunct SaaS, a DIY kit, a workshop, a template demo, and an office building. All 10 marketplace entries are template demos with placeholder content.
- **One action, repeated.** Every site picks a single verb (book, order, buy, get tickets) and repeats it in the header, hero, mid-page and footer.
- **The site is the storefront; someone else runs the till.** Booking, ordering and ticketing link out to Eventbrite, Toast, Uber Eats, TheFork, Stripe, Google Forms or an ordering subdomain. None of the 19 has a native checkout or booking engine.
- **Menus are HTML, never PDF.** Zero of 19 uses a PDF menu. Templates build menus as CMS collections with category pages and per-dish detail pages.
- **Display font + workhorse sans.** Most sites pair a characterful display face with a plain sans (Satoshi, Inter and Plus Jakarta Sans recur). Serifs signal fine dining; chunky condensed or comic faces signal casual.
- **Warm off-white, not #FFF.** Most sites sit on cream, blush or butter backgrounds with one saturated or deep brand color.
- **Real brands win on voice.** The real sites have founder stories and pun-heavy copy. The templates read as generic luxury filler.

## What's actually on the list

The article promises "real restaurant website examples" for #1–9 and templates for #11–20 (#10 is just a link to the Framer food gallery). Visiting each one shows a different picture.

| # | Site | What it actually is | Main action | Where that action goes |
| --- | --- | --- | --- | --- |
| 1 | [NKORA](https://nkora.co.uk) | Specialty coffee chain, 8 London-area shops | Visit us | Own locations page |
| 2 | [Nuff](https://nuffjuice.com) | Vietnamese bottled-juice brand; products marked "Coming soon" | Contact | On-page form |
| 3 | [Deleito](https://quierodeleito.com) | Spanish gourmet-burger chain | Pide Ahora (order) | pedidos.quierodeleito.com |
| 4 | [Feastie](https://www.feastie.ca) | One-day Toronto food & drink festival | Get tickets | Eventbrite |
| 5 | [Tapdaa](https://tapdaa.com) | NFC-tag/QR menu SaaS for venues; banner says the project is no longer active | Book a demo / Order now | Stripe checkout links |
| 6 | [Thirsty Dumpling](https://thirstydumpling.com) | DIY dumpling-kit brand (Chicago) | Shop now / Buy a kit | Own /shop page; events via Google Form |
| 7 | [Pimpinella](https://www.pimpinella.cooking) | One-day foraging + pasta workshop in Liguria | Get tickets | Button on page (target not checked) |
| 8 | [Donut Shop](https://donutshop.framer.website) | Free template demo by Abel Hancock | Order online | Toast (generic POS page) |
| 9 | [The Den](https://workattheden.com) | Office complex in Rijswijk, NL (has an in-house restaurant) | Explore / See floorplan | Availability page; CBRE agents |
| 11 | [Grillify](https://grillify.framer.website) | Template demo (burger bar) | Book now | On-page booking section |
| 12 | [Luxdin](https://luxdin.framer.website) | Template demo (fine dining), 13 pages | Make reservation | /reservation page |
| 13 | [Qitchen](https://qitchen-template.framer.website) | Free template demo (sushi) | Book a table | /reservation page |
| 14 | [Patty](https://patty.framer.website) | Free template demo (burgers), 3 pages | Book table | TheFork |
| 15 | [Craving](https://craving-framerwebpro.framer.website) | Template demo (casual) | Book a moment | /contact page |
| 16 | [Bamzi](https://bamzi.framer.website) | Template demo (Asian/sushi) | Book a table | /contact page |
| 17 | [Armora](https://armora.framer.website) | Template demo, 7 pages | Reservation | /reservation page |
| 18 | [NoirNosh](https://noirnosh.framer.website) | Template demo (fine dining), 4 pages | Book a reservation | /reservation page |
| 19 | [Tangerine](https://tangerine.framer.website) | Template demo (Filipino casual), 4 pages | Order now | Uber Eats |
| 20 | [Grace](https://gracetemplate.framer.website) | Free template demo (fine dining) | Make a reservation | On-page section (OpenTable support listed) |

So the article's descriptions often don't match the sites. It praises Nuff for making it easy to book a table (it has no booking), Tapdaa for a quick path to the menu and booking (it sells NFC tags), and The Den for selling a dining experience (it leases offices). Treat the list as a mood board of Framer food-and-drink sites, not a sample of restaurant websites.

## Patterns they share

Strip away the styling and almost every homepage runs the same stack, top to bottom:

1. **Hero:** 2–4 word headline over one full-bleed photo or video, plus one button.
2. **Who we are:** a short manifesto or founder note.
3. **Bestsellers:** 4–6 hero items with name and price.
4. **Proof:** testimonials, press quotes or sponsors.
5. **Practical block:** address, Google Maps link, hours, phone, email.
6. **Footer:** the main button again, Instagram, newsletter.

### 1. One verb, repeated everywhere

Each site commits to a single primary action and repeats it 3–4 times.

- Donut Shop links "Order Online" from the header, the hero, the closing banner and the footer.
- Tangerine sends four different buttons (Order Now, Click To Order, Order Online, even "Our History") to Uber Eats.
- Deleito puts "Pide Ahora" in the sticky header and a "Pedir 13,95€" button on each featured burger.
- Secondary actions are always a step down: "View menu" or "Explore" as a ghost or text link.

### 2. Transactions are outsourced

No site builds its own checkout or booking engine. The button hands off to Eventbrite (Feastie), Toast (Donut Shop), Uber Eats (Tangerine), TheFork (Patty), Stripe payment links (Tapdaa), Google Forms (Thirsty Dumpling events, Feastie vendors) or a separate ordering subdomain (Deleito). Grace's template listing advertises OpenTable support. The Framer site's job is to make you want it and get you to the right door.

### 3. Short, loud hero headlines

Headlines are slogans, not descriptions: "Considered Cups" (NKORA), "Nature's perfect squeeze" (Nuff), "Santo Sabor" (Deleito), "Bite into Happiness" (Patty), "Sushi Sensation" (Qitchen), "The Burger Lab" (Grillify). The SEO description lives in the page title and meta tag instead. Feastie's title, for example, carries the city, date and hours.

### 4. Display face + workhorse sans

Most sites pair a characterful display font with a neutral body font. A few (Tapdaa, Patty, Armora, NoirNosh) run one sans family throughout.

- **Display:** custom or licensed faces on the real brands (NKORA's own typeface, Local Gothic, Nitti Mostro, Brice, New Spirit, Self Modern). Templates use free faces instead (Six Caps, Forum, Cormorant Garamond, Prata, Playfair, Dancing Script).
- **Body:** Satoshi (Patty, Craving, Qitchen), Inter (Luxdin, Bamzi, Armora), Plus Jakarta Sans (Grillify, Donut Shop, Deleito), plus General Sans, Figtree, Switzer and Poppins.
- **Mono accents** add an editorial or "menu card" feel: Fragment Mono on Deleito, GT Flexa Mono on Pimpinella.

### 5. Warm off-white + one strong color

Pure white is rare as the dominant background. Instead:

- NKORA: butter yellow with espresso brown
- Nuff: deep green with cream
- Thirsty Dumpling: electric blue with acid yellow
- Donut Shop: near-black plum with lilac
- Grace: blush cream with terracotta
- Patty: pale lime
- Luxdin: cream with a dark oxblood brown

### 6. Menus are native and structured

None of the 19 uses a PDF menu. The only PDF link found anywhere is a grant notice in Deleito's footer. Templates model the menu as a CMS collection:

- Category pages or anchors: Luxdin has /menu/appetizer, /menu/main-course and so on; Grace uses on-page anchors.
- Per-dish detail pages with price: Luxdin (/menu-details/prime-truffle-ribeye) and Craving (/menu/bbq-grilled-ribs).
- The homepage shows only a curated slice: Deleito's 6 bestsellers, Donut Shop's 6 top sellers, Grillify's 4 signature bites.

### 7. The practical block

Address, a Google Maps link (or embedded map on Patty), hours, phone and email sit in a dedicated section near the bottom. It appears on Donut Shop, Grillify, Luxdin, Patty, Craving, Grace, Armora, Tangerine (hours), Feastie (venue + map) and The Den. Phone numbers and emails are `tel:` and `mailto:` links, so they work as one-tap actions on mobile.

### 8. Instagram is the default social link

All nine gallery sites link to Instagram, often as the only social link. Thirsty Dumpling and Deleito add TikTok. The footer also commonly carries an email capture: Thirsty Dumpling, Pimpinella, Armora and Luxdin all have one.

### 9. Story and FAQ as trust builders

- **Founder voice:** Nuff's founder letter, Pimpinella's "Steffi & Melissa", Thirsty Dumpling's founder quote, Feastie's producer bio, Deleito's manifesto.
- **FAQ accordions** answer objections before they're asked: Nuff lists 14 questions, from shelf life to whether it's halal. Pimpinella covers cancellation and dietary needs. Luxdin and Tapdaa have one too, and Bamzi has an /faq page.

### 10. One signature interaction

Most sites use Framer's standard scroll reveals, but the memorable ones add a single playful moment. Donut Shop lets you drag donuts into a box. Pimpinella has a 3D ravioli that follows you down the page, built with Spline according to [One Page Love](https://onepagelove.com/pimpinella). Six of the 19 use video, often in the hero.

## Where they split

Two divides explain nearly all the variation: who built it (real brand vs template) and what price point it signals (casual vs upscale).

### Real brands vs templates

- **Scope.** Real brands do one job well. Nuff, Feastie and Pimpinella are essentially one long page. Templates sell breadth: Luxdin ships 13 pages, Armora 7, and six of the ten include a blog.
- **Type.** Real brands commission or license distinctive display faces. Templates stick to free Google and Fontshare fonts so buyers can swap them easily.
- **Copy.** Real brands write with jokes and opinions: "So good you'll catch fillings", "Thirst: QUENCHED!", "we promise to read every juicy word". Template copy is interchangeable ("Savor the exquisite flavors here", "Seize the Moment of Culinary Bliss").
- **Proof.** Real brands use press quotes, sponsors and campaign stories (Deleito's "Drops" section). Templates use invented testimonials with stock names.

### Casual vs upscale register

| Signal | Casual / playful | Upscale / fine dining |
| --- | --- | --- |
| Examples | Thirsty Dumpling, Donut Shop, Feastie, Nuff, Patty, Grillify, Tangerine | Luxdin, Grace, Bamzi, NoirNosh, Qitchen, Armora |
| Display type | Chunky, condensed or comic (Brice, Nitti Mostro, Six Caps, Local Gothic) | High-contrast serif (Cormorant Garamond, Playfair, Prata, Forum) |
| Color | Saturated brights on cream | Dark grounds, cream, black and white, one muted accent |
| Primary action | Order / Buy / Get tickets | Reserve / Book a table |
| Menu on homepage | Bestseller cards with price buttons | Category list with prices, or a link to a menu page |
| Copy | Puns, first person, exclamation marks | Third person, sensory adjectives |
| Motion | One playful toy (drag-a-donut, 3D ravioli) | Slow fades, full-bleed photo or video |

## Gaps and gotchas

The templates look finished but carry placeholder wiring a client would ship by mistake.

- **Display text and link don't match.** Luxdin shows "+1 (555) 123-4567" but dials an Indonesian number. Craving and Bamzi show a demo email but `mailto:` the template author's Gmail. Grace's Instagram, Facebook and TikTok links all go to the designer's X profile.
- **Generic outbound links.** Donut Shop's "Order Online" goes to Toast's general bakery-POS marketing page. Tangerine's buttons go to the Uber Eats homepage. Grillify's and Luxdin's map links open a blank Google Maps.
- **Placeholder blog content.** Bamzi's "restaurant blog" posts are news about Panera, Subway and Burger King.
- **Practical info missing on real sites.** NKORA, Nuff and Thirsty Dumpling show no hours or address on the homepage; NKORA pushes them to a locations page.
- **Hidden navigation on mobile.** At phone width, NKORA and Qitchen collapse everything into a menu icon, leaving the hero button as the only visible action.
- **Dead projects stay featured.** Tapdaa's own banner says it is no longer active. Nuff's products all read "Coming soon".
- **Heavy pages.** At phone width the homepages run from about 1,900 px (Qitchen) to 18,500 px (Grace) tall. NKORA loads 90 images and Grillify 86, so image weight is the main performance risk.

## What to take into your own builds

Use the shared skeleton, then beat the templates on the two things they skip: real wiring and real voice.

- [ ] Pick one primary verb with the client (book, order or buy) and place it in the header, hero, after the bestsellers, and in the footer.
- [ ] Make the primary button deep-link to the client's actual booking or ordering page (their OpenTable, TheFork or Toast listing), not a provider's homepage.
- [ ] Build the menu as structured HTML from a CMS or JSON: categories, prices, dietary tags. Add schema.org `Menu` and `Restaurant` markup for search.
- [ ] Show 4–6 bestsellers with price on the homepage; link to the full menu.
- [ ] Put address, a deep-linked Maps URL, hours, `tel:` and `mailto:` in one block, and repeat hours in the footer.
- [ ] Pair one display face with Satoshi, Inter or Plus Jakarta Sans. Use a serif for upscale clients and a condensed or rounded face for casual ones.
- [ ] Use a warm off-white base plus one brand color instead of pure white.
- [ ] Write a 2–4 word hero slogan; put the city, cuisine and neighborhood in the `<title>` and meta description.
- [ ] Add one signature interaction, not ten.
- [ ] Add an FAQ (parking, dietary needs, groups, kids, cancellations) and a founder or chef story.
- [ ] Before handoff, click every `tel:`, `mailto:`, map and social link, and compress images.

A portfolio angle: most of these examples aren't restaurants, so a clean, fully wired restaurant build in your portfolio fills a gap the article itself shows.

## Site-by-site reference

Fonts and colors are what the browser actually rendered (computed styles), checked at phone width.

| Site | Hero headline | Display / body font | Dominant colors | Notable sections |
| --- | --- | --- | --- | --- |
| NKORA | Considered Cups | NKORA V4 (custom) / Quicksand | Butter yellow, espresso, olive | Video hero, 8 locations list, values, jobs |
| Nuff | Nature's perfect squeeze | Local Gothic / Averia Sans Libre | Deep green, cream | Founder letter, 3-part philosophy, 14-question FAQ, contact form |
| Deleito | Santo Sabor | Poppins + Fragment Mono / Plus Jakarta Sans | Light grey, white, blue accent | Manifesto, brand collab, 6 bestsellers with prices, campaign "Drops" |
| Feastie | 2026 date announced | Nitti Mostro Comic / Aspekta | Lilac, lime, purple, blue | Date + venue up top, drinks, vendors, sponsors, map, past photos |
| Tapdaa | Delighting your customers… | FH Oscar (one family) | Black, off-white, lime | Product tiles, FAQ, 6-step process, pricing |
| Thirsty Dumpling | So good you'll catch fillings | Brice / General Sans | Electric blue, acid yellow, navy | Kit specs, press quotes, 5-step how-to, newsletter |
| Pimpinella | Foraging meets pasta making | New Spirit / GT Flexa Mono | Off-white, butter yellow | What / where / who / hosts, FAQ, newsletter |
| Donut Shop | Want Donuts Now? | Plus Jakarta Sans / Nunito | Dark plum, lilac | Drag-to-box toy, 6 top sellers, hours + location, 4 testimonials |
| The Den | (office leasing) | Self Modern / Akzidenz-Grotesk | Near-black, grey-green, bright green | Floorplans, map, leasing agents |
| Grillify | The Burger Lab | Six Caps / Plus Jakarta Sans | Near-black, antique white, dusty pink | 4 signature burgers, speakeasy, brewery, booking, contact |
| Luxdin | Savor the exquisite flavors here | Cormorant Garamond / Inter | Cream, oxblood brown | Menu categories, popular dishes, values, FAQ, reviews, blog |
| Qitchen | Sushi Sensation | Forum / Satoshi | Black, cream | Video hero, short single screen + book button |
| Patty | Bite into Happiness | Satoshi | Pale lime, dark brown | Tabbed menu (burgers, sides, desserts, drinks), news, map embed |
| Craving | Make a Moment with Craving | Forum / Satoshi | Light grey, white, forest green | Menu cards with prices, gallery, testimonials, benefits, blog |
| Bamzi | Delicious food & wonderful eating experience | Prata / Inter | White, dark teal, sand | 3 menu tiers, quote, blog |
| Armora | Spaces | Inter | White, light greys | Spaces, booking + hours, people, digest blog, careers, video |
| NoirNosh | Seize the Moment of Culinary Bliss | General Sans | Black, white, grey | Short page: reservation + menu buttons |
| Tangerine | Filipino Flavors | Dancing Script / Figtree | Light grey, white, sage green | Menu, dishes, testimonials, lunch special, catering, hours |
| Grace | Discover Divine Dining at Grace | Playfair / Switzer | Blush cream, terracotta | Team, long anchored menu with prices, reservation, blog |

## Method and sources

Each homepage was loaded in a browser on 30 Oct 2026 at phone width (about 800 px). Fonts, background colors, links, outbound hosts, forms, image and video counts, and page height were read from the live DOM. Inner pages weren't audited, so menus and booking flows are judged from homepage links. The article gives no links, so URLs came from Framer's gallery and marketplace pages and the sources below.

- [Framer: 20 best restaurant website examples](https://www.framer.com/blog/restaurant-website-design-examples/)
- [Goodspeed: Best restaurant websites built with Framer](https://goodspeed.studio/framer-website-examples/restaurant) (URLs for Donut Shop, Deleito, Thirsty Dumpling)
- [Goodspeed: Best Framer templates for restaurants](https://goodspeed.studio/best-framer-templates/restaurant) (Luxdin and Qitchen previews)
- [One Page Love: Pimpinella](https://onepagelove.com/pimpinella)
- Framer Gallery entries: [NKORA](https://www.framer.com/community/gallery/nkora-speciality-coffee/), [Nuff](https://www.framer.com/gallery/nuff), [Feastie](https://www.framer.com/gallery/feastieca), [Tapdaa](https://www.framer.com/gallery/tapdaa), [The Den](https://www.framer.com/gallery/the-den), [Thirsty Dumpling](https://www.framer.com/gallery/thirstydumplingcom)
- Framer Marketplace listings: [Grillify](https://framer.com/marketplace/templates/grillify), [Luxdin](https://framer.com/marketplace/templates/luxdin), [Qitchen](https://framer.com/templates/qitchen/), [Patty](https://framer.com/templates/patty), [Armora](https://framer.com/marketplace/template/armora), [NoirNosh](https://www.framer.com/marketplace/templates/noir-nosh-simple-restaurant-template), [Tangerine](https://www.framer.com/marketplace/templates/tangerine-restaurant-template/), [Grace](https://www.framer.com/marketplace/templates/grace-restaurant-template/)
