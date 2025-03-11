import axios from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import showToast from "../ShowToast";
import { useSelector } from "react-redux";

const RoomForm = () => {
  const [rooms, setRooms] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  // Form fields
  const [name, setName] = useState("");
  const [type, setType] = useState("room");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (slug) {
      getRoomFromId();
    }
  }, [slug]);

  async function getRoomFromId() {
    try {
      const room = await axios.get(`${SummaryApi.getRoomFromId.url}/${slug}`);
      const roomData = room.data.data;
      if (roomData) {
        setRooms(roomData);
        setName(roomData.name || "");
        setType(roomData.type || "");
        setLocation(roomData.location || "");
        setPrice(roomData.price || "");
        if (roomData.address?.coordinates) {
          setLatitude(roomData.address.coordinates[1]);
          setLongitude(roomData.address.coordinates[0]);
        }
        setImageUrl(roomData.image)
      }
    } catch (error) {
      console.log("Error fetching room:", error);
    }
  }

  // Get User’s Current Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLatitude(null);
          setLongitude(null);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const registerOrUpdateRoom = async (formData) => {
    try {
      setSubmitting(true);
      const url = slug
        ? `${SummaryApi.updateRoom.url}/${slug}`
        : SummaryApi.registerRoom.url;
      const method = slug ? "patch" : "post";

      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      navigate("/dashboard/userRooms", {
        state: {
          message: slug
            ? "Room Updated Successfully"
            : "Room Added Successfully",
          type: "success",
        },
      });
    } catch (error) {
      console.error("Error saving room:", error);
      navigate("/dashboard/userRooms", {
        state: { message: "Error occurred while processing.", type: "error" },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const submitRoom = async (e) => {
    e.preventDefault();
    if (!(name && type && location && price && latitude && longitude)) {
      setError("All fields and location are required");
      return;
    }
    if (!slug && !image) {
      setError("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("price", price);
    formData.append(
      "address",
      JSON.stringify({ type: "Point", coordinates: [longitude, latitude] })
    );
    if (image instanceof File) {
      formData.append("image", image);
    }
    console.log(formData);
    
    await registerOrUpdateRoom(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="font-bold text-3xl text-[#0f5da7] text-center mb-5">
        Room Form
      </h1>
      <form className="space-y-5" onSubmit={submitRoom}>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label
              htmlFor="formName"
              className="text-sm font-medium text-gray-700"
            >
              Enter the name:
            </label>
            <input
              type="text"
              id="formName"
              className="outline-none border-2 p-2 rounded-sm mt-1"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="roomType"
              className="text-sm font-medium text-gray-700"
            >
              Room Type:
            </label>
            <select
              name="type"
              id="roomType"
              className="rounded-xl cursor-pointer border-2 px-3 py-2 mt-1 outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="room">Room</option>
              <option value="cabin">Cabin</option>
              <option value="building">Building</option>
              <option value="flat">Flat</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label
              htmlFor="formLocation"
              className="text-sm font-medium text-gray-700"
            >
              Enter the location:
            </label>
            <input
              type="text"
              id="formLocation"
              className="outline-none border-2 p-2 rounded-sm mt-1"
              placeholder="Enter location"
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="formPrice"
              className="text-sm font-medium text-gray-700"
            >
              Enter the price:
            </label>
            <input
              type="number"
              id="formPrice"
              className="outline-none border-2 p-2 rounded-sm mt-1"
              placeholder="Enter price"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Displaying User Location */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700">
              Latitude:
            </label>
            <input
              type="text"
              className="outline-none border-2 p-2 rounded-sm mt-1 bg-gray-100"
              value={latitude || "Fetching location..."}
              readOnly
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700">
              Longitude:
            </label>
            <input
              type="text"
              className="outline-none border-2 p-2 rounded-sm mt-1 bg-gray-100"
              value={longitude || "Fetching location..."}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col w-full">
            <label
              htmlFor="formImage"
              className="text-sm font-medium text-gray-700"
            >
              Choose Image:
            </label>
            <input
              type="file"
              id="formImage"
              name="image"
              accept="image/png, image/jpeg"
              className="mt-1"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
          <img src={imageUrl} alt="" className="w-[80%] max-w-[30rem] rounded-xl" />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full md:w-1/4 bg-[#0f5da7] text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : slug ? "Update Room" : "Add Room"}
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
