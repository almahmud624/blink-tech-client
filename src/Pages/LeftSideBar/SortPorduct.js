import React, { useContext } from "react";
import { DataContext } from "../../Context/DataProvider";

const SortPorduct = () => {
  const { setIsAsc } = useContext(DataContext);
  return (
    <div>
      <div className="flex flex-col mt-5 px-4 py-0 md:mx-0 mx-4 bg-white border dark:bg-gray-900 dark:border-gray-700">
        {/**
         *------->  Sort Product by price
         */}

        <div className="">
          <h4 className="text-xl mt-4 md:mt-4 font-semibold flex items-center gap-2">
            Sort By Price
          </h4>
          <nav className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 p-5">
            <div className="flex items-center mb-0 md:mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                onClick={() => setIsAsc(false)}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                to Low
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                onClick={() => setIsAsc(true)}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                to High
              </label>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SortPorduct;
