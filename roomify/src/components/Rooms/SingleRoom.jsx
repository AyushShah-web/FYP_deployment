import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import showToast from "../ShowToast";
import SummaryApi from "../../api/api";
import ChatPopup from "../Chat/ChatPopup";
import LeafletMap from "../LeafletMap";
import { FaArrowLeft, FaMoneyBillWave, FaStar, FaBalanceScale } from "react-icons/fa";

const SingleRoom = () => {
  const userData = useSelector((state) => state.user.userData);
  const [roomData, setRoomData] = useState(null);
  const [negotiationValue, setNegotiationValue] = useState(0);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoomData() {
      try {
        let room = await axios.get(`${SummaryApi.getRoomFromId.url}/${slug}`);
        setRoomData(room.data.data);
      } catch (error) {
        console.error("Room not found", error);
      }
    }
    getRoomData();
  }, [slug]);

  const handleNegotiation = async (e) => {
    e.preventDefault();

    if (!userData || userData._id === roomData.owner._id) {
      showToast("error", "Cannot negotiate your own room");
      return;
    }

    if (
      Number(negotiationValue) <= 0 ||
      Number(negotiationValue) >= Number(roomData.price) ||
      Number(negotiationValue) <= roomData.price * 0.8
    ) {
      showToast(
        "error",
        "Negotiation value must be at least 80% of the price and should not exceed original price"
      );
      return;
    }

    try {
      await axios.post(
        `${SummaryApi.registerNegotiation.url}`,
        {
          client: userData._id,
          price: negotiationValue,
          room: roomData._id,
          owner: roomData.owner,
        },
        { withCredentials: true }
      );
      showToast("success", "Room negotiated successfully");
    } catch (error) {
      showToast("error", "Negotiation already exists");
    }
  };

  const handleRating = () => {
    if (!userData || userData.type !== "tenant") {
      showToast("error", "Only tenants can give ratings");
      return;
    }
    navigate("/experienceForm", {
      state: { id: roomData._id, name: roomData.name },
    });
  };

  if (!roomData) {
    return <h1 className="text-center text-white text-2xl mt-12">Room not found</h1>;
  }

  return (
    <section className="container mx-auto px-4 py-12 flex flex-col justify-center items-center">
      <div className="bg-white text-black p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-4xl relative">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 mb-4"
          onClick={() => navigate("/category/rooms")}
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-4xl font-extrabold mb-6 text-center capitalize text-primary">
          {roomData.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <img
            className="w-full h-[300px] object-cover rounded-xl shadow-lg"
            src={roomData.image}
            alt={roomData.name}
          />

          <div className="space-y-4 text-lg">
            <p><strong>📍 Location:</strong> {roomData.location}</p>
            <p><strong>🏷️ Type:</strong> {roomData.type}</p>
            <p><strong>👤 Owner:</strong> {roomData.owner?.name}</p>
            <p><strong>💰 Price:</strong> Rs {roomData.price}/month</p>
            <p className="text-sm text-gray-500">Posted on: {new Date(roomData.createdAt).toLocaleDateString("en-CA")}</p>
          </div>
        </div>

        {userData?.type === "tenant" ? (
          <div className="mt-8 space-y-6">
            <form onSubmit={handleNegotiation} className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Enter negotiation price"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setNegotiationValue(e.target.value)}
              />
              <button
                type="submit"
                className={`flex items-center gap-2 px-5 py-3 rounded-md text-white font-semibold transition-all ${
                  negotiationValue > 0
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={negotiationValue <= 0}
              >
                <FaBalanceScale /> Negotiate
              </button>
            </form>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to={`/payment/${roomData._id}`}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center"
              >
                <FaMoneyBillWave /> Rent It
              </Link>

              <button
                onClick={handleRating}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                <FaStar /> Give Rating
              </button>

              <Link
                to={`/experience/${roomData._id}`}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                <FaStar /> See Rating
              </Link>

              <Link
                to={`/compareRoom/${roomData._id}`}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                🔍 Compare It
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg mt-6">
            <Link to="/login" className="font-bold text-blue-600 hover:underline">
              Login as tenant
            </Link>{" "}
            to rent and negotiate rooms.
          </p>
        )}

        {roomData?.address?.coordinates && (
          <div className="mt-8 border rounded-xl overflow-hidden">
            <LeafletMap coordinates={roomData.address.coordinates} />
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <ChatPopup owner={roomData.owner} />
      </div>
    </section>
  );
};

export default SingleRoom;
