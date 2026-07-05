"use client";

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Command = {
  input: string;
  output: React.ReactNode;
};

const helpText = (
  <div className="space-y-1 text-sm">
    <p className="text-muted-foreground">Available commands:</p>
    <div className="grid grid-cols-[100px_1fr] gap-x-4 font-mono text-xs">
      <span className="text-[oklch(0.62_0.2_255)]">help</span>
      <span>Show this help message</span>
      <span className="text-[oklch(0.62_0.2_255)]">about</span>
      <span>Who is Jibril?</span>
      <span className="text-[oklch(0.62_0.2_255)]">skills</span>
      <span>Technical stack</span>
      <span className="text-[oklch(0.62_0.2_255)]">projects</span>
      <span>Featured projects</span>
      <span className="text-[oklch(0.62_0.2_255)]">contact</span>
      <span>Get in touch</span>
      <span className="text-[oklch(0.62_0.2_255)]">clear</span>
      <span>Clear terminal</span>
      <span className="text-[oklch(0.62_0.2_255)]">neofetch</span>
      <span>System info (fake)</span>
      <span className="text-[oklch(0.62_0.2_255)]">matrix</span>
      <span>Enter the matrix</span>
      <span className="text-[oklch(0.62_0.2_255)]">whoami</span>
      <span>Current user</span>
      <span className="text-[oklch(0.62_0.2_255)]">date</span>
      <span>Current date/time</span>
      <span className="text-[oklch(0.62_0.2_255)]">uptime</span>
      <span>Portfolio uptime</span>
    </div>
  </div>
);

const aboutText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground">
      <span className="text-[oklch(0.62_0.2_255)]">Jibril Nuredin</span> — Information Systems student at Hawassa University
    </p>
    <p className="text-muted-foreground">
      A multi-disciplinary builder focusing on web development, community building, and digital experiences.
      Currently leading Public Relations at Peak Craft while crafting digital products that make an impact.
    </p>
    <p className="text-xs text-muted-foreground/70 mt-2">
      Keywords: React · Next.js · Node.js · Figma · Community Building · Content Creation
    </p>
  </div>
);

const skillsText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground mb-3">Technical Stack:</p>
    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
      {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Figma", "Canva", "Linux", "AI/ML"].map(skill => (
        <span key={skill} className="text-muted-foreground">• {skill}</span>
      ))}
    </div>
    <p className="text-xs text-muted-foreground/70 mt-2">
      Also: Prompt Engineering, Social Media Management, Content Creation, Community Leadership
    </p>
  </div>
);

const projectsText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground mb-2">Featured Projects:</p>
    <ul className="space-y-1 font-mono text-xs">
      <li className="text-[oklch(0.62_0.2_255)]">→ Peak Craft Website</li>
      <li className="text-muted-foreground">  Modern web platform for tech community</li>
      <li className="text-[oklch(0.62_0.2_255)]">→ Portfolio v3</li>
      <li className="text-muted-foreground">  Interactive portfolio (you're here!)</li>
      <li className="text-[oklch(0.62_0.2_255)]">→ More coming soon...</li>
    </ul>
    <p className="text-xs text-muted-foreground/70 mt-2">
      Visit /projects for the full list
    </p>
  </div>
);

const contactText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground">Get in touch:</p>
    <div className="grid grid-cols-[80px_1fr] gap-x-2 font-mono text-xs">
      <span className="text-muted-foreground">Email:</span>
      <span className="text-[oklch(0.62_0.2_255)]">jibrilnuredin@gmail.com</span>
      <span className="text-muted-foreground">GitHub:</span>
      <span className="text-[oklch(0.62_0.2_255)]">github.com/jibrilnuredin</span>
      <span className="text-muted-foreground">LinkedIn:</span>
      <span className="text-[oklch(0.62_0.2_255)]">linkedin.com/in/jibrilnuredin</span>
    </div>
    <p className="text-xs text-muted-foreground/70 mt-2">
      Or visit /contact for a form
    </p>
  </div>
);

