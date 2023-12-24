const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
const userRouter = require("./Routes/user.route.js");
const productRouter = require("./Routes/product.route.js");
const orderRouter = require("./Routes/order.route.js");
const paymentRouter = require("./Routes/payment.route.js");
const path = require("path");
const Connection = require("./Config/db.js");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);
Connection();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

app.use(errorMiddleware);

module.exports = app;
