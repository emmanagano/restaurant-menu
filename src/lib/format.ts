const pesos = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

/** Whole pesos, e.g. 1850 -> "₱1,850". */
export const formatPrice = (pricePhp: number) => pesos.format(pricePhp);
