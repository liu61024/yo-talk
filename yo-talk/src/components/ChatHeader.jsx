import React from "react";

export default function ChatHeader({ current }) {
  return (
    <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-secondary">
      {/* 選單：*/}
      <button
        className="btn d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-controls="sidebarOffcanvas"
      >
        <i className="bi bi-list fs-4"></i>
      </button>

      {/* 標題 */}
      <h5 className="m-0 text-truncate flex-grow-1 text-center fw-medium">
        想跟你聊 {current}
      </h5>
    </div>
  );
}
