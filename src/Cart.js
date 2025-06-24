import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./Firebase";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const q = query(
          collection(db, "scans"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedItems = querySnapshot.docs.map((doc) => doc.data());
        setItems(fetchedItems);
      } catch (error) {
        console.error("❌ Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="home">
      <h1 className="title">🛒 Your Smart Cart</h1>
      {items.length === 0 ? (
        <p>No items scanned yet.</p>
      ) : (
        <ul className="cart-list">
          {items.map((item, index) => (
            <li key={index} className="cart-item">
              <strong>{item.productName}</strong> - ₹{item.price}
              <br />
              <small>🕒 {new Date(item.timestamp?.seconds * 1000).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
