import React, { useContext } from "react";
import { FiTrash } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../../../Context/DataProvider";
import {
  deleteItemFromDb,
  removeFromDb,
  updateQuantityOnDb,
} from "../../../Utilities/Localdb";
import EmptyCart from "../EmptyCart/EmptyCart";
import "./Cart.css";

const Cart = ({ setIsOpen }) => {
  const { cart, setCart } = useContext(DataContext);

  const location = useLocation();

  const handleRemoveCartItem = (id) => {
    const restItem = cart?.filter((item) => item?._id !== id);
    setCart(restItem);

    // remove from localStorage
    deleteItemFromDb(id, "products-list");
  };
  const totalPrice = cart.reduce((acc, cur) => {
    const total = parseInt(acc) + parseInt(cur.productPrice) * cur.quantity;
    return total;
  }, 0);

  const handleUpdateQuentity = (product, condition) => {
    let newQuantity;
    if (!condition && product?.quantity > 0) {
      newQuantity = product.quantity - 1;
    } else {
      newQuantity = product.quantity + 1;
    }
    const newCart = [...cart];
    newCart[
      newCart
        .map((v, i) => [i, v])
        .filter((v) => v[1]?._id === product?._id)[0][0]
    ].quantity = newQuantity;
    setCart(newCart);

    // upadate Quantity on localstorage
    updateQuantityOnDb(newCart, "products-list");
  };

  return (
    <div className="">
      {cart.length > 0 ? (
        <div>
          <div
            className={` ${
              location.pathname === "/cart"
                ? "flex flex-col mx-auto p-6 space-y-4 sm:p-10 dark:bg-gray-700 dark:text-gray-100 max-w-screen-lg my-10"
                : "flex flex-col h-screen justify-between max-w-xl mx-auto p-3 space-y-4 sm:p-6 dark:bg-gray-700 dark:text-gray-100"
            }`}
          >
            <div>
              <h2 className="text-xl md:text-3xl font-semibold mb-3">
                Your cart
              </h2>

              <div
                className="gap-2 overflow-y-scroll md:max-h-96 max-h-72 p-2 rounded"
                id="cart-items"
                style={{
                  boxShadow: "inset 0 0 6px #0000004d",
                }}
              >
                <table className="table w-full">
                  {location.pathname === "/cart" && (
                    <thead>
                      <tr className="">
                        <th className="w-[40%]">Product</th>
                        <th className="px-10">Quantity</th>
                        <th className="px-10">Per Total</th>
                        <th className="px-10">Action</th>
                      </tr>
                    </thead>
                  )}
                  <tbody className="">
                    {cart?.map((item) => (
                      <tr
                        key={Math.random()}
                        className=" p-2 rounded bg-gray-900"
                      >
                        <td className="">
                          <div className="flex gap-4">
                            <div className="relative">
                              <img
                                className="flex-shrink-0 object-cover w-12 h-12 dark:border-transparent rounded outline-none dark:bg-gray-500"
                                src={item?.imgURL}
                                alt="Polaroid camera"
                              />
                              <div className="badge badge-sm absolute -top-1 -right-1 bg-gray-900 border-0 font-semibold text-indigo-400 h-5 w-5">
                                {item?.quantity}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center w-40">
                              <h3
                                className="text-sm leading-snug truncate"
                                title={item?.productName}
                              >
                                {item?.productName}
                              </h3>
                              <p className="text-sm ">{item?.productPrice}$</p>
                            </div>
                          </div>
                        </td>

                        {location.pathname === "/cart" && (
                          <>
                            <td className="w-20 px-10">
                              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                <button
                                  className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  onClick={() =>
                                    handleUpdateQuentity(item, false)
                                  }
                                >
                                  -
                                </button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                  {item?.quantity}
                                </div>
                                <button
                                  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  onClick={() => {
                                    handleUpdateQuentity(item, true);
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-10">
                              <span className=" py-2.5 px-4">
                                {item?.productPrice * item?.quantity}$
                              </span>
                            </td>
                          </>
                        )}
                        <td className="">
                          <div className="flex justify-center pr-7">
                            <button
                              className="flex items-center justify-center text-gray-200"
                              onClick={() => handleRemoveCartItem(item?._id)}
                            >
                              <FiTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex-col justify-end  space-y-4">
              <div className="space-y-1 text-right text-xl">
                <p>
                  Total amount:{" "}
                  <span className="font-semibold">{totalPrice} $</span>
                </p>
                <p className="text-sm dark:text-gray-400">
                  Not including taxes and shipping costs
                </p>
              </div>
              <div className="md:flex-row flex flex-col md:justify-end justify-center md:space-x-4 space-x-0">
                {location?.pathname === "/cart" ? (
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-md dark:border-violet-400"
                    onClick={() => {
                      removeFromDb("products-list");
                      setCart([]);
                    }}
                  >
                    Clear Cart
                  </button>
                ) : (
                  <Link
                    to="/cart"
                    type="button"
                    className="md:px-6 px-2 py-2 border rounded-md dark:border-violet-400"
                    onClick={() => setIsOpen(false)}
                  >
                    View Cart
                  </Link>
                )}
                <Link
                  to="/checkout"
                  type="button"
                  className="px-6 md:mt-0 mt-3 text-center py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
                >
                  <span className="">Checkout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
    </div>
  );
};

export default Cart;
