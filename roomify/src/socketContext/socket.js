import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SummaryApi, { backendDomain } from "../api/api";
import showToast from "../components/ShowToast";
import axios from "axios";
import { useSelector } from "react-redux";

const socket = io(backendDomain, { withCredentials: true });

export const useChatSocket = () => {
  const [messages, setMessages] = useState([]);
  const [uniquePersons, setUniquePersons] = useState([]);
  const userData = useSelector((state) => state.user.userData);

  const joinRoom = (sender, receiver) => {
    socket.emit("joinRoom", { sender, receiver });
  };

  // Fetching all the unique persons list

  const fetchUsers = async () => {
    try {
      const response = await axios.get(SummaryApi.getUniquePersons.url, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUniquePersons(response.data?.data || []);
        console.log("Unique persons", response.data.data);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error loading users");
    }
  };

  useEffect(() => {
    console.log("Entered here");
    fetchUsers();
    const handleNewMessage = (newMsg) => {
      setUniquePersons((prevPersons) => {
        // Check if the sender is already in the list
        const isSenderExist = prevPersons.some(
          (p) => p.userId === newMsg.sender
        );
        const isReceiverExist = prevPersons.some(
          (p) => p.userId === newMsg.receiver
        );

        // If sender is not in the list, add them
        if (!isSenderExist && newMsg.sender !== userData._id) {
          return [
            ...prevPersons,
            {
              userId: newMsg.sender,
              userName: newMsg.senderName,
              latestMessage: newMsg.message,
            },
          ];
        }

        // If receiver is not in the list, add them
        if (!isReceiverExist && newMsg.receiver !== userData._id) {
          return [
            ...prevPersons,
            {
              userId: newMsg.receiver,
              userName: newMsg.receiverName,
              latestMessage: newMsg.message,
            },
          ];
        }

        // If sender/receiver exists, update the latest message
        return prevPersons.map((person) =>
          person.userId === newMsg.sender || person.userId === newMsg.receiver
            ? { ...person, latestMessage: newMsg.message }
            : person
        );
      });
    };
    socket.on("updateUniquePersons", handleNewMessage);
  }, []);

  //   All the messages section
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log("Received Message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const getAllMessages = async (sender, receiver) => {
    console.log("sender,receiver", sender, receiver);

    try {
      const response = await axios.get(
        `${SummaryApi.getAllMessages.url}?sender=${sender}&receiver=${receiver}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMessages(response.data?.data || []);
      }
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to load messages");
    }
  };

  const sendMessage = (message,imageUrl, sender, receiver) => {
    socket.emit("sendMessage", { message,imageUrl,sender, receiver });
  };

  return { messages, sendMessage, joinRoom, getAllMessages, uniquePersons };
};
