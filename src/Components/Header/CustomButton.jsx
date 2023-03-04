import React from 'react'
import { ShoppingCart } from '@mui/icons-material';
import {styled,Box,Button,Typography} from "@mui/material";
const Wrapper = styled(Box)`
    margin: '0 3% 0 auto';
    display: 'flex';
`
export default function CustomButton() {
  return (
    <Wrapper>
      <Button variant='contained'>Login</Button>
        <Typography>Become a seller</Typography>
        <Typography>More</Typography>
        <Box>
        <ShoppingCart />
            <Typography>Cart</Typography>
        </Box>
    </Wrapper>

  )
}
