// src/components/ChatWidget.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatWidget.css";

const ChatWidget = ({ backendUrl }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: "user", text: input }]);
    setInput("");

    try {
      const res = await axios.post(`${backendUrl}/ask`, { message: input });
      setMessages(prev => [...prev, { type: "bot", text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { type: "bot", text: "Error from backend" }]);
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.type}`}>{msg.text}</div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;
