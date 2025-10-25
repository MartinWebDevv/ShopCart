// src/app/CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PROMO_CODES from "../data/PromoCode.js";
import { calcSubtotal } from "../lib/cart.js";
import { normalizeCode, findPromoByCode, calcDiscount } from "../lib/promo.js";

/* =========================================
   SECTION: CartContext
   PURPOSE:
   - Own all cart state + handlers in one place
   - Persist to localStorage
   - Expose derived totals
   - (NEW) Global search query
   ========================================= */

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Core state
  const [cartItems, setCartItems] = useState([]); // [{id,title,price,image,qty,...}]
  const [appliedCode, setAppliedCode] = useState(null); // {code,type,value,threshold?}
  const [isCartOpen, setIsCartOpen] = useState(false);

  // (NEW) Global search
  const [query, setQuery] = useState("");

  // Persistence: load once
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopcart:cart");
      const savedCode = localStorage.getItem("shopcart:coupon");
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedCode) setAppliedCode(JSON.parse(savedCode));
      // Optional: restore query if you want it persistent:
      // const savedQuery = localStorage.getItem("shopcart:query");
      // if (savedQuery) setQuery(savedQuery);
    } catch {}
  }, []);

  // Persistence: save on change
  useEffect(() => {
    try {
      localStorage.setItem("shopcart:cart", JSON.stringify(cartItems));
      localStorage.setItem("shopcart:coupon", JSON.stringify(appliedCode));
      // Optional: persist query
      // localStorage.setItem("shopcart:query", query);
    } catch {}
  }, [cartItems, appliedCode /*, query */]);

  // Derived totals
  const subtotal = useMemo(() => calcSubtotal(cartItems), [cartItems]);
  const discount = useMemo(
    () => calcDiscount(subtotal, appliedCode),
    [subtotal, appliedCode]
  );
  const total = useMemo(() => Math.max(subtotal - discount, 0), [subtotal, discount]);

  // Handlers
  function addToCart(product) {
    if (!product || !product.id) return;
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx === -1) return [...prev, { ...product, qty: 1 }];
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: Number(copy[idx].qty || 1) + 1 };
      return copy;
    });
  }

  function updateQty(id, qty) {
    setCartItems((prev) => {
      const q = Math.max(Number(qty || 0), 0);
      return prev
        .map((p) => (p.id === id ? { ...p, qty: q } : p))
        .filter((p) => p.qty > 0);
    });
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  // Promo
  function applyCoupon(input) {
    const incoming = normalizeCode(input);
    if (!incoming) return { ok: false, reason: "EMPTY" };
    if (appliedCode && normalizeCode(appliedCode.code) === incoming) {
      return { ok: false, reason: "ALREADY_APPLIED" };
    }
    const promo = findPromoByCode(PROMO_CODES, incoming);
    if (!promo) return { ok: false, reason: "INVALID" };
    setAppliedCode(promo);
    return { ok: true, promo };
  }

  function removeCoupon() {
    setAppliedCode(null);
  }

  // UI controls
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Derived counts
  const itemCount = useMemo(
    () => cartItems.reduce((n, i) => n + Number(i.qty || 1), 0),
    [cartItems]
  );

  const value = {
    // state
    cartItems,
    appliedCode,
    isCartOpen,
    query,           // 👈 NEW
    setQuery,        // 👈 NEW
    // derived
    subtotal,
    discount,
    total,
    itemCount,
    // actions
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart() must be used within <CartProvider>");
  return ctx;
}
