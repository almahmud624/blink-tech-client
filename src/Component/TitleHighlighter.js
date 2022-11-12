import React from "react";

const TitleHighlighter = ({ children }) => {
  return (
    <div>
      <h5 className="font-medium text-indigo-400 mb-2 pr-2 inline-block border-r-4 border-b-4 rounded-lg border-indigo-400">
        {children}
      </h5>
    </div>
  );
};

export default TitleHighlighter;
