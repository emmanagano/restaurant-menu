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
  buyGiftCard: "Buy a gift card",
  enquire: "Enquire",
} as const;

export const menuFilters = {
  all: "All",
  signature: "Signature",
  spicy: "Spicy",
  vegetarian: "Vegetarian",
  pork_free: "Pork-free",
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

export const menuPage = {
  filterGroupLabel: "Filter the menu",
  intro:
    "Twenty-seven heirloom recipes, a charcoal grill, and a lot of rice. Sharing is strongly encouraged.",
  allergyNote: "Please tell us about allergies; our kitchen handles peanuts, shellfish and pork.",
  // TODO(content): screen-reader status for the filter isn't in the deck. Confirm the wording.
  status: (shown: number, total: number) => `Showing ${shown} of ${total}`,
} as const;

export const formMessages = {
  required: (field: string) => `Please add your ${field}.`,
  invalidEmail: "That email doesn't look right. Check for typos?",
  serverError: "Something went wrong on our side. Try again, or call us.",
  rateLimited: "That's a lot of tries. Wait a minute and try again.",
  newsletterSuccess: "You're in. Watch your inbox for fiesta specials.",
  newsletterDuplicate: "You're already on the list. Masanting!",
  invalidPhone: "Enter a PH mobile number, like 0917 123 4567.",
  pastDate: "Pick today or a date ahead. We can't seat you yesterday.",
  partyTooLarge: "For more than 12 guests, send a private event enquiry.",
  noTimes: "That slot's full. Try 30 minutes earlier or later, or the other branch.",
  // TODO(content): "pick" prompts aren't in the deck. Confirm the wording.
  pick: (thing: string) => `Pick a ${thing}.`,
} as const;

export const bookingPage = {
  intro:
    "Pick a branch, a time and how many are coming. For groups over 12, send a private event enquiry instead.",
  steps: ["Branch", "Date & time", "Party size", "Your details", "Confirm"],
  demoNote: "Demo only: no real booking is made.",
  confirmationTitle: (name: string) => `You\u2019re booked, ${name}!`,
  confirmationText: (date: string, time: string, branch: string, email: string) =>
    `We\u2019ll see you on ${date} at ${time} at ${branch}. A confirmation is on its way to ${email}.`,
  lastSeating: (time: string) => `Last seating ${time}`,
  // TODO(content): the labels below are functional UI strings the deck doesn't list. Confirm the wording.
  stepStatus: (n: number, total: number, label: string) => `Step ${n} of ${total}: ${label}`,
  back: "Back",
  next: "Next",
  confirm: "Confirm",
  change: "Change",
  fields: {
    location: "Branch",
    date: "Date",
    time: "Time",
    party_size: "Party size",
    name: "Name",
    email: "Email",
    phone: "Phone",
    notes: "Notes (optional)",
  },
} as const;
