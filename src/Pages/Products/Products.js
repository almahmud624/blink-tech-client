import React, { useContext, useState } from "react";
import { DataContext } from "../../Context/DataProvider";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Product from "../Product/Product";

const Products = () => {
  const { products } = useContext(DataContext);
  const [filterProducts, setFilterProducts] = useState(products);
  const handleProductFilter = (categoryValue) => {
    if (categoryValue === "all") {
      setFilterProducts(products);
      return;
    }
    const filterByCategory = products?.filter(
      (item) => item?.category === categoryValue
    );
    setFilterProducts(filterByCategory);
  };
  return (
    <div className="">
      <LeftSideBar handleProductFilter={handleProductFilter} />
      <div className="max-w-screen-xl grid-cols-2 md:grid-cols-2 lg:grid-cols-3 m-auto">
        {filterProducts?.map((product) => (
          <Product key={Math.random()} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default Products;
