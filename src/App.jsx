// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

/* =========================================
   SECTION: Context + UI Shell
   ========================================= */
import { CartProvider, useCart } from './app/CartContext.jsx';
import Header from './ui/Header.jsx';
import Cart from './ui/Cart.jsx';

/* =========================================
   SECTION: Lazy Routes
   ========================================= */
const Home = lazy(() => import('./pages/Home.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));

function Loader() {
  return <div className="p-6 text-sm text-slate-600">Loading…</div>;
}

/* =========================================
   SECTION: Shell with Cart (reads from context)
   ========================================= */
function AppShell() {
  const {
    itemCount,
    openCart,
    isCartOpen,
    closeCart,
    cartItems,
    updateQty,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    total,
    appliedCode,
  } = useCart();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <Header cartCount={itemCount} onOpenCart={openCart} />

      {/* Routes (lazy) */}
      <main className="mx-auto w-full max-w-6xl p-4">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="*" element={<p className="text-red-600">404 — Page not found.</p>} />
          </Routes>
        </Suspense>
      </main>

      {/* Cart Drawer */}
      <Cart
        open={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQty={updateQty}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onApplyCoupon={applyCoupon}
        onRemoveCoupon={removeCoupon}
        subtotal={subtotal}
        discount={discount}
        total={total}
        appliedCode={appliedCode}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
