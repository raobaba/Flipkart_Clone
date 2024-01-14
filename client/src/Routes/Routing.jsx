import React, { useState, useEffect } from "react";
import WebFont from "webfontloader";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Login from "../components/User/Login.jsx";
import Register from "../components/User/Register.jsx";
import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";
import Products from "../components/Products/Products.jsx"; 
import Cart from '../components/Cart/Cart.jsx'
import ProtectedRoute from "./ProtectedRoute.js";
import Shipping from "../components/Cart/Shipping.jsx";

function Routing() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"],
      },
    });
  });
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<ProtectedRoute>
        <Shipping/>
      </ProtectedRoute>} />
    </Routes>
  );
}

export default Routing;
