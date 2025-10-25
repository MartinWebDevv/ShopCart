// src/data/PromoCode.js

/* =========================================
   SECTION: Promo / Coupon Codes
   TYPES:
     - percent: value is 0.10 for 10%
     - flat: value is a dollar amount (e.g., 10)
     - threshold: only applies if subtotal >= threshold.min
   ========================================= */

const PROMO_CODES = [
  { code: "SAVE10", type: "percent", value: 0.10 },
  { code: "FIVEOFF", type: "flat", value: 5 },
  { code: "BIGSPENDER", type: "threshold", value: 20, threshold: { min: 100 } },
];

export default PROMO_CODES;
