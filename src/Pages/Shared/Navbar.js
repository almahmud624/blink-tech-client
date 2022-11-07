import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GrMoon, GrSun, GrTechnology } from "react-icons/gr";
import { AuthContext } from "../../Context/AuthProvider";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { DataContext } from "../../Context/DataProvider";

const Navbar = ({ setModeTheme }) => {
  const { user, userSignOut } = useContext(AuthContext);
  const { cart } = useContext(DataContext);
  return (
    <div className="max-w-screen-xl mx-auto sticky top-0 left-0 bg-base-100 z-40">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
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
        <div className="navbar-end">
          <Link
            type="button"
            className="inline-flex relative items-center p-3 text-sm font-medium text-center text-white"
            to="/cart"
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
    </div>
  );
};

export default Navbar;
