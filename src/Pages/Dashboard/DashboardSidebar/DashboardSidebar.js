import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowDown,
  FiBox,
  FiPieChart,
  FiShoppingBag,
  FiUserCheck,
} from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { AuthContext } from "../../../Context/AuthProvider";
import useCheckAdmin from "../../../Hooks/useCheckAdmin";

const DashboardSidebar = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useCheckAdmin(user?.email);

  return (
    <div>
      <div>
        <aside className="w-64" aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiPieChart />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <FiShoppingBag />
                  <span
                    className="flex-1 ml-3 text-left whitespace-nowrap"
                    sidebar-toggle-item=""
                  >
                    Products
                  </span>
                  <FiArrowDown />
                </button>
                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                  <li>
                    <Link
                      to="/all-products"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/add-products"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Add Products
                    </Link>
                  </li>
                </ul>
              </li>

              {isAdmin && (
                <>
                  <li>
                    <Link
                      to="/dashboard/all-products"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Products
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/add-products"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Add Products
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/users"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiUserCheck />
                      <span className="ml-3 capitalize">Users</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/dashboard/orders"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiBox />
                  <span className="ml-3">Order</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-appointments"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <IoNewspaperOutline />
                  <span className="ml-3 capitalize">appointments</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardSidebar;
