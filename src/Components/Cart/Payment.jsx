import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FadeLoader } from "react-spinners";
import { Box, Input, Button, Typography, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const Component = styled(Box)`
      margin: auto;
      display: block;
      margin-top: 5%;
      width: 40%;
      height: 500px;
      border: 1px solid grey;
      text-align: center;
 `
const InputStyle = styled(Input)`
     width: 60%;
     margin-top: 15px;
 `
const PaymentButton = styled(Button)`
    width: 60%;
    background-color: green;
    color: white;
    height: 50px;
    font-size: 20px;
    font-weight: 600;
`
const TotalAmount = styled(Typography)`
    font-size: 30px;
    font-weight: 700;
    font-family: monospace;
`
export default function Payment() {
    const [loader, setLoader] = useState(false)
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    console.log(cartItems)
    let sum = 0;
    cartItems.map((ele) => {
        sum = sum + ele.price.cost;
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(()=>{
            setLoader(true);
        },3000)
    }

    return (
        <Component>
            <Box>
                <TotalAmount>You have Selected {cartItems.length} Items</TotalAmount> <br />
                <TotalAmount>Your Total Amount <br />₹{sum}</TotalAmount>
            </Box>
            <Box style={{ marginTop: 20 }}>
                <form style={{ display: 'block' }}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <InputStyle
                        placeholder="Enter Your Name"
                        required
                        type='text'
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    /> <br />
                    <InputStyle
                        placeholder="Enter Your Mobile Number"
                        required
                        type='number'
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    /> <br />
                    <InputStyle
                        placeholder="Enter Your Account Number"
                        required
                        type='number'
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    /> <br />
                    <InputStyle
                        placeholder="Enter Your IFSc Code"
                        required
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    /> <br /> <br />
                    <PaymentButton type="submit">
                        {loader == false ? "Continue" : <FadeLoader
                            color="#36d7b7"
                            cssOverride={{}}
                            height={15}
                            loading={loader}
                            margin={1}
                            radius={2}
                            speedMultiplier={1}
                            width={4}
                        />}</PaymentButton>
                </form>
            </Box>
        </Component>
    )
}
