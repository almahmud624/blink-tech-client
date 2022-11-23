import React, { useState } from "react";
import AvilableAppointment from "../AvilableAppointment/AvilableAppointment";
import TechDocBanner from "../TechDocBanner/TechDocBanner";

const TechDoc = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <TechDocBanner />
        <AvilableAppointment
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  );
};

export default TechDoc;
