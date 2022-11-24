import React from "react";

const SectionTitle = ({ children, customClass }) => {
  return (
    <div>
      <h1
        className={`text-3xl md:text-5xl font-bold pt-3 capitalize ${customClass}`}
      >
        {children}
      </h1>
    </div>
  );
};

export default SectionTitle;
