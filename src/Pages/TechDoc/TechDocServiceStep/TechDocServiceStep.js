import React from "react";

const TechDocServiceStep = ({ step }) => {
  return (
    <div className="h-40 overflow-hidden  rounded-xl   relative">
      <div className="md:flex flex-start ">
        <div className="z-10 h-full w-full bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-[3px] bg-opacity-5 p-3 ">
          <div className="flex justify-between mb-2">
            <a href="#!" className="font-medium text-indig-50 text-xl">
              {step?.stepName}
            </a>
          </div>
          <p className="text-indigo-200 text-sm">{step?.description}</p>
        </div>
        <div className="absolute top-0 right-2">
          <h1 className="text-9xl font-extrabold -z-10 drop-shadow-2xl p-3 text-slate-600">
            {step?.step}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TechDocServiceStep;
