// Per-branch copy from the content deck (section 4 "Locations" and section 6 SEO table).
type LocationCopy = { h1: string; title: string; description: string; mapLabel: string };

export const locationCopy: Record<string, LocationCopy> = {
  downtown: {
    h1: "Uling Downtown, Kapampangan grill & bar in Sto. Rosario, San Fernando",
    title: "Uling Downtown: Kapampangan Grill in Sto. Rosario",
    description:
      "Our original dining room in Sto. Rosario, San Fernando. Charcoal grills, heirloom Kapampangan dishes and the Bodega event room. Hours, map and booking.",
    mapLabel: "Map showing Uling Downtown in Sto. Rosario, San Fernando",
  },
  dolores: {
    // TODO(content): the deck gives the H1 pattern only for Downtown. This follows it for Dolores. Confirm.
    h1: "Uling Dolores, Kapampangan grill & bar in Dolores, San Fernando",
    title: "Uling Dolores: Family Kapampangan Restaurant",
    description:
      "Family-friendly Kapampangan dining in Dolores, San Fernando, with free parking and a pasalubong counter for tocino and longganisa. Hours and booking.",
    // TODO(content): the deck gives the map label only for Downtown. This follows its pattern.
    mapLabel: "Map showing Uling Dolores in Dolores, San Fernando",
  },
};
