import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();
  const [formData, setFormData] = useState({});

  // get product data
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // get customer orders data
  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  if (!products || !orders) {
    return;
  }
  console.log(orders);

  const dataCenter = {
    products,
    setProducts,
    orders,
    setOrders,
    formData,
    setFormData,
  };
  return (
    <DataContext.Provider value={dataCenter}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