const neofetch = (
  <div className="font-mono text-xs leading-relaxed">
    <div className="flex gap-4">
      <div className="w-20 shrink-0">
        <div className="size-16 rounded-lg bg-gradient-to-br from-[oklch(0.62_0.2_255)] to-[oklch(0.78_0.16_220)]" />
      </div>
      <div>
        <p className="text-foreground font-bold">Jibril Nuredin</p>
        <p className="text-muted-foreground">-------------------------</p>
        <p><span className="text-[oklch(0.62_0.2_255)]">OS:</span> Portfolio v3 (Next.js)</p>
        <p><span className="text-[oklch(0.62_0.2_255)]">Host:</span> Jibril's Workshop</p>
        <p><span className="text-[oklch(0.62_0.2_255)]">Kernel:</span> React 19 + TypeScript</p>
        <p><span className="text-[oklch(0.62_0.2_255)]">Uptime:</span> Always building</p>
        <p><span className="text-[oklch(0.62_0.2_255)]">Shell:</span> Creative Developer</p>
        <p><span className="text-[oklch(0.62_0.2_255)]">Theme:</span> Dark Futuristic</p>
        <p><span className="text-[oklch(0.62_0.2_255)]">Status:</span> Available for work</p>
      </div>
    </div>
  </div>
);

const matrixQuote = (
  <div className="font-mono text-xs text-[oklch(0.62_0.2_255)]">
    <p>Wake up, Neo...</p>
    <p>The Matrix has you...</p>
    <p className="mt-2 text-muted-foreground">Follow the white rabbit.</p>
    <p className="text-[10px] text-muted-foreground/50 mt-4">
      (Just kidding. But you found the easter egg! 🎉)
    </p>
  </div>
);

export function TerminalMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([
    { input: "welcome", output: "Welcome to Jibril's Portfolio Terminal v1.0.0" },
    { input: "help", output: helpText },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Listen for backtick key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Prevent input field from capturing it
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          setIsOpen(prev => !prev);
        }
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown as any);
    return () => window.removeEventListener("keydown", handleKeyDown as any);
  }, []);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = helpText;
        break;
      case "about":
        output = aboutText;
        break;
      case "skills":
        output = skillsText;
        break;
      case "projects":
        output = projectsText;
        break;
      case "contact":
        output = contactText;
        break;
      case "clear":
        setHistory([]);
        return;
      case "neofetch":
        output = neofetch;
        break;
      case "matrix":
        output = matrixQuote;
        break;
      case "whoami":
        output = <span className="font-mono text-xs">visitor@portfolio</span>;
        break;
      case "date":
        output = <span className="font-mono text-xs">{new Date().toString()}</span>;
        break;
      case "uptime":
        output = <span className="font-mono text-xs">Since: ∞ (Portfolio runs forever)</span>;
        break;
      case "":
        return;
      default:
        output = (
          <span className="text-sm text-red-400">
            Command not found: {trimmed}. Type 'help' for available commands.
          </span>
        );
    }

    setHistory(prev => [...prev, { input: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput("");
    }
  };

  return (
    <>
      {/* Hint in corner when terminal is hidden */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full glass px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <TerminalIcon className="size-3.5" />
            <span className="hidden sm:inline">Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">`</kbd></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 z-50 mx-auto max-w-2xl overflow-hidden rounded-2xl glass-strong shadow-2xl md:inset-auto md:bottom-8 md:left-1/2 md:top-1/4 md:-translate-x-1/2 md:translate-y-0"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-red-500/80" />
                  <span className="size-3 rounded-full bg-yellow-500/80" />
                  <span className="size-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  jibril@portfolio ~ bash
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              className="h-[400px] overflow-y-auto bg-black/40 p-4 font-mono"
            >
              {/* History */}
              {history.map((cmd, i) => (
                <div key={i} className="mb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[oklch(0.62_0.2_255)]">visitor@portfolio</span>
                    <span className="text-muted-foreground">~</span>
                    <span className="text-foreground">{cmd.input}</span>
                  </div>
                  <div className="mt-1 text-muted-foreground">
                    {cmd.output}
                  </div>
                </div>
              ))}

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-[oklch(0.62_0.2_255)]">visitor@portfolio</span>
                <span className="text-muted-foreground">~</span>
                <ChevronRight className="size-3 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                  placeholder="Type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
