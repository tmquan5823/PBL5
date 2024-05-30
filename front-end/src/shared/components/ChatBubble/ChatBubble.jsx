import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMessage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ChatBubble.css"; // Import file CSS
import { ChatsData, chatsData } from "../../../admin/components/ChatAdmin/ChatsData";
const ChatBubble = () => {
  const [showChatBox, setShowChatBox] = useState(false);

  const toggleChatBox = () => {
    setShowChatBox((prevShowChatBox) => !prevShowChatBox);
  };

  return (
    <div className="chat-container">
      <button className="chat-button" onClick={toggleChatBox}>
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
          <div className="chat-box-body">
            {chatsData.map((message, index) =>
              <div className={`message-container ${message.senderId !== 8 ? 'user-message' : 'admin-message'}`}>
                <div className="message bot">
                  <span>{message.content}</span>
                </div>
              </div>
            )}
            <div className="message bot">
              <span>Xin chào, tôi có thể giúp gì cho bạn?</span>
            </div>
            {/* Bạn có thể thêm các phần tử chat khác ở đây */}
          </div>
          <div className="chat-box-footer">
            <input type="text" placeholder="Nhập tin nhắn..." />
            <button>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
