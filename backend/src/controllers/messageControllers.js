import mongoose from "mongoose";
import { Message } from "../models/messageModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Normal function
const registerMessage = asyncHandler(async (req, res) => {
  // Register the message of the users
  const { message, receiver } = req.body;
  const { _id } = req.user;

  if (!message && !receiver && !_id) {
    throw new ApiError(400, "All fields are required");
  }

  const messagedb = await Message.create({
    sender: _id,
    receiver,
    message,
    messageId: [_id, receiver].sort().join(""),
  });

  if (!messagedb) {
    throw new ApiError(400, "Something went wrong while registering message");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, messagedb, "Suscessfully registered message"));
});

const getChatMessages = asyncHandler(async (req, res) => {
  // Get the message between user
  const { sender, receiver } = req.query;
  console.log("36", sender, receiver);

  const userId = req.user._id;

  if (!sender || !receiver) {
    throw new ApiError(400, "Both the fields are required");
  }

  const messageId = [sender, receiver].sort().join("");

  const messages = await Message.find({ messageId }).sort({ createdAt: 1 });

  if (!messages) {
    throw new ApiError(400, "No any messages found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Suscessfully fetched message"));
});

const saveMessageFromSockets = async ({
  sender,
  receiver,
  message,
  imageUrl,
}) => {
  try {
    if (!sender || !receiver ) {
      throw new ApiError(400, "All fields are reqeuired");
    }

    const messageDb = await Message.create({
      sender,
      receiver,
      message,
      image: imageUrl,
      messageId: [sender, receiver].sort().join(""),
    });

    if (!messageDb) {
      throw new ApiError(400, "Something went wrong");
    }

    return messageDb;
  } catch (error) {
    throw new ApiError(
      400,
      `Something went wrong while registering messages from sockets. ${error}`
    );
  }
};

// Lanlord functions
const getUniquePersons = asyncHandler(async (req, res) => {
  const id = req.user?._id; // Ensure userId is defined

  console.log("getUniquePersons", id);

  if (!id) {
    throw new ApiError(400, "User ID is required");
  }

  try {
    const users = await Message.aggregate([
      {
        $match: {
          $or: [
            { receiver: new mongoose.Types.ObjectId(id) },
            { sender: new mongoose.Types.ObjectId(id) },
          ],
        },
      }, // Ensure ObjectId type
      { $sort: { createdAt: -1 } }, // ✅ Corrected `$sort`
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", new mongoose.Types.ObjectId(id)] },
              then: "$receiver",
              else: "$sender",
            },
          },
          latestMessage: { $first: "$message" },
          latestMessageId: { $first: "$_id" },
          sender: { $first: "$sender" },
          receiver: { $first: "$receiver" },
          status: { $first: "$status" },
          image: { $first: "$image" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          userName: "$userInfo.name",
          latestMessage: 1,
          latestMessageId: 1,
          status: 1,
          image: 1,
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!users || users.length === 0) {
      throw new ApiError(404, "No messages found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, users, "All users fetched"));
  } catch (error) {
    console.error("Error fetching unique persons:", error);
    res.status(500).json({ error: error.message });
  }
});

const uploadChatImage = asyncHandler(async (req, res) => {
  const image = req.file.path;

  if (!image) {
    throw new ApiError(400, "Image not found");
  }

  const imageUrl = await uploadOnCloudinary(image, "rooms");

  if (!imageUrl) {
    throw new ApiError(400, "Error occured while uploading image");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, imageUrl.url, "Suscessfully uploaded image"));
});

export {
  registerMessage,
  getChatMessages,
  saveMessageFromSockets,
  getUniquePersons,
  uploadChatImage,
};
