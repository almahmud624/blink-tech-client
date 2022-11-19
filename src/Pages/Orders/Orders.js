import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ConfirmedModal from "../../Component/ConfirmedModal";

const Orders = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [count, setCount] = useState();
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(0);
  const pages = Math.ceil(parseInt(count) / size);

  // load order by user email
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/orders?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("blink-token")}`,
            },
          }
        );
        if (res.status === 401 || res.status === 403) {
          return userSignOut();
        }
        return res?.data?.orders;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // cancel order put method
  const handleDelete = async (order) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/orders/${order?.orderId}`,
        { productId: order?.productId }
      );
      if (data.modifiedCount > 0) {
        toast.success("Order Successfully Cancelled");
        setDeletingOrder(null);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // order status update
  const handleUpdateStatus = async (orderId, productId) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:4000/orders/${orderId}`,
        { status: "approved", productId: productId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("blink-token")}`,
          },
        }
      );
      if (data.modifiedCount > 0) {
        toast.success("Order Placed");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // pagination
  // useEffect(() => {
  //   let unsubscribed = false;
  //   fetch(`http://localhost:4000/orders?page=${page}&size=${size}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!unsubscribed) {
  //         setCount(data.count);
  //         setOrders(data.orders);
  //       }
  //     });

  //   // cleanup function
  //   return () => {
  //     unsubscribed = true;
  //   };
  // }, [page, size]);
  return (
    <div>
      <div className="my-20 max-w-screen-lg px-4 mx-auto">
        {orders?.length > 0 ? (
          <div className="overflow-x-auto  relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  overflow-x-scroll">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      {/* <input
                      id="checkbox-all"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all" className="sr-only">
                      checkbox
                    </label> */}
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                  <th scope="col" className="py-3 px-6">
                    Product name
                  </th>
                  {/* <th scope="col" className="py-3 px-6">
                Color
              </th> */}
                  <th scope="col" className="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <>
                    {order?.orderInfo.map((item) => (
                      <tr
                        key={Math.random()}
                        className="bg-white border-b dark:bg-gray-800 "
                      >
                        <td className="p-4 w-4">
                          <div className="flex items-center">
                            {/* <input
                        id="checkbox-table-1"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-1" className="sr-only">
                        checkbox
                      </label> */}
                          </div>
                        </td>
                        <td className="px-0 w-0">
                          <div className="avatar flex items-center">
                            <div className="w-8 rounded bg-slate-300">
                              <img
                                src={item?.imgURL}
                                alt="Tailwind-CSS-Avatar-component"
                              />
                            </div>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.productName}
                        </th>
                        {/* <td className="py-4 px-6">Sliver</td> */}
                        <td className="py-4 px-6">Laptop</td>
                        <td className="py-4 px-6">${item.productPrice}</td>
                        <td
                          onClick={() =>
                            handleUpdateStatus(order?._id, item?._id)
                          }
                          className={`${
                            item?.status
                              ? "py-4 px-6 capitalize cursor-pointer text-green-600"
                              : "py-4 px-6 capitalize cursor-pointer text-red-600"
                          }`}
                        >
                          {item?.status ? item?.status : "Pending"}
                        </td>
                        <td className="py-4 px-6 flex items-center">
                          <label className="btn text-lg p-0 py-0 min-h-0 h-0 bg-transparent hover:bg-transparent border-none">
                            <FiTrash
                              onClick={() =>
                                setDeletingOrder({
                                  orderId: order?._id,
                                  productId: item?._id,
                                })
                              }
                            />
                          </label>

                          <label
                            htmlFor="my-modal-6"
                            className="ml-3 text-lg btn p-0 py-0 min-h-0 h-0 bg-transparent hover:bg-transparent border-none"
                          >
                            <FiEdit />
                          </label>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center flex-col items-center my-5 gap-y-5">
              <p>
                Currently selected page: {page} and Page size: {size}
              </p>
              <ol className="flex justify-center gap-1 text-xs font-medium">
                <li>
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
                    onClick={() => setPage(page - 1)}
                  >
                    <span className="sr-only">Prev Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>

                {/* {[...Array(pages).keys()].map((number) => (
                <li key={Math.random()}>
                  <button
                    onClick={() => setPage(number)}
                    className="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
                  >
                    {number + 1}
                  </button>
                </li>
              ))} */}

                <li>
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
                    onClick={() => setPage(page + 1)}
                  >
                    <span className="sr-only">Next Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                <select
                  id="countries"
                  onChange={(e) => setSize(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded focus:ring-indigo-500 focus:border-indigo-500 p-1 py-1 dark:bg-indigo-500 dark:border-indigo-300 dark:placeholder-gray-700 dark:text-white cursor-pointer dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option selected="" value="5">
                    5
                  </option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </ol>
            </div>
          </div>
        ) : (
          <section className="rounded-3xl shadow-2xl">
            <div className="p-8 text-center sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
                You have no orders
              </p>

              <h2 className="mt-6 text-3xl font-bold">
                Please! Order some product first
              </h2>

              <Link
                className="mt-8 inline-block w-1/3 rounded-full bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl"
                to="/products"
              >
                Track Order
              </Link>
            </div>
          </section>
        )}
      </div>
      {/* Deleting Modal */}
      <ConfirmedModal
        actionData={deletingOrder}
        closeModal={setDeletingOrder}
        title={"Are you sure for cancel the order?"}
        body={
          "Think again, before take any step. Once if you remove it, its can't be undone."
        }
        action={handleDelete}
      />
    </div>
  );
};

export default Orders;
