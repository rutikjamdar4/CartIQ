// src/Scan.js
import React, { useEffect, useRef, useContext } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { db, auth } from "./Firebase";
import { CartContext } from "./CartContext";

export default function Scan() {
  const hasScanned = useRef(false); // Prevent duplicate scans
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 300, height: 100 }, // 📏 Wide box for barcodes
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    });

    const onScanSuccess = async (decodedText, decodedResult) => {
      if (hasScanned.current) return;
      hasScanned.current = true;

      try {
        const barcode = decodedText.trim(); // e.g., 8901234567890
        const productRef = doc(db, "products", barcode);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const product = productSnap.data();

          // ✅ Add to local cart
          addToCart(product.name, product.price);

          // ✅ Save scan to Firestore
          await addDoc(collection(db, "scans"), {
            productId: barcode,
            productName: product.name,
            price: product.price,
            timestamp: Timestamp.now(),
            userId: auth.currentUser?.uid || "guest"
          });

          alert(`✅ Product added: ${product.name} - ₹${product.price}`);
          scanner.clear();
        } else {
          alert("❌ Product not found in database.");
          scanner.clear();
        }
      } catch (error) {
        alert("❌ Scan failed or product lookup error.");
        console.error("Scan error:", error);
        scanner.clear();
      }
    };

    scanner.render(onScanSuccess, (err) => {
      // Optional: log scanner errors
      console.warn("Scanner error:", err);
    });

    return () => scanner.clear(); // Cleanup when unmounting
  }, [addToCart]);

  return (
    <div className="home">
      <h2>📷 Barcode Scanner</h2>
      <p>Place the barcode horizontally inside the box ⬇️</p>
      <div id="reader" style={{ width: "100%" }}></div>
    </div>
  );
}
