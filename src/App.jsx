// App.jsx
import React, { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Product from "./features/Product";
import Cart from "./components/Cart";
import ProductDetailModal from "./components/ProductDetailModal";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // ⬅ NEW
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearch = (e) => setSearchInput(e.target.value);

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

  function openModel(product) {
    setIsModelOpen(true);
    setSelectedProduct(product);
  }
  function closeModel() {
    setIsModelOpen(false);
    setSelectedProduct(null);
  }

  return (
    <>
      <Header
        count={count}
        onCartClick={() => setIsCartOpen(true)} // ⬅ NEW
      />

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
        isOpen={isCartOpen} // ⬅ NEW
        onClose={() => setIsCartOpen(false)} // ⬅ NEW
        items={cartItems}
        subtotal={subtotal}
        increment={increment}
        decrement={decrement}
        removeItem={removeItem}
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
