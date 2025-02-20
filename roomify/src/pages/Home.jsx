import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../api/api";
import {
  Hero,
  Whyrf,
  Testimonials,
  HomeProperties,
  Chooseus,
  CustomCalendarIcon,
} from "../components/index";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    async function getUserRooms() {
      const rooms = await axios.get(SummaryApi.getAllRooms.url, {
        withCredentials: true,
      });
      console.log("rooms", rooms.data.data);

      if (!rooms) {
        console.log("No rooms find");
        return;
      }
      let data = rooms.data.data;
      data.splice(6);
      setRooms(data);
      const uniqueLocations = [...new Set(data.map((room) => room.location))];

      console.log("Unique Locations:", uniqueLocations);
      setLocations(uniqueLocations);
      setSelectedLocation(locations[0]);
    }

    getUserRooms();
    console.log("Selected value", selectedLocation);
  }, []);

  return (
    <>
      <Hero locations={locations} />
      <HomeProperties properties={rooms} />
      <Whyrf />
      <Testimonials />
      <Chooseus />
    </>
  );
};

export default Home;
