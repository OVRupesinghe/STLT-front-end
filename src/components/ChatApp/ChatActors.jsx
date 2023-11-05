import React, { Component } from 'react';
import SupportClient from './SupportClient'; // Update the path to your SupportClient file
import SupportSupervisor from './SupportSupervisor'; // Update the path to your SupportSupervisor file


class ClientChat extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [],
        messageInput: '',
      };
      this.client = new SupportClient('ws://localhost:5001');
    }
  
    componentDidMount() {
      this.client.websocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      };
    }
  
    handleSend = () => {
      this.client.handleSend(this.state.messageInput);
      this.setState({ messageInput: '' });
    };
  
    render() {
      return (
        <div>
          <h2>Client Chat</h2>
          <div>
            {this.state.messages.map((message, index) => (
              <div key={index}>{message.message}</div>
            ))}
          </div>
          <input
            type="text"
            value={this.state.messageInput}
            onChange={(e) => this.setState({ messageInput: e.target.value })}
          />
          <button onClick={this.handleSend}>Send</button>
        </div>
      );
    }
  }
  
  class SupervisorChat extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [],
        messageInput: '',
      };
      this.supervisor = new SupportSupervisor('ws://localhost:5001');
    }
  
    componentDidMount() {
      this.supervisor.websocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      };
    }
  
    handleSend = () => {
      this.supervisor.handleSend(this.state.messageInput);
      this.setState({ messageInput: '' });
    };
  
    render() {
      return (
        <div>
          <h2>Supervisor Chat</h2>
          <div>
            {this.state.messages.map((message, index) => (
              <div key={index}>{message.message}</div>
            ))}
          </div>
          <input
            type="text"
            value={this.state.messageInput}
            onChange={(e) => this.setState({ messageInput: e.target.value })}
          />
          <button onClick={this.handleSend}>Send</button>
        </div>
      );
    }
  }