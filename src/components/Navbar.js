// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">🧠 CartIQ</div>

      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/payment-history">Payment History</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
}
