import React from "react";

export default function SortProducts({ selectedSort, onSortChange }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="sort"
        className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Sort By
      </label>
      <div className="relative">
        <select
          id="sort"
          name="sort"
          value={selectedSort}
          onChange={onSortChange}
          className="mt-0 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-9 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
}
