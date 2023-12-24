const express = require("express");
const { processPayment } = require("../Controllers/payment.controller");
const { isAuthenticatedUser } = require("../Middlewares/auth.js");
const paymentRouter = express.Router();

paymentRouter.post("/checkout", isAuthenticatedUser, processPayment);

module.exports = paymentRouter;
