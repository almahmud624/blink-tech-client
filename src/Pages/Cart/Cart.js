import React, { useContext } from "react";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

const Cart = () => {
  const { cart, setCart } = useContext(DataContext);
  const handleRemoveCartItem = (id) => {
    const restItem = cart?.filter((item) => item?._id !== id);
    setCart(restItem);
  };
  const totalPrice = cart.reduce((acc, cur) => {
    const total = parseInt(acc) + parseInt(cur.productPrice) * cur.quantity;
    return total;
  }, 0);
  const grandTotal = totalPrice + 8;

  return (
    <div>
      <div className="flex flex-col max-w-xl mx-auto p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-semibold">Your cart</h2>
        <ul className="flex flex-col divide-y divide-gray-700">
          {cart?.map((item) => (
            <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                  src={item?.imgURL}
                  alt="Polaroid camera"
                />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                        {item?.productName}
                      </h3>
                      <p className="text-sm dark:text-gray-400">
                        {item?.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {item?.productPrice}$
                      </p>
                      {/* <p className="text-sm line-through dark:text-gray-600">
                        75.50€
                      </p> */}
                    </div>
                  </div>
                  <div className="flex text-sm items-center">
                    <button
                      className="flex items-center justify-center bg-red-700  px-4 mr-2 py-2 mb-5 rounded-md transition border text-gray-200"
                      onClick={() => handleRemoveCartItem(item?._id)}
                    >
                      <FiTrash />
                    </button>
                    <div className="sm:order-1 mb-5 w-10 pl-2">
                      <div className="mx-auto flex h-8 items-stretch text-gray-600">
                        <button className="flex items-center justify-center rounded-l-md  px-4 transition border text-gray-200">
                          -
                        </button>
                        <div className="flex w-full items-center justify-center bg-green-700 border-t border-b text-gray-200 px-4 text-xs uppercase transition">
                          {item?.quantity}
                        </div>
                        <button className="flex items-center justify-center rounded-r-md  px-4 transition border text-gray-200">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount:
            <span className="font-semibold">{totalPrice} €</span>
          </p>
          <p className="text-sm dark:text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <Link
            to="/products"
            type="button"
            className="px-6 py-2 border rounded-md dark:border-violet-400"
          >
            Back
            <span className="sr-only sm:not-sr-only">to shop</span>
          </Link>
          <Link
            to="/checkout"
            type="button"
            className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
