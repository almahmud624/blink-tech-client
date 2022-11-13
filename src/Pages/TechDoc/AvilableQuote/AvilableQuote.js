import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import QuoteOption from "../QuoteOption/QuoteOption";

const AvilableQuote = ({ selectedDate }) => {
  const [quoteOptions, setQuoteOptions] = useState([]);
  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setQuoteOptions(data));
  }, []);
  return (
    <div className="my-10">
      <p className="text-lg text-center font-semibold text-indigo-200">
        You have selected date:{format(selectedDate, "PP")}
      </p>
      <div className="grid grid-cols-3 gap-x-5 gap-y-5 my-10 py-10">
        {quoteOptions?.map((option) => (
          <QuoteOption key={Math.random()} option={option} />
        ))}
      </div>
    </div>
  );
};

export default AvilableQuote;
