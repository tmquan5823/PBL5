import React, { useContext, useEffect, useState } from "react";
import { List, Input, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./ChatAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UserChatItem from "./UserChatItem";
import { chatsData } from "./ChatsData";
import ScrollToBottom from 'react-scroll-to-bottom';
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { messageDateTimeFormat } from "../../../shared/help/DateFormat";

var stompClient = null;
const ChatAdmin = () => {
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [messageHover, setMessageHover] = useState();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const loadContacts = async () => {
    console.log(currentUser)
    try {
      const resData = await sendRequest(process.env.REACT_APP_URL + `/api/chat/chatroom/${auth.userID}`, 'GET', null, null)
      if (resData.state) {
        setContacts(resData.chatRooms);
      }
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
    connect();
    loadContacts();
  }, []);

  useEffect(() => {
    console.log(newMessage)
    if (currentUser && newMessage && newMessage.senderId === currentUser.recipient.id) {
      findChatMessage(currentUser.recipient.id);
    }
  }, [newMessage]);

  useEffect(() => {
    if (currentUser) {
      findChatMessage(currentUser.recipient.id);
    }
  }, [currentUser]);

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + auth.userID + "/queue/messages",
      onMessageReceived
    );
  };

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    setNewMessage(notification);
    loadContacts();
  };

  const findChatMessage = async (recipientId) => {
    try {
      console.log("id: " + recipientId);
      const resData = await sendRequest(process.env.REACT_APP_URL + `/api/chat/messages/${auth.userID}/${recipientId}`, 'GET', null, null)
      if (resData) {
        setMessages(resData);
        loadContacts();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: auth.userID,
        recipientId: currentUser.recipient.id,
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
      loadContacts();
    }
  };

  const handleUserClick = (record) => {
    setCurrentUser(record);
  };

  const filteredUserList = contacts.filter((contact) =>
    (contact.recipient.firstname + " " + contact.recipient.lastname).toLowerCase().includes(searchValue.toLowerCase())
  );

  const mouseEnterMessage = () => {

  }


  const mouseLeaveMessage = () => {

  }

  return (
    <div className="chat-containerAd">
      <div className="user-list">
        {/* Render Ant Design List with search functionality */}
        <Input.Search
          placeholder="Search users"
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ padding: 20, borderBottom: "1px solid #ccc" }}
        />

        <div className="user-list-container">
          <List
            dataSource={filteredUserList}
            renderItem={(item) => (
              <List.Item
                key={item.chatRoom.id}
                className={`user-item 
                ${currentUser && currentUser.recipient.id === item.recipient.id && 'selected-contact'}
                ${item.chatRoom.haveUnreadMessage && 'unread-message'}`}
                onClick={() => handleUserClick(item)}
              >
                <UserChatItem
                  avatar={item.recipient.avatarUrl}
                  name={item.recipient.firstname + " " + item.recipient.lastname}
                  message={item.chatRoom.content}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      {currentUser ? <div className="chat-boxAd">
        <div className="chat-header">
          {currentUser ? <UserChatItem
            avatar={currentUser.recipient.avatarUrl}
            name={currentUser.recipient.firstname + " " + currentUser.recipient.lastname}
          /> : "Select a user to chat"}
        </div>
        <ScrollToBottom className="chat-body">
          <div className="messages-wrapper">
            {messages && messages.map((message, index) => {
              return <div className={`message-bot__container ${message.senderId !== 8 ? 'user-message' : 'admin-message'}`}>
                <div className="user-message__avatar">
                  {(message.senderId !== auth.userID && (!messages[index + 1] || messages[index + 1].senderId !== message.senderId)) &&
                    <img src={currentUser.recipient.avatarUrl} alt="" />
                  }
                </div>
                <div
                  className="message-bot"
                  onMouseEnter={mouseEnterMessage}
                  onMouseLeave={mouseLeaveMessage}
                >
                  {message.content}
                  {/* {true && <div className="message-bot__message-time">{messageDateTimeFormat(message.timestamp)}</div>} */}
                </div>
              </div>
            })}
          </div>
        </ScrollToBottom>
        <div className="chat-footer">
          <input
            type="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendMessage(text);
                setText("");
              }
            }}
            placeholder="Nhập tin nhắn..."
          />
          <button onClick={() => {
            setText("");
            sendMessage(text);
          }}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
        : ""}
    </div>
  );
};

export default ChatAdmin;
