import geekbar from "../assets/imgs/geekbar-x.jpg";
import skweezed from "../assets/imgs/skweezed-100.jpg";
import aegisLegend3 from "../assets/imgs/aegis-legend-3.jpg";
import fogger from "../assets/imgs/fogger-switch-pro.jpg";

export const products = [
  {
    id: "p-001",
    name: "Geek Bar X",
    category: "disposable",
    price: 2199, // cents
    inStock: true,
    img: geekbar,
    tags: ["best-seller", "new"],
  },
  {
    id: "p-002",
    name: "Skweezed 100ml",
    category: "juice",
    price: 1899,
    inStock: true,
    img: skweezed,
    tags: ["fruit"],
  },
  {
    id: "p-003",
    name: "Aegis Legend 3 Kit",
    category: "device",
    price: 10000,
    inStock: true,
    img: aegisLegend3,
    tags: ["kit"],
  },
  {
    id: "p-004",
    name: "Fogger Switch Pro",
    category: "disposable",
    price: 2199,
    inStock: true,
    img: fogger,
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
