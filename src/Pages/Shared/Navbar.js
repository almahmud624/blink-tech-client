import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrMoon, GrSun, GrTechnology } from "react-icons/gr";
import { AuthContext } from "../../Context/AuthProvider";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { DataContext } from "../../Context/DataProvider";
import Cart from "../Cart/Cart";

const Navbar = ({ setModeTheme }) => {
  const { user, userSignOut } = useContext(AuthContext);
  const { cart, setSearchText } = useContext(DataContext);
  const searchRef = useRef();
  const navigate = useNavigate();
  // search product
  const handleSearch = () => {
    setSearchText(searchRef.current.value);
    navigate("/products");
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-w-screen-xl mx-auto sticky py-2 top-0 left-0 bg-base-100 z-40">
      <div className="navbar bg-base-100">
        <div className="navbar-start w-1/6">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FiMenu className="text-xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="">Home</Link>
              </li>
              <li tabIndex={0}>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              {!user?.uid ? (
                <>
                  <li>
                    <Link to="/register">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/login">Sign In</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
              )}
            </ul>
          </div>
          <Link
            to=""
            className="btn btn-ghost normal-case hover:bg-transparent text-xl"
          >
            Blink
            <GrTechnology className="text-red-400" />
            Tech
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="">Home</Link>
            </li>
            <li tabIndex={0}>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {!user?.uid ? (
              <>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end flex justify-evenly w-7/12">
          <div className="w-1/2">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                ref={searchRef}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  navigate("/products");
                }}
                className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Products...."
                required=""
              />
              <button
                type="submit"
                onClick={handleSearch}
                className="text-white absolute right-2.5 bottom-1.5 bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-800 dark:focus:ring-indigo-800"
              >
                Search
              </button>
            </div>
          </div>

          <Link
            type="button"
            className="inline-flex relative items-center p-3 text-sm font-medium text-center text-white"
            onClick={() => setIsOpen(true)}
          >
            <FiShoppingCart className="text-xl" />
            <span className="sr-only">Notifications</span>
            <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
              {cart.length}
            </div>
          </Link>

          <label className="swap swap-rotate mr-3">
            <input type="checkbox" />
            <GrSun
              className="swap-on fill-current w-6 h-6"
              onClick={() => setModeTheme("pastel")}
            />

            <GrMoon
              className="swap-off fill-current w-8 h-8"
              onClick={() => setModeTheme("night")}
            />
          </label>
          {user?.uid && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/">{user?.displayName}</a>
                </li>
                <li>
                  <a className="justify-between" href="/">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <button onClick={userSignOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          " fixed overflow-hidden bg-gray-900 z-10  bg-opacity-25 inset-0 transform ease-in-out " +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            " max-w-lg right-0 absolute bg-gray-900  h-full shadow-xl delay-400 duration-500 overflow-y-scroll ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative max-w-lg pb-10 flex flex-col space-y-6 h-full">
            <Cart />
          </article>
        </section>
        <section
          className=" h-full cursor-pointer "
          onClick={() => {
            setIsOpen(false);
          }}
        ></section>
      </div>
    </div>
  );
};

export default Navbar;
