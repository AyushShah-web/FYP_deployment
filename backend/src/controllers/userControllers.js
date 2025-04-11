import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const token = await user.generateToken();
    user.token = token;
    await user.save({ validateBeforeSave: false });
    return token;
  } catch (error) {
    throw new ApiError(400, "Something went wrong after generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get the user details from the user
  console.log("Entered here");

  const { name, email, password, userType } = req.body;
  if (!(name && email && password, userType)) {
    throw new ApiError(400, "All the fields are required while logging in.");
  }

  const userExisted = await User.findOne({ email: email });

  if (userExisted) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    type: userType,
  });

  if (!user) {
    throw new ApiError(400, "Error occured while creating user");
  }

  await generateToken(user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Created Suscessfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!(email && password)) {
    throw new ApiError(400, "Both the fields are necessary.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid details while logging up");
  }

  console.log("test");

  const passwordCorrect = await user.checkPassword(password);
  if (!passwordCorrect) {
    throw new ApiError(400, "Incorrect user credentials.");
  }

  const token = await generateToken(user._id);

  const loggedInUser = await User.findOne(user._id).select("-password");

  // Set user data in cookie

  console.log("Login user function entered", token, loggedInUser);

  const options = {
    httpOnly: true,
    secure: true,
  };

  // cookie("token", req.user.token, options)

  return res
    .status(200) // Use 200 to avoid Axios issues with 302
    .cookie("token", token, options)
    .json(new ApiResponse(user, "Logged In suscessfully "));
});

const logoutUser = asyncHandler(async (req, res) => {
  console.log("Entered the logout ");

  const id = req.user._id;
  await User.findByIdAndUpdate(
    id,
    {
      $unset: {
        token: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(400)
    .clearCookie("token", options)
    .json(new ApiResponse(400, {}, "User Logged Out"));
});

const getUserData = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Fetched user data suscessfully"));
});

const checkUserInDb = asyncHandler(async (req, res) => {
  const { userEmail } = req.params;

  if (!userEmail) {
    throw new ApiError(400, "User email is required");
  }

  const user = await User.findOne({ email: userEmail });

  return res.status(200).json(new ApiResponse(200, user, "User data fetched"));
});

const uploadProfileImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let imageLocalPath = req.file?.path;

  
  
  const image = await uploadOnCloudinary(imageLocalPath, "rooms");
  console.log(image);
  if (!image) {
    console.log(400, "Error occured while uploading image");
    throw new ApiError(400, "Something went wrong while uploading image");
  }

  const user = await User.findByIdAndUpdate(id,{
    image: image.url,
  });

  if (!user) {
    await deleteFromCloudinary(image.url);
    throw new ApiError(400, "Error occured while uploading in database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Image uploaded suscessfllly"));
});

export {
  registerUser,
  loginUser,
  getUserData,
  generateToken,
  logoutUser,
  checkUserInDb,
  uploadProfileImage
};
