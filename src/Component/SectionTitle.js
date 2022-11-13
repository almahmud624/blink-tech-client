import React from "react";

const SectionTitle = ({ children }) => {
  return (
    <div>
      <h1 className="text-5xl font-bold pt-3 capitalize">{children}</h1>
    </div>
  );
};

export default SectionTitle;
