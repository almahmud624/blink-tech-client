import React from "react";
import PrimaryBtn from "../../../Component/PrimaryBtn";

const QuoteOption = ({ option }) => {
  const { name, slots } = option;
  return (
    <div>
      <div className="card relative bg-gray-800 shadow-xl">
        <hr className="border border-gray-900 absolute top-20 -right-20 w-full rotate-45"></hr>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
          <span>
            {slots?.length > 0 && slots.length}{" "}
            {slots?.length > 1 ? "Quotes" : "Quote"} Avilable
          </span>
          <div className="card-actions justify-end">
            <PrimaryBtn
              customClass={"bg-gray-900 text-indigo-100 hover:bg-gray-900"}
            >
              Book Now
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteOption;
