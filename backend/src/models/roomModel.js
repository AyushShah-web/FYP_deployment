import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["building", "room", "flat", "cabin"],
    },

    location: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    address: {
      type: {
        type: String,
        enum: ["Point"],
        required: true, // Ensure it's always provided
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    price: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Ensure MongoDB uses a geospatial index for location-based queries
roomSchema.index({ address: "2dsphere" });

export const Room = mongoose.model("Room", roomSchema);
