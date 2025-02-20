import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

// Configuring socket io

// Socket Io connection

// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://192.168.1.79:5173", "*"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("User connected");
//   console.log("Id", socket.id);
//   socket.emit("welcome", `Welcome to the server ${socket.id}`);
//   // console.log(socket);
  

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//   });
// });

// Mongodb Connected
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening on ${port}`);
    });
    app.on("error", (error) => {
      console.log(`Express connection error ${port} `);
    });
  })
  .catch((error) => {
    console.log("Mongo db connection failed", error);
  });
