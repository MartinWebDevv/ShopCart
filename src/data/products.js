import geekbar from "../assets/imgs/geekbar-x.jpg";
import skweezed from "../assets/imgs/skweezed-100.jpg";
import aegisLegend3 from "../assets/imgs/aegis-legend-3.jpg";
import fogger from "../assets/imgs/fogger-switch-pro.jpg";

export const products = [
  {
    id: "p-001",
    name: "Geek Bar Pulse X",
    category: "Disposable",
    price: 21.99, // cents
    inStock: true,
    img: geekbar,
    tags: ["best-seller", "new"],
  },
  {
    id: "p-002",
    name: "Skwezed 100ml",
    category: "Juice",
    price: 18.99,
    inStock: true,
    img: skweezed,
    tags: ["fruit"],
  },
  {
    id: "p-003",
    name: "Aegis Legend 3 Kit",
    category: "Device",
    price: 100.00,
    inStock: true,
    img: aegisLegend3,
    tags: ["kit", "best seller"],
  },
  {
    id: "p-004",
    name: "Fogger Switch Pro",
    category: "Disposable",
    price: 21.99,
    inStock: true,
    img: fogger,
    tags: ["compact"],
  },
  {
    id: "p-005",
    name: "Labubu",
    category: "Doll",
    price: 70.00,
    inStock: true,
    img: "",
    tags: ["doll", "cute"],
  },
];

// tiny helper to format cents → $X.XX
export const formatPrice = (cents) =>
  (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });


  export default products;