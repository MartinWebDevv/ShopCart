import React, { useState } from "react";
import { formatPrice } from "../data/products";

export default function ProductCard(props) {
  const [clicked, setClicked] = useState(false); // button flash
  const [showOverlay, setShowOverlay] = useState(false); // "Add to Cart" overlay
  const available = props.inStock !== false;

  const handleAdd = () => {
    if (!available) return;
    // run parent add
    props.onAdd();

    // button grey flash
    setClicked(true);
    setTimeout(() => setClicked(false), 150);

    // overlay text flash
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 650); // visible ~0.65s
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Image / placeholder */}
      <div
        onClick={props.onOpenModel}
        className="group relative aspect-square w-full overflow-hidden rounded-t-lg bg-slate-200 dark:bg-slate-700"
      >
        {props.img ? (
          <img
            src={props.img}
            alt={props.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            {props.name}
          </div>
        )}

        {/* Overlay flash text with slight white fade + blur */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${
            showOverlay ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* soft white veil + blur */}
          <div className="absolute inset-0 rounded-t-lg bg-white/35 backdrop-blur-lg" />
          {/* quiet gray text, not bold */}
          <span className="relative select-none text-lg font-bold tracking-wide text-slate-700 dark:text-slate-900">
            Added to Cart
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="mb-1 text-xs uppercase tracking-wide text-slate-500">
          {props.category}
        </p>
        <p className="mb-1 text-base font-medium">{props.name}</p>
        <p className="mb-3 text-sm font-semibold">{formatPrice(props.price)}</p>

        {Array.isArray(props.tags) && props.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {props.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Hover color + grey flash on click */}
        <button
          type="button"
          disabled={!available}
          onClick={handleAdd}
          className={`w-full rounded-xl px-5 py-2 text-sm font-medium transition-colors duration-200
            ${
              available
                ? clicked
                  ? "bg-gray-400 text-white"
                  : "border border-slate-300 text-slate-900 hover:bg-blue-600 hover:text-white dark:border-slate-700 dark:text-slate-100 dark:hover:bg-blue-700"
                : "cursor-not-allowed border border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-500"
            }`}
        >
          {available ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
