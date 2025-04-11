import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SummaryApi from "../../../api/api";
import showToast from "../../ShowToast";
import { useNavigate } from "react-router-dom";

const MyRentedRooms = () => {
  const userData = useSelector((state) => state.user.userData);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      const response = await axios.get(SummaryApi.getRentedRoomsOfLandlord.url, {
        withCredentials: true,
      });

      if (response.status != 200) {
        showToast("error", "Error occured");
        return;
      }
      console.log(response.data.data);

      setRooms(response.data.data);
    };
    func();
  }, [userData]);

  return (
    <div className=" bg-gray-100 h-full max-h-[100vh]">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 px-2">
        Rented Rooms
      </h1>

      <div className="flex border bg-white rounded-lg shadow-lg overflow-hidden">
        {rooms.length == 0 && <h1>No rooms</h1>}
        {rooms.length > 0 && (
          <>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">SN. No</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <tr key={room._id} className="border-b">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2">
                      <img
                        src={room.room?.image}
                        alt={room.room?.name}
                        className="w-16 h-16 object-cover rounded-xl flex justify-center items-center"
                      />
                    </td>
                    <td className="px-4 py-2 capitalize text-center">
                      {room.room.name}
                    </td>
                    <td className="px-4 py-2 capitalize text-center">
                      {room.room.type}
                    </td>
                    <td className="px-4 py-2 text-center">
                      Rs. {room.totalPrice / 100}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {room?.status == "pending" ? (
                        <div>
                          <h1>Pending</h1>
                          <button
                            onClick={() =>
                              navigate(`/payment/${room.room._id}`)
                            }
                            className="bg-green-600 rounded-xl px-3"
                          >
                            Rent It
                          </button>
                        </div>
                      ) : (
                        "Rented"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default MyRentedRooms;
