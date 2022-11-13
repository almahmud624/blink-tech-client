import React from "react";
import About from "../About/About";
import BecomeSeller from "../BecomeSeller/BecomeSeller";
import Carousel from "../Carousel/Carousel";
import GetATechDoc from "../GetATechDoc/GetATechDoc";
import Products from "../Products/Products";
import Promotion from "../Promotion/Promotion";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <Carousel />
      <About />
      <Promotion />
      <Products />
      {/* <BecomeSeller /> */}
      <GetATechDoc />
      <Testimonials />
    </div>
  );
};

export default Home;
