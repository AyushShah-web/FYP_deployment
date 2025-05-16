import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import {server,io} from "./SocketIO/server.js"
import express from "express";
import path, { resolve } from "path"; //new

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const _dirname = path.resolve(); //new

app.use(express.static(path.join(_dirname, "/roomify/dist"))); // Serve static files

app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "roomify", "dist", "index.html"));
});


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
 
