import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

const SortPorduct = () => {
  const { setIsAsc } = useContext(DataContext);
  return (
    <div>
      <div className="flex flex-col mt-10 px-4 py-8 pt-4 bg-white border dark:bg-gray-900 dark:border-gray-700">
        {/**
         *------->  Sort Product by price
         */}

        <div className="">
          <h4 className="text-xl mt-10 font-semibold flex items-center gap-2">
            Sort By Price
          </h4>
          <nav className="flex flex-col p-5">
            <div class="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                onClick={() => setIsAsc(false)}
                name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-1"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                to Low
              </label>
            </div>
            <div class="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                onClick={() => setIsAsc(true)}
                name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-2"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                to High
              </label>
            </div>

            <Link
              className="flex items-center py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to=""
              //   onClick={() => handleProductFilter("all")}
            >
              <span className="mx-4 font-medium capitalize">All</span>
            </Link>
            {[Array(4).keys].map((category) => (
              <Link
                key={Math.random()}
                className="flex items-center py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                to=""
                // onClick={() => handleProductFilter(category)}
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

export default SortPorduct;
