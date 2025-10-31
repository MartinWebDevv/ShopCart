# 🛍️ ShopCart

ShopCart is a responsive shopping cart application built with React (Vite) and Tailwind CSS.
The project demonstrates core e-commerce features such as product listings, a shopping cart, and a modern responsive layout.

---

## Features
- Responsive product grid (mobile → desktop)
- Reusable components
- Sticky header with navigation + cart button
- Tailwind CSS styling (light + dark mode ready)
- Modular project structure for easy scaling

---

## Roadmap
- [x] Header + navigation
- [x] Product grid + reusable cards
- [x] Cart state management (add/remove/qty)
- [x] Cart drawer with line items
- [x] Filters & sorting
- [x] Search functionality
- [x] Persistent cart (local storage)
- [x] Promo codes + discounts
- [x]Animations (e.g., cart drawer, modal transitions)
- [ ] Accessibility improvements (keyboard navigation, ARIA roles)
- [ ] User authentication (mock login/signup)
- [ ] Analytics (track product views, cart additions)
- [ ] Deployment on GitHub Pages

---

## Project Structure
src/
├── app/                     # Global state, contexts, and app-wide logic
│   └── CartContext.jsx
│
├── assets/                  # Images, fonts, and other bundled media
│
├── data/                    # Static or mock data used throughout the app
│   ├── products.js
│   └── PromoCode.js
│
├── features/                # Feature-specific components and logic
│   └── product/
│       ├── ProductCard.jsx
│       ├── ProductDetailModal.jsx
│       ├── Filters.jsx
│       └── SortProducts.jsx
│
├── lib/                     # Reusable helper and utility functions (no React)
│   ├── cart.js
│   └── promo.js
│
├── pages/                   # Top-level route pages
│   ├── Home.jsx
│   └── Products.jsx
│
├── styles/                  # Global styles and Tailwind CSS entry
│   └── index.css
│
├── ui/                      # Reusable UI components shared across pages
│   ├── Cart.jsx
│   ├── Header.jsx
│   └── SearchBar.jsx
│
├── App.jsx                  # Root application component (routes, providers)
├── main.jsx                 # Entry point rendering the app
│
├── .prettierrc              # Code formatting rules (Prettier)
├── eslint.config.js         # ESLint configuration
└── tailwind.config.js       # Tailwind setup




---

## Getting Started
1. Clone the repo
   ```bash
   git clone https://github.com/MartinWebDevv/shop-cart.git
   cd shop-cart

npm install
npm run dev
```
