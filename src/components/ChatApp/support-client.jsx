class SupportClientUtility {
  constructor(serverUrl) {
    this.serverUrl = `${serverUrl}?role=client`;
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
    console.log("Connected as a client.");
  }

  handleMessage(event) {
    console.log("Received raw message:", event);
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
    return message;
  }

  handleClose() {
    console.log("Disconnected as a client.");
  }

  handleSend(plainTextMessage) {
    console.log("Sending message:", plainTextMessage);
    if (this.websocket.readyState === WebSocket.OPEN) {
      const message = {
        type: "MESSAGE",
        chatRoomId: this.chatRoomId, // You need to set chatRoomId
        message: plainTextMessage,
      };
      console.log("Sending message:", JSON.stringify(message));
      this.websocket.send(JSON.stringify(message));
      
    } else {
      console.error("WebSocket connection is not open. Message not sent.");
    }
  }
}

export default SupportClientUtility;
