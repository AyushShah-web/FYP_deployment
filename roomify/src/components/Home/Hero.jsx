import { useEffect, useState } from "react";
import heroRoom from "../../assets/heroRoom.avif";
import { ToastContainer } from "react-toastify";
import showToast from "../ShowToast";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md"; // Location icon

export default function Hero({ locations }) {
  const [searchLocation, setSearchLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  // Fetch user's current location
  const handleUseCurrentLocation = () => {
    navigate("/category/rooms", {
      state: { data: { coordinate: "coordinate" } },
    });
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();

    if (!searchLocation) {
      showToast("error", "Please select a location or use current location.");
      return;
    }

    navigate("/category/rooms", {
      state: { data: { searchLocation } },
    });
  };

  return (
    <section className="relative min-h-[600px] h-[89vh] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroRoom})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
          Find Your <span className="text-primary">Perfect Room</span> Without
          The Hassle
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Discover thousands of rooms and apartments that match your preferences
          and budget.
        </p>

        <div className="max-w-4xl mx-auto bg-black/40 p-4 rounded-lg backdrop-blur-sm">
          <form
            className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 relative"
            onSubmit={handleLocationSubmit}
          >
            {/* Location Selector */}
            <select
              className="w-full h-12 px-4 rounded-md bg-gray-900/60 border border-gray-700 text-white outline-none"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Calendar Picker */}
            <div className="relative">
              <div
                className="flex items-center justify-between w-full h-12 px-4 bg-gray-900/60 border border-gray-700 text-white rounded-md cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span>{date.toDateString()}</span>
                <FaCalendarAlt className="text-white" />
              </div>
              {showCalendar && (
                <div className="absolute z-20 top-14 w-[20rem] xl:w-full bg-white p-4 rounded-md shadow-lg">
                  <Calendar
                    onChange={setDate}
                    value={date}
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="h-12 px-8 bg-primary hover:bg-primary text-white font-semibold rounded-md"
            >
              Search Now
            </button>
          </form>

          {/* Separate "Use Current Location" Button */}
          <button
            onClick={handleUseCurrentLocation}
            className="mt-4 w-full flex items-center justify-center h-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md transition-all"
          >
            <MdMyLocation className="text-xl mr-2" />
            Search Based on Current Location
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
          {[
            { count: "1000+", text: "Listed Properties" },
            { count: "500+", text: "Happy Customers" },
            { count: "24/7", text: "Support" },
          ].map((list, index) => (
            <div className="text-center" key={index}>
              <p className="text-primary text-3xl font-bold mb-2">
                {list.count}
              </p>
              <p className="text-gray-300">{list.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
