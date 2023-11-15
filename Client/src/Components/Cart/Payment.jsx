import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Input, Button, Typography, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../Redux/actions';
import { AccountCircle, Phone, AccountBalance, CreditCard } from '@mui/icons-material';

const Component = styled(Box)`
  margin: auto;
  display: block;
  margin-top: 5%;
  width: 40%;
  height: 500px;
  border: 1px solid grey;
  text-align: center;
  background-color: #f0f0f0;
  color: black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const InputStyle = styled(Input)`
  width: 60%;
  margin-top: 15px;
`;

const PaymentButton = styled(Button)`
  width: 60%;
  background-color: green;
  color: white;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  transition: background-color 0.3s;
  &:hover {
    background-color: darkgreen;
  }
`;

const TotalAmount = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  font-family: monospace;
`;

export default function Payment() {
  const [loader, setLoader] = useState(false);
  const { cartItems } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let sum = 0;
  cartItems.forEach((ele) => {
    sum = sum + ele.price.cost;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setLoader(true);
      setTimeout(() => {
        // Add logic for payment processing
        // Navigate to a confirmation page on success
        dispatch(resetCart());
        navigate('/cart');
      }, 4000);
    }, 3000);
  };

  return (
    <Component>
      <Box>
        <TotalAmount>You have Selected {cartItems.length} Items</TotalAmount> <br />
        <TotalAmount>Your Total Amount <br />₹{sum}</TotalAmount>
      </Box>
      <Box style={{ marginTop: 20 }}>
        <form style={{ display: 'block' }} onSubmit={(e) => handleSubmit(e)}>
          <InputStyle
            placeholder="Enter Your Name"
            required
            type='text'
            startAdornment={<AccountCircle />}
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
          /> <br />
          <InputStyle
            placeholder="Enter Your Mobile Number"
            required
            type='number'
            startAdornment={<Phone />}
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
          /> <br />
          <InputStyle
            placeholder="Enter Your Account Number"
            required
            type='number'
            startAdornment={<AccountBalance />}
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
          /> <br />
          <InputStyle
            placeholder="Enter Your IFSc Code"
            required
            startAdornment={<CreditCard />}
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
          /> <br /> <br />
          <PaymentButton type="submit" disabled={loader}>
            {!loader ? "Continue" : "Processing..."}
          </PaymentButton>
        </form>
      </Box>
    </Component>
  );
}
