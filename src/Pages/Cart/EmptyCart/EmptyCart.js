import React from "react";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div>
      <div className="h-96 flex justify-center items-center">
        <div className="grid place-items-center">
          <IoCartSharp className="text-6xl text-center" />
          <span className="text-3xl font-semibold my-3 mb-5">
            Your cart is empty.
          </span>
          <Link
            to="/products"
            type="button"
            className="px-4 py-2 border rounded-md text-center dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            <span className="sr-only sm:not-sr-only">Go to shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
