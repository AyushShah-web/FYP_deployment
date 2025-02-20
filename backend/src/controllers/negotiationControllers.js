import { Negotiation } from "../models/negotiationModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

const registerNegotiation = asyncHandler(async (req, res) => {
  // Register the negotiation made by the user
  let { owner, room, client, price } = req.body;

  let negotiation = await Negotiation.findOne({ room, client });
  if (negotiation) {
    throw new ApiError(400, "Negotiation already exists");
  }

  negotiation = await Negotiation.create({
    owner,
    room,
    client,
    price,
  });

  if (!negotiation) {
    throw new ApiError(400, "Error occured while registering negotiation.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, negotiation, "Negotiation created suscessfully")
    );
});

const deleteNegotiation = asyncHandler(async (req, res) => {
  // Delete the room negotiation
  let { negotiationId } = req.params;
  if (!negotiationId) {
    throw new ApiError(400, "Negotiation id is required");
  }
  let negotiation = await Negotiation.deleteOne({ _id: negotiationId });
  if (!negotiation) {
    throw new ApiError(400, "No negotiation found");
  }
  return res
    .status(200)
    .json(400, negotiation, "Negotiation deleted suscessfully");
});

const getUsersNegotiations = asyncHandler(async (req, res) => {
  // get negotiations received by the user
  let { _id } = req.user;
  if (!_id) {
    throw new ApiError(400, "Id is required");
  }
  let negotiations = await Negotiation.find({ owner: _id })
    .populate("client", "name")
    .populate("room", "price name");

  if (!negotiations) {
    throw new ApiError(400, "Negotiation not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        400,
        negotiations,
        "Negotiations of the user fetched suscessfully"
      )
    );
});

const getRequestedNegotiations = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw new ApiError(400, "Id is required");
  }
  const negotiations = await Negotiation.find({ client: _id })
    .populate("client", "name")
    .populate("room", "price name");

  if (!negotiations) {
    throw new ApiError(400, "No negotiations found.");
  }

  console.log(negotiations);

  return res
    .status(200)
    .json(new ApiResponse(200, negotiations, "Fetched data suscessfully "));
});
const acceptNegotiation = asyncHandler(async (req, res) => {
  // Negotiate the room
  const { _id } = req.user;
  const { negotiationId } = req.params;

  const negotiate = await Negotiation.updateOne(
    { _id: negotiationId },
    {
      negotiationStatus: true,
    }
  );

  if (!negotiate) {
    throw new ApiError(400, "Invalid room Id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, negotiate, "Negotiated suscessfully"));
});

const counterNegotiation = asyncHandler(async (req, res) => {
  console.log("Entered here");

  const {negotiationId} = req.params; 
  const { counterPrice } = req.body;
  if (!(negotiationId && counterPrice)) {
    throw new ApiError(400, "Id and CounterPrice is required");
  }
  const negotiation = await Negotiation.findByIdAndUpdate(
    negotiationId,
    {
      counterPrice,
    }
  );
  if (!negotiation) {
    throw new ApiError(500, "Error occured while countering");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, negotiation, "Counterd negotiaion suscessfully")
    );
});

export {
  registerNegotiation,
  deleteNegotiation,
  getUsersNegotiations,
  acceptNegotiation,
  getRequestedNegotiations,
  counterNegotiation,
};
