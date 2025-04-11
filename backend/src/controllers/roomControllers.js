import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Room } from "../models/roomModel.js";
import mongoose from "mongoose";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Negotiation } from "../models/negotiationModel.js";
import { Experience } from "../models/experienceModel.js";
import { RentedRoom } from "../models/rentedRoomSchema.js";

// Registering room
const registerRoom = asyncHandler(async (req, res) => {
  // Get the room type, location, and price of the room
  const { name, type, location, price, address } = req.body;
  if (!(type && location && price && name)) {
    throw new ApiError(400, "All the fields are required");
  }

  console.log(address);
  console.log("type of address", typeof address);

  const parsedAddress = JSON.parse(address);
  console.log("parsedAddress", parsedAddress);

  if (!parsedAddress.coordinates || parsedAddress.coordinates.length !== 2) {
    throw new ApiError(
      400,
      "Invalid coordinates format. Expected [longitude, latitude]."
    );
  }

  let imageLocalPath = req.file?.path;

  console.log(imageLocalPath);

  const image = await uploadOnCloudinary(imageLocalPath, "rooms");
  if (!image) {
    console.log(400, "Error occured while uploading image");
    throw new ApiError(400, "Something went wrong while uploading image");
  }

  const room = await Room.create({
    name,
    type,
    location,
    price,
    image: image.url,
    address: {
      type: "Point",
      coordinates: parsedAddress.coordinates,
    },
    owner: req.user._id,
  });

  if (!room) {
    await deleteFromCloudinary(image.url);
    throw new ApiError(400, "Error occured while uploading in database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, room, "Suscessfully created the room"));
});

// Fetching all rooms
const getAllRooms = asyncHandler(async (req, res) => {
  // Get all the rooms from the database

  const rooms = await Room.find({}).sort({ createdAt: -1 });

  if (!rooms) {
    throw new ApiError(400, "Error occured while fetching rooms");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Suscesfully fetched all rooms"));
});

const getUserRooms = asyncHandler(async (req, res) => {
  // Get all the rooms of a specific user

  const rooms = await Room.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  if (!rooms) {
    throw new ApiError(400, "Error occured while fetching rooms");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Suscessfully fetched all rooms"));
});

const getRoomsFromId = asyncHandler(async (req, res) => {
  console.log("Entered here");

  const { roomId } = req.params;

  if (!roomId) {
    throw new ApiError(400, "Id is required");
  }

  const room = await Room.findById(roomId).populate("owner", "name");

  if (!room) {
    throw new ApiError(400, "No such room exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, room, "User data fetched suscessfully"));
});

const deleteRoom = asyncHandler(async (req, res) => {
  // Delete the room

  console.log("Entered Here");

  let { roomId } = req.params;
  if (!roomId) {
    throw new ApiError(400, "Id is required");
  }
  console.log(req.user, roomId);

  let room = await Room.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(roomId),
    owner: req.user._id,
  });

  if (!room) {
    throw new ApiError(400, "Room not found");
  }
  await Negotiation.deleteMany({ room: roomId });
  await Experience.deleteMany({ roomId });

  return res
    .status(200)
    .json(new ApiResponse(200, room, "Room deleted susscessfully"));
});

const updateRoom = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, type, location, price } = req.body;
  const { roomId } = req.params;

  if (!(roomId && name && type && price && location)) {
    throw new ApiError(400, "All the details required");
  }

  const newImageLocalPath = req.file?.path;

  if (newImageLocalPath) {
    let newImage = await uploadOnCloudinary(newImageLocalPath, "rooms");
    if (!newImage) {
      throw new ApiError(
        400,
        "Something went wrong while uploading in cloudinary"
      );
    }

    const oldImageUrl = await Room.findById(roomId);

    await deleteFromCloudinary(oldImageUrl.image, "rooms", "image");

    oldImageUrl.image = newImage.url;
    await oldImageUrl.save({ validateBeforeSave: false });
  }

  const room = await Room.findByIdAndUpdate(
    { _id: roomId },
    {
      name,
      type,
      location,
      price,
    },
    { new: true }
  );

  if (!room) {
    throw new ApiError(400, "Room not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, room, "Suscessfully updated the room"));
});

const getRoomLocations = asyncHandler(async (req, res) => {
  // Get rooms locations

  const locations = await Room.aggregate([
    {
      $group: {
        _id: "$location",
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, locations, "Fetched all the locations"));
});

const getRoomsBasedOnTypes = asyncHandler(async (req, res) => {
  console.log("Entered here");
  console.log(req.params);

  const { type } = req.params;

  if (!type) {
    throw new ApiError(200, "Room Type is required");
  }

  const rooms = await Room.find({ type });

  if (!rooms) {
    throw new ApiError(400, "No rooms found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Suscessfully fetched rooms"));
});

const getRoomsBasedOnLocation = asyncHandler(async (req, res) => {
  console.log("Entered here");
  console.log(req.params);

  const { location } = req.params;

  if (!location) {
    throw new ApiError(200, "Room Type is required");
  }

  const rooms = await Room.find({ location });

  if (!rooms) {
    throw new ApiError(400, "No rooms found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Suscessfully fetched rooms"));
});

const getRoomBasedOnCoordinates = asyncHandler(async (req, res) => {
  // Get rooms based on coordinates

  console.log("entered here in the coordinates");

  const { latitude, longitude, maxDistance = 50 } = req.query;
  if (!latitude || !longitude) {
    throw new ApiError(400, "Latitude and Longitude is required");
  }
  const rooms = await Room.find({
    address: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: parseInt(maxDistance) * 1000, // Default: 5km
      },
    },
  });

  console.log("rooms", rooms);

  if (!rooms) {
    throw new ApiError(400, "Error occured while fetching rooms");
  }

  console.log("Send response");

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Suscessfully fetched rooms"));
});

const getRentedRoomsOfUser = asyncHandler(async (req, res) => {
  // Get the rented rooms of the user

  const id = req.user._id;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const rooms = await RentedRoom.find({ buyer: id }).populate("room");

  console.log("Rooms", rooms);

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Suscessfully fetched rooms data"));
});

const getRentedRoomsOfLandlord = asyncHandler(async(req,res)=>{
  const id =req.user._id;

  if(!id){
    throw new ApiError(400,"ID is required");
  }

  const rooms = await RentedRoom.find({owner:id}).populate("room")

  return res
  .status(200)
  .json(new ApiResponse(200,rooms,"Rooms fetched suscessfully"));

})

export {
  registerRoom,
  getAllRooms,
  getUserRooms,
  deleteRoom,
  getRoomsFromId,
  updateRoom,
  getRoomsBasedOnTypes,
  getRoomsBasedOnLocation,
  getRoomLocations,
  getRoomBasedOnCoordinates,
  getRentedRoomsOfUser,
  getRentedRoomsOfLandlord
};
