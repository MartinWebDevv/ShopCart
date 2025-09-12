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
- [ ] Promo codes + discounts
- [ ] Animations (e.g., cart drawer, modal transitions)
- [ ] Accessibility improvements (keyboard navigation, ARIA roles)
- [ ] User authentication (mock login/signup)
- [ ] Analytics (track product views, cart additions)
- [ ] Deployment on GitHub Pages

---

## Project Structure
src/
components/
Header.jsx
ProductCard.jsx
Product.jsx
context/
CartContext.jsx (coming soon)
data/
products.js
App.jsx
main.jsx



---

## Getting Started
1. Clone the repo
   ```bash
   git clone https://github.com/MartinWebDevv/shop-cart.git
   cd shop-cart

npm install
npm run dev
```
