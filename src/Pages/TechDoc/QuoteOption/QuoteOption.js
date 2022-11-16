import React, { useState } from "react";

const QuoteOption = ({ option, setService, service }) => {
  const { _id, name, slots } = option;
  return (
    <div>
      {/* <div className="card relative bg-gray-800 shadow-xl">
        <hr className="border border-base-100 absolute top-20 -right-20 w-full rotate-45"></hr>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
          <span>
            {slots?.length > 0 && slots.length}{" "}
            {slots?.length > 1 ? "Quotes" : "Quote"} Avilable
          </span>
          <div className="card-actions justify-end">
            <label
              htmlFor="booking-modal"
              onClick={() => {
                setService(option);
              }}
              disabled={slots?.length === 0}
              className="btn bg-gray-900 text-indigo-100 hover:bg-gray-900 inline-block mt-3 rounded  px-8 py-3 text-sm font-medium outline-none  hover:text-gray-200 hover:rotate-2 hover:scale-110  transition-all duration-300 capitalize"
            >
              Book Now
            </label>
          </div>
        </div>
      </div> */}
      <div className="relative bg-gray-800 shadow-xl rounded-lg">
        <hr className="border border-base-100 absolute top-20 -right-20 w-full rotate-45"></hr>
        <input
          className="peer hidden"
          id={_id}
          type="radio"
          name="radio"
          onClick={() => {
            setService(option);
          }}
          checked={service?._id === option?._id ? true : false}
          // disabled={slots?.length === 0}
        />

        <label
          className="flex h-full cursor-pointer flex-col rounded-lg p-4 peer-checked:bg-indigo-600 peer-checked:text-white"
          htmlFor={_id}
        >
          <span className="mt-2- font-semibold text-xl ">{name}</span>
          <span className="text-sm capitalize">
            {slots?.length > 0 && slots.length}{" "}
            {slots?.length > 1 ? "Quotes" : "Quote"} Avilable
          </span>
        </label>
      </div>
    </div>
  );
};

export default QuoteOption;
