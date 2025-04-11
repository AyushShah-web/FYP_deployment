import React, { useState } from "react";

const LandlordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "tenant",
    roomsCount: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">
        User Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-primary outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-primary outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block font-semibold text-gray-700">Role</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-primary outline-none"
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>

        {/* Rooms Count (Only for Landlord) */}
        {formData.type === "landlord" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Total No of Rooms
            </label>
            <input
              type="number"
              name="roomsCount"
              value={formData.roomsCount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-primary outline-none"
              placeholder="Enter number of rooms"
            />
          </div>
        )}

        {/* Profile Image Upload */}
        <div>
          <label className="block font-semibold text-gray-700">
            Profile Image
          </label>
          <input type="file" onChange={handleImageUpload} className="mt-2" />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full border"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LandlordForm;
