import mongoose, { Schema, Types } from "mongoose";

const rentedRoomSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      default: "khalti",
    },
    status: {
      type: String,
      enum: ["pending", "complelted", "refunded"],
      default: "pending",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref:"User",
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RentedRoom = mongoose.model("RentedRoom", rentedRoomSchema);
