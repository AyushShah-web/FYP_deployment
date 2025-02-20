import React, { useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRocketchat } from "react-icons/fa";
import { io } from "socket.io-client";
import { backendDomain } from "../../api/api";

const ChatPopup = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  const showChatDiv = () => {
    setShowChat(true);
  };
  const hideChatDiv = () => {
    setShowChat(false);
  };

  const socket = useMemo(()=> io(backendDomain),[]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected",socket.id);
    });

    socket.on("welcome",(s)=>{
      console.log(s)
    })

    return ()=>{
      socket.disconnect();
    }
  

  }, []);

  return showChat ? (
    <div
      className={`${
        showChat ? "fixed" : "hidden"
      }  right-[2rem] bottom-[4rem] border-2 p-2 rounded-lg`}
    >
      <div className="relative">
        <h3 className="text-center font-bold">Chat with the landlord</h3>
        <button
          onClick={hideChatDiv}
          className="absolute right-0 top-1 text-xl font-bold"
        >
          <RxCross2 />
        </button>
      </div>
      <div className="chat-section relative">
        <div className="chats w-[18rem] h-[20rem]"></div>
        <div className="absolute bottom-0 flex w-full gap-2">
          <input
            type="text"
            className="border-2 outline-none flex-1 px-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="px-1 bg-primary rounded-lg">send</button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${
        showChat ? "hidden " : "fixed"
      } text-2xl right-[2rem] bottom-[4rem] border-2 p-2 rounded-lg`}
    >
      <button onClick={showChatDiv}>
        <FaRocketchat />
      </button>
    </div>
  );
};

export default ChatPopup;
