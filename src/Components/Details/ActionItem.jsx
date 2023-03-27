import React, { useState } from 'react'
import { Box, Button, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/actions.js';
import { payUsingPaytm } from '../../Services/api.js';
import { post } from '../../utils/Paytm.js';
const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('lg')]: {
    padding: '20px 40px',
  }
}))
const Image = styled('img')({
  padding: '15px',
  width: '90%'
})
const StyleButton = styled(Button)(({ theme }) => ({
  width: '48%',
  height: '50',
  borderRadius: 2,
  [theme.breakpoints.down('lg')]: {
    width: '46%',
  }, [theme.breakpoints.down('sm')]: {
    width: '48%',
  }
}))
export default function ActionItem({ product }) {
  const [quantity, setQuanity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = product;
  const addItemToCart = () => {
    dispatch(addToCart(id,quantity))
    navigate('/cart');
  }
  console.log(setQuanity);
  const buyNow =async () => {
    let response = await payUsingPaytm({ amount: 500, email: 'raoababa@gmail.com'});
    var information = {
        action: 'https://securegw-stage.paytm.in/order/process',
        params: response    
    }
    post(information);
  }
  return (
    <LeftContainer>
      <Box style={{
        padding: '5px 10px',
        border: '1px solid #f0f0f0',
        width: '92%'
      }}>
        <Image src={product.detailUrl} alt="product" />
      </Box>
      <StyleButton onClick={() => addItemToCart()} variant='contained' style={{ marginRight: 10, background: '#ff9f00' }}><Cart />Add To Cart</StyleButton>
      <StyleButton onClick={()=> buyNow()} variant='contained' style={{ background: '#fb641b' }}> <Flash />Buy Now</StyleButton>
    </LeftContainer>
  )
}
