// src/Router.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PaymentHistory from "./components/PaymentHistory";
import Profile from "./components/Profile";
import { CartContext } from "./CartContext";
import Home from "./Home";
import Scan from "./Scan";
import Cart from "./Cart";
import Payment from "./Payment"

export default function AppRouter() {
  const { user } = useContext(CartContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}
