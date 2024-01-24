const asyncErrorHandler = require("../Middlewares/asyncErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = asyncErrorHandler(async (req, res, next) => {
  const { products, address } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/orders/success",
    cancel_url: "http://localhost:3000/orders/failed",
  });

  console.log("session", session);

  // Modify the response object to include a success message
  const response = {
    id: session.id,
    payment_status: session.status,
    message: "success",
  };

  res.json(response);
});


const sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = {
  processPayment,
  sendStripeApiKey,
};
