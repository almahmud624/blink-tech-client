import React, { useState } from "react";

const AppointmentOptions = ({ option, setService, service }) => {
  const { _id, name, slots } = option;
  return (
    <div>
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
          defaultChecked={service?._id === option?._id ? true : false}
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

export default AppointmentOptions;
