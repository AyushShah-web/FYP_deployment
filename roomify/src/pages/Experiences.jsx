import axios from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../api/api";
import { Link } from "react-router-dom";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  const getAllExperience = async () => {
    try {
      const response = await axios.get(SummaryApi.getAllExperience.url);
      if (response.data && response.data.data) {
        console.log(response);

        setExperiences(response.data.data);
      } else {
        console.log("No experiences found");
      }
    } catch (error) {
      console.log("Experience fetching error", error);
    }
  };

  useEffect(() => {
    getAllExperience();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">User Experiences</h1>
      <div className="flex flex-col gap-4">
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white text-black p-4 rounded-lg shadow-md border border-gray-200 flex gap-2"
            >
              <Link to={`/room/${exp.roomId?._id}`} className="room-info">
                <img
                  src={exp.roomId?.image}
                  alt=""
                  className="w-[15rem] rounded-xl"
                />
              </Link>
              <div className="experience-info">
                <p className="text-lg font-semibold">Rating: {exp.rating} ⭐</p>
                <div className="flex gap-10">
                  <p className="capitalize">{exp.roomId.name}</p>
                  <p className="capitalize">{exp.roomId.location}</p>
                </div>
                <p className="text-gray-700 mt-1">{exp.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  - {exp.client?.name || "Anonymous"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-[50vh] flex justify-center">
            <p className="text-center text-gray-500">
              No experiences available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiences;
