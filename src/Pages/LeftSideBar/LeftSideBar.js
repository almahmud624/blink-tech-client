import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

const LeftSideBar = ({ handleProductFilter }) => {
  const { products } = useContext(DataContext);
  let categories = [];
  for (let product of products) {
    categories.push(product.category);
  }
  const filterdCategories = categories.filter(
    (v, i) => categories.indexOf(v) === i
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center  px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex flex-row items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>

          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search Product"
          />
        </div>

        <div className="flex flex-row justify-between flex-1">
          <nav className="flex">
            {/* <a
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
              href="#"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mx-4 font-medium">Dashboard</span>
            </a> */}
            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to=""
              onClick={() => handleProductFilter("all")}
            >
              <span className="mx-4 font-medium capitalize">All</span>
            </Link>
            {filterdCategories?.map((category) => (
              <>
                <Link
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                  to=""
                  onClick={() => handleProductFilter(category)}
                >
                  <span className="mx-4 font-medium capitalize">
                    {category}
                  </span>
                </Link>
              </>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
