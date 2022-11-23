import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="flex gap-8 justify-center">
      <div className="drawer drawer-mobile">
        <input
          id="drawer-dashboard"
          type="checkbox"
          className="drawer-toggle"
        />
        <div
          className="drawer-content overflow-auto z-50"
          style={{ zIndex: "unset" }}
        >
          {/** Page Content */}
          <label
            htmlFor="drawer-dashboard"
            className="cursor-pointer z-50 text-2xl dark:bg-indigo-900 p-2 rounded ml-4 inline-block drawer-button lg:hidden"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            {drawerOpen ? <FiArrowLeft /> : <FiArrowRight />}
          </label>
          <div className="px-4 py-5 lg:px-0">
            <Outlet />
          </div>
        </div>

        <ul
          className={`menu p-4 w-80 text-base-content  ${
            drawerOpen
              ? "block md:hidden absolute top-[140px] left-0"
              : "hidden"
          }`}
        >
          {/** Sidebar content */}
          <DashboardSidebar />
        </ul>
        <ul className={`menu p-4 w-80 text-base-content md:block hidden`}>
          {/** Sidebar content */}
          <DashboardSidebar />
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
