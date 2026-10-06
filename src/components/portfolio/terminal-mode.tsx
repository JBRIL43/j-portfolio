"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// ── Types ──
type VimMode = "normal" | "insert" | "visual" | "command";

type Command = {
  input: string;
  output: React.ReactNode;
  isError?: boolean;
};

// ── Command outputs (Manga Style) ──
const helpText = (
  <div className="space-y-2 text-xs">
    <div className="inline-block border-2 border-[#111] bg-[#111] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">
      Portfolio Shell v2.0 — Vim Mode
    </div>
    <p className="text-[11px] text-[#666] leading-relaxed">
      Press <kbd className="border border-[#111] bg-white px-1 py-0.5 font-mono text-[10px] text-[#111] font-bold shadow-[1px_1px_0_0_#111]">i</kbd> for INSERT mode.
      Press <kbd className="border border-[#111] bg-white px-1 py-0.5 font-mono text-[10px] text-[#111] font-bold shadow-[1px_1px_0_0_#111]">Esc</kbd> for NORMAL mode.
    </p>
    <div className="grid grid-cols-[85px_1fr] gap-x-2 gap-y-1 font-mono text-[11px] pt-1">
      <span className="font-bold text-[#059669]">help</span>
      <span className="text-[#333]">Show this manual</span>
      <span className="font-bold text-[#059669]">about</span>
      <span className="text-[#333]">Who is Jibril?</span>
      <span className="font-bold text-[#059669]">skills</span>
      <span className="text-[#333]">Technical stack</span>
      <span className="font-bold text-[#059669]">projects</span>
      <span className="text-[#333]">Featured work</span>
      <span className="font-bold text-[#059669]">contact</span>
      <span className="text-[#333]">Get in touch</span>
      <span className="font-bold text-[#059669]">clear</span>
      <span className="text-[#333]">Clear screen</span>
      <span className="font-bold text-[#059669]">neofetch</span>
      <span className="text-[#333]">System overview</span>
      <span className="font-bold text-[#059669]">whoami</span>
      <span className="text-[#333]">Current user</span>
      <span className="font-bold text-[#059669]">date</span>
      <span className="text-[#333]">Current timestamp</span>
    </div>
    <div className="mt-2 border-t border-[#ddd] pt-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#777] mb-1">Vim Keys (Normal Mode):</p>
      <div className="grid grid-cols-[50px_1fr] gap-x-2 gap-y-0.5 font-mono text-[10px] text-[#555]">
        <span className="font-bold text-[#111]">i / a</span>
        <span>Enter INSERT mode</span>
        <span className="font-bold text-[#111]">j / k</span>
        <span>Scroll history down / up</span>
        <span className="font-bold text-[#111]">gg / G</span>
        <span>Jump to top / bottom</span>
        <span className="font-bold text-[#111]">u</span>
        <span>Undo command</span>
        <span className="font-bold text-[#111]">:</span>
        <span>Command mode (:q, :help)</span>
      </div>
    </div>
  </div>
);

const aboutText = (
  <div className="space-y-1.5 text-xs">
    <p className="text-[#111] font-semibold">
      <span className="font-bold text-[#059669]">Jibril Nuredin</span> — Full-Stack Developer
    </p>
    <p className="text-[#444] leading-relaxed">
      Information Systems student at Hawassa University. Building web products, mobile applications, and community platforms with a focus on AI Engineering.
    </p>
    <p className="text-[10px] text-[#777] font-mono">
      Stack: React · Next.js · Node.js · Flutter · Figma · AI Tooling
    </p>
  </div>
);

