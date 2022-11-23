import { async } from "@firebase/util";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState();
  const [searchText, setSearchText] = useState("");

  // for price sorting -> ascending & descending
  const [isAsc, setIsAsc] = useState(true);

  // get product data with sort by price
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/products?search=${searchText}&order=${
            isAsc ? "asc" : "desc"
          }`
        );
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [isAsc, searchText]);

  // get localstroage data
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products-list"));
    const retriveProducts = [];
    for (let id in storedProducts) {
      const getProduct = products?.find((product) => product?._id === id);
      if (getProduct) {
        getProduct.quantity = storedProducts[id];
        retriveProducts.push(getProduct);
      }
    }
    setCart(retriveProducts);
  }, [products, setCart]);

  if (!products) {
    return;
  }

  const dataCenter = {
    products,
    setProducts,
    cart,
    setCart,
    setIsAsc,
    setSearchText,
  };
  return (
    <DataContext.Provider value={dataCenter}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
