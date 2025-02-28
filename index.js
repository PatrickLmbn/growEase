// Connect to the ESP32 WebSocket server via Ngrok
const socket = new WebSocket("wss://7498-112-202-244-66.ngrok-free.app"); // Use your Ngrok public URL

// Function to send the 'pump_on' command
function turnOnPump() {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send("pump_on");
    document.getElementById("status").innerText = "Status: Pump command sent!";
  } else {
    console.error("WebSocket is not open. Current state:", socket.readyState);
    document.getElementById("status").innerText =
      "Status: WebSocket not connected.";
  }
}

// Listen for messages from ESP32 and display status
socket.onmessage = (event) => {
  console.log("Message from ESP32:", event.data);
  document.getElementById("status").innerText = "Status: " + event.data;
};

// Handle WebSocket connection errors
socket.onerror = (error) => {
  console.error("WebSocket Error: ", error);
  document.getElementById("status").innerText = "Status: Connection error.";
};

// Handle WebSocket open event (connection established)
socket.onopen = () => {
  console.log("WebSocket connection established!");
  document.getElementById("status").innerText = "Status: Connected to ESP32.";
};

// Handle WebSocket close event (connection closed)
socket.onclose = () => {
  console.log("WebSocket connection closed.");
  document.getElementById("status").innerText = "Status: Connection closed.";
};
