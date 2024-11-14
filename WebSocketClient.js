import WebSocket from "ws";

export default class WebSocketClient {
  constructor(url, reconnectInterval = 3000) {
    this.url = url;
    this.reconnectInterval = reconnectInterval;
    this.socket = null;
    this.isReconnecting = false;
    this.pingInterval = setInterval(() => {
      this.socket.send("ping");
    }, 30 * 1000);

    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.isReconnecting = false; // Stop reconnecting if connection is successful
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.socket.close(); // Close the socket to trigger the reconnect logic
    };

    this.socket.onmessage = (message) => {
      console.log('Received message:', message.data);
    };
  }

  handleReconnect() {
    if (this.isReconnecting) return; // Avoid multiple reconnect attempts
    this.isReconnecting = true;

    console.log(`Attempting to reconnect in ${this.reconnectInterval / 1000} seconds...`);
    
    setTimeout(() => {
      console.log('Reconnecting...');
      this.connect();
    }, this.reconnectInterval);
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      console.error('WebSocket is not open, cannot send data');
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
    clearInterval(this.pingInterval);
  }
}
