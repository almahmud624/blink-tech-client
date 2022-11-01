import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  const [modeTheme, setModeTheme] = useState("night");
  console.log(modeTheme);

  return (
    <div data-theme={modeTheme}>
      <Navbar setModeTheme={setModeTheme} />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
