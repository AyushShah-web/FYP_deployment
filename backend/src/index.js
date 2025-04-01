import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import {server,io} from "./SocketIO/server.js"

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

// Mongodb Connected
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`App is listening on ${port}`);
    });
    server.on("error", (error) => {
      console.log(`Express connection error ${error} `);
    });
  })  
  .catch((error) => {
    console.log("Mongo db connection failed", error);
  });
