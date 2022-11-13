import React from "react";

const QuoteOption = ({ option, setService }) => {
  const { name, slots } = option;
  return (
    <div>
      <div className="card relative bg-gray-800 shadow-xl">
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
      </div>
    </div>
  );
};

export default QuoteOption;
