import React from "react";
import { format } from "date-fns";

const CustomCalendarIcon = () => {
  const currentDate = new Date();
  const dayOfMonth = format(currentDate, "d"); // Current day (e.g., "15")
  const month = format(currentDate, "MMM"); // Current month (e.g., "Oct")

  return (
    <div className="flex flex-col items-center justify-center w-24 bg-white border-2 border-blue-500 rounded-lg shadow-lg">
      {/* Calendar Body (Day) */}
      <div className="flex items-center justify-center flex-grow">
        <span className="text-lg font-bold text-gray-800 flex gap-2"><span>{month}</span><span>{dayOfMonth}</span></span>
      </div>
    </div>
  );
};

export default CustomCalendarIcon;





