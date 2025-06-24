import React, { useContext } from "react";
import "./Profile.css";
import { CartContext } from "../CartContext";

export default function Profile() {
  const { user } = useContext(CartContext); // Ensure 'user' is set during login

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          className="profile-avatar-img"
          src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=1a73e8&color=fff&size=128`}
          alt="User Avatar"
        />
        <h2>Welcome, {user?.name || "User"}!</h2>
        <p>Email: {user?.email || "Not Available"}</p>
        <div className="profile-divider"></div>
        <div className="badge">Verified Shopper ✅</div>
      </div>
    </div>
  );
}
