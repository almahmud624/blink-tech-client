import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FiAlertOctagon } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const CheckOut = () => {
  const product = useLoaderData();
  const { _id, productName, productPrice, imgURL, category } = product;
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (customer, e) => {
    const order = {
      ...customer,
      orderInfo: {
        productId: _id,
        productName,
        productPrice,
        imgURL,
        category,
      },
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
      });

    // creating user
  };

  return (
    <div>
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Secure Checkout
                <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-2"
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
                    defaultValue={user?.email}
                    {...register("mail", {
                      required: "Email Address is required",
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

                <div className="flex flex-col mt-4 lg:space-y-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-10 py-3 text-base font-medium text-center text-gray-800 transition duration-500 ease-in-out transform bg-indigo-300 rounded-xl hover:bg-indigo-700 hover:text-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Order Now
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                By placing this order you agree to the{" "}
                <a
                  href="#"
                  className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
                >
                  Terms and Conditions
                </a>
              </p>
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
              >
                Place Order
              </button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                <li className="flex justify-between">
                  <div className="inline-flex">
                    <img
                      src={imgURL}
                      alt=""
                      className="max-h-16 bg-indigo-50 rounded-sm"
                    />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        {productName}
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80 capitalize">
                        {category}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    ${productPrice}
                  </p>
                </li>
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>$510.00</span>
                </p>
                <p className="flex justify-between text-sm font-medium text-white">
                  <span>Vat: 10%</span>
                  <span>$55.00</span>
                </p>
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="text-sm font-semibold">
                +01 653 235 211{" "}
                <span className="font-light">(International)</span>
              </p>
              <p className="mt-1 text-sm font-semibold">
                support@nanohair.com <span className="font-light">(Email)</span>
              </p>
              <p className="mt-2 text-xs font-medium">
                Call us now for payment related issues
              </p>
            </div>
            <div className="relative mt-10 flex">
              <p className="flex flex-col">
                <span className="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span className="text-xs font-medium text-white">
                  within 30 days of purchase
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
