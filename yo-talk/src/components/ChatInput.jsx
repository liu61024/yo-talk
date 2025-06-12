import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatInput({ onSend, messages }) {
  const [input, setInput] = useState(""); //控制輸入的訊息
  const messagesEndRef = useRef(null); //捲到底

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input); // 呼叫外層傳送
    setInput(""); // 清空
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="d-flex flex-column p-3 chat-input-wrapper"
      style={{ height: "100%" }}
    >
      <div className="chat-messages">
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
              <ReactMarkdown>
                {typeof msg.content === "object" && msg.content !== null
                  ? msg.content.text
                  : msg.content}
              </ReactMarkdown>
            </div>
            <div ref={messagesEndRef} />
          </div> //Gemini API處理訊息格式不一致
        ))}
      </div>
      <form onSubmit={handleSubmit} className="d-flex  p-3 border-top">
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
