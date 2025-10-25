// src/lib/cart.js

/* =========================================
   SECTION: Cart helpers (pure)
   ========================================= */

export function toNumberPrice(value) {
  if (typeof value === "number") return value;
  if (value == null) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function calcSubtotal(items) {
  return (items || []).reduce((sum, it) => {
    const price = toNumberPrice(it?.price);
    const qty = Number(it?.qty || 1);
    return sum + price * qty;
  }, 0);
}

export function formatMoney(n) {
  const num = Number(n || 0);
  return `$${num.toFixed(2)}`;
}
