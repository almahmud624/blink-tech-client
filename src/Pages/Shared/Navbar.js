import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import {
  FiArrowRight,
  FiMenu,
  FiMoon,
  FiShoppingCart,
  FiSun,
} from "react-icons/fi";
import { DataContext } from "../../Context/DataProvider";
import Cart from "../Cart/Cart/Cart";
import { IoGitCompareSharp } from "react-icons/io5";
import CartDrawer from "../Cart/CartDrawer/CartDrawer";

const Navbar = ({ setModeTheme }) => {
  const { user, userSignOut } = useContext(AuthContext);
  const { cart } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
        <div className="navbar-start flex justify-between w-full md:w-1/6">
          <div className="flex">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <FiMenu className="text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  className="mx-1  btn btn-ghost bg-gray-800 normal-case hover:bg-transparent text-xl"
                  to=""
                >
                  Blink
                  <IoGitCompareSharp className="text-teal-400" />
                  Tech
                </Link>
                {menuItem}
              </ul>
            </div>
            <Link
              className="mx-1 hidden md:flex btn btn-ghost normal-case hover:bg-transparent text-xl"
              to=""
            >
              Blink
              <IoGitCompareSharp className="text-teal-400" />
              Tech
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-3">
            {/* <label className="swap swap-rotate">
              <input type="checkbox" />
              <FiSun
                className="swap-on fill-current w-6 h-6"
                onClick={() => setModeTheme("pastel")}
              />

              <FiMoon
                className="swap-off fill-current w-6 h-6 dark:text-indigo-200"
                onClick={() => setModeTheme("night")}
              />
            </label> */}
            <Link
              className=" rounded py-1  inline-flex relative items-center p-3 text-sm font-medium text-center text-white"
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
            {user?.uid && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxIowHNK_RDNCH9s7q_BOfWFkWSScYXs4vMEDnKmwS2YQBTodn04kuxqsO7Kb8sJajFI&usqp=CAU"
                      }
                      alt=""
                    />
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItem}</ul>
        </div>
        <div className="navbar-end hidden md:flex gap-5">
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

          {/* <label className="swap swap-rotate mr-3">
            <input type="checkbox" />
            <FiSun
              className="swap-on fill-current w-6 h-6"
              onClick={() => setModeTheme("pastel")}
            />

            <FiMoon
              className="swap-off fill-current w-6 h-6 dark:text-indigo-200"
              onClick={() => setModeTheme("night")}
            />
          </label> */}
          {user?.uid && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxIowHNK_RDNCH9s7q_BOfWFkWSScYXs4vMEDnKmwS2YQBTodn04kuxqsO7Kb8sJajFI&usqp=CAU"
                    }
                    alt=""
                  />
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
