import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRocketchat } from "react-icons/fa";
import { io } from "socket.io-client";
import SummaryApi, { backendDomain } from "../../api/api";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatPopup = ({ owner }) => {
  const socket = useMemo(
    () => io(backendDomain, { withCredentials: true }),
    []
  );
  const userData = useSelector((state) => state.user.userData);

  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendingStatus, setSendingStatus] = useState(false);

  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  const toggleChat = () => setShowChat((prev) => !prev);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSendingStatus(true);

    try {
      socket.emit("sendMessage", {
        message,
        sender: userData._id,
        receiver: owner._id,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setSendingStatus(false);
    }
  };

  const getAllMessages = async () => {
    if (userData._id || owner._id) {
      return;
    }
    try {
      const response = await axios.get(
        `${SummaryApi.getAllMessages.url}?sender=${userData._id}&receiver=${owner._id}`,
        { withCredentials: true }
      );
      if (response.data && response.data.data) {
        setMessages(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (showChat) {
      socket.emit("joinRoom", { sender: userData._id, receiver: owner._id });
      getAllMessages();
    }
  }, [showChat, userData._id, owner._id]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [socket]);

  return (
    <>
      {showChat ? (
        <div className="fixed right-8 bottom-16 w-80 bg-white shadow-lg border border-gray-300 rounded-xl p-4 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Chat with {owner.name}
            </h3>
            <button
              onClick={toggleChat}
              className="text-gray-600 hover:text-red-500"
            >
              <RxCross2 size={22} />
            </button>
          </div>

          {/* Messages Section */}
          <div className="h-64 overflow-y-auto p-2 space-y-2">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === userData._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                      msg.sender === userData._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No messages yet.</p>
            )}
            <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
          </div>

          {/* Input Section */}
          <form onSubmit={sendMessage} className="flex items-center gap-2 mt-3">
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={sendingStatus}
            >
              {sendingStatus ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      ) : (
        <div
          className="fixed right-8 bottom-16 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition animate-bounce"
          onClick={toggleChat}
        >
          <FaRocketchat size={24} />
        </div>
      )}
    </>
  );
};

export default ChatPopup;
