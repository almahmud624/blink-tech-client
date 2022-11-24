import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Component/Loader";
import SectionTitle from "../../../Component/SectionTitle";

const MyAppointments = () => {
  const { user, userSignOut } = useContext(AuthContext);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/bookings?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("blink-token")}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          return userSignOut();
        }
        console.log(error);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className=" ">
        <SectionTitle customClass={"mb-5"}>Your Appointments</SectionTitle>
        <div className="mx-auto px-2 py-5">
          <div className="overflow-hidden rounded-xl bg-gray-800 px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b border-gray-900 lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Appointment Date
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Name
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Service Name
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Time
                  </td>
                </tr>
              </thead>

              <tbody className="bg-gray-800 lg:border-gray-300">
                {bookings?.map((booking) => (
                  <tr key={Math.random()} className="">
                    <td className="whitespace-no-wrap md:border-0 border-b border-gray-900 py-4 text-left text-sm text-indigo-200 sm:px-3 lg:text-left">
                      <span className="md:font-normal font-semibold text-gray-400">
                        {booking?.selectedDate}
                      </span>
                      <div className="mt-1 flex flex-col text-md space-y-3 md:hidden">
                        <div className="flex items-center text-md text-indigo-200">
                          {booking?.name}
                        </div>
                        <div className="flex items-center text-md text-indigo-200">
                          {booking?.service}
                        </div>
                        <div className="flex items-center text-md text-indigo-200">
                          {booking?.slot}
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-indigo-200 sm:px-3 md:table-cell capitalize">
                      {booking?.name}
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-indigo-200 sm:px-3 md:table-cell lg:text-left">
                      {booking?.service}
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-indigo-200 sm:px-3 md:table-cell lg:text-left">
                      {booking?.slot}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
