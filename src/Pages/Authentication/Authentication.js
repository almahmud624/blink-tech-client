import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FiAlertOctagon } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import { setAuthToken } from "../../Utilities/JwtApi";
import SocialLogin from "../SocialLogin/SocialLogin";

const Authentication = () => {
  const { userLogin, createUser, userProfileUpdate } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const { name, mail, password, photoURL } = data;
    const userProfile = { displayName: name, photoURL: photoURL };
    // creating user
    if (location.pathname !== "/login") {
      createUser(mail, password)
        .then((res) => {
          userProfileUpdate(userProfile);
          toast.success("Signup is Successful");
          storeUserData(name, mail);
        })
        .catch((error) => {
          toast.error(error.code.split("/")[1].split("-").join(" "));
        });
    } else {
      // login user
      userLogin(mail, password)
        .then((res) => {
          const user = res.user;

          // get jwt token
          setAuthToken(user);
          navigate(from, { replace: true });
        })
        .catch((error) => {
          toast.error(error.code.split("/")[1].split("-").join(" "));
        });
    }
    reset();
  };

  // store user data on database
  const storeUserData = (name, email) => {
    const user = { name, email };
    axios({
      method: "post",
      url: "https://blink-tech-server.vercel.app/users",
      data: user,
    }).then((res) => {
      // get jwt token
      setAuthToken(user);
      navigate("/");
    });
  };
  return (
    <div>
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle  sm:w-full">
            <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
              <div className="w-full px-6 py-3">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <div className="inline-flex items-center w-full">
                      <h3 className="text-lg font-bold text-indigo-400 l eading-6 lg:text-5xl">
                        {location.pathname !== "/login" ? "Sign up" : "Login"}
                      </h3>
                    </div>
                    <div className="mt-4 text-base text-gray-500">
                      <p>Sign up and get our newest news.</p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-6 space-y-2"
                >
                  {location.pathname !== "/login" && (
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
                  )}
                  {location.pathname !== "/login" ? (
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
                        {...register("mail", {
                          required: "Email Address is required",
                          validate: {
                            emailValidation: (value) =>
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                value
                              ) === true,
                          },
                        })}
                        aria-invalid={errors.mail ? "true" : "false"}
                      />
                      {errors.mail?.message && (
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
                  ) : (
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
                        {...register("mail", {
                          required: "Email Address is required",
                        })}
                        aria-invalid={errors.mail ? "true" : "false"}
                      />
                      {errors.mail?.message && (
                        <p role="alert" className="py-2 pb-1 text-red-500">
                          <FiAlertOctagon className="inline-block text-red-500 mr-1" />
                          {errors.mail?.message}
                        </p>
                      )}
                    </div>
                  )}
                  {location.pathname !== "/login" ? (
                    <div>
                      <label for="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
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
                      {errors.password?.message && (
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
                  ) : (
                    <div>
                      <label for="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        placeholder="Enter your password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        aria-invalid={errors.password ? "true" : "false"}
                      />
                      {errors.password?.message && (
                        <p role="alert" className="py-2 pb-1 text-red-500">
                          <FiAlertOctagon className="inline-block text-red-500 mr-1" />
                          {errors.password?.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col mt-4 lg:space-y-2">
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-10 py-3 text-base font-medium text-center text-gray-800 transition duration-500 ease-in-out transform bg-indigo-300 rounded-xl hover:bg-indigo-700 hover:text-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {location.pathname !== "/login" ? "Sign up" : "Login"}
                    </button>
                    {location.pathname === "/login" && (
                      <button
                        type="button"
                        className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"
                      >
                        Forgot your Password?{" "}
                      </button>
                    )}
                  </div>
                </form>
                <div>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-neutral-600 bg-white">
                        {" "}
                        Or continue with{" "}
                      </span>
                    </div>
                  </div>
                  <SocialLogin />

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
                    <div className="mt-7 pb-5 text-center text-gray-500 text-sm">
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
              <div className="order-first hidden w-full lg:block">
                <img
                  className="object-cover h-full bg-cover mx-auto rounded-l-lg"
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
