const express = require("express");
const {
  newOrder,
  getSingleOrderDetails,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controllers/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");

const orderRouter = express.Router();

orderRouter.route("/order/new").post(isAuthenticatedUser, newOrder);
orderRouter.route("/order/:id").get(isAuthenticatedUser, getSingleOrderDetails);
orderRouter.route("/orders/me").get(isAuthenticatedUser, myOrders);
orderRouter
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
orderRouter
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = orderRouter;
