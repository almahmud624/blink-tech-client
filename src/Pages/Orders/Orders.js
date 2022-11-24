import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { FiArrowLeft, FiArrowRight, FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ConfirmedModal from "../../Component/ConfirmedModal";
import Loader from "../../Component/Loader";
import { Link } from "react-router-dom";
import SectionTitle from "../../Component/SectionTitle";

const Orders = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [count, setCount] = useState();
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(0);
  const pages = Math.ceil(parseInt(count) / size);

  // load order by user email
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
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

  const orderQuery = orders.map((order) => order?.orderInfo.length > 0);
  const orderAvialabilityCheck = orderQuery.find((i) => i === true);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="px-4 mx-auto">
        <SectionTitle customClass={"mb-5"}>Your Orders</SectionTitle>
        {orderAvialabilityCheck === true ? (
          <div className=" relative shadow-md sm:rounded-lg">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border border-gray-800 lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3"></td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Product name
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Category
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Price
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Status
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <>
                    {order?.orderInfo.map((item) => (
                      <tr
                        key={Math.random()}
                        className="bg-white border-b border-gray-900  dark:bg-gray-800 "
                      >
                        <td className="whitespace-no-wrap p-4 pb-10 z-50 text-left text-md text-gray-600 sm:px-3 lg:text-left mt-1 flex flex-col font-medium space-y-5 md:hidden">
                          <div className="avatar flex items-center ">
                            <div className="w-8 rounded bg-slate-300">
                              <img
                                src={item?.imgURL}
                                alt="Tailwind-CSS-Avatar-component"
                              />
                            </div>
                          </div>
                          <div className="mt-1 flex flex-col text-base font-medium space-y-3 md:hidden">
                            <div className="flex items-center text-md text-indigo-200">
                              {item.productName} {""}{" "}
                              <span className="font-normal text-red-300">
                                x{item?.quantity}
                              </span>
                            </div>
                            <div className="flex items-center text-md text-indigo-200">
                              {item?.category}
                            </div>
                            <div className="flex items-center text-md text-indigo-200">
                              ${item.productPrice * item?.quantity}
                            </div>
                            <div
                              onClick={() =>
                                handleUpdateStatus(order?._id, item?._id)
                              }
                              className={`${
                                item?.status
                                  ? " capitalize cursor-pointer text-green-600 flex items-center text-md"
                                  : " capitalize cursor-pointer text-red-600 flex items-center text-md"
                              }`}
                            >
                              {item?.status ? item?.status : "Pending"}
                            </div>

                            <div className="flex items-center">
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
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 md:table-cell capitalize">
                          <div className="avatar flex items-center">
                            <div className="w-8 rounded bg-slate-300">
                              <img
                                src={item?.imgURL}
                                alt="Tailwind-CSS-Avatar-component"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-indigo-200 sm:px-3 md:table-cell lg:text-left">
                          {item.productName} {""}{" "}
                          <span className="font-normal text-red-300">
                            x{item?.quantity}
                          </span>
                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-indigo-200 sm:px-3 md:table-cell lg:text-left">
                          {item?.category}
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-indigo-200 sm:px-3 md:table-cell lg:text-left">
                          ${item.productPrice * item?.quantity}
                        </td>

                        <td
                          onClick={() =>
                            handleUpdateStatus(order?._id, item?._id)
                          }
                          className={`whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 md:table-cell lg:text-left ${
                            item?.status
                              ? "py-4 px-6 capitalize cursor-pointer text-green-600"
                              : "py-4 px-6 capitalize cursor-pointer text-red-600"
                          }`}
                        >
                          {item?.status ? item?.status : "Pending"}
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 md:table-cell lg:text-left">
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

            {/* <div className="flex justify-center flex-col items-center my-5 gap-y-5">
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
                    <FiArrowLeft />
                  </button>
                </li>

                {[...Array(pages).keys()].map((number) => (
                <li key={Math.random()}>
                  <button
                    onClick={() => setPage(number)}
                    className="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
                  >
                    {number + 1}
                  </button>
                </li>
              ))}

                <li>
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
                    onClick={() => setPage(page + 1)}
                  >
                    <span className="sr-only">Next Page</span>
                    <FiArrowRight />
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
            </div> */}
          </div>
        ) : (
          <div className="rounded-3xl shadow-2xl">
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
                Go To Shop
              </Link>
            </div>
          </div>
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
