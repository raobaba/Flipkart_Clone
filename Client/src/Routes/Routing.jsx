import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Login from "../components/User/Login.jsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}

export default Routing;
