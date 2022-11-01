import React from "react";
import About from "../About/About";
import Carousel from "../Carousel/Carousel";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Products from "../Products/Products";
import Promotion from "../Promotion/Promotion";

const Home = () => {
  return (
    <div className="max-w-6xl m-auto">
      <Carousel />
      <About />
      <Promotion />
      <section className="">
        <LeftSideBar />
        <Products />
      </section>
    </div>
  );
};

export default Home;
