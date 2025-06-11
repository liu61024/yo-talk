import React, { useState } from "react";

export default function ChatInput({ onSend, messages }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="d-flex flex-column p-3" style={{ height: "100%" }}>
      <div className="flex-grow-1 overflow-auto mb-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === "user" ? "text-end user-msg" : "text-start ai-msg"
            }`}
          >
            <div
              className={`p-2 rounded ${
                msg.role === "user"
                  ? "bg-light  text-primary "
                  : "bg-primary text-white"
              }`}
            >
              {typeof msg.content === "object" && msg.content !== null
                ? msg.content.text
                : msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入訊息..."
        />
        <button className="btn btn-primary text-nowrap">送出</button>
      </form>
    </div>
  );
}
