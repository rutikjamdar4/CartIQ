import React from "react";
import Navbar from "./Navbar";

export default function PaymentHistory() {
  return (
    <>
      <Navbar />
      <div className="home">
        <h2>📜 Payment History</h2>
        <p>You haven't made any purchases yet.</p>
      </div>
    </>
  );
}
