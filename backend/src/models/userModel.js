import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["tenant", "admin", "landlord"],
      default: "tenant",
    },
    googleId: {
      type: String,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      type: this.type,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 8,
    }
  );
};

export const User = mongoose.model("User", userSchema);
