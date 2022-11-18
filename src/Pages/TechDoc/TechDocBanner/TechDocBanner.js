import React, { useState } from "react";
import TechDocServiceStep from "../TechDocServiceStep/TechDocServiceStep";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

const TechDocBanner = ({ selectedDate, setSelectedDate }) => {
  const serviceSteps = [
    {
      _id: 1,
      step: 1,
      stepName: "Capture Problem",
      icon: "icon",
      description:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit ametdui. Nulla quis lorem ut libero malesuada feugiat. Curabitur nonnulla sit amet nisl tempus convallis quis ac lectus",
    },
    {
      _id: 2,
      step: 2,
      stepName: "Get a quote",
      icon: "icon",
      description:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit ametdui. Nulla quis lorem ut libero malesuada feugiat. Curabitur nonnulla sit amet nisl tempus convallis quis ac lectus",
    },
    {
      _id: 3,
      step: 3,
      stepName: "Make an Appoinment",
      icon: "icom",
      description:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit ametdui. Nulla quis lorem ut libero malesuada feugiat. Curabitur nonnulla sit amet nisl tempus convallis quis ac lectus",
    },
    {
      _id: 4,
      step: 4,
      stepName: "Delivery",
      icon: "icom",
      description:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit ametdui. Nulla quis lorem ut libero malesuada feugiat. Curabitur nonnulla sit amet nisl tempus convallis quis ac lectus",
    },
  ];
  return (
    <div>
      <div>
        <div className="flex min-h-screen">
          <div className="relative my-auto mx-auto flex flex-col gap-x-20 px-4 sm:max-w-xl md:max-w-screen-xl md:flex-row">
            <div className="flex h-full w-7/12 space-x-3 overflow-hidden md:justify-end hero-content">
              {serviceSteps?.slice(0, 1).map((step) => (
                <div className="w-60 h-3/4 overflow-hidden shadow-md rounded-xl  relative">
                  <div className="md:flex flex-start ">
                    <div className="z-10 h-full w-full bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-[3px] bg-opacity-5 p-3 ">
                      <div className="flex justify-between mb-2">
                        <a
                          href="#!"
                          className="font-bold text-indig-50 text-4xl"
                        >
                          {step?.stepName}
                        </a>
                      </div>
                      <p className="text-indigo-200 text-sm">
                        {step?.description}
                      </p>
                    </div>
                    <div className="absolute top-0 right-2">
                      <h1 className="text-9xl font-extrabold -z-10 drop-shadow-2xl p-3 text-slate-600">
                        {step?.step}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full flex-col space-y-3 rounded-xl py-4 lg:flex lg:w-80 ">
                {serviceSteps.slice(1, 4).map((step) => (
                  <TechDocServiceStep key={Math.random()} step={step} />
                ))}
              </div>
            </div>
            <div className="mx-auto w-1/3 flex ">
              <div className="mb-16 lg:my-auto lg:max-w-lg">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechDocBanner;
