import dotenv from "dotenv";
import { User } from "../models/userModel.js";
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

console.log(adminEmail);


async function insertAdmin() {
  const adminExists = await User.findOne({ email: adminEmail });

  if (adminExists) {
    return console.log("Admin already exist.");
  }

  await User.create({
    email: adminEmail,
    password: adminPassword,
    name:"admin",
    type:"admin"
  });

  console.log("Admin created successfully.");
}

export { insertAdmin };
