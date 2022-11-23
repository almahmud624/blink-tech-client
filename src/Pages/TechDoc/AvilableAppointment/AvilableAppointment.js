import React, { useState } from "react";
import { format } from "date-fns";
import AppointmentOptions from "../AppointmentOptions/AppointmentOptions";
import BookingModal from "../BookingModal/BookingModal";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Component/Loader";
import { DayPicker } from "react-day-picker";

const AvilableAppointment = ({ selectedDate, setSelectedDate }) => {
  const [service, setService] = useState(null);
  const date = format(selectedDate, "PP");
  // load data using react query
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointment-options"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4000/appointment-options?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-10 mt-0">
      <div className="md:flex-row flex flex-col-reverse gap-10 items-center">
        <div className="md:w-8/12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-5  py-10">
          {appointmentOptions?.map((option) => (
            <AppointmentOptions
              key={Math.random()}
              option={option}
              setService={setService}
              service={service}
            />
          ))}
        </div>
        <div className="md:w-1/3 w-full md:mb-12 mb-0 md:mt-0 mt-10 items-start h-auto flex justify-center relative bg-gray-800 rounded-lg">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="z-20"
          />

          <p className="text-lg text-center font-semibold text-indigo-200 absolute -bottom-10">
            Selected date:{format(selectedDate, "PP")}
          </p>
        </div>
      </div>
      <div className="text-center">
        <label
          htmlFor="booking-modal"
          className="btn bg-indigo-300 text-gray-800  inline-block mt-3 rounded  px-8 py-3 text-sm font-medium outline-none  hover:bg-indigo-500 hover:text-indigo-100 hover:rotate-2 hover:scale-110  transition-all duration-300 capitalize z-30 self-center "
          onClick={() =>
            !service && toast.error("Plz! Select a Service First.")
          }
        >
          Book Now
        </label>
      </div>
      {service && (
        <BookingModal
          key={Math.random()}
          service={service}
          selectedDate={selectedDate}
          setService={setService}
          refetch={refetch}
          // disabled={slots?.length === 0}
        />
      )}
    </div>
  );
};

export default AvilableAppointment;
