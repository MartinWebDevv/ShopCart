export const products = [
  {
    id: "p-001",
    name: "Flum Mellow",
    category: "disposable",
    price: 2199, // cents
    inStock: true,
    img: "/imgs/geekbar-x.jpg", // optional; you can drop images later in /public/imgs
    tags: ["best-seller", "new"],
  },
  {
    id: "p-002",
    name: "Skweezed 100ml",
    category: "juice",
    price: 1899,
    inStock: true,
    img: "/imgs/skweezed-100.jpg",
    tags: ["fruit"],
  },
  {
    id: "p-003",
    name: "Aegis Legend 3 Kit",
    category: "device",
    price: 10000,
    inStock: false,
    img: "/imgs/aegis-legend-3.jpg",
    tags: ["kit"],
  },
  {
    id: "p-004",
    name: "Fogger Switch Pro",
    category: "disposable",
    price: 2199,
    inStock: true,
    img: "/imgs/fogger-switch-pro.jpg",
    tags: ["compact"],
  },
];

// tiny helper to format cents → $X.XX
export const formatPrice = (cents) =>
  (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
