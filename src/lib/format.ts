const pesos = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

/** Whole pesos, e.g. 1850 -> "₱1,850". */
export const formatPrice = (pricePhp: number) => pesos.format(pricePhp);

type PricedPackage = { price_php: number | null; price_note: string | null };

/** Package prices as the deck writes them, e.g. "₱850 / guest (min 50)", "from ₱1,200 per guest". */
export function formatPackagePrice({ price_php, price_note }: PricedPackage) {
  if (price_php === null) return price_note ?? "";
  const price = formatPrice(price_php);
  if (!price_note) return price;
  const withMin = price_note.match(/^per (\w+), min (\d+)$/);
  if (withMin) return `${price} / ${withMin[1]} (min ${withMin[2]})`;
  if (price_note === "from, per guest") return `from ${price} per guest`;
  return `${price} ${price_note}`;
}
