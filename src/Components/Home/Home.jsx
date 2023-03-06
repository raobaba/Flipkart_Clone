import React from 'react'
import Navbar from './Navbar';
import Banner from './Banner';
import {styled,Box} from "@mui/material";
const Component = styled(Box)`
   padding: 10px;
   background-color: #f2f2f2;
`
export default function Home() {
  return (
    <>
      <Navbar />
      <Component>
         <Banner />
      </Component>
    </>
  )
}
