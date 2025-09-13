import React, { useEffect } from "react";

/** Format cents -> localized currency string */
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
  onClear,

  // ------- Promo props from App.jsx -------
  couponValue,
  onCouponChange,
  onApplyCoupon,
  onRemoveCoupon,
  appliedCoupon,
  couponMessage,
  discountCents,
  totalCents,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEmpty = !items || items.length === 0;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 c-overlay backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <aside
        className="
          absolute right-0 top-0 h-full w-[90vw] max-w-md
          c-card shadow-2xl
          transform transition-transform duration-300 translate-x-0
          flex flex-col
        "
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b c-border p-4">
          <h2 className="text-lg font-semibold c-text">Cart</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 btn-ghost"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5 c-text" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body: line items */}
        <div className="flex-1 overflow-y-auto p-4">
          {isEmpty ? (
            <p className="text-sm c-muted">Your cart is empty.</p>
          ) : (
            <div className="rounded-xl border c-border divide-y c-divide mb-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[64px,1fr,auto] items-center gap-3 p-4"
                >
                  <div className="h-16 w-16 overflow-hidden rounded c-input">
                    {item.img ? (
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>

                  <div>
                    <p className="font-medium c-text">{item.name}</p>
                    <p className="text-sm c-muted">{formatUSD(item.price)} each</p>

                    <div className="mt-2 inline-flex items-center gap-2">
                      <button
                        className="rounded px-2 py-1 text-sm btn"
                        onClick={() => decrement(item.id)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center c-text">{item.qty}</span>

                      <button
                        className="rounded px-2 py-1 text-sm btn"
                        onClick={() => increment(item.id)}
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>

                      <button
                        className="ml-4 text-sm"
                        style={{ color: "var(--c-danger)" }}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-medium c-text">
                    {formatUSD(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Promo / coupon area (always visible; disable when empty) */}
          <div className="rounded-lg border c-border p-3">
            {!appliedCoupon ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onApplyCoupon?.(couponValue);
                }}
                className="flex gap-2"
              >
                <input
                  name="couponCode"
                  value={couponValue}
                  onChange={(e) => onCouponChange?.(e.target.value)}
                  className="flex-1 rounded-lg border c-border c-input px-3 py-2 focus:outline-none focus:ring-2 c-ring"
                  placeholder="Promo code"
                  disabled={isEmpty}
                />
                <button
                  className="rounded-lg px-3 py-2 btn"
                  type="submit"
                  disabled={isEmpty || !couponValue || !couponValue.trim()}
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm c-muted">
                  Code{" "}
                  <span className="badge-accent rounded px-2 py-0.5 ml-1">
                    {appliedCoupon}
                  </span>{" "}
                  applied
                </div>
                <button className="text-sm underline" onClick={() => onRemoveCoupon?.()}>
                  Remove
                </button>
              </div>
            )}

            {couponMessage ? (
              <p className="mt-2 text-xs c-muted">{couponMessage}</p>
            ) : null}
          </div>
        </div>

        {/* Footer: totals + actions */}
        <div className="border-t c-border p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm c-muted">Subtotal</span>
            <span className="text-base font-semibold c-text">
              {formatUSD(subtotal)}
            </span>
          </div>

          {discountCents > 0 && (
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm c-muted">
                Discount {appliedCoupon ? `(${appliedCoupon})` : ""}
              </span>
              <span
                className="text-base font-semibold"
                style={{ color: "var(--c-success)" }}
              >
                −{formatUSD(discountCents)}
              </span>
            </div>
          )}

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm c-text">Total</span>
            <span className="text-lg font-bold c-text">
              {formatUSD(totalCents ?? subtotal)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              className="w-1/2 rounded-xl px-4 py-2 btn disabled:opacity-60"
              disabled={isEmpty}
              onClick={() => {
                if (window.confirm("Clear all items from your cart?")) onClear?.();
              }}
              aria-label="Clear cart"
            >
              Clear Cart
            </button>

            <button
              className="w-1/2 rounded-xl px-4 py-2 font-semibold btn-primary disabled:opacity-60"
              disabled={isEmpty}
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
