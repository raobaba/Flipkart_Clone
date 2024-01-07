import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Home = () => {

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
   
      enqueueSnackbar({ variant: "error" });
    
  }, [enqueueSnackbar]);

  return (
    <>
      <MetaData title="Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
      <Categories />
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        <Banner />
        <DealSlider title={"Discounts for You"} />
        <ProductSlider title={"Suggested for You"} tagline={"Based on Your Activity"} />
        <DealSlider title={"Top Brands, Best Price"} />
        <ProductSlider title={"You May Also Like..."} tagline={"Based on Your Interest"} />
        <DealSlider title={"Top Offers On"} />
        <ProductSlider title={"Don't Miss These!"} tagline={"Inspired by your order"} />
      </main>
    </>
  );
};

export default Home;
