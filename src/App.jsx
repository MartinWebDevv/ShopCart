import React, { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Product from "./features/Product";
import Cart from "./components/Cart";
import ProductDetailModal from "./components/ProductDetailModal";

/* =========================================================
   CART PERSISTENCE (localStorage)
   - We store the array of line items under CART_KEY.
   - On change: save when non-empty, remove key when empty.
   ======================================================= */
const CART_KEY = "sc_cart_v1";

function safeParse(json, fallback) {
  try { return JSON.parse(json); } catch { return fallback; }
}

function loadCart() {
  if (typeof window === "undefined") return [];      // SSR safety if you ever add it
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  const parsed = safeParse(raw, null);
  // Accept either { items: [...] } (versioned) or a plain array
  if (parsed && Array.isArray(parsed.items)) return parsed.items;
  if (Array.isArray(parsed)) return parsed;
  return [];
}

function saveCart(items) {
  const payload = { v: 1, items, updatedAt: Date.now() };
  localStorage.setItem(CART_KEY, JSON.stringify(payload));
}

/* =========================================================
   PROMO / COUPON LOGIC (client-side)
   - Clear, tiny helpers + validate function.
   - Prices are in CENTS (consistent with your cart).
   - If later you add a backend, you can keep the same
     validate() shape and just fetch from an API instead.
   ======================================================= */
import { PromoCodes } from "./data/PromoCode"; // If your file is in /data, use "./data/PromoCode"

// normalize input -> "SAVE10"
const norm = (s) => (s || "").trim().toUpperCase();

// find an active promo by its code
const findPromo = (code) =>
  PromoCodes.find((p) => p.active && p.code === code) || null;

// inside optional start/end window?
const inWindow = (p, now = Date.now()) => {
  const sOK = !p.startsAt || now >= Date.parse(p.startsAt);
  const eOK = !p.expiresAt || now <= Date.parse(p.expiresAt);
  return sOK && eOK;
};

/**
 * validatePromo(rawCode, subtotalCents)
 * Returns:
 *   { valid:boolean, discount:number(cents), normalizedCode?:string, message?:string }
 *
 * Rules:
 * - must exist, be active, be inside date window (if provided)
 * - must meet minSubtotal (if provided)
 * - compute discount:
 *     PERCENT -> round(subtotal * value / 100)
 *     FIXED   -> value (in cents)
 *   cap by maxDiscount (if provided) and never exceed subtotal
 *
 * NOTE: we accept either data schema:
 *   { discountType: 'PERCENT'|'FIXED' }  OR  { type: 'PERCENT'|'FIXED' }
 */
function validatePromo(rawCode, subtotalCents) {
  const normalizedCode = norm(rawCode);
  if (!normalizedCode) {
    return { valid: false, discount: 0, message: "Enter a code." };
  }

  const p = findPromo(normalizedCode);
  if (!p) {
    return { valid: false, discount: 0, message: "Code not recognized.", normalizedCode };
  }

  if (!inWindow(p)) {
    return { valid: false, discount: 0, message: "Code expired.", normalizedCode };
  }

  if (p.minSubtotal && subtotalCents < p.minSubtotal) {
    return { valid: false, discount: 0, message: "Subtotal too low for this code.", normalizedCode };
  }

  // --- compute discount ---
  let d = 0;
  const kind = p.discountType || p.type; // accept either field name
  if (kind === "PERCENT") d = Math.round((subtotalCents * p.value) / 100);
  if (kind === "FIXED")   d = p.value;

  // cap discount if maxDiscount exists
  if (p.maxDiscount != null) d = Math.min(d, p.maxDiscount);
  // never exceed subtotal
  d = Math.min(d, subtotalCents);

  if (d <= 0) {
    return { valid: false, discount: 0, message: "No discount for this cart.", normalizedCode };
  }

  return { valid: true, discount: d, normalizedCode };
}

/* =========================================================
   APP COMPONENT
   ======================================================= */
export default function App() {
  // --------------- State ---------------
  const [cartItems, setCartItems] = useState(() => loadCart());
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Search (debounced)
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Promo UI state:
  // - promoInput: what's typed in the drawer input
  // - appliedCoupon: the normalized code that's currently applied
  // - couponResult: outcome of validatePromo (valid + discount or a message)
  const [promoInput, setPromoInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // string | null
  const [couponResult, setCouponResult] = useState(null);   // { valid, discount, normalizedCode, message? }

  // --------------- Derived values ---------------
  const count = useMemo(
    () => cartItems.reduce((n, line) => n + line.qty, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, line) => sum + line.price * line.qty, 0), // price in CENTS
    [cartItems]
  );

  const discount = couponResult?.valid ? couponResult.discount : 0;
  const total = Math.max(0, subtotal - discount);

  // --------------- Effects ---------------
  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Persist cart
  useEffect(() => {
    if (cartItems.length === 0) localStorage.removeItem(CART_KEY);
    else saveCart(cartItems);
  }, [cartItems]);

  // Cross-tab cart sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CART_KEY) setCartItems(loadCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Recompute coupon result whenever applied code OR subtotal changes
  useEffect(() => {
    if (!appliedCoupon) { setCouponResult(null); return; }
    setCouponResult(validatePromo(appliedCoupon, subtotal));
  }, [appliedCoupon, subtotal]);

  // --------------- Cart handlers ---------------
  function addItem(product) {
    setCartItems((prev) => {
      const idx = prev.findIndex((l) => l.id === product.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function increment(id) {
    setCartItems((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
    );
  }

  function decrement(id) {
    setCartItems((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0)
    );
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((l) => l.id !== id));
  }

  function clearCart() {
    // Eagerly clear persistence to avoid any "flash back" in dev
    localStorage.removeItem(CART_KEY);
    setCartItems([]);

    // Clearing the cart typically invalidates coupon usage for the session
    removeCoupon();
  }

  // --------------- Promo handlers ---------------
  function applyCoupon(code) {
    console.log("[applyCoupon] trying:", code, "subtotal:", subtotal);
    const res = validatePromo(code, subtotal);
    console.log("[applyCoupon] result:", res);
    setCouponResult(res); // store result for UI (message/discount)
    if (res.valid) {
      setAppliedCoupon(res.normalizedCode); // lock to normalized e.g. "save10" -> "SAVE10"
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponResult(null);
    setPromoInput(""); // optional: also clear the visible input
  }

  // --------------- Modal & search handlers ---------------
  function openModel(product) {
    setIsModelOpen(true);
    setSelectedProduct(product);
  }
  function closeModel() {
    setIsModelOpen(false);
    setSelectedProduct(null);
  }
  const handleSearch = (e) => setSearchInput(e.target.value);

  // --------------- Render ---------------
  return (
    <>
      <Header count={count} onCartClick={() => setIsCartOpen(true)} />

      <SearchBar
        value={searchInput}
        onChange={handleSearch}
        showFilters={() => setIsFilterOpen((v) => !v)}
      />

      <Product
        onAdd={(p) => addItem(p)}
        onOpenModel={(p) => openModel(p)}
        searchQuery={searchQuery}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        increment={increment}
        decrement={decrement}
        removeItem={removeItem}
        onClear={clearCart}

        // ---------- Promo wiring to Cart (UI) ----------
        couponValue={promoInput}                 // controlled input value
        onCouponChange={setPromoInput}           // update as user types
        onApplyCoupon={applyCoupon}              // validate & apply
        onRemoveCoupon={removeCoupon}            // remove the code
        appliedCoupon={appliedCoupon}            // show which code is active
        couponMessage={couponResult && !couponResult.valid ? couponResult.message : ""}
        discountCents={discount}                 // for the "Discount" line
        totalCents={total}                       // for the "Total" row
      />

      <ProductDetailModal
        isOpen={isModelOpen}
        onClose={closeModel}
        product={selectedProduct}
        onAdd={(p) => addItem(p)}
      />
    </>
  );
}
