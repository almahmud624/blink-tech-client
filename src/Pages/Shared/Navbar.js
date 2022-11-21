import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { FiMenu, FiMoon, FiShoppingCart, FiSun } from "react-icons/fi";
import { DataContext } from "../../Context/DataProvider";
import Cart from "../Cart/Cart/Cart";
import { IoGitCompareSharp } from "react-icons/io5";
import CartDrawer from "../Cart/CartDrawer/CartDrawer";

const Navbar = ({ setModeTheme }) => {
  const { user, userSignOut } = useContext(AuthContext);
  const { cart, setSearchText } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef();
  const navigate = useNavigate();
  // search product
  const handleSearch = () => {
    setSearchText(searchRef.current.value);
    navigate("/products");
  };

  // navbar menu item
  const menuItem = (
    <>
      <li>
        <Link className="hover:bg-gray-800 rounded px-3 mx-1 py-1 " to="">
          Home
        </Link>
      </li>
      <li tabIndex={0}>
        <Link
          className="hover:bg-gray-800 rounded px-3 mx-1 py-1 "
          to="/products"
        >
          Products
        </Link>
      </li>
      <li tabIndex={0}>
        <Link
          className="hover:bg-gray-800 rounded px-3 mx-1 py-1 "
          to="/tech-doc"
        >
          TechDoc
        </Link>
      </li>

      {!user?.uid ? (
        <>
          <li>
            <Link
              className="hover:bg-gray-800 rounded px-3 mx-1 py-1 "
              to="/register"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-gray-800 rounded px-3 mx-1 py-1 "
              to="/login"
            >
              Sign In
            </Link>
          </li>
        </>
      ) : (
        <li>
          <Link
            className="hover:bg-gray-800 rounded px-3 mx-1 py-1 "
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div className="sticky py-2 top-0 left-0 bg-base-100 z-30">
      <div className="navbar bg-base-100 max-w-screen-xl mx-auto ">
        <div className="navbar-start w-1/6">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FiMenu className="text-xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItem}
            </ul>
          </div>
          <Link
            className="mx-1  btn btn-ghost normal-case hover:bg-transparent text-xl"
            to=""
          >
            Blink
            <IoGitCompareSharp className="text-teal-400" />
            Tech
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItem}</ul>
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
            className=" rounded px-3 mx-1 py-1  inline-flex relative items-center p-3 text-sm font-medium text-center text-white"
            type="button"
            onClick={() =>
              setIsOpen(location?.pathname === "/cart" ? false : true)
            }
          >
            <FiShoppingCart className="text-xl" />
            <span className="sr-only">Notifications</span>
            <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-indigo-500 rounded-full border-2 border-white dark:border-gray-900">
              {cart.length}
            </div>
          </Link>

          <label className="swap swap-rotate mr-3">
            <input type="checkbox" />
            <FiSun
              className="swap-on fill-current w-6 h-6"
              onClick={() => setModeTheme("pastel")}
            />

            <FiMoon
              className="swap-off fill-current w-6 h-6 dark:text-indigo-200"
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
                  <Link
                    className="hover:bg-gray-800 rounded px-3 mx-1 py-1 "
                    to="/"
                  >
                    {user?.displayName}
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:bg-gray-800 rounded px-3 mx-1 py-1  justify-between"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={userSignOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/** cart Drawer */}
      <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
