import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Payment() {
  const { cartItems, clearCart } = useContext(CartContext);

  // 🧮 Calculate total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty. Add items before paying.");
      return;
    }

    // 🏦 UPI link with dynamic amount
    const upiLink = `upi://pay?pa=byteblaze@upi&pn=ByteBlaze&am=${totalAmount}&cu=INR&tn=CartIQ+Smart+Checkout`;

    // 📲 Redirect to UPI app
    window.location.href = upiLink;

    // 🧹 Clear cart after 5 seconds (optional)
    setTimeout(() => {
      clearCart();
    }, 5000);
  };

  return (
    <div className="home">
      <h1 className="title">💳 Payment</h1>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Amount: ₹{totalAmount}</p>

      <button className="btn" onClick={handlePayment}>
        Pay Now via UPI
      </button>
    </div>
  );
}
