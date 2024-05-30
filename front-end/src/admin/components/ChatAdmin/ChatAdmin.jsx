import React, { useState } from "react";
import { List, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./ChatAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UserChatItem from "./UserChatItem";
import { chatsData } from "./ChatsData";
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatAdmin = () => {
  const [messageList, setMessageList] = useState();
  const userListData = [
    { key: "1", name: "User 1", messages: ["Hello from User 1!"], avatar: "https://cdn-icons-gif.flaticon.com/7305/7305845.gif" },
    { key: "2", name: "User 2", messages: ["Hi there! How are you?"], avatar: "https://cdn-icons-gif.flaticon.com/7305/7305845.gif" },
    {
      key: "3",
      name: "User 3",
      messages: ["Hey User 3!", "Nice to meet you!"],
      avatar: "https://cdn-icons-gif.flaticon.com/7305/7305845.gif"
    },
    {
      key: "4",
      name: "User 4",
      messages: ["Hey User 4!", "Nice to meet you!"],
      avatar: "https://cdn-icons-gif.flaticon.com/7305/7305845.gif"
    },
  ];

  // State for managing current user and search value
  const [currentUser, setCurrentUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Function to handle user click
  const handleUserClick = (record) => {
    setCurrentUser(record);
  };

  // Filter user list based on search value
  const filteredUserList = userListData.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

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
                className="user-item"
                onClick={() => handleUserClick(item)}
              >
                <UserChatItem
                  avatar={item.avatar}
                  name={item.name}
                  message={item.messages}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="chat-boxAd">
        <div className="chat-header">
          {currentUser ? <UserChatItem
            avatar={currentUser.avatar}
            name={currentUser.name}
          /> : "Select a user to chat"}
        </div>
        <ScrollToBottom className="chat-body">
          <div className="messages-wrapper">
            {chatsData.map((message, index) => {
              return <div className={`message-bot__container ${message.senderId !== 8 ? 'user-message' : 'admin-message'}`}>
                <div className="user-message__avatar">
                  {(message.senderId !== 8 && (!chatsData[index + 1] || chatsData[index + 1].senderId !== message.senderId)) &&
                    <img src="https://cdn-icons-gif.flaticon.com/7305/7305845.gif" alt="" />
                  }
                </div>
                <div className="message-bot">
                  sender {message.senderId}:  {message.content}
                </div>
              </div>
            })}
          </div>
        </ScrollToBottom>
        <div className="chat-footer">
          <input type="text" placeholder="Nhập tin nhắn..." />
          <button>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;
