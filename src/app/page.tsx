import Banner from '@/components/homepage/Banner';
import React from 'react';
import ProductsCard from "./products/ProductsCard";

const page = () => {
  return (
    <div>
      <Banner />
      <ProductsCard />
    </div>
  );
};

export default page;