import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../../api/api";
import { Link } from "react-router-dom";
import showToast from "../../ShowToast";

const LandlordRoomsList = () => {
  const [rooms, setRooms] = useState([]);

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`${SummaryApi.deleteRoom.url}/${id}`, {
        withCredentials: true,
      });
      showToast("success", "Room Deleted Successfully");
      console.log("Deleted successfully");
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
    } catch (error) {
      showToast("error", "Error Occurred While Deleting Room");
      console.log(error);
    }
  };

  useEffect(() => {
    async function getUserRooms() {
      const rooms = await axios.get(`${SummaryApi.getUserRooms.url}`, {
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
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-[#0f5da7] mb-4">User Rooms List</h1>
      <div className="overflow-y-auto h-[75vh]">
        {rooms?.length > 0 ? (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">SN. No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room._id} className="border-b text-center capitalize">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 ">{room.name}</td>
                  <td className="px-4 py-2 ">{room.type}</td>
                  <td className="px-4 py-2">{room.price}</td>
                  <td className="px-4 py-2 ">{room.location}</td>
                  <td className="px-4 py-2 ">
                    {room.status ? "Rented" : "Available"}
                  </td>
                  <td className="px-4 py-2 flex gap-4 text-xl">
                    <Link to={`/dashboard/roomForm/${room._id}`}>
                      <FaEdit className="text-primary"/>
                    </Link>
                    <button onClick={() => deleteRoom(room._id)}>
                      <MdDelete className="text-red-500"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default LandlordRoomsList;
