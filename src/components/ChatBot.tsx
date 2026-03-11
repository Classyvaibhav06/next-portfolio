"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Message {
  text: string;
  isUser: boolean;
  isSystem?: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello. I am the digital construct of Vaibhav Ghoshi. You may query me regarding my creator's skills, experience, or project portfolio.",
      isUser: false,
      isSystem: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { text, isUser: true }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, isUser: false }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Sorry, I received an empty response. Try again.", isUser: false },
        ]);
      }
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Failed to connect to the backend. Make sure the RAG server is running!",
          isUser: false,
        },
      ]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="fixed right-6 bottom-6 z-[10000] flex flex-col items-end"
      style={{ maxHeight: "calc(100vh - 2rem)" }}
    >
      {/* Chat Window */}
      {isOpen && (
        <div
          className="mb-4 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.2)] transition-all duration-300"
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "calc(100vh - 7rem)",
            minHeight: "420px",
            background: "rgba(5, 5, 5, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid #facc15",
            borderRadius: "4px",
            boxShadow: "inset 0 0 20px rgba(250,204,21,0.05)",
          }}
        >
          {/* Header */}
          <div
            className="p-3 flex justify-between items-center border-b border-yellow-400"
            style={{
              background:
                "repeating-linear-gradient(45deg, #111, #111 10px, #1a1a1a 10px, #1a1a1a 20px)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-sm overflow-hidden bg-yellow-400">
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.3) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.3) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.3) 76%, transparent 77%, transparent)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 drop-shadow-[1px_1px_0_rgba(255,255,255,0.3)]"
                >
                  <rect width="12" height="10" x="6" y="7" rx="2" />
                  <path d="M10 11h.01" />
                  <path d="M14 11h.01" />
                  <path d="M8 7v-3l-2-2" />
                  <path d="M16 7v-3l2-2" />
                  <path d="M6 13C4 13 2 15 2 17c0 2 2 4 4 4s4-2 4-4" />
                  <path d="M18 13c2 0 4 2 4 4s-2 4-4 4-4-2-4-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold font-mono text-yellow-400 tracking-wider text-xs uppercase"
                  style={{ textShadow: "0 0 5px rgba(250,204,21,0.5)" }}
                >
                  vAIBHAV.sys
                </span>
                <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-yellow-400 hover:text-white transition-colors p-1 bg-yellow-400/10 hover:bg-yellow-400/30 rounded-sm focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="p-4 overflow-y-auto flex flex-col gap-4 scroll-smooth text-sm font-mono relative"
            style={{
              flex: "1 1 0",
              minHeight: "180px",
              maxHeight: "calc(100vh - 14rem)",
              backgroundImage:
                "radial-gradient(circle at center, rgba(30,30,30,0) 0%, rgba(0,0,0,0.8) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                background:
                  "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)",
              }}
            />

            {messages.map((msg, i) =>
              msg.isSystem ? (
                <div
                  key={i}
                  className="p-3 rounded-none self-start max-w-[85%] border-l-2 border-yellow-400 shadow-[2px_2px_0px_rgba(250,204,21,0.2)]"
                  style={{ background: "rgba(250, 204, 21, 0.05)", color: "#facc15" }}
                >
                  <div className="text-[10px] text-yellow-600 mb-1 border-b border-yellow-600/30 inline-block pb-0.5">
                    SYS_INIT :: RAG_MODEL_LOADED
                  </div>
                  <div>{msg.text}</div>
                </div>
              ) : (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[85%] ${
                    msg.isUser ? "self-end rounded-tr-none" : "self-start rounded-tl-none"
                  } whitespace-pre-wrap text-sm`}
                  style={{
                    background: msg.isUser ? "rgba(250, 204, 21, 0.85)" : "rgba(38, 38, 38, 0.7)",
                    color: msg.isUser ? "#000" : "#facc15",
                  }}
                >
                  {msg.text}
                </div>
              )
            )}

            {isLoading && (
              <div className="bg-neutral-800 text-yellow-400 p-3 rounded-lg rounded-tl-none self-start max-w-[85%] animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2" style={{ borderTop: "1px solid rgba(250, 204, 21, 0.4)", background: "#0a0a0a" }}>
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-400 text-xs font-mono font-bold animate-pulse">
                &gt;
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-yellow-400 pl-6 pr-3 py-2 rounded-sm font-mono text-sm focus:outline-none placeholder-yellow-400/30"
                placeholder="INPUT QUERY..."
                style={{
                  background: "rgba(250, 204, 21, 0.05)",
                  border: "1px solid rgba(250, 204, 21, 0.3)",
                }}
              />
            </div>
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-sm font-bold uppercase tracking-wider text-xs border border-yellow-400 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all flex items-center justify-center"
              style={{ color: "#facc15", background: "transparent" }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center group relative cursor-pointer outline-none transform hover:scale-105 transition-all duration-300"
        style={{
          background: "#0a0a0a",
          border: "2px solid #facc15",
          boxShadow:
            "0 0 20px rgba(250, 204, 21, 0.3), inset 0 0 15px rgba(250, 204, 21, 0.3)",
        }}
      >
        <div className="absolute inset-2 border-[1.5px] border-dashed border-yellow-400/60 rounded-full animate-[spin_8s_linear_infinite] group-hover:border-yellow-400 group-hover:animate-[spin_4s_linear_infinite]" />
        <div className="w-10 h-10 rounded-full bg-yellow-400 shadow-[0_0_15px_#facc15] animate-pulse-glow flex items-center justify-center relative z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="12" height="10" x="6" y="7" rx="2" />
            <path d="M10 11h.01" />
            <path d="M14 11h.01" />
            <path d="M8 7v-3l-2-2" />
            <path d="M16 7v-3l2-2" />
            <path d="M6 13C4 13 2 15 2 17c0 2 2 4 4 4s4-2 4-4" />
            <path d="M18 13c2 0 4 2 4 4s-2 4-4 4-4-2-4-4" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-50 pointer-events-none">
          <div
            className="w-full h-[2px] bg-yellow-400 absolute top-0 left-0 shadow-[0_0_10px_#facc15] animate-[slide-up_2s_ease-in-out_infinite_alternate]"
            style={{ willChange: "transform" }}
          />
        </div>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-[1.5px] border-neutral-900" />
          </span>
        )}
      </button>
    </div>
  );
}
