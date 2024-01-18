import React, { useState, useEffect } from "react";
import WebFont from "webfontloader";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Login from "../components/User/Login.jsx";
import Register from "../components/User/Register.jsx";
import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";
import Products from "../components/Products/Products.jsx";
import Cart from "../components/Cart/Cart.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import Shipping from "../components/Cart/Shipping.jsx";
import OrderConfirm from "../components/Cart/OrderConfirm.jsx";
import Payment from "../components/Cart/Payment.jsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getUserDetails } from "../redux/actions/user.actions.js";
import OrderSuccess from "../components/Cart/OrderSuccess.jsx";
import MyOrders from "../components/Order/MyOrders.jsx";
import Account from "../components/User/Account.jsx";
import UpdateProfile from '../components/User/UpdateProfile.jsx'
import Wishlist from "../components/Wishlist/Wishlist.jsx";
import OrderStatus from "../components/Cart/OrderStatus.jsx";
import OrderDetails from "../components/Order/OrderDetails.jsx";

function Routing() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/stripeapikey"
    );
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    dispatch(getUserDetails());
    getStripeApiKey();
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
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

      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order/confirm"
        element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/process/payment"
        element={
          <ProtectedRoute>
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment stripeApiKey={stripeApiKey} />
              </Elements>
            )}
          </ProtectedRoute>
        }
      ></Route>

      <Route path="/orders/success" element={<OrderSuccess success={true} />} />
      <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
      {/* order process */}

      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/order_details/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/account/update"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default Routing;
