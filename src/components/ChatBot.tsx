"use client";

import { useState } from "react";

export default function ChatBot() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {showTooltip && (
        <div
          className="absolute right-0 bottom-full mb-3 rounded bg-[#c1bab2] px-4 py-2 whitespace-nowrap text-[#1A1A1A] shadow-lg"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          Chat with us
          <div
            className="absolute right-5 -bottom-1 h-2 w-2 rotate-45 bg-[#c1bab2]"
            aria-hidden="true"
          />
        </div>
      )}

      <button
        type="button"
        aria-label="Chat with us"
        className="chat-pulse flex items-center justify-center rounded-full bg-[#67bc6a] transition-transform duration-300 hover:scale-105"
        style={{ width: "52px", height: "52px" }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
}
