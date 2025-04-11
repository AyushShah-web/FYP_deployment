import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../../api/api";
import showToast from "../../ShowToast";
import { Link, useParams } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const SpecificLandlordRooms = () => {
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${SummaryApi.getRoomsOfCertainLandlord.url}/${id}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setRooms(response.data.data);
        } else {
          showToast("error", "Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        showToast("error", "Failed to load rooms");
      }
    };

    fetchRooms();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Rooms
      </h1>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={property.image}
                className="w-full h-48 object-cover"
                alt="Room"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {property.name}
                </h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-600">{property.type}</p>
                <div className="flex items-center gap-2 text-gray-700 mt-2">
                  <IndianRupee className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    Nrs. {property.price}/month
                  </span>
                </div>
                {/* Fixed Button */}
                <div className="mt-4">
                  <Link
                    to={`/room/${property._id}`}
                    className="block w-full bg-primary text-white py-2 text-center rounded-lg hover:bg-primary/90"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecificLandlordRooms;
