// Cart.jsx
import React, { useEffect } from "react";

function formatUSD(cents) {
  return (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

export default function Cart({
  isOpen,
  onClose,
  items,
  subtotal,
  increment,
  decrement,
  removeItem,
}) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className="
          absolute right-0 top-0 h-full w-[90vw] max-w-md
          bg-white shadow-2xl dark:bg-slate-900
          transform transition-transform duration-300 translate-x-0
          flex flex-col
        "
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {!items || items.length === 0 ? (
            <p className="text-sm text-slate-500">Your cart is empty.</p>
          ) : (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200/70 dark:divide-slate-800/70">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[64px,1fr,auto] items-center gap-3 p-4"
                >
                  <div className="h-16 w-16 overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      {formatUSD(item.price)} each
                    </p>

                    <div className="mt-2 inline-flex items-center gap-2">
                      <button
                        className="rounded border px-2 py-1 text-sm border-slate-300 dark:border-slate-700"
                        onClick={() => decrement(item.id)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center">{item.qty}</span>

                      <button
                        className="rounded border px-2 py-1 text-sm border-slate-300 dark:border-slate-700"
                        onClick={() => increment(item.id)}
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>

                      <button
                        className="ml-4 text-sm text-red-600 hover:underline"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-medium">
                    {formatUSD(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Subtotal
            </span>
            <span className="text-base font-semibold">
              {formatUSD(subtotal)}
            </span>
          </div>
          <button
            className="w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            disabled={!items || items.length === 0}
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
