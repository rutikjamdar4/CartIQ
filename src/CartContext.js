import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Add item to cart (name & price only)
  const addToCart = (name, price) => {
    const newItem = { name, price };
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  // 🧹 Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // 🔐 User login/logout
  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => setUser(null);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, clearCart, user, loginUser, logoutUser }}
    >
      {children}
    </CartContext.Provider>
  );
}
