import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <input
          type="text"
          id="search"
          name="search"
          value={value}
          onChange={onChange}
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>
    </div>
  );
}
