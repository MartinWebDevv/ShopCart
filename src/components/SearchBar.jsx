// src/components/SearchBar.jsx
import React from "react";

/* =========================================
   SECTION: SearchBar (controlled)
   PROPS:
     - value: string
     - onChange: fn(string)
   ========================================= */
export default function SearchBar({ value = "", onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search products…"
        className="w-full rounded-lg border px-3 py-2 pr-9 text-sm"
        aria-label="Search products"
      />
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
        ⌕
      </span>
    </div>
  );
}
