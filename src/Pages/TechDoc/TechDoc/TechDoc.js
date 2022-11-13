import React, { useState } from "react";
import AvilableQuote from "../AvilableQuote/AvilableQuote";
import TechDocBanner from "../TechDocBanner/TechDocBanner";

const TechDoc = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <TechDocBanner
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <AvilableQuote selectedDate={selectedDate} />
      </div>
    </>
  );
};

export default TechDoc;
