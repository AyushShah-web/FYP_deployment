import axios from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../api/api";
import { useParams } from "react-router-dom";

const RoomExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const { slug } = useParams();

  const getRoomExperiences = async () => {
    try {
      const response = await axios.get(
        `${SummaryApi.getRoomExperiences.url}/${slug}`
      );
      console.log("Log to response", response);

      if (!response.data || !response.data.data) {
        console.error("Error: No data received");
        return;
      }
      setExperiences(response.data.data);
    } catch (error) {
      console.error("Error fetching room experiences:", error);
    }
  };

  useEffect(() => {
    if (slug) {
      getRoomExperiences();
    }
  }, [slug]);

  return (
    <div className="p-4">
      <div className="info">
        <h2 className="text-xl font-semibold mb-4 text-center xl:text-2xl">
          Room Experiences
        </h2>
        <img src={experiences[0]?.roomId.image} alt="" className="w-[15rem]" />
      </div>
      {experiences.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {experiences.map((experience, index) => (
            <li key={index} className="border-b p-2">
              <h3 className="text-sm">{experience.client.name}</h3>
              <p className="text-gray-600">{experience.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="min-h-[50vh] flex justify-center">
          <p className="text-center text-gray-500">No experiences available.</p>
        </div>
      )}
    </div>
  );
};

export default RoomExperiences;
