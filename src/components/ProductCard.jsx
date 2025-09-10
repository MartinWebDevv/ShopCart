import React, { useState } from "react";
import { formatPrice } from "../data/products";

export default function ProductCard(props) {
  const [clicked, setClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const available = props.inStock !== false;

  const handleAdd = () => {
    if (!available) return;
    props.onAdd();
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 650);
  };

  return (
    <div className="rounded-lg border c-border c-card shadow-sm">
      {/* Image / placeholder */}
      <div
        onClick={props.onOpenModel}
        className="group relative aspect-square w-full overflow-hidden rounded-t-lg c-input"
      >
        {props.img ? (
          <img
            src={props.img}
            alt={props.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center c-muted">
            {props.name}
          </div>
        )}

        {/* Overlay flash text */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${
            showOverlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 rounded-t-lg c-veil backdrop-blur-sm" />
          <span className="relative select-none text-lg font-normal tracking-wide c-muted">
            Add to Cart
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="mb-1 text-xs uppercase tracking-wide c-muted">
          {props.category}
        </p>
        <p className="mb-1 text-base font-medium c-text">{props.name}</p>
        <p className="mb-3 text-sm font-semibold c-text">{formatPrice(props.price)}</p>

        {Array.isArray(props.tags) && props.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {props.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border c-border px-2 py-0.5 text-[10px] uppercase tracking-wide c-muted chip"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Button (colors via CSS classes) */}
        <button
          type="button"
          disabled={!available}
          onClick={handleAdd}
          className={`w-full rounded-xl px-5 py-2 text-sm font-medium transition-colors
            ${available ? (clicked ? "btn-flash" : "btn") : "btn-disabled"}
          `}
        >
          {available ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
