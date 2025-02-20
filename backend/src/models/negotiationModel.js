import mongoose, { Schema } from "mongoose";

const negotiationSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      required: true,
     ref: "User",
    },
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    price: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    negotiationStatus: {
      type: Boolean,
      default: false,
    },
    counterPrice:{
      type:String,
      required:false,
    }
  },
  { timestamps: true }
);

export const Negotiation = mongoose.model("Negotiation", negotiationSchema);
