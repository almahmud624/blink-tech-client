import React from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../Product/Product";

const Products = () => {
  const products = useLoaderData();
  return (
    <div>
      <h3>All Products {products.length}</h3>
      <div className="max-w-screen-xl grid grid-cols-3 m-auto">
        {products?.map((product) => (
          <Product key={Math.random()} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default Products;
