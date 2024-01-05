const asyncErrorHandler = require("../Middlewares/asyncErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = asyncErrorHandler(async (req, res, next) => {
const {products} = req.body
 const lineItems = products.map((product)=>({
     price_data:{
         currency:"inr",
         product_data:{
             name:product.name,
             images:[product.image]
         },
         unit_amount:product.price * 100,
     },
     quantity:product.quantity
 }));

 const session = await stripe.checkout.sessions.create({
     payment_method_types:["card"],
     line_items:lineItems,
     mode:"payment",
     success_url:"http://localhost:3000/order/sucess",
     cancel_url:"http://localhost:3000/order/failed",
 });
 res.json({id:session.id})
});

 

const sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = {
  processPayment,
  sendStripeApiKey
};
