import React from "react";

export default function ChatHistory({
  conversations,
  onSelect,
  onNew,
  currentId,
  onRename,
}) {
  const sortedConversations = Object.entries(conversations).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <div className="p-3 border-end h-100 overflow-auto">
      <h5 className="mb-3 text-center text-primary fw-bold">聊了什麼話題</h5>
      <button className="btn btn-primary w-100 mb-3" onClick={onNew}>
        新話題 <i class="bi bi-plus-lg"></i>
      </button>
      {sortedConversations.map(([id]) => (
        <div
          key={id}
          onClick={() => onSelect(id)}
          className={`p-2 cursor-pointer mb-1 rounded ${
            id === currentId ? "bg-secondary text-white" : "bg-light"
          } d-flex justify-content-between align-items-center`}
        >
          <span className="text-truncate">{id}</span>
          <button
            className="btn btn-sm btn-outline-primary ms-2"
            onClick={(e) => {
              e.stopPropagation(); // 不讓點擊影響選取
              const newName = prompt("輸入新的對話名稱：", id);
              if (newName && newName !== id) {
                onRename(id, newName);
              }
            }}
          >
            編輯
          </button>
        </div>
      ))}
    </div>
  );
}
