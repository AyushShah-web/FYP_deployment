import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SummaryApi from "../../../api/api";
import showToast from "../../ShowToast";

const AdminProfile = () => {
  const userData = useSelector((state) => state.user.userData);

  const [count, setCount] = useState({});

  const getUserCounts = async () => {
    try {
      const response = await axios.get(SummaryApi.getUserCounts.url, {
        withCredentials: true,
      });
      if (response.status != 200) {
        showToast("error", "Something went wrong");
      }
      setCount(response.data.data);
    } catch (error) {
      showToast("error", "Error occured while fetching");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCounts();
  }, []);

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
        <p>
          <strong>No. of Landlords:</strong> {count.landlords || 0}
        </p>
        <p>
          <strong>No. of Tenants:</strong> {count.tenants || 0}
        </p>
        <p>
          <strong>Total No of Rooms:</strong> {count.rooms || 0}
        </p>

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

export default AdminProfile;
