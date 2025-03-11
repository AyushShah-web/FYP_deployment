import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { insertAdmin } from "../utils/registerAdmin.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MongoDb connected on: ${connectionInstance.connection.host}`);
    insertAdmin()
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB