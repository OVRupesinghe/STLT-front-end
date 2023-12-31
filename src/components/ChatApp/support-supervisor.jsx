class SupportSupervisorUtility {
  constructor(serverUrl) {
    this.serverUrl = `${serverUrl}?role=supervisor`;
    this.websocket = null;
    this.init();
  }

  init() {
    this.websocket = new WebSocket(this.serverUrl);
    this.websocket.onopen = this.handleOpen.bind(this);
    this.websocket.onmessage = this.handleMessage.bind(this);
    this.websocket.onclose = this.handleClose.bind(this);
  }

  handleOpen() {
    console.log("Connected as a supervisor.");
  }

  handleMessage(event) {
    console.log("Received raw message:", event);
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
    return message;
  }

  handleClose() {
    console.log("Disconnected as a supervisor.");
  }

  handleSend(plainTextMessage) {
    if (this.websocket.readyState === WebSocket.OPEN) {
      const message = {
        type: "MESSAGE",
        chatRoomId: this.chatRoomId, // You need to set chatRoomId
        message: plainTextMessage,
      };
      this.websocket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket connection is not open. Message not sent.");
    }
  }
}

export default SupportSupervisorUtility;
