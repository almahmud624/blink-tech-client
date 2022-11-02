import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GrGoogle } from "react-icons/gr";
import { FiAlertOctagon } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Authentication = () => {
  const { userLogin, createUser, userProfileUpdate } = useContext(AuthContext);
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const { name, mail, password, photoURL } = data;
    const userProfile = { displayName: name, photoURL: photoURL };
    // creating user
    if (location.pathname !== "/login") {
      createUser(mail, password)
        .then((res) => {
          userProfileUpdate(userProfile);
          console.log(res.user);
        })
        .catch((error) => {
          console.log(error.code);
        });
    } else {
      // login user
      userLogin(mail, password)
        .then((res) => {
          console.log(res.user);
        })
        .catch((error) => {
          console.log(error.code);
        });
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const name = e.form.name.value;
  //   const email = e.form.email.value;
  //   const password = e.form.password.value;
  //   console.log(user);
  // };

  return (
    <div>
      <section>
        <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div class="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle  sm:w-full">
            <div class="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
              <div class="w-full px-6 py-3">
                <div>
                  <div class="mt-3 text-left sm:mt-5">
                    <div class="inline-flex items-center w-full">
                      <h3 class="text-lg font-bold text-indigo-400 l eading-6 lg:text-5xl">
                        {location.pathname !== "/login" ? "Sign up" : "Login"}
                      </h3>
                    </div>
                    <div class="mt-4 text-base text-gray-500">
                      <p>Sign up and get our newest news.</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} class="mt-6 space-y-2">
                  {location.pathname !== "/login" && (
                    <div className="flex justify-between gap-3">
                      <div className="w-1/2">
                        <label for="email" class="sr-only">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
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
                      <div className="w-1/2">
                        <label for="photoURL" class="sr-only">
                          Your photoURL
                        </label>
                        <input
                          type="text"
                          name="photoURL"
                          id="photoURL"
                          class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          placeholder="Your photoURL"
                          {...register("photoURL", { required: true })}
                          aria-invalid={errors.photoURL ? "true" : "false"}
                        />
                        {errors.photoURL?.type === "required" && (
                          <p role="alert" className="py-2 pb-1 text-red-500">
                            <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                            Your photoURL is required
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <label for="email" class="sr-only">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Enter your email"
                      {...register("mail", {
                        required: "Email Address is required",
                        validate: {
                          emailValidation: (value) =>
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                              value
                            ) === true,
                        },
                      })}
                      aria-invalid={errors.mail ? "true" : "false"}
                    />
                    {errors.mail && (
                      <p role="alert" className="py-2 pb-1 text-red-500">
                        <FiAlertOctagon className="inline-block text-red-500 mr-1" />
                        {errors.mail?.message}
                      </p>
                    )}
                    {errors.mail && errors.mail.type === "emailValidation" && (
                      <p className="py-1 pb-1 text-red-500 flex items-center">
                        <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                        Your email is invalid
                      </p>
                    )}
                  </div>
                  <div>
                    <label for="password" class="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        validate: {
                          positiveNumber: (value) =>
                            /[0-9]/g.test(value) === true,
                          graterThanSeven: (value) => value.length >= 6,
                          aCapitalLetter: (value) =>
                            /[A-Z]/g.test(value) === true,
                          aSmallLetter: (value) =>
                            /[a-z]/g.test(value) === true,
                        },
                      })}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password && (
                      <p role="alert" className="py-2 pb-1 text-red-500">
                        <FiAlertOctagon className="inline-block text-red-500 mr-1" />
                        {errors.password?.message}
                      </p>
                    )}
                    {errors.password &&
                      errors.password.type === "positiveNumber" && (
                        <p className="py-1 pb-1 text-red-500 flex items-center">
                          <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                          Your password conatain at least One Number
                        </p>
                      )}
                    {errors.password &&
                      errors.password.type === "graterThanSeven" && (
                        <p className="py-1 pb-1 text-red-500 flex items-center">
                          <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                          Your password should have 6 character
                        </p>
                      )}
                    {errors.password &&
                      errors.password.type === "aCapitalLetter" && (
                        <p className="py-1 pb-1 text-red-500 flex items-center">
                          <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                          Password Contain at least One Capital letter.
                        </p>
                      )}
                    {errors.password &&
                      errors.password.type === "aSmallLetter" && (
                        <p className="py-1 pb-1 text-red-500 flex items-center">
                          <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                          Password Contain at least One Small letter.
                        </p>
                      )}
                  </div>
                  <div class="flex flex-col mt-4 lg:space-y-2">
                    <button
                      type="submit"
                      class="flex items-center justify-center w-full px-10 py-3 text-base font-medium text-center text-gray-800 transition duration-500 ease-in-out transform bg-indigo-300 rounded-xl hover:bg-indigo-700 hover:text-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {location.pathname !== "/login" ? "Sign up" : "Login"}
                    </button>
                    {location.pathname === "/login" && (
                      <button
                        type="button"
                        class="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"
                      >
                        Forgot your Password?{" "}
                      </button>
                    )}
                  </div>
                </form>
                <div>
                  <div class="relative my-4">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-2 text-neutral-600 bg-white">
                        {" "}
                        Or continue with{" "}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      class="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <div class="flex items-center justify-center">
                        <GrGoogle />
                        <span class="ml-4"> Log in with Google</span>
                      </div>
                    </button>
                  </div>
                  {location.pathname !== "/login" ? (
                    <div className="mt-7 text-center text-gray-500 text-sm">
                      <span>
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-400">
                          Sign in
                        </Link>
                      </span>
                    </div>
                  ) : (
                    <div className="mt-7 text-center text-gray-500 text-sm">
                      <span>
                        You didn't have an account?{" "}
                        <Link to="/register" className="text-indigo-400">
                          Create One
                        </Link>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div class="order-first hidden w-full lg:block">
                <img
                  class="object-cover h-full bg-cover mx-auto rounded-l-lg"
                  src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?w=360&t=st=1667327003~exp=1667327603~hmac=473702c48387fdaa820e05b4e774f9185c9c74e1a994ec0e26ea43d96d0bad5d"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authentication;
