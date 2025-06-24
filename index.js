import "./style.css";     // ✅ correct path to CSS
import App from "./src/App";      // ✅ correct path to App.js in root

import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
