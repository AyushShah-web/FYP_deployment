import { Negotiation } from "../models/negotiationModel.js";
import { RentedRoom } from "../models/rentedRoomSchema.js";
import { Room } from "../models/roomModel.js";
import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllLandlord = asyncHandler(async (req, res) => {
  // Get all the landlords
const type = req.user.type;

  if (type!="admin") {
    throw new ApiError(400, "Unauthorized");
  }
  const landlords = await User.find({ type: "landlord" }).select(
    "-password -token"
  );

  if (!landlords) {
    throw new ApiError(400, "No landlords find");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, landlords, "Landlords fetched suscessfully"));
});

const getAllTenant = asyncHandler(async (req, res) => {
  // Get all tenant
  const type = req.user.type;

  if (type!="admin") {
    throw new ApiError(400, "Unauthorized");
  }
  const tenants = await User.find({ type: "tenant" });

  if (!tenants) {
    throw new ApiError(400, "No tenants found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, tenants, "Tenants fetched suscessfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  // Delete a particular user
  const type = req.user.type;

  if (type!="admin") {
    throw new ApiError(400, "Unauthorized");
  }
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const rooms = await Room.deleteMany({ owner: id });
  const negotiaions = await Negotiation.deleteMany({ client: id });

  return res.status(200).json(200, user, "User deleted suscessfully");
});

const getUserCounts = asyncHandler(async (req, res) => {
  // Get the total count of the users
  const type = req.user.type;

  if (type!="admin") {
    throw new ApiError(400, "Unauthorized");
  }
  const tenants = await User.find({ type: "tenant" }).countDocuments();

  const landlords = await User.find({ type: "landlord" }).countDocuments();

  const rooms = await Room.find({}).countDocuments();

  const count = {
    tenants,
    landlords,
    rooms,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, count, "User data counted suscessfully"));
});

const getRentedRooms = asyncHandler(async (req, res) => {
  const type = req.user.type;

  if (type!="admin") {
    throw new ApiError(400, "Unauthorized");
  }
  const rooms = await RentedRoom.find({}).populate("room");

  if (!rooms) {
    throw new ApiError(400, "NO such rooms found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Rented rooms fetched"));
});

const getRoomsOfCertainLandlord = asyncHandler(async (req, res) => {
  const type = req.user.type;

  if (type!="admin") {
    throw new ApiError(400, "Unauthorized");
  }
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const rooms = await Room.find({ owner: id });

  if (!rooms) {
    throw new ApiError(400, "No rooms found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Rooms fetched successfully"));
});

export {
  getAllLandlord,
  getAllTenant,
  deleteUser,
  getUserCounts,
  getRentedRooms,
  getRoomsOfCertainLandlord,
};