const skillsText = (
  <div className="space-y-1.5 text-xs">
    <p className="font-bold text-[#111]">Technical Stack & Tools:</p>
    <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-[#333]">
      {[
        "React / Next.js",
        "TypeScript",
        "Node.js / Express",
        "Flutter / Dart",
        "MongoDB / SQL",
        "Tailwind CSS",
        "Figma / Canva",
        "AI Engineering",
      ].map((skill) => (
        <span key={skill}>• {skill}</span>
      ))}
    </div>
  </div>
);

const projectsText = (
  <div className="space-y-1.5 text-xs">
    <p className="font-bold text-[#111]">Featured Projects:</p>
    <ul className="space-y-1 font-mono text-[11px]">
      <li className="text-[#059669] font-bold">→ PCIC Management System</li>
      <li className="text-[#666] pl-3">Peak Craft OS (pcic.tech)</li>
      <li className="text-[#059669] font-bold">→ HU Student Debt System</li>
      <li className="text-[#666] pl-3">Cost-sharing platform (Flutter + Web)</li>
      <li className="text-[#059669] font-bold">→ LibraryHub</li>
      <li className="text-[#666] pl-3">Static 32-book bookstore</li>
    </ul>
  </div>
);

const contactText = (
  <div className="space-y-1.5 text-xs">
    <p className="font-bold text-[#111]">Get in touch:</p>
    <div className="grid grid-cols-[60px_1fr] gap-x-2 font-mono text-[11px]">
      <span className="text-[#777]">Email:</span>
      <span className="text-[#059669] font-bold">jibirnur32@gmail.com</span>
      <span className="text-[#777]">GitHub:</span>
      <span className="text-[#059669] font-bold">github.com/JBRIL43</span>
      <span className="text-[#777]">LinkedIn:</span>
      <span className="text-[#059669] font-bold">linkedin.com/in/jibril-nuredin</span>
    </div>
  </div>
);

const neofetch = (
  <div className="font-mono text-xs leading-relaxed text-[#333]">
    <div className="flex gap-3 items-center">
      <div className="w-14 h-14 shrink-0 border-2 border-[#111] bg-[#fafaf8] p-1 flex items-center justify-center font-bold text-xl text-[#111] shadow-[2px_2px_0_0_#111]">
        J.
      </div>
      <div>
        <p className="text-[#111] font-bold">Jibril Nuredin</p>
        <p className="text-[#999]">───────────────────</p>
        <p><span className="text-[#059669] font-bold">OS:</span> Manga Portfolio OS</p>
        <p><span className="text-[#059669] font-bold">Role:</span> Full-Stack Developer</p>
        <p><span className="text-[#059669] font-bold">Engine:</span> Next.js + Tailwind</p>
        <p><span className="text-[#059669] font-bold">Status:</span> Open for Opportunities</p>
      </div>
    </div>
  </div>
);

const manText = (cmd: string) => (
  <div className="space-y-1 font-mono text-xs text-[#333]">
    <p className="text-[#111] font-bold">{cmd.toUpperCase()}(1) — Manual</p>
    <p className="text-[#999]">────────────────────────────</p>
    <p><span className="text-[#059669] font-bold">COMMAND:</span> {cmd}</p>
    <p><span className="text-[#059669] font-bold">USAGE:</span> $ {cmd}</p>
    <p className="text-[#666]">Type &apos;help&apos; for all available commands.</p>
  </div>
);

// ── Line number gutter ──
function LineNumbers({ count, cursorLine }: { count: number; cursorLine: number }) {
  return (
    <div className="select-none pr-2.5 text-right font-mono text-[11px] text-[#999] shrink-0 border-r-2 border-[#111] mr-2.5 bg-[#fafaf8] py-2">
      {Array.from({ length: Math.max(count, 8) }, (_, i) => (
        <div
          key={i}
          className={cn(
            "leading-[1.6]",
            i === cursorLine ? "font-bold text-[#111]" : "text-[#aaa]"
          )}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

// ── Main Component ──
export function TerminalMode() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [vimMode, setVimMode] = useState<VimMode>("insert");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([
    { input: "welcome", output: "Welcome to Jibril's Manga Terminal & AI Assistant." },
    { input: "help", output: helpText },
  ]);
  const [commandLine, setCommandLine] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [pendingG, setPendingG] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // ── Mode label ──
  const modeLabel = useMemo(() => {
    switch (vimMode) {
      case "normal":
        return { text: "NORMAL", color: "bg-[#111] text-white" };
      case "insert":
        return { text: "INSERT", color: "bg-[#059669] text-white" };
      case "visual":
        return { text: "VISUAL", color: "bg-[#3b82f6] text-white" };
      case "command":
        return { text: "COMMAND", color: "bg-[#8b5cf6] text-white" };
    }
  }, [vimMode]);

  // ── Available commands ──
  const commands = useMemo(
    () => ({
      help: () => helpText,
      about: () => aboutText,
      skills: () => skillsText,
      projects: () => projectsText,
      contact: () => contactText,
      neofetch: () => neofetch,
      whoami: () => <span className="font-mono text-xs text-[#111]">visitor@jibril-portfolio</span>,
      date: () => <span className="font-mono text-xs text-[#333]">{new Date().toLocaleString()}</span>,
      uptime: () => <span className="font-mono text-xs text-[#333]">Always building & shipping</span>,
      echo: (args: string) => <span className="font-mono text-xs text-[#333]">{args}</span>,
      pwd: () => <span className="font-mono text-xs text-[#333]">/home/visitor/portfolio</span>,
      ls: () => (
        <div className="flex flex-wrap gap-x-4 font-mono text-xs">
          <span className="font-bold text-[#059669]">about/</span>
          <span className="font-bold text-[#059669]">projects/</span>
          <span className="font-bold text-[#059669]">skills/</span>
          <span className="font-bold text-[#059669]">awards/</span>
          <span className="font-bold text-[#059669]">contact/</span>
          <span className="text-[#666]">README.md</span>
        </div>
      ),
      cat: (args: string) => {
        if (args.includes("README")) {
          return <span className="font-mono text-xs text-[#444]"># Jibril Nuredin Portfolio<br/>Full-Stack Developer transitioning to AI Engineering.</span>;
        }
        return <span className="font-mono text-xs text-red-500">cat: {args}: No such file</span>;
      },
      man: (args: string) => manText(args || "help"),
      clear: () => null,
      exit: () => {
        setTimeout(() => setIsOpen(false), 200);
        return <span className="font-mono text-xs text-[#777]">Closing terminal...</span>;
      },
    }),
    []
  );

  // ── Execute command ──
  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      const parts = trimmed.split(/\s+/);
      const base = parts[0].toLowerCase();
      const args = parts.slice(1).join(" ");

      if (base === "clear") {
        setHistory([]);
        return;
      }

      if (base === "u") {
        setHistory((prev) => prev.slice(0, -1));
        setStatusMessage("Undo");
        return;
      }

      let output: React.ReactNode = null;
      let isError = false;

      if (base === "help") {
        output = helpText;
      } else if (base === "man") {
        output = manText(args || "help");
      } else if (base in commands) {
        output = commands[base as keyof typeof commands](args);
      } else {
        output = (
          <span className="font-mono text-xs text-red-600">
            command not found: {trimmed}. Type &apos;help&apos; for list.
          </span>
        );
        isError = true;
      }

      setHistory((prev) => [...prev, { input: trimmed, output, isError }]);
    },
    [commands]
  );

  // ── Vim command executor ──
  const executeVimCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) {
        setVimMode("insert");
        setCommandLine("");
        return;
      }

      if (trimmed === "q" || trimmed === "q!" || trimmed === "wq" || trimmed === "exit") {
        setIsOpen(false);
        setCommandLine("");
        setVimMode("insert");
        return;
      }

      if (trimmed === "help") {
        executeCommand("help");
        setCommandLine("");
        setVimMode("insert");
        return;
      }

      executeCommand(trimmed);
      setCommandLine("");
      setVimMode("insert");
    },
    [executeCommand]
  );

  // ── Keyboard handler ──
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
        if (!isInput) {
          e.preventDefault();
          setIsOpen((p) => !p);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setVimMode("normal");
        setCommandLine("");
        setStatusMessage("");
        inputRef.current?.focus();
        return;
      }

      if (vimMode === "normal") {
        if (e.key === "i" || e.key === "a") {
          e.preventDefault();
          setVimMode("insert");
          setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }
        if (e.key === ":") {
          e.preventDefault();
          setVimMode("command");
          setCommandLine(":");
          setTimeout(() => commandInputRef.current?.focus(), 0);
          return;
        }
        if (e.key === "u") {
          e.preventDefault();
          setHistory((prev) => prev.slice(0, -1));
          setStatusMessage("Undo");
          return;
        }
        if (e.key === "g") {
          if (pendingG) {
            e.preventDefault();
            if (terminalRef.current) terminalRef.current.scrollTop = 0;
            setPendingG(false);
          } else {
            setPendingG(true);
          }
          return;
        }
        if (e.key === "G") {
          e.preventDefault();
          if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          return;
        }
        if (e.key === "q") {
          e.preventDefault();
          setIsOpen(false);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, vimMode, pendingG]);

  // ── Auto-scroll & focus ──
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (vimMode === "command") {
          commandInputRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 50);
    }
  }, [isOpen, vimMode]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      {/* ── Chatbot-style Launcher in Bottom-Right ── */}
      <AnimatePresence>
        {!isOpen && pathname !== "/story" && pathname !== "/desktop" && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-4 sm:bottom-5 sm:right-5 z-50 flex items-center gap-2 border-[2.5px] border-[#111] bg-[#fafaf8] px-3.5 py-2.5 rounded-full shadow-[4px_4px_0_0_#111] text-xs font-bold uppercase tracking-wider text-[#111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            title="Open Terminal (or press `)"
          >
            <div className="flex items-center justify-center size-6 rounded-full border-2 border-[#111] bg-[#111] text-white">
              <TerminalIcon className="size-3.5" />
            </div>
            <span>Terminal</span>
            <kbd className="hidden sm:inline-block border border-[#111] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#555] rounded">
              `
            </kbd>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Floating Manga Terminal Widget in Bottom-Right ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col w-[92vw] sm:w-[460px] md:w-[500px] h-[580px] max-h-[85vh] rounded-xl border-[2.5px] border-[#111] bg-[#fafaf8] shadow-[6px_6px_0_0_#111] overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between border-b-2 border-[#111] bg-white px-3.5 py-2.5 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="inline-block border-2 border-[#111] bg-[#111] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  TERMINAL // BOT
                </span>
                <span
                  className={cn(
                    "border border-[#111] px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider",
                    modeLabel.color
                  )}
                >
                  {modeLabel.text}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-6 border-2 border-[#111] bg-[#fafaf8] hover:bg-black/5 flex items-center justify-center transition-colors"
                  title="Minimize"
                >
                  <Minus className="size-3 text-[#111]" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-6 border-2 border-[#111] bg-[#ff5f57] hover:bg-[#ff4040] flex items-center justify-center transition-colors"
                  title="Close"
                >
                  <X className="size-3 text-[#111]" />
                </button>
              </div>
            </div>

            {/* ── Terminal Content Area ── */}
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-3 font-mono flex"
            >
              <LineNumbers count={history.length + 2} cursorLine={history.length} />

              <div className="flex-1 min-w-0 py-1">
                {/* History */}
                {history.map((cmd, i) => (
                  <div key={i} className="mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-bold text-[#059669]">visitor</span>
                      <span className="text-[#888]">❯</span>
                      <span className="font-bold text-[#111]">{cmd.input}</span>
                    </div>
                    {cmd.output && (
                      <div className="mt-1 pl-4 text-xs text-[#333]">
                        {cmd.output}
                      </div>
                    )}
                  </div>
                ))}

                {/* Input prompt line (INSERT) */}
                {vimMode === "insert" && (
                  <div className="flex items-center gap-1.5 text-xs pt-0.5">
                    <span className="font-bold text-[#059669]">visitor</span>
                    <span className="text-[#888]">❯</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && input.trim()) {
                          executeCommand(input);
                          setInput("");
                        }
                        if (e.key === "Tab") {
                          e.preventDefault();
                          const match = Object.keys(commands).find((c) =>
                            c.startsWith(input.toLowerCase())
                          );
                          if (match) setInput(match);
                        }
                      }}
                      className="flex-1 bg-transparent text-xs text-[#111] font-mono outline-none caret-[#059669]"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="Type 'help' or command..."
                      autoFocus
                    />
                  </div>
                )}

                {/* Normal mode line */}
                {vimMode === "normal" && (
                  <div className="flex items-center gap-1.5 text-xs pt-0.5">
                    <span className="font-bold text-[#059669]">visitor</span>
                    <span className="text-[#888]">❯</span>
                    <span className="inline-block size-2 bg-[#111]" />
                    <span className="text-[11px] text-[#888] font-mono">(Normal mode - press &apos;i&apos; to type)</span>
                  </div>
                )}

                <div ref={historyEndRef} />
              </div>
            </div>

            {/* ── Command Mode Bar (: mode) ── */}
            {vimMode === "command" && (
              <div className="border-t-2 border-[#111] bg-[#fafaf8] px-3 py-1.5 shrink-0 flex items-center gap-1.5 font-mono text-xs">
                <span className="font-bold text-[#111]">:</span>
                <input
                  ref={commandInputRef}
                  type="text"
                  value={commandLine}
                  onChange={(e) => setCommandLine(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      executeVimCommand(commandLine.replace(/^:/, ""));
                    }
                    if (e.key === "Escape") {
                      setVimMode("insert");
                      setCommandLine("");
                    }
                  }}
                  className="flex-1 bg-transparent text-xs text-[#111] font-mono outline-none"
                  autoFocus
                />
              </div>
            )}

            {/* ── Manga Status Line ── */}
            <div className="flex items-center justify-between border-t-2 border-[#111] bg-[#fafaf8] px-3 py-1 shrink-0 font-mono text-[10px] text-[#666] select-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#111]">JIBRIL_SHELL</span>
                <span>|</span>
                <span>{history.length} entries</span>
              </div>
              <div className="flex items-center gap-2">
                {statusMessage && <span className="font-bold text-[#059669]">{statusMessage}</span>}
                <span className="text-[#999]">` to toggle</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
