import React, { createContext, useEffect, useState } from "react";

export const ProductDataContext = createContext();
const ProductData = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://blink-tech-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <ProductDataContext.Provider value={{ products }}>
      {children}
    </ProductDataContext.Provider>
  );
};

export default ProductData;
