import React, { useEffect } from 'react'
import Navbar from './Navbar';
import Banner from './Banner';
import Slide from './Slide.jsx';
import MidSection from './MidSection.jsx';
import { styled, Box } from "@mui/material";
import { getProducts } from '../../Redux/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import MidSlide from './MidSlide';
const Component = styled(Box)`
   padding: 10px;
   background-color: #f2f2f2;
`
export default function Home() {
  const {products} = useSelector((state)=>state.getProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])
  return (
    <>
      <Navbar products={products} />
      <Component>
        <Banner />
        <MidSlide products={products} title="Deal of the Day" timer={true}></MidSlide>
        <MidSection />
        <Slide products={products} title="Discount for You" timer={false} />
        <Slide products={products} title="Suggesting Items" timer={false} />
        <Slide products={products} title="Top Selections" timer={false} />
        <Slide products={products} title="Recommendated Items" timer={false} />
        <Slide products={products} title="Trending Offers" timer={false} />
        <Slide products={products} title="Season Top's picks" timer={false} />
        <Slide products={products} title="Top deals of Accessories" timer={false} />
      </Component>
    </>
  )
}
