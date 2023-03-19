import React from 'react'
import { Box, styled } from "@mui/material";
import Slide from './Slide.jsx';
const Component = styled(Box)`
       display: flex;
`
const LeftComponent = styled(Box)(({theme})=>({
  width:'83%',
  [theme.breakpoints.down('md')]:{
    width:'100%'
  }
}))

const RightComponent = styled(Box)(({theme})=>({
  marginTop: '45px',
  background: '#FFFFFF',
  width: '17%',
  marginLeft: '10px',
  padding: '5px',
  textAlign: 'center',
  [theme.breakpoints.down('md')]:{
    display:'none'
  }
}))


export default function MidSlide({ products, title, timer }) {
  const adURL = 'https://rukminim1.flixcart.com/fk-p-flap/464/708/image/84add2bf321bf2d6.jpeg?q=70';
  return (
    <Component>
      <LeftComponent>
        <Slide
          products={products}
          title={title}
          timer={timer}
        />
      </LeftComponent>
      <RightComponent>
        <img src={adURL} alt="ad" style={{ width: 217 }} />
      </RightComponent>
    </Component>
  )
}
