import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: logo / name */}
        <h1 className="text-xl font-semibold tracking-tight">ShopCart</h1>

        {/* Right: nav + cart */}
        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-slate-600 hover:underline dark:text-slate-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm text-slate-600 hover:underline dark:text-slate-300"
          >
            Products
          </a>
          <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-slate-700">
            Cart (0)
          </button>
        </nav>
      </div>
    </header>
  );
}
