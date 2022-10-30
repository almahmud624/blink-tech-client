import React from "react";
import { Outlet } from "react-router-dom";
import AddProduct from "../Pages/AddProduct/AddProduct";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <AddProduct />
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
