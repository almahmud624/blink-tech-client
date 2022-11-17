import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyAppointments = () => {
  const { user } = useContext(AuthContext);

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/bookings?email=${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  console.log(bookings);

  return (
    <div>
      <div className=" ">
        <div className="mx-auto px-2 py-5">
          <div className="overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
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

                  {/* <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Customer
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Dimensions
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Weight
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Status
                  </td> */}
                </tr>
              </thead>

              <tbody className="bg-white lg:border-gray-300">
                {bookings?.map((booking) => (
                  <tr key={Math.random()} className="">
                    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                      {booking?.selectedDate}
                      {/* <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                      <div className="flex items-center">Jane Doeson</div>
                      <div className="flex items-center">Desktop Computer</div>
                      <div className="">24 x 10 x 5 cm</div>
                      <div className="flex items-center">1 Kg</div>
                    </div> */}
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell capitalize">
                      {booking?.name}
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                      {booking?.service}
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
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
