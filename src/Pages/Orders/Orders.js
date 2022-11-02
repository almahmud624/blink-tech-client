import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { FiAlertOctagon, FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../../Context/ProductData";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [deleteId, setDeleteId] = useState(false);

  // cancel order
  const handleDelete = (id) => {
    fetch(`https://blink-tech-server.vercel.app/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Order Succssfully Cancelled");
      });
    let restOrder = orders?.filter((order) => order?._id !== id);
    setOrders(restOrder);
  };

  // order status update
  const handleUpdateStatus = (id) => {
    fetch(`https://blink-tech-server.vercel.app/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          let updatedStatus = [...orders];
          updatedStatus[
            updatedStatus
              .map((v, i) => [i, v])
              .filter((v) => v[1]._id === id)[0][0]
          ]["status"] = "approved";
          setOrders(updatedStatus);
        }
      });
  };

  useEffect(() => {
    fetch(`https://blink-tech-server.vercel.app/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, [user?.email]);

  return (
    <div className="my-20 max-w-screen-lg mx-auto">
      {orders.length > 0 ? (
        <div class="overflow-x-auto  relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    {/* <input
                      id="checkbox-all"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all" class="sr-only">
                      checkbox
                    </label> */}
                  </div>
                </th>
                <th scope="col" class="py-3 px-6 ">
                  Thumb
                </th>
                <th scope="col" class="py-3 px-6">
                  Product name
                </th>
                {/* <th scope="col" class="py-3 px-6">
                Color
              </th> */}
                <th scope="col" class="py-3 px-6">
                  Category
                </th>
                <th scope="col" class="py-3 px-6">
                  Price
                </th>
                <th scope="col" class="py-3 px-6">
                  Status
                </th>
                <th scope="col" class="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr class="bg-white border-b dark:bg-gray-800 ">
                  <td class="p-4 w-4">
                    <div class="flex items-center">
                      {/* <input
                        id="checkbox-table-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-1" class="sr-only">
                        checkbox
                      </label> */}
                    </div>
                  </td>
                  <td className="">
                    <div className="avatar flex items-center">
                      <div className="w-8 rounded ml-6 bg-slate-300">
                        <img
                          src={order?.orderInfo?.imgURL}
                          alt="Tailwind-CSS-Avatar-component"
                        />
                      </div>
                    </div>
                  </td>
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order?.orderInfo?.productName}
                  </th>
                  {/* <td class="py-4 px-6">Sliver</td> */}
                  <td class="py-4 px-6">Laptop</td>
                  <td class="py-4 px-6">${order?.orderInfo?.productPrice}</td>
                  <td
                    onClick={() => handleUpdateStatus(order?._id)}
                    class={`${
                      order?.status
                        ? "py-4 px-6 capitalize cursor-pointer text-green-600"
                        : "py-4 px-6 capitalize cursor-pointer text-red-600"
                    }`}
                  >
                    {order?.status ? order?.status : "Pending"}
                  </td>
                  <td class="py-4 px-6 flex items-center">
                    <label
                      htmlFor="my-modal-6"
                      onClick={() => setDeleteId(order?._id)}
                      className="btn text-lg p-0 py-0 min-h-0 h-0 bg-transparent hover:bg-transparent border-none"
                    >
                      <FiTrash />
                    </label>
                    <label
                      htmlFor="my-modal-6"
                      onClick={() => setDeleteId(order?._id)}
                      className="ml-3 text-lg btn p-0 py-0 min-h-0 h-0 bg-transparent hover:bg-transparent border-none"
                    >
                      <FiEdit />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <section class="rounded-3xl shadow-2xl">
          <div class="p-8 text-center sm:p-12">
            <p class="text-sm font-semibold uppercase tracking-widest text-indigo-500">
              You have no orders
            </p>

            <h2 class="mt-6 text-3xl font-bold">
              Please! Order some product first
            </h2>

            <Link
              class="mt-8 inline-block w-1/3 rounded-full bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl"
              to="/products"
            >
              Track Order
            </Link>
          </div>
        </section>
      )}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are You Sure?</h3>
          <p className="py-4">You Want to Cancel this Order.</p>
          <div className="modal-action">
            <label
              onClick={() => handleDelete(deleteId)}
              htmlFor="my-modal-6"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-green-700 hover:bg-green-800 text-green-50"
            >
              Confirm
            </label>
            <label
              htmlFor="my-modal-6"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-red-700 hover:bg-red-800 text-red-50"
            >
              Cancel
            </label>
          </div>
          {/* <div className="modal-action">
            <label htmlFor="my-modal-6" className="modal-toggle">
              Cancel
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Orders;
