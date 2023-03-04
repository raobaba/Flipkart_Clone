import React from 'react'
import { ShoppingCart } from '@mui/icons-material';
import { styled, Box, Button, Typography } from "@mui/material";
const Wrapper = styled(Box)`
     display: flex;
     margin: 0 3% 0 auto;
`
const LoginButton = styled(Button)`
    color: '#2874f0';
    background: '#FFFFFF';
    text-transform: none;
    font-weight: 600;
    border-radius: 2;
    padding: 5px 40px;
    height: 32;
    box-shadow: none;
`
const Container = styled(Box)`
     display: flex;
`
export default function CustomButton() {
    return (
        <Wrapper>
            <LoginButton variant='contained'>Login</LoginButton>
            <Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3 }}>More</Typography>
            <Container>
                <ShoppingCart />
                <Typography>Cart</Typography>
            </Container>
        </Wrapper>

    )
}
