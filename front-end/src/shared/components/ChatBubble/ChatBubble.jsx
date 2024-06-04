import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMessage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ChatBubble.css";
import { ChatsData, chatsData } from "../../../admin/components/ChatAdmin/ChatsData";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import ScrollToBottom from 'react-scroll-to-bottom';

var stompClient = null;
const ChatBubble = (props) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [text, setText] = useState("");
  const [activeContact, setActiveContact] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [chatNoti, setChatNoti] = useState();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const connect = async () => {
    try {
      const Stomp = require("stompjs");
      var SockJS = require("sockjs-client");
      SockJS = new SockJS(process.env.REACT_APP_URL + "/ws");
      stompClient = Stomp.over(SockJS);
      await new Promise((resolve, reject) => {
        stompClient.connect({}, resolve, reject);
      });
      onConnected();
    } catch (err) {
      console.log(err)
    }
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + auth.userID + "/queue/messages",
      onMessageReceived
    );
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (newMessage) {
      if (newMessage.recipientId === auth.userID && !showChatBox) {
        setChatNoti(true);
      }
      if (newMessage.recipientId === auth.userID && showChatBox) {
        setChatNoti(false);
      }
      findChatMessage()
    }
  }, [newMessage]);

  useEffect(() => {
    if (stompClient) {
      findChatMessage();
    }
  }, [stompClient]);

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    setNewMessage(notification);
  };

  const findChatMessage = async () => {
    try {
      const resData = await sendRequest(process.env.REACT_APP_URL + `/api/chat/messages/${auth.userID}/${8}`, 'GET', null, null)
      setMessages(resData)
    } catch (err) {
      console.log(err);
    }
  }

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: auth.userID,
        recipientId: 8,
        content: msg,
        timestamp: new Date(),
      };
      try {
        if (stompClient && stompClient.connected) {
          stompClient.send("/app/chat", {}, JSON.stringify(message));
        } else {
          console.log("WebSocket connection is not established yet.");
        }
      } catch (err) {
        console.log(err);
      }

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };

  const toggleChatBox = () => {
    setChatNoti(false);
    setShowChatBox((prevShowChatBox) => !prevShowChatBox);
  };

  return (
    <div className={`chat-container`}>
      <button className={`chat-button ${chatNoti && 'chat-container--noti'}`} onClick={toggleChatBox}>
        <div className="iconchat">
          <FontAwesomeIcon icon={faMessage} />
        </div>
        <h4>Chat</h4>
      </button>
      {showChatBox && (
        <div className="chat-box">
          <div className="chat-box-header">
            <span style={{ padding: 10 }}>Tôi có thể giúp gì cho bạn</span>
            <button className="close-button" onClick={toggleChatBox}>
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
          </div>
          <ScrollToBottom className="chat-box-body">
            {messages ? messages.map((message, index) =>
              <div className={`message-container ${message.senderId !== 8 ? 'user-message' : 'admin-message'}`}>
                <div className="message bot">
                  <span>{message.content}</span>
                </div>
              </div>
            ) : ""}
          </ScrollToBottom>
          <div className="chat-box-footer">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />
            <button
              onClick={() => {
                sendMessage(text);
                setText("");
              }}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
