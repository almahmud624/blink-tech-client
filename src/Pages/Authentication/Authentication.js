import React, { useState } from "react";
import { GrGoogle } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

const Authentication = () => {
  const [user, setUser] = useState({});
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  const handleInputChange = (e) => {
    const inputField = e.target.name;
    const inputValue = e.target.value;
    const newUser = { ...user };
    newUser[inputField] = inputValue;
    setUser(newUser);
  };

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

                <form onSubmit={handleSubmit} class="mt-6 space-y-2">
                  {location.pathname !== "/login" && (
                    <div>
                      <label for="email" class="sr-only">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        placeholder="Your Name"
                        onChange={handleInputChange}
                      />
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
                      onChange={handleInputChange}
                    />
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
                      onChange={handleInputChange}
                    />
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
                  class="object-cover h-full bg-cover rounded-l-lg"
                  src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
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
