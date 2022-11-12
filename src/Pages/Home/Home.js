import React from "react";
import About from "../About/About";
import BecomeSeller from "../BecomeSeller/BecomeSeller";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";
import Promotion from "../Promotion/Promotion";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Carousel />
      <About />
      <Promotion />
      <Products />
      <BecomeSeller />
    </div>
  );
};

export default Home;
