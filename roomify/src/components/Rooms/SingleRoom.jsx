import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import showToast from "../ShowToast";
import SummaryApi from "../../api/api";
import ChatPopup from "../Chat/ChatPopup";
import LeafletMap from "../LeafletMap"

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
        console.log(room);
        
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
    console.log(typeof roomData.price);
    console.log(typeof negotiationValue);

    console.log("room data limit", typeof (roomData.price * 0.8));
    console.log("negotiationvalue", typeof negotiationValue);
    console.log("room price", typeof roomData.price);
    console.log(negotiationValue <= 0 ? true : false);

    console.log(negotiationValue >= roomData.price ? true : false);
    console.log(negotiationValue < roomData.price * 0.8 ? true : false);

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
        {
          withCredentials: true,
        }
      );
      showToast("success", "Room negotiated successfully");
    } catch (error) {
      showToast("error", "Negotiation already exists");
    }
  };

  const handleRating = async () => {
    if (!userData || userData.type !== "tenant") {
      showToast("error", "Only tenants can give ratings");
      return;
    }

    navigate("/experienceForm", {
      state: { id: roomData._id, name: roomData.name },
    });
  };

  if (!roomData) {
    return (
      <h1 className="text-center text-white text-2xl mt-12">Room not found</h1>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 flex flex-col justify-center items-center">
      <div className="bg-white text-black p-6 lg:p-14 rounded-lg shadow-lg">
        <button
          className="p-1 lg:px-3 rounded-xl text-lg text-bold bg-primary"
          onClick={() => navigate('/category/rooms')}
        >
          Back
        </button>
        <h1 className="text-3xl font-bold mb-4 capitalize">{roomData.name}</h1>
        <img
          className="w-full md:w-[400px] h-[250px] object-cover rounded-lg shadow-xl mb-4"
          src={roomData.image}
          alt={roomData.name}
        />
        <p className="text-lg mb-2 capitalize">
          <strong>Location:</strong> {roomData.location}
        </p>
        <p className="text-lg mb-2 capitalize">
          <strong>Type:</strong> {roomData.type}
        </p>
        <p className="text-lg mb-2 capitalize">
          <strong>Owner:</strong> {roomData.owner?.name}
        </p>
        <p className="text-lg mb-4 capitalize">
          <strong>Price:</strong> Rs {roomData.price}/month
        </p>
        <p className="text-sm text-gray-400">
          Posted on: {new Date(roomData.createdAt).toLocaleDateString("en-CA")}
        </p>

        {userData?.type === "tenant" ? (
          <>
            <form
              onSubmit={handleNegotiation}
              className="mt-6 flex flex-col md:flex-row gap-4"
            >
              <input
                type="number"
                placeholder="Enter negotiation price"
                className="flex-1 p-2 border border-gray-700 bg-gray-800 text-white rounded-md outline-none"
                onChange={(e) => setNegotiationValue(e.target.value)}
              />
              <button
                type="submit"
                className={`px-4 py-2 text-white font-semibold rounded-md transition-all ${
                  negotiationValue > 0
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
                disabled={negotiationValue <= 0}
              >
                Negotiate
              </button>
            </form>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Link
                to={`/payment/${roomData._id}`}
                className="px-6 py-2 w-full min-w-[10rem] bg-primary hover:bg-primary/90 text-white font-semibold rounded-md"
              >
                Rent It
              </Link>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRating}
                  className="px-6 py-2 w-full bg-green-500 min-w-[10rem] hover:bg-green-600 text-white font-semibold rounded-md"
                >
                  Give Rating
                </button>
                <Link
                  to={`/experience/${roomData._id}`}
                  onClick={handleRating}
                  className="px-6 py-2  bg-green-500 min-w-[10rem] hover:bg-green-600 text-white font-semibold rounded-md"
                >
                  See Rating
                </Link>
              </div>
              <div className="map"></div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-xl py-2">
              <Link to={"/login"} className="font-bold text-blue-500">
                Login as tenant
              </Link>{" "}
              to rent the rooms.{" "}
            </p>
          </div>
        )}
      {roomData?.address?.coordinates && (
        <LeafletMap coordinates={roomData?.address?.coordinates} />
      )}
      </div>
      <ChatPopup owner={roomData.owner} />
    </section>
  );
};

export default SingleRoom;
