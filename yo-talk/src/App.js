import React, { useState, useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import { sendMessageToAI } from "./api/chatAPI";
import { loadConversations, saveConversations } from "./utils/localStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function App() {
  const [conversations, setConversations] = useState({});
  const [currentId, setCurrentId] = useState("");

  const handleRenameChat = (oldId, newId) => {
    if (!newId || newId === oldId || conversations[newId]) return;
    const data = conversations[oldId];
    const updated = { ...conversations };
    delete updated[oldId];
    updated[newId] = data;
    setConversations(updated);
    setCurrentId(newId);
    saveConversations(updated);
  };

  useEffect(() => {
    const stored = loadConversations();
    setConversations(stored);
    setCurrentId(Object.keys(stored)[0] || "");
  }, []);

  const handleNewChat = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ".");
    const newId = `${dateStr} 聊天 ${Object.keys(conversations).length + 1}`;
    const updated = {
      ...conversations,
      [newId]: {
        messages: [],
        createdAt: Date.now(),
      },
    };
    setConversations(updated);
    setCurrentId(newId);
    saveConversations(updated);
  };

  const handleSelectChat = (id) => {
    setCurrentId(id);
  };

  const handleSend = async (text) => {
    const history = conversations[currentId]?.messages || [];
    const userMessage = { role: "user", content: text };
    const aiText = await sendMessageToAI(
      text,
      history.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }))
    );
    const aiMessage = { role: "model", content: aiText };
    const updated = {
      ...conversations,
      [currentId]: {
        ...conversations[currentId],
        messages: [...history, userMessage, aiMessage],
      },
    };
    setConversations(updated);
    saveConversations(updated);
  };

  const toggleSidebar = () => {
    const offcanvasElement = document.getElementById("sidebarOffcanvas");
    const bsOffcanvas =
      window.bootstrap.Offcanvas.getInstance(offcanvasElement) ||
      new window.bootstrap.Offcanvas(offcanvasElement);
    bsOffcanvas.toggle();
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* 桌面版 sidebar 固定寬度 */}
      <div
        className="d-none d-md-block flex-shrink-0 border-end"
        style={{ width: "25%" }}
      >
        <ChatHistory
          conversations={conversations}
          currentId={currentId}
          onSelect={handleSelectChat}
          onNew={handleNewChat}
          onRename={handleRenameChat}
        />
      </div>

      {/* 手機版 sidebar - Bootstrap Offcanvas */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">
            聊了什麼話題
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <ChatHistory
            conversations={conversations}
            currentId={currentId}
            onSelect={handleSelectChat}
            onNew={handleNewChat}
            onRename={handleRenameChat}
          />
        </div>
      </div>

      {/* 主畫面 */}
      <div className="flex-grow-1 d-flex flex-column" style={{ width: "100%" }}>
        <ChatHeader current={currentId} toggleSidebar={toggleSidebar} />
        <ChatInput
          messages={conversations[currentId]?.messages || []}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}

export default App;
