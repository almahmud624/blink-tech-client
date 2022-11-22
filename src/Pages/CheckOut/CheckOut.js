import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiAlertOctagon, FiPhoneCall } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import { DataContext } from "../../Context/DataProvider";
import { removeFromDb } from "../../Utilities/Localdb";
import {
  IoAlertCircle,
  IoCartOutline,
  IoCheckmark,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOut.css";
import EmptyCart from "../Cart/EmptyCart/EmptyCart";
import BounceLoader from "react-spinners/ClipLoader";

const CheckOut = () => {
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useContext(DataContext);

  // card confirmation state
  const [err, setErr] = useState("");
  const [process, setProcss] = useState(false);
  const [success, setSuccess] = useState(false);
  // stripe card element
  const stripe = useStripe();
  const elements = useElements();
  // payment intents state
  const [clientSecret, setClientSecret] = useState("");
  // payment confirm traxnId state
  const [transectionId, setTransectionId] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (customer, e) => {
    setSuccess(false);
    // getting stripe card data
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    } else {
    }
    setProcss(true);
    // confirm stripe card payment
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: customer?.name,
            email: customer?.email,
            address: customer?.address,
          },
        },
      }
    );

    if (confirmError) {
      setErr(confirmError);
      setProcss(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransectionId(paymentIntent?.id);
      // send order on database
      const order = {
        ...customer,
        txnId: paymentIntent?.id,
        orderInfo: cart,
      };
      fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          data.acknowledged &&
            toast.success(`${customer.name}, Your Order Successfully Placed.`);
          e.target.reset();
          setCart([]);

          // also remove from localdb
          removeFromDb("products-list");
        });
    }
    setProcss(false);
    setSuccess(true);
  };

  // subtotal
  const subTotal = cart.reduce((acc, cur) => {
    const total = parseInt(acc) + parseInt(cur.productPrice) * cur.quantity;
    return total;
  }, 0);

  // vat
  const tax = Number((subTotal * (10 / 100)).toFixed(2));

  // total price
  const totalPrice = subTotal + tax;

  // stripe payment intents
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (cart.length === 0) {
      return;
    }
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseInt(totalPrice) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice, cart.length]);

  return (
    <div>
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full px-10  lg:col-span-6  py-10">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              <div className="flex items-center gap-2">
                <IoShieldCheckmarkOutline /> <span>Secure Checkout</span>
              </div>
            </h1>
            <div className="mx-auto w-full max-w-2xl  my-4">
              <h1 className="relative text-xl font-medium text-gray-700 ">
                <div className="flex items-center gap-2">
                  <span>Shipping Information</span>
                </div>
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-2 space-y-2"
              >
                <div className="flex justify-between gap-3">
                  <div className="w-full">
                    <label for="email" className="sr-only">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Your Name"
                      {...register("name", { required: true })}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name?.type === "required" && (
                      <p role="alert" className="py-2 pb-1 text-red-500">
                        <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                        Your name is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label for="phone" className="sr-only">
                    Your Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Your Phone"
                    {...register("phone", { required: true })}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone?.type === "required" && (
                    <p role="alert" className="py-2 pb-1 text-red-500">
                      <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                      Phone Number required
                    </p>
                  )}
                </div>
                <div>
                  <label for="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Enter your email"
                    readOnly
                    defaultValue={user?.email}
                    {...register("mail", {
                      required: "Email Address is required",
                    })}
                  />
                </div>
                <div>
                  <label for="adress" className="sr-only">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Enter your address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                </div>
                <div>
                  <label for="message" className="sr-only">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Your Message"
                    defaultValue={user?.message}
                    {...register("message")}
                  />
                </div>
                <h1 className="relative text-xl font-medium text-gray-700 ">
                  <div className="flex items-center gap-2">
                    <span>Payment Information</span>
                  </div>
                </h1>
                <CardElement
                  className="p-3"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#B3C5EF",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                <div className="flex flex-col mt-4 lg:space-y-2">
                  <button
                    type="submit"
                    className={`flex items-center justify-center w-full px-10 py-3 text-base font-medium text-center text-gray-800 transition duration-500 ease-in-out transform bg-indigo-300 rounded-xl hover:bg-indigo-700 hover:text-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200 disabled:hover:text-gray-400" ${
                      success
                        ? "disabled:bg-green-900  disabled:hover:bg-green-900 "
                        : "disabled:bg-gray-200  disabled:hover:bg-gray-200 "
                    }`}
                    disabled={
                      !stripe || !clientSecret || cart.length === 0 || process
                    }
                  >
                    {success ? (
                      <>
                        <span className="flex gap-1 font-normal items-center text-green-300">
                          Payment Successful
                          <IoCheckmark className="text-green-300 text-xl" />
                        </span>
                      </>
                    ) : process ? (
                      <BounceLoader
                        loading={process}
                        color={"#36d7b7"}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      "Pay"
                    )}
                  </button>
                </div>
              </form>
              {transectionId && (
                <p className="my-4 bg-green-900 text-green-300 w-full py-3 rounded-md text-center">
                  <IoAlertCircle className="inline-block float-left ml-2 text-gray-200 text-2xl" />
                  <span className="font-medium text-gray-200">
                    Your Transection Id:
                  </span>{" "}
                  {transectionId}
                </p>
              )}
            </div>
            <div className="relative mt-20 text-gray-700">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                <div className="flex items-center gap-2 mb-5">
                  <FiPhoneCall /> <span>Support</span>
                </div>
              </h1>
            </div>
            <div className="px-4 max-w-2xl mx-auto flex items-start gap-20">
              <div>
                <p className="text-lg font-semibold text-gray-600">
                  +880 653 235 211 <span className="text-lg">(Phone)</span>
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-600">
                  support@blinktech.com <span className="text-lg">(Email)</span>
                </p>
                <p className="mt-2 text-sm text-gray-500 ">
                  Call us now for payment related issues
                </p>
              </div>
              <div className="relative flex">
                <p className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-600">
                    Money Back Guarantee
                  </span>
                  <span className="text-sm  text-gray-500">
                    within 30 days of purchase
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4  lg:col-span-4  bg-gray-800">
            <h1 className="relative text-2xl font-medium text-gray-200 sm:text-3xl">
              <div className="flex items-center gap-2">
                <IoCartOutline /> <span>Order Summary</span>
              </div>
            </h1>

            <div className="relative">
              {cart.length > 0 ? (
                <ul
                  className="space-y-3 h-72 overflow-y-scroll my-4 px-4 "
                  id="cart-items"
                >
                  {cart?.map((item) => (
                    <li
                      key={item?._id}
                      className="flex justify-between items-center bg-gray-700 p-1 py-0 rounded"
                    >
                      <div className="inline-flex items-center">
                        <img
                          src={item?.imgURL}
                          alt=""
                          className="h-16 w-16 object-cover rounded-sm"
                        />
                        <div className="ml-3 w-52">
                          <p
                            className="text-base  text-white truncate"
                            title={item?.productName}
                          >
                            {item?.productName}
                          </p>
                          <p className="text-sm  text-white text-opacity-80 capitalize">
                            ${item?.productPrice * item?.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-base  text-gray-300 pr-5">
                        {item?.quantity} items
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyCart />
              )}
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-base font-medium text-white">
                  <span>Subtotal:</span>
                  <span>${subTotal}</span>
                </p>
                <p className="flex justify-between text-base font-medium text-white">
                  <span>Tax: 10%</span>
                  <span>${tax}</span>
                </p>
                <p className="flex justify-between text-base font-medium text-white">
                  <span>Shipping:</span>
                  <span className="text-green-400">Free</span>
                </p>
              </div>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-xl font-medium text-white">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
