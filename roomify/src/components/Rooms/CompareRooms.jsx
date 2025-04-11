import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SummaryApi from "../../api/api";
import showToast from "../ShowToast";
import RoomCardCompare from "./RoomCardCompare";
import { IndianRupee } from "lucide-react";

const CompareRooms = () => {
  const [mainRoom, setMainRoom] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    const fetchRoomData = async (roomId, setter) => {
      try {
        const response = await axios.get(
          `${SummaryApi.getRoomFromId.url}/${roomId}`
        );
        if (response.status === 200) {
          setter(response.data.data);
        } else {
          showToast("error", "Error occurred while fetching room data");
        }
      } catch (error) {
        showToast("error", "Error fetching room data");
      }
    };

    fetchRoomData(slug, setMainRoom);
  }, [slug]);

  useEffect(() => {
    if (selectedRoomId) {
      const fetchComparingRoom = async () => {
        try {
          const response = await axios.get(
            `${SummaryApi.getRoomFromId.url}/${selectedRoomId}`
          );
          if (response.status === 200) {
            setSelectedRoom(response.data.data);
          } else {
            showToast("error", "Error occurred while fetching room data");
          }
        } catch (error) {
          showToast("error", "Error fetching room data");
        }
      };
      fetchComparingRoom();
    }
  }, [selectedRoomId]);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(`${SummaryApi.getAllRooms.url}`);
        if (response.status === 200) {
          setFilteredRooms(response.data.data);
        }
      } catch (error) {
        showToast("error", "Error fetching rooms");
      }
    };
    fetchAllRooms();
  }, []);

  return (
    <div className="p-1 lg:p-4 xl:p-7 text-primary">
      <h1 className="text-2xl font-bold mb-4">Compare Rooms</h1>
      <div className="roomComparison grid md:grid-cols-2 gap-6">
        {[mainRoom, selectedRoom].map((room, index) =>
          room ? (
            <div
              key={index}
              className="capitalize border p-4 rounded-lg shadow-sm flex flex-col h-full"
            >
              <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
              <p className="text-gray-600">{room.location}</p>
              <p className="text-gray-600">{room.type}</p>
              <div className="flex items-center gap-2 text-gray-700">
                <IndianRupee className="w-5 h-5" />
                <span>Nrs.{room.price}/month</span>
              </div>
              <img
                src={room.image}
                alt="Room"
                className="w-full h-[20rem] rounded-xl object-cover mt-2"
              />

              {/* Ensuring button stays at the bottom */}
              <Link
                to={`/room/${room._id}`}
                className="bg-primary hover:bg-primary/90 text-white py-2 px-1 lg:px-2 rounded-xl self-center  text-center lg:min-w-[10rem] mt-4"
              >
                View Details
              </Link>
            </div>
          ) : (
            <div
              key={index}
              className="capitalize border p-4 rounded-lg shadow-sm text-gray-500"
            >
              Select a room to compare
            </div>
          )
        )}
      </div>
      <div className="rooms mt-6">
        <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <RoomCardCompare
                key={room._id}
                property={room}
                setSelectedRoomId={setSelectedRoomId}
              />
            ))
          ) : (
            <h1 className="text-xl text-gray-500 col-span-full text-center">
              No rooms found.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareRooms;
