import React from "react";
import { useSelector } from "react-redux";

const LandlordProfile = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="flex flex-col justify-start items-start p-4 ">
      <h1 className="font-bold text-2xl text-[#0f5da7]">User Details</h1>
      <div className="details flex flex-col gap-3 pt-3">
        <p>
          <strong>Name:</strong> {userData.name}{" "}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="capitalize">
          <strong>Role:</strong> {userData.type}
        </p>
        {userData.type === "landlord" && (
          <p>
            <strong>Total No of Rooms:</strong> {userData.roomsCount || "N/A"}
          </p>
        )}

        {/* Optional Image */}
        {userData.profileImage && (
          <div className="pt-4">
            <img
              src={userData.profileImage}
              alt="User Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandlordProfile;
