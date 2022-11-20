import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="flex gap-8 justify-center">
      <div className="drawer drawer-mobile">
        <input
          id="drawer-dashboard"
          type="checkbox"
          className="drawer-toggle"
        />
        <div
          className="drawer-content overflow-auto"
          style={{ zIndex: "unset" }}
        >
          {/** Page Content */}
          <label
            htmlFor="drawer-dashboard"
            className="cursor-pointer text-2xl bg-gray-700 p-2 rounded ml-4 inline-block drawer-button lg:hidden"
          >
            <FiArrowRight />
          </label>
          <div className="px-4 py-5 lg:px-0">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer-dashboard" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            {/** Sidebar content */}
            <DashboardSidebar />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
