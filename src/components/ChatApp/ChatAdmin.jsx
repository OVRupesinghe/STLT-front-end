import React, { Component } from "react";
import SupportSupervisorUtility from "./support-supervisor";

class SupervisorChatApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      chatMessages: [],
    };

    this.supportSupervisor = new SupportSupervisorUtility("ws://localhost:50001");

    // Handle received messages
    this.supportSupervisor.websocket.onmessage = (event) => {
      // Update the chatMessages array with the received message
      const message = JSON.parse(event.data); // based on the message status change the status
      this.setState((prevState) => ({
        chatMessages: [...prevState.chatMessages, message],
      }));
    };

  }

  // Handle sending messages
  sendMessage = () => {
    const message = this.state.message;
    if (message.trim() !== "") {
      this.supportSupervisor.handleSend(message);
      // Clear the input field
      this.setState({ message: "" });
    }
  };

  handleInputChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="chat-container">
          <div className="chat-messages">
            <ul>
              {this.state.chatMessages.map((msg, index) => (
                <li key={index}>
                  {msg.from === "supervisor" ? (
                    <div className="supervisor-message">{msg.message}</div>
                  ) : (
                    <div className="client-message">{msg.message}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={this.state.message}
              onChange={this.handleInputChange}
              placeholder="Type your message..."
            />
            <button onClick={this.sendMessage}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SupervisorChatApp;
