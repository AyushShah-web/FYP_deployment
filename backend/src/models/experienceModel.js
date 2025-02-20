import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    client: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Experience = mongoose.model("Experience", experienceSchema);
