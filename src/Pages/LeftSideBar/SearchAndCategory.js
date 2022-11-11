import React from "react";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";

const SearchAndCategory = ({
  handleProductFilter,
  setQuery,
  filterdCategories,
}) => {
  return (
    <div>
      <div className="flex flex-col  px-4 py-8 pt-4 bg-white border dark:bg-gray-900 dark:border-gray-700">
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/**
         *------->  All Categories
         */}

        <div className="">
          <h4 className="text-xl mt-10 font-semibold flex items-center gap-2">
            <FiFilter /> Categories
          </h4>
          <nav className="flex flex-col ">
            <Link
              className="flex items-center py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to=""
              onClick={() => handleProductFilter("all")}
            >
              <span className="mx-4 font-medium capitalize">All</span>
            </Link>
            {filterdCategories?.map((category) => (
              <Link
                key={Math.random()}
                className="flex items-center py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                to=""
                onClick={() => handleProductFilter(category)}
              >
                <span className="mx-4 font-medium capitalize">{category}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SearchAndCategory;
