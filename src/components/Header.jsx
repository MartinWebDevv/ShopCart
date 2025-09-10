import React from "react";
import SearchBar from "./SearchBar";

export default function Header({ count, onCartClick }) {
  return (
    <section>
      <header className="sticky top-0 z-10 border-b-0 c-border c-frosted backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold tracking-tight c-text">ShopCart</h1>

          <nav className="flex items-center gap-4">
            <a href="#top" className="text-sm c-muted hover:underline">Home</a>
            <a href="#products" className="text-sm c-muted hover:underline">Products</a>

            <button
              onClick={onCartClick}
              className="relative rounded-xl px-4 py-2 text-sm btn"
            >
              Cart
              <span className="ml-2 inline-flex items-center justify-center rounded-full px-2 text-xs font-semibold badge-accent">
                {count}
              </span>
            </button>
          </nav>
        </div>
      </header>
    </section>
  );
}
