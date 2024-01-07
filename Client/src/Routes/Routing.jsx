
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default Routing;
