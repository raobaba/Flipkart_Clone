const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../Controllers/payment.controller");
const paymentRouter = express.Router();

paymentRouter.post("/checkout", processPayment);
paymentRouter.get("/stripeapikey", sendStripeApiKey);

module.exports = paymentRouter;
