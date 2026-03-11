"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

const commands: Record<string, string> = {
  help: `Available commands:
  help      - Show this help message
  about     - Display information about me
  skills    - List all my skills
  contact   - Show contact information
  projects  - List my projects
  clear     - Clear the terminal
  coffee    - Refill XP bar ☕`,
  about: `Vaibhav Ghoshi - Web Developer & DSA Enthusiast
Tech Stack: C++, JavaScript, HTML, CSS, Node.js, React, Tailwind
Passion: Building innovative web applications and solving DSA problems
Tagline: engineered for engineering 👨‍🔧
Fun Fact: Daily DSA practice keeps the bugs away 🐛`,
  skills: `🟢 Expert: C++, JavaScript, HTML5, CSS3
🟡 Advanced: Node.js, React, Tailwind CSS, Bootstrap
🟠 Intermediate: MongoDB, Supabase, EJS, Git`,
  contact: `📧 Email: vaibhav7290119@gmail.com
🐙 GitHub: github.com/Classyvaibhav06
💼 LinkedIn: linkedin.com/in/vaibhav-ghoshi
📷 Instagram: @vaibhav.ghoshi
📝 Medium: @vaibhavghoshi
🎥 YouTube: @code_jaibabba`,
  projects: `Featured Projects:
1. Flying Modi Game - Trending game recreation (⭐ 2)
2. DSA with C++ - Daily DSA practice repo (⭐ 2)
3. Notification Popup - Modern UI component (⭐ 1)
4. Git Project Tools - Developer utilities (⭐ 1)
5. Web Development Projects - ST2, ST3 (⭐ 1 each)
Total: 18 repositories on GitHub`,
};

interface TerminalLine {
  type: "output" | "command";
  text: string;
  className?: string;
}

export default function Terminal() {
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const now = new Date();
    setLines([
      {
        type: "output",
        text: `Last login: ${now.toString().split(" ").slice(0, 5).join(" ")} on ttys001`,
        className: "text-green-400 mb-1",
      },
      { type: "output", text: "Welcome to Vaibhav OS v10.4.2", className: "text-[#2EB9DF] font-bold mt-2" },
      {
        type: "output",
        text: "Type 'help' to see available system commands.",
        className: "text-neutral-400 mb-4 italic",
      },
    ]);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const rawCmd = input.trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    const newLines: TerminalLine[] = [
      ...lines,
      { type: "command", text: rawCmd },
    ];

    if (cmd === "clear") {
      setLines([]);
    } else if (cmd === "coffee") {
      newLines.push({
        type: "output",
        text: "☕ Refilling XP bar...",
        className: "text-[#ffbd2e] italic",
      });
      setLines(newLines);
    } else if (commands[cmd]) {
      newLines.push({
        type: "output",
        text: commands[cmd],
        className: "text-neutral-300 mb-4 whitespace-pre-line leading-relaxed",
      });
      setLines(newLines);
    } else {
      newLines.push({
        type: "output",
        text: `zsh: command not found: ${cmd}. Type 'help' for available commands.`,
        className: "text-[#ff5f56] mb-4",
      });
      setLines(newLines);
    }

    setInput("");
  };

  if (!visible) return null;

  return (
    <div
      className="terminal fixed bottom-4 right-4 w-full sm:w-[380px] max-w-[calc(100vw-2rem)] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-40 mx-4 sm:mx-0 overflow-hidden border border-neutral-700/50"
      style={{
        background: "rgba(15, 15, 15, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Mac Window Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-neutral-700/50"
        style={{ background: "rgba(30, 30, 30, 0.5)" }}
      >
        <div className="flex items-center gap-2 group/lights cursor-pointer">
          <div
            onClick={() => setVisible(false)}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex justify-center items-center text-black/60 font-black text-[10px] sm:hover:text-black"
          >
            <span className="opacity-0 group-hover/lights:opacity-100 transition-opacity">
              ×
            </span>
          </div>
          <div
            onClick={() => setMinimized(!minimized)}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex justify-center items-center text-black/60 font-black text-[10px] sm:hover:text-black"
          >
            <span className="opacity-0 group-hover/lights:opacity-100 transition-opacity">
              −
            </span>
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex justify-center items-center text-black/60 font-black text-[10px] sm:hover:text-black">
            <span className="opacity-0 group-hover/lights:opacity-100 transition-opacity">
              +
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-80">
          <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs font-mono text-neutral-300 tracking-wider">
            vaibhav@macbook-pro:~
          </span>
        </div>

        <button
          onClick={() => setMinimized(!minimized)}
          className="text-neutral-500 hover:text-yellow-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Terminal Output */}
      {!minimized && (
        <>
          <div
            ref={contentRef}
            className="p-4 h-48 sm:h-56 overflow-y-auto font-mono text-xs sm:text-[13px] leading-relaxed scroll-smooth"
            style={{ boxShadow: "inset 0 10px 20px rgba(0,0,0,0.2)" }}
          >
            {lines.map((line, i) =>
              line.type === "command" ? (
                <div key={i} className="mb-2 flex gap-2">
                  <span className="text-[#27c93f] font-mono font-bold">➜</span>
                  <span className="text-[#2EB9DF] font-mono font-bold">~</span>
                  <span className="text-white">{line.text}</span>
                </div>
              ) : (
                <div key={i} className={line.className || ""}>
                  {line.text}
                </div>
              )
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 flex items-center gap-2 bg-black/40 border-t border-neutral-800/50">
            <span className="text-[#27c93f] font-mono font-bold">➜</span>
            <span className="text-[#2EB9DF] font-mono font-bold">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleCommand}
              className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-[14px] ml-1 placeholder-neutral-700"
              placeholder="enter command..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
