import React, { useContext } from "react";
import { IoFlameSharp } from "react-icons/io5";
import promotionImg from "../../Assests/promotion.jpg";
import { ProductDataContext } from "../../Context/ProductData";

const Promotion = () => {
  const { products } = useContext(ProductDataContext);
  const hotProduct = products.find(
    (product) => product._id === "6360e169ae4a166c4a9d470e"
  );
  console.log(hotProduct);

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row justify-between  pt-0">
          <img
            src={hotProduct.imgURL}
            className="max-w-md rounded-lg shadow-2xl"
          />
          <div className="p-5 py-16 bg-indigo-100 dark:bg-indigo-900">
            <h5 className="font-medium text-indigo-400 mb-2 pr-2 inline-block border-r-4 border-b-4 rounded-lg border-indigo-400">
              Hot Hot <IoFlameSharp className="inline-block text-red-500" />{" "}
              Save {hotProduct.discount}%
            </h5>
            <h1 className="text-5xl font-bold">
              {hotProduct.productName}{" "}
              {/* <span className="text-green-400">40%</span> Off */}
            </h1>
            <p className="py-6">
              We’re a team of creative and make amazing site in ecommerce from
              Unite States. We love colour pastel, its make our designlook so
              awesome. Now ! come here and create fashion trending with us We’re
              a team of creative and make amazing site in ecommerce from Unite
              States. We love colour pastel, its make our designlook so awesome.
              Now ! come here and create fashion trending with us
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
