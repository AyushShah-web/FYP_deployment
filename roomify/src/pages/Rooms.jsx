import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

  // For location based searching
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const location = useLocation();
  const data = location.state || {};

  useEffect(() => {
    if (selectedLocation) {
      setFilteredRooms(
        rooms.filter((room) => room.location === selectedLocation)
      );
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
    console.log("entered here");
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          console.log("Latitude:", lat, "Longitude:", lon);
  
          setLatitude(lat);
          setLongitude(lon);
  
          try {
            const response = await axios.get(
              `${SummaryApi.getRoomsBasedOnCoordinates.url}?latitude=${lat}&longitude=${lon}`
            );
            console.log("Response of rooms:", response);
  
            if (response.data.data.length < 1) {
              console.log("No data found");
              return;
            }
  
            console.log("Fetched Rooms:", ...response.data.data);
            setFilter(`latitude ${lat} longitude ${lon}`);
            setFilteredRooms([...response.data.data]);
          } catch (error) {
            console.log("API Error:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          showToast("error", "Failed to get location. Enable GPS.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      showToast("error", "Geolocation is not supported in this browser.");
    }
  }
  
  async function getAllRooms() {
    const response = await axios.get(`${SummaryApi.getAllRooms.url}`);
    if (!response) return;

    let fetchedRooms = response.data.data;
    setRooms(fetchedRooms);

    setLocations([...new Set(fetchedRooms.map((room) => room.location))]);
    setTypes([...new Set(fetchedRooms.map((room) => room.type))]);
    console.log(data?.data?.searchLocation);
    console.log(data);

    if (
      !(data?.data?.searchLocation == "Current Location") &&
      data?.data?.searchLocation
    ) {
      console.log("1");

      setSelectedLocation(data.data.searchLocation);
    } else if (data?.data?.coordinate) {
      console.log("2");
      getRoomsBasedOnCoordinates();
    } else {
      setFilteredRooms(fetchedRooms);
    }
    console.log(selectedLocation);
  }

  useEffect(() => {
    getAllRooms();
  }, [data?.searchLocation]);

  return (
    <section className="p-2 lg:p-7 py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Rooms
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect room that matches your needs and budget.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm"
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
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm"
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
            className="bg-primary text-xl px-2 rounded-xl "
            onClick={getRoomsBasedOnCoordinates}
          >
            Search based on location
          </button>

          {filter && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={resetFilter}
            >
              Remove Filter
            </button>
          )}
        </div>

        {/* Room Cards Grid */}
        {filter && (
          <p className="text-center pb-2">
            Rooms for <span className="text-primary">{filter}</span>
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <RoomCard property={room} key={index} />
            ))
          ) : (
            <h1 className="text-xl text-gray-500 col-span-full text-center">
              No rooms found.
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
