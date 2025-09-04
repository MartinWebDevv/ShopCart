// Header.jsx
import React from "react";

export default function Header({ count, onCartClick }) {
  return (
    <section>
      <header className="sticky top-0 z-10 border-b border-slate-200/60 bg-white/70 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold tracking-tight">ShopCart</h1>

          <nav className="flex items-center gap-4">
            <a
              href="#top"
              className="text-sm text-slate-600 hover:underline dark:text-slate-300"
            >
              Home
            </a>
            <a
              href="#products"
              className="text-sm text-slate-600 hover:underline dark:text-slate-300"
            >
              Products
            </a>

            <button
              onClick={onCartClick}
              className="relative rounded-xl border border-slate-300/60 px-4 py-2 text-sm backdrop-blur-sm dark:border-slate-700/60"
            >
              Cart
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-semibold text-white">
                {count}
              </span>
            </button>
          </nav>
        </div>
      </header>
    </section>
  );
}
