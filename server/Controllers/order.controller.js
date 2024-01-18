const asyncErrorHandler = require("../Middlewares/asyncErrorHandler");
const Order = require("../Models/order.model");
const Product = require("../Models/product.model");
const ErrorHandler = require("../utils/errorHandler");
const sendEmails = require("../utils/sendEmail");

// Create New Order
const newOrder = asyncErrorHandler(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;
  console.log("newOrder",req.body)

  const orderExist = await Order.findOne({ paymentInfo });
  console.log("orderExit",orderExist)

  if (orderExist) {
    return next(new ErrorHandler("Order Already Placed", 400));
  }

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order Details
const getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Logged In User Orders
const myOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler("Order Not Found", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders ---ADMIN
const getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler("Order Not Found", 404));
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// Update Order Status ---ADMIN
const updateOrder = asyncErrorHandler(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
  }

  if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("Already Delivered", 400));
  }

  if (req.body.status === "Shipped") {
      order.shippedAt = Date.now();
      order.orderItems.forEach(async (i) => {
          await updateStock(i.product, i.quantity)
      });
  }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
      success: true
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order ---ADMIN
const deleteOrder = asyncErrorHandler(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
  }

  await Order.deleteOne({ _id: order._id });

  res.status(200).json({
      success: true,
  });
});


module.exports = {
  newOrder,
  getSingleOrderDetails,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
};
