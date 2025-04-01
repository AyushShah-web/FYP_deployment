import { Server } from "socket.io";
import http from "http";
import { app } from "../app.js";
import { saveMessageFromSockets } from "../controllers/messageControllers.js";
import cors from "cors";
import { Message } from "../models/messageModel.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.1.79:5173", "*"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("joinRoom", ({ sender, receiver }) => {
    const roomId = [sender, receiver].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ message, imageUrl,sender, receiver }) => {
    console.log("Entered here");

    const messageDb = await saveMessageFromSockets({
      sender,
      receiver,
      message,
      imageUrl
    });
    console.log("MessageDb", messageDb);

    if (messageDb) {
      const roomId = [sender, receiver].sort().join("_");

      io.to(roomId).emit("receiveMessage", messageDb);

      const msgSender = await Message.findById(messageDb._id).populate("sender","name")

      io.emit("updateUniquePersons", {
        sender,
        receiver,
        message,
        senderName: msgSender.sender.name,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

export { app, io, server };
