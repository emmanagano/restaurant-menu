// Short UI strings from the content deck (section 5). Keep wording identical to the deck.

export const buttons = {
  book: "Book a table",
  seeMenu: "See the menu",
  orderPickup: "Order for pick-up",
  planMenu: "Plan your menu",
  enquireEvent: "Enquire about your event",
  sendGiftCard: "Send a gift card",
  directions: "Directions",
  call: "Call",
  bookHere: "Book here",
  subscribe: "Subscribe",
} as const;

export const menuFilters = {
  all: "All",
  signature: "Signature",
  spicy: "Spicy",
  vegetarian: "Vegetarian",
  "pork-free": "Pork-free",
} as const;

/** Words for the dish tags in the database. Never show the deck's letters alone. */
export const dishTagLabels = {
  signature: "Signature",
  spicy: "Spicy",
  vegetarian: "Vegetarian",
  pork_free: "Pork-free",
  seafood: "Contains seafood",
} as const;

export const a11y = {
  skipLink: "Skip to main content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  previousDish: "Previous dish",
  nextDish: "Next dish",
  floatingBook: "Book a table at Uling",
  reducedMotionNote: "Animations are off because your device prefers reduced motion.",
} as const;

export const nav = {
  menu: "Menu",
  book: "Book",
  locations: "Locations",
  cateringEvents: "Catering & Events",
  giftCards: "Gift Cards",
} as const;

export const footer = {
  tagline: "Kapampangan, over the coals.",
  email: "hello@uling.example",
  disclaimer:
    "Uling is a fictional restaurant created as a web design and development concept by Emma Nagano. All names, addresses, reviews and images are samples.",
  photoCredit:
    "Photography: Unsplash, Pexels, Wikimedia Commons contributors and the designer; illustrations original.",
} as const;
