import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Carousel.css";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../../Context/ProductData";

const Carousel = () => {
  const { products } = useContext(ProductDataContext);
  const promotedProduct = products?.filter(
    (product) => product.isPromoted === true
  );

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
          <SwiperSlide className="bg-[#DCDDE2]  relative rounded">
            <div className="relative flex h-screen justify-center items-center space-x-4 px-4">
              <div className="z-10 w-1/2 px-4">
                <h3 className="text-gray-800  capitalize font-bold text-5xl leading-tight">
                  up to {items?.discount}% off <br></br>
                  <span className="text-indigo-500">{items?.productName}</span>
                </h3>
                <p className="text-gray-500  mt-4 font-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt asperiores laboriosam ipsa neque quasi quam.
                </p>
                <Link
                  className="inline-block mt-5 rounded bg-indigo-300 px-8 py-3 text-sm font-medium text-gray-800  hover:bg-indigo-500 hover:text-gray-200 hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-300 transition-all duration-300"
                  href="/download"
                  to={`/checkout/${items?._id}`}
                >
                  Buy Now <IoCartOutline className="inline-block h-5 w-5" />
                </Link>
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
