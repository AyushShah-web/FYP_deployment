import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import LandlordForm from "./LandlordForm";
import SummaryApi from "../../../api/api";
import showToast from "../../ShowToast";
import axios from "axios";

const LandlordProfile = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the actual File object
    }
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        ⁠ ${SummaryApi.uploadProfileImage.url}/${userData._id} ⁠,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        showToast("error", "Error occurred while uploading image");
        return;
      }

      showToast("success", "Image uploaded successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Upload error:", error);
      showToast("error", "Failed to upload image");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-full max-w-md mx-auto border border-gray-200">
      <h1 className="text-2xl font-bold text-primary">User Details</h1>
      <div className="flex flex-col items-center gap-3 pt-3">
        {/* Profile Image */}
        <div className="relative group">
          <img
            src={userData.image || "/default-profile.png"}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => setIsModalOpen(true)}
          />
          <p className="text-gray-500 text-sm italic mt-1">Click to change</p>
        </div>

        {/* User Info */}
        <p className="text-gray-800">
          <strong>Name:</strong> {userData.name}
        </p>
        <p className="text-gray-800">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="capitalize text-gray-800">
          <strong>Role:</strong> {userData.type}
        </p>
        {userData.type === "landlord" && (
          <p className="text-gray-800">
            <strong>Total No of Rooms:</strong> {userData.roomsCount || "N/A"}
          </p>
        )}
      </div>

      {/* Image Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">Upload Profile Image</h2>
            <input type="file" onChange={handleImageUpload} className="mb-4" />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            )}
            <button
              onClick={handleSaveImage}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 w-full"
            >
              Save Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordProfile;