import React, { useContext } from "react";
import { IoFlameSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../Component/PrimaryBtn";
import SectionTitle from "../../Component/SectionTitle";
import TitleHighlighter from "../../Component/TitleHighlighter";
import { DataContext } from "../../Context/DataProvider";

const Promotion = () => {
  const { products } = useContext(DataContext);

  if (!products || products.lenght <= 0) {
    return;
  }

  const hotProduct = products?.find(
    (product) => product?._id === "6363b42dc0b4a5b15e8e50fd"
  );
  const { imgURL, productName, productPrice, discount, description } =
    hotProduct;
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row justify-between  pt-0">
          <div className="max-w-md">
            <img
              src={imgURL}
              className="w-full rounded-lg shadow-2xl mt-5 md:mt-0"
              alt=""
            />
          </div>
          <div className="p-5 py-12 bg-indigo-100 dark:bg-indigo-900">
            <TitleHighlighter>
              Hot Hot <IoFlameSharp className="inline-block text-red-500" />{" "}
              Save {discount}%
            </TitleHighlighter>
            <SectionTitle>{productName}</SectionTitle>
            <p className="py-6 pb-3">{description}</p>
            <div className="mb-2">
              <span className="text-xl text-indigo-500 line-through ">
                ${productPrice}
              </span>
              <span className="text-2xl ml-2">
                ${Math.round(productPrice * (discount / 100))}
              </span>
            </div>
            <PrimaryBtn toNavigate="/">Buy Now</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
