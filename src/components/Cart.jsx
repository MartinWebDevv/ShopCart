import React from "react";

function formatUSD(cents) {
  return (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

export default function Cart({
  items,
  subtotal,
  increment,
  decrement,
  removeItem,
}) {
  if (!items || items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-2 text-lg font-medium">Cart</h2>
        <p className="text-sm text-slate-500">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 ">
      {/* Title */}
      <h2 className="mb-4 text-lg font-medium">Cart</h2>

      <div className=" divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[64px,1fr,auto] items-center gap-3 p-4"
          >
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

            <div>
              <p className="font-medium">{item.name}</p>

              <p className="text-sm text-slate-500">
                {formatUSD(item.price)} each
              </p>

              <div className="mt-2 inline-flex items-center gap-2">
                <button
                  className="rounded border px-2 py-1 text-sm border-slate-300 dark:border-slate-700"
                  onClick={() => decrement(item.id)}
                >
                  −
                </button>

                <span className="min-w-6 text-center">{item.qty}</span>

                <button
                  className="rounded border px-2 py-1 text-sm border-slate-300 dark:border-slate-700"
                  onClick={() => increment(item.id)}
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

      <div className="mt-4 flex items-center justify-end">
        <p className="text-base">
          Subtotal: <span className="font-semibold">{formatUSD(subtotal)}</span>
        </p>
      </div>
    </section>
  );
}
