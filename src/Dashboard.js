import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import InfoPanel from "./components/InfoPanel";


export default function Dashboard() {
  return (
    <>
      <Navbar />
      <InfoPanel />
      <div className="dashboard">
        <h1 style={{ padding: "20px", textAlign: "center" }}></h1>
      </div>
    </>
  );
}
