// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../app/CartContext.jsx';
import SearchBar from './SearchBar.jsx';

/* =========================================
   SECTION: Header / Top Nav (with global search)
   PROPS:
     - cartCount: number
     - onOpenCart: fn()
   ========================================= */
export default function Header({ cartCount = 0, onOpenCart }) {
  const { query, setQuery } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 p-3">
        {/* Brand */}
        <NavLink to="/" className="text-lg font-semibold">
          ShopCart
        </NavLink>

        {/* Primary nav */}
        <div className="order-3 ml-0 flex w-full items-center gap-4 text-sm md:order-2 md:ml-4 md:w-auto">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'underline' : '')}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'underline' : '')}>
            Products
          </NavLink>
        </div>

        {/* Search (global) */}
        <div className="order-2 flex-1 md:order-3">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* Right actions */}
        <div className="order-1 ml-auto flex items-center gap-3 md:order-4">
          <button
            onClick={onOpenCart}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
            aria-label="Open cart"
          >
            Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </button>
        </div>
      </nav>
    </header>
  );
}
