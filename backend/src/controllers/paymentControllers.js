import mongoose from "mongoose";
import { Negotiation } from "../models/negotiationModel.js";
import { Room } from "../models/roomModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getRoomPrice = asyncHandler(async (req, res) => {
  // Get the room price
  const { roomId } = req.params;
  const { _id } = req.user;
  console.log(roomId);
  
  let price;

  const negotiation = await Negotiation.findOne({
    client: _id,
    room: roomId,
  }).populate("room", "price");

  if(negotiation){
 
  if (negotiation?.counterPrice) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          negotiation?.counterPrice,
          "Suscessfully fetched counter price"
        )
      );
  }

  if (negotiation?.negotiationStatus) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          negotiation?.price,
          "Suscessfully fetched negotiated value"
        )
      );
    }
  }

  const room = await Room.findById(new mongoose.Types.ObjectId(roomId));
if(!room){
    throw new ApiError(400,"Invalid roomId")
}

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        price=room.price,
        "Suscessfully fetched room original price"
      )
    );
});

const registerPayment = asyncHandler(async (req, res) => {
  // Register Payment
});


export {
    getRoomPrice,
    registerPayment
}