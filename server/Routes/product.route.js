const express = require("express");
const {
  getAllProducts,
  getProducts,
  getProductDetails,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} = require("../Controllers/product.controller");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../Middlewares/auth.js");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter.route("/products/all").get(getProducts);
productRouter.route("/product/:id").get(getProductDetails);
productRouter
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
productRouter
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
productRouter
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
productRouter.route("/review").put(isAuthenticatedUser, createProductReview);
productRouter.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = productRouter;
