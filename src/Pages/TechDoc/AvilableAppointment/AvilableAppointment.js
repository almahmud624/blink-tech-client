import React, { useState } from "react";
import { format } from "date-fns";
import AppointmentOptions from "../AppointmentOptions/AppointmentOptions";
import BookingModal from "../BookingModal/BookingModal";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Component/Loader";

const AvilableAppointment = ({ selectedDate }) => {
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
    <div className="my-10">
      <p className="text-lg text-center font-semibold text-indigo-200">
        You have selected date:{format(selectedDate, "PP")}
      </p>

      <div className="flex gap-10 items-center">
        <div className="w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-5 my-10 py-10">
          {appointmentOptions?.map((option) => (
            <AppointmentOptions
              key={Math.random()}
              option={option}
              setService={setService}
              service={service}
            />
          ))}
        </div>
        <div className="w-1/4 h-72 flex justify-center relative bg-gray-900 rounded-lg">
          <label
            htmlFor="booking-modal"
            className="btn bg-indigo-300 text-gray-800  inline-block mt-3 rounded  px-8 py-3 text-sm font-medium outline-none  hover:bg-indigo-500 hover:text-indigo-100 hover:rotate-2 hover:scale-110  transition-all duration-300 capitalize z-30 self-center "
            onClick={() =>
              !service && toast.error("Plz! Select a Service First.")
            }
          >
            Book Now
          </label>
          <img
            src="https://media.istockphoto.com/id/512756266/photo/fixing-mobile-phone.jpg?s=612x612&w=0&k=20&c=Lgzw_qxkcqgOoPmI1LqQFA2LVtBVyj6kF5CoQXYpbfg="
            alt=""
            className="absolute object-cover h-full w-full mix-blend-overlay rounded-lg"
          />
        </div>
      </div>
      {service && (
        <BookingModal
          key={Math.random()}
          service={service}
          selectedDate={selectedDate}
          setService={setService}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AvilableAppointment;
