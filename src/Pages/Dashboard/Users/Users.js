import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmedModal from "../../../Component/ConfirmedModal";

const Users = () => {
  // remove user state
  const [removingUser, setRemovingUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:4000/users", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("blink-token")}`,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  console.log(users);

  const handleMakeAdmin = async (id) => {
    // try {
    //   const res = await axios.patch(`http://localhost:4000/users/admin/${id}`, {
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem("blink-token")}`,
    //     },
    //   });
    // if (res?.data.modifiedCount > 0) {
    //   toast.success("Set Role Admin Successfull");
    //   refetch();
    // }
    // } catch (error) {
    //   console.log(error);
    // }
    fetch(`http://localhost:4000/users/admin/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("blink-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Set Role Admin Successfull");
          refetch();
        }
      });
  };

  // remove user handle
  const handleRemoveUser = (user) => {
    try {
      axios
        .delete(`http://localhost:4000/users/admin/${user?._id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("blink-token")}`,
          },
        })
        .then((res) => {
          if (res?.data.deletedCount > 0) {
            toast.success("User Successfully removed");
            refetch();
            setRemovingUser(null);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="mx-auto px-2 py-5">
        <div className="overflow-hidden rounded-xl bg-gray-800 px-6 shadow lg:px-4">
          <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b border-gray-900 lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3"></td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Name
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Email
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Role
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Action
                </td>
              </tr>
            </thead>

            <tbody className="bg-gray-800 lg:border-gray-300">
              {users?.map((user, i) => (
                <tr key={Math.random()} className="">
                  <td className="whitespace-no-wrap py-4 z-50 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                    <span className="text-gray-400 font-semibold">{i + 1}</span>
                    <div className="mt-1 flex flex-col text-xs font-medium space-y-3 md:hidden">
                      <div className="flex items-center text-md text-indigo-200">
                        {user?.name}
                      </div>
                      <div className="flex items-center text-md text-indigo-200">
                        {user?.email}
                      </div>
                      <div className="">
                        {user?.role === "admin" ? (
                          <span className="p-1 px-3 rounded-lg font-semibold bg-green-600 text-gray-200">
                            Admin
                          </span>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user?._id)}
                            className="btn btn-info btn-xs text-xs capitalize"
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="confirmed-modal"
                          onClick={() => setRemovingUser(user)}
                          className=""
                        >
                          <span className="p-1 px-3 rounded-lg font-semibold bg-red-600 text-gray-200 cursor-pointer">
                            Remove
                          </span>
                        </label>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal  sm:px-3   md:table-cell capitalize text-indigo-200">
                    {user?.name}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm  sm:px-3   md:table-cell lg:text-left text-indigo-200">
                    {user?.email}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-left text-xs  sm:px-3   md:table-cell lg:text-left text-indigo-200">
                    {user?.role === "admin" ? (
                      <span className="p-1 px-3 rounded-lg font-semibold bg-green-600 text-gray-200">
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user?._id)}
                        className="btn btn-info btn-xs text-xs capitalize"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-left text-xs sm:px-3   md:table-cell lg:text-left">
                    <label
                      htmlFor="confirmed-modal"
                      onClick={() => setRemovingUser(user)}
                      className=""
                    >
                      <span className="p-1 px-3 rounded-lg font-semibold bg-red-600 text-gray-200 cursor-pointer">
                        Remove
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/** Remove User Modal */}
        <ConfirmedModal
          title={"Are you sure for removing user?"}
          body={`If you want to remove ${removingUser?.name}. Think once more. After removing, it's can't be retrieve.`}
          action={handleRemoveUser}
          actionData={removingUser}
          closeModal={setRemovingUser}
        />
      </div>
    </div>
  );
};

export default Users;
