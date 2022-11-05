import React, { useContext } from "react";
import { IoFlameSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

const Promotion = () => {
  const { products } = useContext(DataContext);
  const hotProduct = products?.find(
    (product) => product?._id === "6363b42dc0b4a5b15e8e50fd"
  );
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row justify-between  pt-0">
          <img
            src={hotProduct?.imgURL}
            className="max-w-md rounded-lg shadow-2xl mt-5 md:mt-0"
            alt=""
          />
          <div className="p-5 py-12 bg-indigo-100 dark:bg-indigo-900">
            <h5 className="font-medium text-indigo-400 mb-2 pr-2 inline-block border-r-4 border-b-4 rounded-lg border-indigo-400">
              Hot Hot <IoFlameSharp className="inline-block text-red-500" />{" "}
              Save {hotProduct?.discount}%
            </h5>
            <h1 className="text-5xl font-bold">
              {hotProduct?.productName}{" "}
              {/* <span className="text-green-400">40%</span> Off */}
            </h1>
            <p className="py-6 pb-3">{hotProduct?.description}</p>
            <div>
              <span className="text-xl text-indigo-500 line-through ">
                ${hotProduct?.productPrice}
              </span>
              <span className="text-2xl ml-2">
                $
                {Math.round(
                  hotProduct?.productPrice * (hotProduct?.discount / 100)
                )}
              </span>
            </div>
            <Link
              className="inline-block mt-5 rounded bg-indigo-300 px-8 py-3 text-sm font-medium text-gray-800  hover:bg-indigo-500 hover:text-gray-200 hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-300 transition-all duration-300"
              href="/download"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
