/* =========================================
   SECTION: Promo helpers (pure)
   ========================================= */

export function normalizeCode(str) {
  return (str || "").trim().toUpperCase();
}

export function findPromoByCode(list, code) {
  if (!Array.isArray(list)) return null;
  const target = normalizeCode(code);
  return list.find((c) => normalizeCode(c.code) === target) || null;
}

export function calcDiscount(subtotal, promo) {
  if (!promo || subtotal <= 0) return 0;
  const { type, value, threshold } = promo;

  switch (type) {
    case "percent":
      return subtotal * Number(value || 0);
    case "flat":
      return Math.min(Number(value || 0), subtotal);
    case "threshold": {
      if (threshold?.min && subtotal < Number(threshold.min)) return 0;
      return Math.min(Number(value || 0), subtotal);
    }
    default:
      return 0;
  }
}
