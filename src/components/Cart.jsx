import React from "react";

/**
 * Tiny helper to display cents as US currency.
 * We keep it local to this file because Cart is the one showing totals.
 * Example: 2199 -> "$21.99"
 */
function formatUSD(cents) {
  return (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

/**
 * Cart is a *presentational* component.
 * It does NOT own state. It only receives props from App.jsx and renders them.
 *
 * Props:
 * - items:      array of cart entries, each like { id, name, price (cents), qty, img? }
 * - subtotal:   number (cents) for the whole cart
 * - increment:  function (id) => void   // bump qty by +1
 * - decrement:  function (id) => void   // lower qty by -1 (remove if reaches 0)
 * - removeItem: function (id) => void   // remove the line entirely
 *
 * Naming:
 * - "items" matches App.jsx's "cartItems" (App keeps state; Cart renders *items*).
 * - Inside .map(...) we call each thing "item" (clearer than "line" for beginners).
 */
export default function Cart({
  items,
  subtotal,
  increment,
  decrement,
  removeItem,
}) {
  // If there is nothing in the cart, show a friendly empty state.
  if (!items || items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-2 text-lg font-medium">Cart</h2>
        <p className="text-sm text-slate-500">Your cart is empty.</p>
      </section>
    );
  }

  // Otherwise, render a simple list of cart items with qty controls and totals.
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 ">
      {/* Title */}
      <h2 className="mb-4 text-lg font-medium">Cart</h2>

      {/* A bordered stack of items; divide-y draws lines between rows */}
      <div className="flex justify-center divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
        {items.map((item) => (
          <div
            key={item.id} // unique key so React can track the row
            className="grid grid-cols-[64px,1fr,auto] items-center gap-3 p-4"
          >
            {/* Thumbnail column (left). We only show an <img> if item.img exists. */}
            <div className="h-16 w-16 overflow-hidden rounded bg-slate-100 dark:bg-slate-200">
              {item.img ? (
                <img
                  style={{ height: 100, width: 100 }}
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            {/* Middle column: name, unit price, and quantity controls */}
            <div>
              {/* Product name */}
              <p className="font-medium">{item.name}</p>

              {/* Unit price (each) */}
              <p className="text-sm text-slate-500">
                {formatUSD(item.price)} each
              </p>

              {/* Quantity controls: -  [qty]  +   and a Remove link */}
              <div className="mt-2 inline-flex items-center gap-2">
                <button
                  className="rounded border px-2 py-1 text-sm border-slate-300 dark:border-slate-700"
                  onClick={() => decrement(item.id)} // lower qty by 1
                >
                  −
                </button>

                {/* Current quantity (read-only text) */}
                <span className="min-w-6 text-center">{item.qty}</span>

                <button
                  className="rounded border px-2 py-1 text-sm border-slate-300 dark:border-slate-700"
                  onClick={() => increment(item.id)} // raise qty by 1
                >
                  +
                </button>

                {/* Remove the entire line from the cart */}
                <button
                  className="ml-4 text-sm text-red-600 hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Right column: line total = unit price * quantity */}
            <div className="text-right font-medium">
              {formatUSD(item.price * item.qty)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer: subtotal (sum of all line totals).
          Subtotal is provided by App.jsx, we just format and display it. */}
      <div className="mt-4 flex items-center justify-end">
        <p className="text-base">
          Subtotal: <span className="font-semibold">{formatUSD(subtotal)}</span>
        </p>
      </div>
    </section>
  );
}
