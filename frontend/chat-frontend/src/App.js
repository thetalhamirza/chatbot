import './App.css';
import React from "react";
import ChatWidget from "./ChatWidget";

function App() {
  return (
    <div className="App">
      <div style={{ padding: "20px" }}>
      <h2>My AI Chatbot</h2>
      <ChatWidget backendUrl="http://localhost:8000" />
      </div>
    </div>
  );
}

export default App;
