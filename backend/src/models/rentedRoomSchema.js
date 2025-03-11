import mongoose, { Schema } from "mongoose";

const rentedRoomSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "room",
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
  },
  {
    timestamps: true,
  }
);

export const RentedRoom = mongoose.model("RentedRoom",rentedRoomSchema)