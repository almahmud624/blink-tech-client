import React from "react";

const TestimonalCard = ({ testimonial }) => {
  return (
    <div>
      <div className="relative w-72 rounded-xl mt-20 bg-indigo-900 p-4 shadow-lg m-10">
        <a href="/" className="aboslute left-0 top-0">
          <img
            alt=""
            src={testimonial?.img}
            className="mx-auto h-10 w-10 rounded-full object-cover absolute -left-12 -top-8"
          />
        </a>
        <div className="absolute -left-1 top-0  z-10 h-5 w-5 skew-x-[28deg] bg-indigo-900"></div>
        <p className="text-white">
          <span className="text-lg font-bold text-white"> “ </span>
          {testimonial?.reviewText}
          <span className="text-lg font-bold text-white"> ” </span>
        </p>
        <div className="mt-4 flex items-center">
          <div className="ml-2 flex flex-col justify-between">
            <span className="text-sm font-semibold text-white">
              {" "}
              {testimonial?.name}{" "}
            </span>
            <span className="flex items-center text-xs text-white">
              {" "}
              {testimonial?.role}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonalCard;
