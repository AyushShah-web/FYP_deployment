import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../api/api";
import axios from "axios";
import RoomCard from "../components/Rooms/RoomCard";

const Rooms = () => {
  const [locations, setLocations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const location = useLocation();
  const data = location.state || {};

  useEffect(() => {
    if (selectedLocation) {
      setFilteredRooms(rooms.filter((room) => room.location === selectedLocation));
      setFilter(selectedLocation);
      setSelectedType("");
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedType) {
      setFilteredRooms(rooms.filter((room) => room.type === selectedType));
      setFilter(selectedType);
      setSelectedLocation("");
    }
  }, [selectedType]);

  const resetFilter = () => {
    setFilteredRooms(rooms);
    setFilter("");
    setSelectedLocation("");
    setSelectedType("");
  };

  async function getRoomsBasedOnCoordinates() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await axios.get(
              `${SummaryApi.getRoomsBasedOnCoordinates.url}?latitude=${lat}&longitude=${lon}`
            );

            if (response.data.data.length < 1) return;

            setFilter(`Nearby Itahari`);
            setFilteredRooms(response.data.data);
          } catch (error) {
            console.log("API Error:", error);
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Please enable GPS to get nearby rooms.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  }

  async function getAllRooms() {
    const response = await axios.get(SummaryApi.getAllRooms.url);
    if (!response) return;

    const fetchedRooms = response.data.data;
    setRooms(fetchedRooms);
    setLocations([...new Set(fetchedRooms.map((room) => room.location))]);
    setTypes([...new Set(fetchedRooms.map((room) => room.type))]);

    if (data?.data?.searchLocation && data?.data?.searchLocation !== "Current Location") {
      setSelectedLocation(data.data.searchLocation);
    } else if (data?.data?.coordinate) {
      getRoomsBasedOnCoordinates();
    } else {
      setFilteredRooms(fetchedRooms);
    }
  }

  useEffect(() => {
    getAllRooms();
  }, [data?.searchLocation]);

  return (
    <section className="bg-gray-50 min-h-screen py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">Explore Available Rooms</h2>
          <p className="text-gray-500 mt-2 text-lg">
            Search and filter rooms that best suit your location and needs.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <select
            className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 bg-white text-gray-700 focus:ring-primary focus:border-primary transition duration-200"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 bg-white text-gray-700 focus:ring-primary focus:border-primary transition duration-200"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={getRoomsBasedOnCoordinates}
          >
            Use My Location
          </button>

          {filter && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={resetFilter}
            >
              Clear Filter
            </button>
          )}
        </div>

        {filter && (
          <p className="text-center text-gray-600 mb-6">
            Showing results for:{" "}
            <span className="font-medium text-primary">{filter}</span>
          </p>
        )}

        {/* Room Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <RoomCard property={room} key={index} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No rooms found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
