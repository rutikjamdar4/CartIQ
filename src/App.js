import React from "react";
import AppRouter from "./Router";
import { CartProvider } from "./CartContext"; // ✅ import



export default function App() {
  return (
    <CartProvider> {/* ✅ wrap everything */}
      <AppRouter />
    </CartProvider>
  );
}

