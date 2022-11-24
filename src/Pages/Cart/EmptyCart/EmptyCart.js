import React from "react";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div>
      <div className="h-96 flex justify-center items-center">
        <div className="grid place-items-center">
          <IoCartSharp className="md:text-6xl text-3xl text-center" />
          <span className="md:text-3xl text-xl md:px-0 px-4 text-center font-semibold my-3 mb-5">
            Your cart is empty.
          </span>
          <Link
            to="/products"
            type="button"
            className="md:px-4 px-2 md:py-2 py-1 md:text-base text-sm border rounded-md text-center dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            <span className="">Go to shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
