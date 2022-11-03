import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../AdminSideBar/AdminSideBar";

const Dashboard = () => {
  return (
    <div className="flex gap-8 justify-center">
      <AdminSideBar />
      <div className="w-10/12">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
