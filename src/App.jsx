import React, { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Product from "./features/Product";
import Cart from "./components/Cart";
import ProductDetailModal from "./components/ProductDetailModal";

/***************************** Cart persistence*****************************/
const CART_KEY = "sc_cart_v1";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function loadCart() {
  if (typeof window === "undefined") return []; // SSR safety
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  const parsed = safeParse(raw, null);
  // Accept either our wrapped shape or a plain array (future-friendly)
  if (parsed && Array.isArray(parsed.items)) return parsed.items;
  if (Array.isArray(parsed)) return parsed;
  return [];
}

function saveCart(items) {
  const payload = { v: 1, items, updatedAt: Date.now() };
  localStorage.setItem(CART_KEY, JSON.stringify(payload));
}
/* =========================================================== */

export default function App() {
  // *********************************STATE VARIABLES****************************
  const [cartItems, setCartItems] = useState(() => loadCart());
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // *****************************************************************************

  // *********************************Search Bar Handlers*************************
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearch = (e) => setSearchInput(e.target.value);
  // *****************************************************************************

  // **********************************Persist cart*******************************
  // Save to localStorage whenever cart items change
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  // Cross-tab sync (optional but nice)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CART_KEY) {
        setCartItems(loadCart());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  // *****************************************************************************

  // *********************************Cart Handlers*******************************
  const count = useMemo(
    () => cartItems.reduce((n, line) => n + line.qty, 0),
    [cartItems]
  );
  const subtotal = useMemo(
    () => cartItems.reduce((sum, line) => sum + line.price * line.qty, 0),
    [cartItems]
  );

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

  function clearCart() {
    setCartItems([]); 
    localStorage.removeItem(CART_KEY);
  } 
    // the effect below will handle storage cleanup

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem(CART_KEY);
    } else {
      saveCart(cartItems);
    }
  }, [cartItems]);

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
  // *****************************************************************************

  // *********************************Modal Helpers*******************************
  function openModel(product) {
    setIsModelOpen(true);
    setSelectedProduct(product);
  }
  function closeModel() {
    setIsModelOpen(false);
    setSelectedProduct(null);
  }
  // *****************************************************************************

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

      {/* Drawer-style cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        increment={increment}
        decrement={decrement}
        removeItem={removeItem}
        onClear ={clearCart}
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
