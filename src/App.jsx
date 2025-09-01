// - useState: lets this component hold and update state (our cart)
// - useMemo: efficiently compute values (count, subtotal) from the cart
import React, { useMemo, useState } from "react";

import Header from "./components/Header";
import Product from "./features/Product";
import Cart from "./components/Cart";
import ProductDetailModal from "./components/ProductDetailModal";

export default function App() {
  
  const [cartItems, setCartItems] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const  [selectedProduct, setSelectedProduct] = useState(null);

  
  const count = useMemo(
    () => cartItems.reduce((n, line) => n + line.qty, 0),
    [cartItems]
  );

  // subtotal = sum of price * qty for each line (still in cents to avoid float issues).
  const subtotal = useMemo(
    () => cartItems.reduce((sum, line) => sum + line.price * line.qty, 0),
    [cartItems]
  );

  //cart functions
  function addItem(product) {
    // setItems with a function gives us the latest prev state safely.
    setCartItems((prev) => {
      // Find if this product already exists in the cart by id.
      const idx = prev.findIndex((l) => l.id === product.id);
      if (idx !== -1) {
        // Create a new array (immutability) so React sees the change.
        const next = [...prev];
        // Copy the existing line, bump qty by 1.
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      // If it's not there, add a new line: spread product fields, set qty to 1.
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
        // If qty hits 0, remove the line entirely.
        .filter((l) => l.qty > 0)
    );
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((l) => l.id !== id));
  }
  
  //product detail modal functions
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
      <Header count={count} />
      <Product onAdd={(p) => addItem(p)} onOpenModel={(p) => openModel(p)} />
      <Cart
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
