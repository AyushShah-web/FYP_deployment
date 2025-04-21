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

  // Fetch main room
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

  // Fetch selected comparison room
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

  // Fetch all rooms
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

  const getComparisonLabel = (room) => {
    if (!mainRoom || !selectedRoom) return null;
    const priceDiff = Math.abs(mainRoom.price - selectedRoom.price);
    if (room._id === mainRoom._id) {
      if (mainRoom.price < selectedRoom.price)
        return `Cheaper by Rs. ${priceDiff}`;
      else if (mainRoom.price > selectedRoom.price)
        return `Costlier by Rs. ${priceDiff}`;
    }
    if (room._id === selectedRoom._id) {
      if (selectedRoom.price < mainRoom.price)
        return `Cheaper by Rs. ${priceDiff}`;
      else if (selectedRoom.price > mainRoom.price)
        return `Costlier by Rs. ${priceDiff}`;
    }
    return `Same Price`;
  };

  return (
    <div className="p-1 lg:p-4 xl:p-7 text-primary">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Compare Rooms</h1>

      {/* Room Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {[mainRoom, selectedRoom].map((room, index) =>
          room ? (
            <div
              key={index}
              className="relative border rounded-xl p-4 shadow-md bg-white flex flex-col"
            >
              {/* Price Label */}
              {selectedRoom && mainRoom && (
                <div
                  className={`absolute top-2 right-2 px-3 py-1 text-sm font-semibold rounded-full ${
                    getComparisonLabel(room).includes("Cheaper")
                      ? "bg-green-100 text-green-700"
                      : getComparisonLabel(room).includes("Costlier")
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {getComparisonLabel(room)}
                </div>
              )}

              {/* Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {room.name}
              </h3>
              <p className="text-gray-600 mb-1">{room.location}</p>
              <p className="text-gray-600 mb-2">{room.type}</p>
              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <IndianRupee className="w-5 h-5" />
                <span className="text-lg font-medium">
                  Nrs. {room.price}/month
                </span>
              </div>
              <img
                src={room.image}
                alt="Room"
                className="w-full h-[15rem] object-cover rounded-xl mb-3"
              />
              <Link
                to={`/room/${room._id}`}
                className="bg-primary hover:bg-primary/90 text-white text-center py-2 px-4 rounded-xl"
              >
                View Details
              </Link>
            </div>
          ) : (
            <div
              key={index}
              className="border rounded-xl p-4 shadow-sm flex items-center justify-center text-gray-500 h-[25rem]"
            >
              {index === 0 ? "Main room not found" : "Select a room to compare"}
            </div>
          )
        )}
      </div>

      {/* Feature Comparison Table */}
      {mainRoom && selectedRoom && (
        <div className="mt-10 bg-white shadow-md rounded-xl overflow-hidden">
          <h2 className="text-xl font-bold p-4 border-b text-gray-800">
            Detailed Feature Comparison
          </h2>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 w-[30%] text-gray-600 font-semibold">Feature</th>
                <th className="p-4 text-gray-800">{mainRoom.name}</th>
                <th className="p-4 text-gray-800">{selectedRoom.name}</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t">
                <td className="p-4 font-medium">Location</td>
                <td className="p-4">{mainRoom.location}</td>
                <td className="p-4">{selectedRoom.location}</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Type</td>
                <td className="p-4 capitalize">{mainRoom.type}</td>
                <td className="p-4 capitalize">{selectedRoom.type}</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Price</td>
                <td
                  className={`p-4 font-semibold ${
                    mainRoom.price < selectedRoom.price
                      ? "text-green-600"
                      : mainRoom.price > selectedRoom.price
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  Rs. {mainRoom.price}
                </td>
                <td
                  className={`p-4 font-semibold ${
                    selectedRoom.price < mainRoom.price
                      ? "text-green-600"
                      : selectedRoom.price > mainRoom.price
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  Rs. {selectedRoom.price}
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Availability</td>
                <td className="p-4">
                  {mainRoom.status ? (
                    <span className="text-green-600 font-semibold">Available</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Not Available</span>
                  )}
                </td>
                <td className="p-4">
                  {selectedRoom.isAvailable ? (
                    <span className="text-green-600 font-semibold">Available</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Not Available</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Selectable Rooms List */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Available Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) =>
              room.type === mainRoom?.type &&
              room._id !== mainRoom._id ? (
                <RoomCardCompare
                  key={room._id}
                  property={room}
                  setSelectedRoomId={setSelectedRoomId}
                  selectedRoomId={selectedRoomId}
                  comparisonRoom={mainRoom}
                />
              ) : null
            )
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
