import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Carousel.css";
import { IoCartOutline } from "react-icons/io5";
import { DataContext } from "../../Context/DataProvider";
import { addToDb } from "../../Utilities/Localdb";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { products } = useContext(DataContext);
  const navigate = useNavigate();

  const promotedProduct = products?.filter(
    (product) => product.isPromoted === true
  );

  const handleBuy = (items) => {
    addToDb(items?._id, "products-list");
    navigate("/checkout");
  };
  return (
    <div className="max-w-screen-xl mx-auto">
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay, EffectFade]}
        className="mySwiper my-5"
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
      >
        {promotedProduct?.map((items) => (
          <SwiperSlide
            key={Math.random()}
            className="bg-[#DCDDE2]  relative rounded md:screen h-20"
          >
            <div className="relative flex md:h-screen  md:flex-row flex-col-reverse justify-center items-center space-x-4 px-4">
              <div className="z-10 w-full text-center md:text-left md:w-1/2 px-4">
                <h3 className="text-gray-800  capitalize font-bold text-2xl md:text-5xl leading-tight">
                  up to {items?.discount}% off <br></br>
                  <span className="text-indigo-500">{items?.productName}</span>
                </h3>
                <p className="text-gray-500  mt-4 font-base hidden md:block">
                  Choose the best Product for you! Which makes you more
                  comportable on your working session.
                </p>
                <button
                  className="inline-block mt-5 rounded bg-indigo-300 px-8 py-3 text-sm font-medium text-gray-800  hover:bg-indigo-500 hover:text-gray-200 hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-300 transition-all duration-300"
                  href="/download"
                  onClick={() => handleBuy(items)}
                >
                  Buy Now <IoCartOutline className="inline-block h-5 w-5" />
                </button>
              </div>
              <div className="w-1/2 drop-shadow-2xl ">
                <img src={items?.imgURL} alt="" className="w-full h-full" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
