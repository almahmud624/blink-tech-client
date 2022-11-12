import React from "react";
import { Link } from "react-router-dom";

const PrimaryBtn = ({ children, toNavigate, onClick, customClass }) => {
  return (
    <div>
      <Link
        className={`inline-block mt-3 rounded bg-indigo-300 px-8 py-3 text-sm font-medium text-gray-800  hover:bg-indigo-500 hover:text-gray-200 hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-300 transition-all duration-300 ${customClass}`}
        href="/download"
        to={toNavigate}
        onClick={onClick}
      >
        {children}
      </Link>
    </div>
  );
};

export default PrimaryBtn;
