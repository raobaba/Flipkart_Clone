import React from 'react'
import { Box, Button, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
const LeftContainer = styled(Box)`
    min-width: 40%;
    padding: 40px 0 0 80px;
`
const Image = styled('img')({
   padding:'15px',
   width:'90%'
})
const StyleButton = styled(Button)`
    width: 48%;
    height: 50px;
    border-radius: 2px;
`
export default function ActionItem({ product }) {
  return (
    <LeftContainer>
      <Box style={{
        padding: '5px 10px',
        border: '1px solid #f0f0f0',
        width: '92%'
      }}>
        <Image src={product.detailUrl} alt="product" />
      </Box>
      <StyleButton variant='contained' style={{ marginRight: 10, background: '#ff9f00' }}><Cart />Add To Cart</StyleButton>
      <StyleButton variant='contained' style={{ background: '#fb641b' }}> <Flash />Buy Now</StyleButton>
    </LeftContainer>
  )
}
