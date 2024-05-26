import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./ChatBubble.css"; // Import file CSS

class ChatBubble extends Component {
  state = {
    showChatBox: false,
  };

  toggleChatBox = () => {
    this.setState((prevState) => ({
      showChatBox: !prevState.showChatBox,
    }));
  };

  render() {
    return (
      <div className="chat-container">
        <button className="chat-button" onClick={this.toggleChatBox}>
          <div className="iconchat">
            <FontAwesomeIcon icon={faMessage} />
          </div>
          <h4>Chat</h4>
        </button>
        {this.state.showChatBox && (
          <div className="chat-box">
            <div className="chat-box-header">
              <span style={{ padding: 10 }}>Tôi có thể giúp gì cho bạn</span>
              <button className="close-button" onClick={this.toggleChatBox}>
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    backgroundColor: "#0E4949",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                />
              </button>
            </div>
            <div className="chat-box-body">
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
  }
}

export default ChatBubble;
