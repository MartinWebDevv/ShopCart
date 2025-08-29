// - useState: lets this component hold and update state (our cart)
// - useMemo: efficiently compute values (count, subtotal) from the cart
import React, { useMemo, useState } from "react";

import Header from "./components/Header";
import Product from "./features/Product";
import Cart from "./components/Cart";

export default function App() {
  // cartItems holds every line in the cart.
  // Each line will look like: { id, name, price (in cents), qty, img? }
  // Name choice: "cartItems" reads clearly (array of cart line *items*).
  const [cartItems, setCartItems] = useState([]);

  // count = total number of items in the cart (sum of all quantities).
  // useMemo recomputes only when cartItems changes (cheap here, good habit).
  const count = useMemo(
    () => cartItems.reduce((n, line) => n + line.qty, 0),
    [cartItems]
  );

  // subtotal = sum of price * qty for each line (still in cents to avoid float issues).
  const subtotal = useMemo(
    () => cartItems.reduce((sum, line) => sum + line.price * line.qty, 0),
    [cartItems]
  );

  // addItem(product): either increase qty if the product is already in the cart,
  // or push a new line with qty = 1.
  // Parameter name "product" matches what Product/ProductCard naturally have.
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

  return (
    <>
      <Header count={count} />
      <Product onAdd={(p) => addItem(p)} />
      <Cart
        items={cartItems}
        subtotal={subtotal}
        increment={increment}
        decrement={decrement}
        removeItem={removeItem}
      />
    </>
  );
}
