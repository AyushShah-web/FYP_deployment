import { IndianRupee } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ property, index }) => {
  return (
    <div>
      {" "}
      <div
        key={index}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-3 lg:p-5 relative flex flex-col gap-1">
          <img
            src={property.image}
            className="rounded-xl lg:w-full lg:h-[12rem] object-cover self-center"
            alt=""
          />
          <div className="capitalize">
            <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-gray-600">{property.type}</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <IndianRupee className="w-5 h-5" />
                <span>Nrs.{property.price}/month</span>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                to={`/room/${property._id}`}
                className=" bg-primary hover:bg-primary/90  text-white py-2 px-1 lg:px-2 rounded-xl"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
