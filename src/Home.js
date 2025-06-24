// src/Home.js
import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { logoutUser } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>🛒 Welcome to CartIQ!</h1>
      <p className="subtitle">Your smart cart companion – fast, easy, and queue-free 🚀</p>

      <div className="tab-buttons">
        <button onClick={() => navigate("/scan")}>
          🔍 Scan Items<br /><span className="btn-subtext">Start scanning products instantly</span>
        </button>

        <button onClick={() => navigate("/cart")}>
          🧺 View Cart<br /><span className="btn-subtext">Check items you’ve added</span>
        </button>

        <button onClick={() => navigate("/payment")}>
          💳 Payment<br /><span className="btn-subtext">Proceed to secure checkout</span>
        </button>
      </div>
    </div>
  );
}
