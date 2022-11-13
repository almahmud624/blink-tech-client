import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";

const BookingModal = ({ service, selectedDate, setService }) => {
  const { name, slots } = service;
  const date = format(selectedDate, "PP");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    data.selectedDate = date;
    data.service = service?.name;
    console.log(data);

    // modal closed conditon
    // if service null modal not open else its open. we use this for modal closed
    setService(null);
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <label htmlFor="booking-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="mt-7">
            <form
              className="relative  space-y-3 rounded-md shadow-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="">
                <div>
                  <input
                    type="text"
                    value={date}
                    disabled
                    className="mt-2 h-10 text-sm w-full rounded-md bg-gray-800 px-3"
                    {...register("date")}
                  />
                </div>
              </div>
              <div>
                <div>
                  <select
                    id="slots"
                    className="bg-gray-50 h-10 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
                    {...register("slot")}
                    defaultValue={slots[0]}
                  >
                    {slots?.map((slot, i) => (
                      <option value={slot} key={i}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    className="mt-2 h-10 text-sm w-full rounded-md bg-gray-800 px-3"
                    {...register("name", {
                      required: "Your name is required",
                    })}
                  />
                  {errors.name && (
                    <p role="alert" className="text-sm mt-2 text-red-400">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Info@example.com"
                  className="mt-2 h-10 text-sm w-full rounded-md bg-gray-800 px-3"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                />
                {errors.email && (
                  <p role="alert" className="text-sm mt-2 text-red-400">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+543 5445 0543"
                    className="mt-2 h-10 text-sm w-full rounded-md bg-gray-800 px-3"
                    {...register(
                      "phone",
                      { required: "Your Phone Number is required" },
                      { min: 18, max: 99 }
                    )}
                  />
                  {errors.phone && (
                    <p role="alert" className="text-sm mt-2 text-red-400">
                      {errors.phone?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="">
                <textarea
                  id="message"
                  rows="4"
                  name="message"
                  className="block mt-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your message..."
                  {...register("message", {
                    required: "Message is required",
                  })}
                ></textarea>
                {errors.message && (
                  <p role="alert" className="text-sm mt-2 text-red-400">
                    {errors.message?.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-5 w-full rounded-md bg-base-100 border border-gray-700 hover:bg-indigo-900 transition-all duration-500 p-2 text-center font-semibold text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </label>
      </label>
    </div>
  );
};

export default BookingModal;
