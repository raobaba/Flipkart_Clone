import React from 'react'
import { useSelector } from 'react-redux';
import {Grid,Typography,Box, styled,Button} from "@mui/material";
import CartItem from "./CartItem.jsx";
import TotalView from "./TotalView.jsx";
import EmptyCart from './EmptyCart';
const Component = styled(Grid)(({ theme }) => ({
  padding: '30px 135px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
      padding: '15px 0'
  }
}));
const Header = styled(Box)`
    padding: 15px 24px;
    background:#fff;
`
const ButtonWrapper = styled(Box)`
    padding: 16px 25px;
    background:#fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
`
const StyleButton = styled(Button)`
   display:flex;
   margin-left: auto;
   background-color: #fb641b;
   color: #fff;
   width: 250px;
   height: 51px;
   border-radius: 4px;
`
const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down('sm')]: {
      marginBottom: 15
  }
}));
export default function Cart() {
  const {cartItems} = useSelector(state=>state.cart);
  return (
    <>
      {
          cartItems.length ?
          <Component container>
              <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                  <Header>
                    <Typography>My Cart ({cartItems.length})</Typography>
                  </Header>
                  {
                    cartItems.map(item=>(
                      <CartItem item={item}/>
                    ))
                  }
                  <ButtonWrapper>
                    <StyleButton>Place Order</StyleButton>
                  </ButtonWrapper>
              </LeftComponent>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <TotalView cartItems={cartItems} />
              </Grid>
          </Component> : <EmptyCart />
      }
    </>
  )
}
