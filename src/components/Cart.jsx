// src/components/Cart.jsx
import React, { useMemo, useState } from "react";

function toMoney(n) {
  const num = Number(n || 0);
  return `$${num.toFixed(2)}`;
}

export default function Cart({
  open = false,
  onClose,
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onApplyCoupon,
  onRemoveCoupon,
  subtotal = 0,
  discount = 0,
  total = 0,
  appliedCode = null,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null); // {type:'ok'|'err', text}

  const count = useMemo(
    () => cartItems.reduce((n, i) => n + Number(i.qty || 1), 0),
    [cartItems]
  );

  function handleApply() {
    if (typeof onApplyCoupon !== "function") return;
    const result = onApplyCoupon(couponCode);
    if (!result?.ok) {
      const reason = result?.reason || "INVALID";
      const map = {
        EMPTY: "Enter a code to apply.",
        INVALID: "That code doesn’t look right.",
        ALREADY_APPLIED: "That code is already applied.",
      };
      setCouponMsg({
        type: "err",
        text: map[reason] || "Could not apply code.",
      });
      return;
    }
    setCouponMsg({ type: "ok", text: `Code applied: ${result.promo.code}` });
    setCouponCode("");
  }

  function handleRemoveCoupon() {
    onRemoveCoupon?.();
    setCouponMsg(null);
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer panel */}
      <aside
        className={`
          absolute right-0 top-0
          h-dvh max-h-dvh w-[92vw] max-w-md
          bg-white shadow-2xl transition-transform
          ${open ? "translate-x-0" : "translate-x-full"}
          grid grid-rows-[auto,1fr,auto]
        `}
        style={{ height: "100dvh" }} // fallback for older Tailwind
      >
        {/* ===== Header (fixed) ===== */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Your Cart ({count})</h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* ===== Scrollable content ===== */}
        <div
          className="
            overflow-y-auto p-4
            pb-24
          "
        >
          {cartItems.length === 0 ? (
            <p className="text-sm text-slate-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const id = item.id;
              const title = item.title || item.name || "Item";
              const img = item.image || item.img || item.src || "";
              const price = Number(item.price || 0);
              const qty = Number(item.qty || 1);
              const line = price * qty;

              return (
                <div
                  key={id}
                  className="mb-3 grid grid-cols-[64px,1fr,auto] items-center gap-3 rounded-lg border p-2"
                >
                  <div className="h-16 w-16 overflow-hidden rounded bg-slate-100">
                    {img ? (
                      <img
                        src={img}
                        alt={title}
                        className="h-16 w-16 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{title}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      Unit: {toMoney(price)}
                    </div>

                    <div className="mt-2 inline-flex items-center rounded-lg border">
                      <button
                        className="px-2 py-1 text-slate-700 hover:bg-slate-100"
                        onClick={() => onUpdateQty?.(id, Math.max(qty - 1, 0))}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm tabular-nums">{qty}</span>
                      <button
                        className="px-2 py-1 text-slate-700 hover:bg-slate-100"
                        onClick={() => onUpdateQty?.(id, qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold">{toMoney(line)}</div>
                    <button
                      className="mt-2 text-xs text-red-600 hover:underline"
                      onClick={() => onRemoveItem?.(id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ===== Footer (fixed) ===== */}
        <div
          className="border-t p-4"
          style={{
            paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
          }}
        >
          {/* Coupon */}
          <div className="mb-3 rounded-lg border p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Promo / Coupon</span>

            </div>

            {!appliedCode && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <button
                  onClick={handleApply}
                  className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:opacity-90"
                >
                  Apply
                </button>
              </div>
            )}

            {couponMsg && (
              <p
                className={`mt-2 text-xs ${
                  couponMsg.type === "ok" ? "text-green-600" : "text-red-600"
                }`}
              >
                {couponMsg.text}
              </p>
            )}
          </div>

          {appliedCode && (
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs">
              <span>Applied:</span>
              <strong>{appliedCode.code}</strong>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-600 hover:underline"
                aria-label="Remove coupon"
              >
                Remove
              </button>
            </div>
          )}

          {/* Totals */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">{toMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Discount</span>
              <span className="font-medium">−{toMoney(discount)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{toMoney(total)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={onClearCart}
              className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
            >
              Clear Cart
            </button>
            <button
              className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:opacity-90"
              onClick={() => alert("Checkout flow TBD")}
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
