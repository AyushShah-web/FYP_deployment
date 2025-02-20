import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  paymentMedium: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);


