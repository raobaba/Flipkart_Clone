import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Login from "../components/User/Login.jsx";
import Register from "../components/User/Register.jsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
}

export default Routing;
