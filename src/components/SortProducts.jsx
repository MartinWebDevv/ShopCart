import React from "react"
{/* Props: selectedSort, onSortChange */}
export default function SortProducts({onSortChange }) {
    {/* Logic: Add any local state if needed */}

    return (
        <div className="mb-4">
            <label
                htmlFor="sort"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
                Sort By:
            </label>
            <select
                id="sort"
                name="sort"
                onChange={onSortChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-300"
            >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="newest">Newest First</option>
            </select>
        </div>
    )
}