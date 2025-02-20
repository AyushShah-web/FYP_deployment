import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import showToast from "../ShowToast";
import { ToastContainer } from "react-toastify";
import SummaryApi from "../../api/api";

const ExperienceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name } = location.state || {};

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      showToast("error", "Please provide a rating between 1 and 5");
      return;
    }
    if (!comment) {
      showToast("Comment is required");
      return;
    }

    try {
      const response = await axios.post(
        SummaryApi.registerExperince.url, // Replace with actual API endpoint
        {
          roomId: id,
          rating,
          comment,
        },
        {
          withCredentials: true,
        }
      );
      if (!response?.data || !response?.data.data) {
        showToast("error", "Error occured while submitting");
        return;
      }
      showToast("success", "Experience submitted successfully!");
      navigate(-1);
    } catch (error) {
      showToast("error", "Failed to submit experience");
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 flex flex-col justify-center items-center">
      <div className="bg-white text-black p-6 lg:p-16 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Share Your Experience
        </h1>
        <h3 className="text-xl flex py-1 font-bold">
          Name:<span className="pl-1">{name}</span>
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-lg font-medium">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-2 border border-gray-700 bg-gray-800 text-white rounded-md outline-none"
            required
          />
          <label className="text-lg font-medium">Comment</label>
          <textarea
            rows="4"
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 border border-gray-700 bg-gray-800 text-white rounded-md outline-none"
            placeholder="Write your experience..."
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-all"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ExperienceForm;
