import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import SummaryApi from "../../../api/api";
import axios from "axios";
import showToast from "../../ShowToast";

const LandlordRooms = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function getUserRooms() {
      const rooms = await axios.get(SummaryApi.getUserRooms.url, {
        withCredentials: true,
      });
      console.log("rooms", rooms.data.data);

      if (!rooms) {
        console.log("No rooms found");
        return;
      }
      setRooms(rooms.data.data);
    }
    getUserRooms();

    if (location.state?.message) {
      showToast(location.state.type, location.state.message);
      window.history.replaceState({}, ""); // Clears state to prevent showing the toast again on refresh
    }
  }, [location]);

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-[#0f5da7]">User Rooms</h1>
        <Link
          to={"/dashboard/roomForm"}
          className="bg-[#0f5da7] text-white p-2 px-4 rounded-md  items-center hover:bg-slate-300 hover:text-black hidden md:flex"
        >
          Add{" "}
          <span>
            <IoMdAdd />
          </span>
        </Link>
      </div>

      <div className="overflow-y-auto h-[83vh]">
        {rooms?.length > 0 ? (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">SN. No</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room._id} className="border-b">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-16 h-16 object-cover rounded-xl flex justify-center items-center"
                    />
                  </td>
                  <td className="px-4 py-2 capitalize text-center">{room.name}</td>
                  <td className="px-4 py-2 capitalize text-center">{room.type}</td>
                  <td className="px-4 py-2 text-center">Rs. {room.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

        ) : (
          <p>No rooms found.</p>
        )}
      </div>
      <Link
          to={"/dashboard/roomForm"}
          className="bg-[#0f5da7] text-white flex justify-center md:hidden p-2 px-4 rounded-md absolute bottom-0 items-center hover:bg-slate-300 hover:text-black right-[50%]"
        >
          Add{" "}
          <span>
            <IoMdAdd />
          </span>
        </Link>
    </div>
  );
};

export default LandlordRooms;
