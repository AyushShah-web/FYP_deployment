import { Experience } from "../models/experienceModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerExperience = asyncHandler(async (req, res) => {
  // Register the experience of the user.

  const { roomId, comment, rating } = req.body;
  if (!(roomId, comment, rating)) {
    throw new ApiError(400, "All fields are required");
  }

  let experience = await Experience.findOne({ roomId, client: req.user._id });

  console.log(experience);
  //   return;

  if (experience) {
    await Experience.findByIdAndDelete(experience._id);
  }

  experience = await Experience.create({
    rating,
    comment,
    roomId,
    client: req.user._id,
  });

  if (!experience) {
    throw new ApiError(400, "Error occured while registering experince");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, experience, "experience registered suscessfully")
    );
});

const getAllExperience = asyncHandler(async (req, res) => {
  // Get all the experinces

  const experience = await Experience.find({}).populate("roomId","image location name").populate("client","name");

  if (!experience) {
    throw new ApiError(400, "No experience found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, experience, "Experience fetched suscessfully."));
});

const getRoomExperiences = asyncHandler(async (req, res) => {
  // Get the experiences of the room

  const { roomId } = req.params;
  console.log(roomId);
  
  if (!roomId) {
    throw new ApiError(400, "Room id is required");
  }

  const experiences = await Experience.find({ roomId }).populate("roomId","image location name").populate("client","name");

  if (!experiences) {
    throw new ApiError(400, "No experience found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, experiences, "Experiences fetched suscessfully")
    );
});

export { registerExperience, getAllExperience, getRoomExperiences };
