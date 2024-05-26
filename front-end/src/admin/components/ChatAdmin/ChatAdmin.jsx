import React, { useState } from "react";
import { List, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./ChatAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatAdmin = () => {
  // Data for user list
  const userListData = [
    { key: "1", name: "User 1", messages: ["Hello from User 1!"] },
    { key: "2", name: "User 2", messages: ["Hi there! How are you?"] },
    {
      key: "3",
      name: "User 3",
      messages: ["Hey User 3!", "Nice to meet you!"],
    },
    {
      key: "4",
      name: "User 4",
      messages: ["Hey User 4!", "Nice to meet you!"],
    },
    {
      key: "5",
      name: "User 5",
      messages: ["Hey User 5!", "Nice to meet you!"],
    },
    {
      key: "6",
      name: "User 6",
      messages: ["Hey User 6!", "Nice to meet you!"],
    },
    {
      key: "7",
      name: "User 7",
      messages: ["Hey User 7!", "Nice to meet you!"],
    },
    {
      key: "8",
      name: "User 8",
      messages: ["Hey User 8!", "Nice to meet you!"],
    },
    { key: "9", name: "User 9", messages: ["Hello from User 9!"] },
    { key: "10", name: "User 10", messages: ["Hello from User 10!"] },
    { key: "11", name: "User 11", messages: ["Hello from User 11!"] },
    { key: "12", name: "User 12", messages: ["Hello from User 12!"] },
    { key: "13", name: "User 13", messages: ["Hello from User 13!"] },
    { key: "14", name: "User 14", messages: ["Hello from User 14!"] },
    { key: "15", name: "User 15", messages: ["Hello from User 15!"] },
    { key: "16", name: "User 16", messages: ["Hello from User 16!"] },
    { key: "17", name: "User 17", messages: ["Hello from User 17!"] },
    { key: "18", name: "User 18", messages: ["Hello from User 18!"] },
    { key: "19", name: "User 19", messages: ["Hello from User 19!"] },
    { key: "20", name: "User 20", messages: ["Hello from User 20!"] },
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
                {item.name}
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="chat-boxAd">
        <div className="chat-header">
          <span style={{ padding: 10 }}>
            {currentUser ? `${currentUser.name}` : "Select a user to chat"}
          </span>
        </div>
        <div className="chat-body">
          <div className="messages-wrapper">
            {currentUser &&
              currentUser.messages.map((message, index) => (
                <div
                  className="message-bot"
                  style={{ width: `${Math.min((index + 1) * 10, 70)}%` }}
                  key={index}
                >
                  <span>{message}</span>
                </div>
              ))}
          </div>
        </div>
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
