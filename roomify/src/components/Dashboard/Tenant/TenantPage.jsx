import React from "react";
import { useSelector } from "react-redux";

const TenantProfile = () => {
  const userData = useSelector((state) => state.user.userData);

  const handleEditProfile = () => {
    alert("Edit Profile functionality coming soon!");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-6">
      <h1 className="font-bold text-3xl text-[#0f5da7] mb-4">User Details</h1>
      
      <div className="flex flex-col items-center">
        <img
          src={userData.profileImage || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-[#0f5da7] shadow-md transition-transform duration-300 hover:scale-105"
        />

        <div className="mt-4 text-center space-y-2">
          <p className="text-lg">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-lg capitalize">
            <strong>Role:</strong> {userData.type}
          </p>
          {userData.type === "landlord" && (
            <p className="text-lg">
              <strong>Total No of Rooms:</strong> {userData.roomsCount || "N/A"}
            </p>
          )}
        </div>

        <button
          onClick={handleEditProfile}
          className="mt-5 bg-[#0f5da7] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#084a82] transition-all"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default TenantProfile;
