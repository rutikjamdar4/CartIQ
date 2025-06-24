import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { auth, db } from "./Firebase";
import "./Login.css"; // Make sure this file is properly linked
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useContext(CartContext);

  const handleAuth = async () => {
    try {
      if (!email || !password || (!isLogin && (!confirmPassword || !fullName))) {
        return alert("Please fill in all required fields!");
      }

      if (!isLogin && password !== confirmPassword) {
        return alert("Passwords do not match!");
      }

      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");

        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let name = "";
        if (docSnap.exists()) {
          name = docSnap.data().name;
        }

        loginUser({ email: user.email, uid: user.uid, name });
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: email,
        });

        alert("Registered successfully!");
        loginUser({ email: user.email, uid: user.uid, name: fullName });
      }

      navigate("/");
    } catch (error) {
      console.error("Auth Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="form-heading">
          <div style={{ fontSize: "2.5rem" }}>🛒</div>
          <h1>{isLogin ? "Welcome Back!" : "Join CartIQ"}</h1>
          <p>{isLogin ? "Smart shopping starts here." : "Create an account to begin your journey."}</p>
        </div>

        {!isLogin && (
          <input
            type="text"
            placeholder="👤 Full Name"
            className="input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="📧 Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔐 Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="🔒 Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button onClick={handleAuth} className="auth-btn">
          {isLogin ? "Login" : "Register"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin
            ? "Don't have an account? Register here"
            : "Already registered? Login"}
        </p>
      </div>
    </div>
  );
}
