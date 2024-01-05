import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import Stepper from "./Stepper";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { clearErrors, newOrder } from "../../redux/actions/orderAction";
import { useSnackbar } from "notistack";
import { post } from "../../utils/paytmForm";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MetaData from "../Layouts/MetaData";

import { emptyCart } from "../../redux/actions/cartAction";
import { loadStripe } from "@stripe/stripe-js";

const Payment = ({ stripeApiKey }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();
  const paymentBtn = useRef(null);

  const [payDisable, setPayDisable] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paymentData = {
    amount: Math.round(totalPrice),
    email: user.email,
    phoneNo: shippingInfo.phoneNo,
  };

  console.log(cartItems);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    totalPrice,
  };

  const makePayment = async () => {
    const stripe = await loadStripe(stripeApiKey);

    const body = {
      products: cartItems,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("http://localhost:8000/api/v1/checkout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(result);
    dispatch(newOrder(order));
    dispatch(emptyCart());
    navigate("/order/success");
    if (result.error) {
      enqueueSnackbar(result.error.message, { variant: "error" });
      console.log(result.error);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Flipkart: Secure Payment | Paytm" />

      <main className="w-full mt-20">
        {/* <!-- row --> */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          {/* <!-- cart column --> */}
          <div className="flex-1">
            <Stepper activeStep={3}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="payment-radio-group"
                  defaultValue="stripe"
                  name="payment-radio-button"
                >
                  <FormControlLabel
                    value="stripe"
                    control={<Radio />}
                    label={
                      <div className="flex items-center gap-4">
                        <img
                          draggable="false"
                          className="h-6 w-10 object-contain"
                          src="data:image/png;base64,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"
                          alt="Paytm Logo"
                        />
                        <span>Stripe</span>
                      </div>
                    }
                  />
                </RadioGroup>
              </FormControl>
              <button
                className={`btn btn-success ${
                  payDisable
                    ? "bg-primary-grey cursor-not-allowed"
                    : "bg-primary-orange cursor-pointer"
                } w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                disabled={payDisable}
                onClick={makePayment}
                type="button"
              >
                Pay ₹{totalPrice.toLocaleString()}
              </button>
            </Stepper>
          </div>

          <PriceSidebar cartItems={cartItems} />
        </div>
      </main>
    </>
  );
};

export default Payment;
