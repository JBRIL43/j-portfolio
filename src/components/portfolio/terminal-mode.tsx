"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Terminal as TerminalIcon, Maximize2, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──
type VimMode = "normal" | "insert" | "visual" | "command";

type Command = {
  input: string;
  output: React.ReactNode;
  isError?: boolean;
};

// ── Command outputs (defined once) ──
const helpText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground font-semibold">Portfolio Shell v2.0 — Vim Mode</p>
    <p className="text-xs text-muted-foreground/60 mb-3">
      This terminal emulates Vim.      Press <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px]">i</kbd> to enter INSERT mode.
      Press <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px]">Esc</kbd> to return to NORMAL mode.
    </p>
    <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 font-mono text-xs">
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
      <span>System info</span>
      <span className="text-[oklch(0.62_0.2_255)]">matrix</span>
      <span>Enter the matrix</span>
      <span className="text-[oklch(0.62_0.2_255)]">whoami</span>
      <span>Current user</span>
      <span className="text-[oklch(0.62_0.2_255)]">date</span>
      <span>Current date/time</span>
      <span className="text-[oklch(0.62_0.2_255)]">man</span>
      <span>Manual for a command</span>
    </div>
    <div className="mt-3 border-t border-white/10 pt-3">
      <p className="text-xs font-semibold text-muted-foreground mb-2">Vim Keybindings (Normal Mode):</p>
      <div className="grid grid-cols-[60px_1fr] gap-x-4 gap-y-1 font-mono text-xs">
        <span className="text-amber-400">i</span>
        <span>Enter INSERT mode (type commands)</span>
        <span className="text-amber-400">a</span>
        <span>Enter INSERT mode (after cursor)</span>
        <span className="text-amber-400">o</span>
        <span>Open new line below (INSERT mode)</span>
        <span className="text-amber-400">j / k</span>
        <span>Scroll history down / up</span>
        <span className="text-amber-400">g g</span>
        <span>Jump to top of history</span>
        <span className="text-amber-400">G</span>
        <span>Jump to bottom of history</span>
        <span className="text-amber-400">/</span>
        <span>Search history</span>
        <span className="text-amber-400">u</span>
        <span>Undo last command</span>
        <span className="text-amber-400">:</span>
        <span>Enter command-line mode</span>
      </div>
    </div>
  </div>
);

const aboutText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground">
      <span className="text-[oklch(0.62_0.2_255)] font-semibold">Jibril Nuredin</span>{" "}
      — Information Systems student at Hawassa University
    </p>
    <p className="text-muted-foreground leading-relaxed">
      A multi-disciplinary builder focusing on web development, community
      building, and digital experiences. Currently Looking for an opportunity in my carrer.
    </p>
    <p className="text-xs text-muted-foreground/60 mt-2">
      Keywords: React · Next.js · Node.js · Figma · Community Building · Content
      Creation
    </p>
  </div>
);

const skillsText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground mb-3 font-semibold">Technical Stack:</p>
    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
      {[
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "Figma",
        "Canva",
        "Linux",
        "AI/ML",
      ].map((skill) => (
        <span key={skill} className="text-muted-foreground">
          • {skill}
        </span>
      ))}
    </div>
    <p className="text-xs text-muted-foreground/60 mt-2">
      Also: Prompt Engineering, Social Media Management, Content Creation,
      Community Leadership
    </p>
  </div>
);

const projectsText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground mb-2 font-semibold">Featured Projects:</p>
    <ul className="space-y-1 font-mono text-xs">
      <li className="text-[oklch(0.62_0.2_255)]">→ Peak Craft Website</li>
      <li className="text-muted-foreground">
        {"  "}Modern web platform for tech community
      </li>
      <li className="text-[oklch(0.62_0.2_255)]">→ Portfolio v3</li>
      <li className="text-muted-foreground">
        {"  "}Interactive portfolio (you're here!)
      </li>
      <li className="text-[oklch(0.62_0.2_255)]">→ More coming soon...</li>
    </ul>
    <p className="text-xs text-muted-foreground/60 mt-2">
      Visit /projects for the full list
    </p>
  </div>
);

const contactText = (
  <div className="space-y-2 text-sm">
    <p className="text-foreground font-semibold">Get in touch:</p>
    <div className="grid grid-cols-[80px_1fr] gap-x-2 font-mono text-xs">
      <span className="text-muted-foreground">Email:</span>
      <span className="text-[oklch(0.62_0.2_255)]">
        jibirnur32@gmail.com
      </span>
      <span className="text-muted-foreground">GitHub:</span>
      <span className="text-[oklch(0.62_0.2_255)]">
        github.com/JBRIL43
      </span>
      <span className="text-muted-foreground">LinkedIn:</span>
      <span className="text-[oklch(0.62_0.2_255)]">
        linkedin.com/in/jibril-nuredin
      </span>
    </div>
    <p className="text-xs text-muted-foreground/60 mt-2">
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
        <p className="text-muted-foreground">───────────────────</p>
        <p>
          <span className="text-[oklch(0.62_0.2_255)]">OS:</span> Portfolio v3
          (Next.js)
        </p>
        <p>
          <span className="text-[oklch(0.62_0.2_255)]">Host:</span> Jibril's
          Workshop
        </p>
        <p>
          <span className="text-[oklch(0.62_0.2_255)]">Kernel:</span> React 19 +
          TypeScript
        </p>
        <p>
          <span className="text-[oklch(0.62_0.2_255)]">Uptime:</span> Always
          building
        </p>
        <p>
          <span className="text-[oklch(0.62_0.2_255)]">Shell:</span> Creative
          Developer
        </p>
        <p>
          <span className="text-[oklch(0.62_0.2_255)]">Theme:</span> Dark
          Futuristic
        </p>
        <p>
          <span className="text-[oklch(0.62_0.2_255)]">Status:</span> Available
          for work
        </p>
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

const manText = (cmd: string) => (
  <div className="space-y-1 font-mono text-xs">
    <p className="text-foreground font-bold">{cmd.toUpperCase()}(1) — Portfolio Shell Manual</p>
    <p className="text-muted-foreground">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p><span className="text-[oklch(0.62_0.2_255)]">NAME</span></p>
    <p className="pl-4">{cmd} — portfolio command</p>
    <p><span className="text-[oklch(0.62_0.2_255)]">SYNOPSIS</span></p>
    <p className="pl-4">$ {cmd}</p>
    <p><span className="text-[oklch(0.62_0.2_255)]">DESCRIPTION</span></p>
    <p className="pl-4">Type 'help' for a list of all commands.</p>
  </div>
);

// ── Vim-style line number gutter ──
function LineNumbers({ count, cursorLine }: { count: number; cursorLine: number }) {
  return (
    <div className="select-none pr-3 text-right text-xs text-muted-foreground/30 shrink-0 border-r border-white/5 mr-3">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn(
            "leading-[1.65] transition-colors duration-150",
            i === cursorLine && "text-[oklch(0.62_0.2_255)]"
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
  // ── State ──
  const [isOpen, setIsOpen] = useState(false);
  const [vimMode, setVimMode] = useState<VimMode>("normal");
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [history, setHistory] = useState<Command[]>([
    { input: "welcome", output: "Welcome to Jibril's Portfolio Terminal v2.0 (Vim Mode)" },
    { input: "help", output: helpText },
  ]);
  const [commandLine, setCommandLine] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isMaximized, setIsMaximized] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [pendingG, setPendingG] = useState(false); // for gg
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // ── Parallax mouse tracking ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20, mass: 0.8 };
  const mx = useSpring(mouseX, springConfig);
  const my = useSpring(mouseY, springConfig);
  const rotateX = useTransform(my, [-0.5, 0.5], [1.5, -1.5]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-1.5, 1.5]);
  const glowX = useTransform(mx, [-0.5, 0.5], [-60, 60]);
  const glowY = useTransform(my, [-0.5, 0.5], [-40, 40]);
  const glow2X = useTransform(mx, [-0.5, 0.5], [30, -30]);
  const glow2Y = useTransform(my, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(px);
      mouseY.set(py);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // ── Mode label ──
  const modeLabel = useMemo(() => {
    switch (vimMode) {
      case "normal":
        return { text: "NORMAL", color: "bg-amber-500/90 text-black" };
      case "insert":
        return { text: "INSERT", color: "bg-emerald-500/90 text-black" };
      case "visual":
        return { text: "VISUAL", color: "bg-sky-500/90 text-black" };
      case "command":
        return { text: "COMMAND", color: "bg-purple-500/90 text-white" };
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
      matrix: () => matrixQuote,
      whoami: () => <span className="font-mono text-xs">visitor@portfolio</span>,
      date: () => <span className="font-mono text-xs">{new Date().toString()}</span>,
      uptime: () => <span className="font-mono text-xs">Since: ∞ (Portfolio runs forever)</span>,
      echo: (args: string) => <span className="font-mono text-xs">{args}</span>,
      uname: () => <span className="font-mono text-xs">PortfolioOS 2.0.0 jibril x86_64</span>,
      hostname: () => <span className="font-mono text-xs">portfolio.local</span>,
      pwd: () => <span className="font-mono text-xs">/home/visitor/portfolio</span>,
      ls: () => (
        <div className="flex flex-wrap gap-x-6 font-mono text-xs">
          <span className="text-sky-400">about/</span>
          <span className="text-sky-400">projects/</span>
          <span className="text-sky-400">skills/</span>
          <span className="text-sky-400">contact/</span>
          <span className="text-foreground/70">README.md</span>
          <span className="text-foreground/70">.vimrc</span>
        </div>
      ),
      cat: (args: string) => {
        if (args.includes("README")) {
          return <span className="font-mono text-xs text-muted-foreground"># Welcome to Jibril's Portfolio<br/>This is an interactive portfolio site built with Next.js and Vim.</span>;
        }
        return <span className="font-mono text-xs text-red-400">cat: {args}: No such file or directory</span>;
      },
      man: (args: string) => manText(args || "man"),
      clear: () => null,
      sudo: () => (
        <span className="font-mono text-xs text-red-400">
          Nice try. But you don't have root access here. 🙃
        </span>
      ),
      rm: (args: string) => (
        <span className="font-mono text-xs text-amber-400">
          Permission denied: Can't rm '{args}'. This is a portfolio, not a playground.
        </span>
      ),
      vim: () => (
        <span className="font-mono text-xs text-muted-foreground">
          You're already inside the portfolio terminal (which is Vim-inspired). <br/>
          Type <span className="text-foreground">:help</span> for commands.
        </span>
      ),
      exit: () => {
        setTimeout(() => setIsOpen(false), 300);
        return <span className="font-mono text-xs text-muted-foreground">Closing terminal...</span>;
      },
    }),
    []
  );

  // ── Execute a command string ──
  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      const parts = trimmed.split(/\s+/);
      const base = parts[0].toLowerCase();
      const args = parts.slice(1).join(" ");

      // Clear
      if (base === "clear") {
        setHistory([]);
        return;
      }

      // Undo
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
          <span className="font-mono text-xs text-red-400">
            E492: Not an editor command: {trimmed}
          </span>
        );
        isError = true;
      }

      setHistory((prev) => [...prev, { input: trimmed, output, isError }]);
    },
    [commands]
  );

  // ── Vim command-line handler ──
  const executeVimCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) {
        setVimMode("normal");
        setCommandLine("");
        return;
      }

      // :q, :q! → close
      if (trimmed === "q" || trimmed === "q!") {
        setIsOpen(false);
        setCommandLine("");
        return;
      }

      // :w → save (no-op, just show message)
      if (trimmed === "w") {
        setStatusMessage('"portfolio" written');
        setCommandLine("");
        setVimMode("normal");
        return;
      }

      // :wq → save & quit
      if (trimmed === "wq" || trimmed === "x") {
        setStatusMessage('"portfolio" written');
        setTimeout(() => setIsOpen(false), 200);
        setCommandLine("");
        return;
      }

      // :help → show help
      if (trimmed === "help") {
        executeCommand("help");
        setCommandLine("");
        setVimMode("normal");
        return;
      }

      // :version
      if (trimmed === "version") {
        executeCommand("neofetch");
        setCommandLine("");
        setVimMode("normal");
        return;
      }

      // :!command → run shell command
      if (trimmed.startsWith("!")) {
        const shellCmd = trimmed.slice(1);
        executeCommand(shellCmd);
        setCommandLine("");
        setVimMode("normal");
        return;
      }

      // :set → show settings
      if (trimmed.startsWith("set")) {
        setStatusMessage("all options are set to default (this is a portfolio)");
        setCommandLine("");
        setVimMode("normal");
        return;
      }

      // :noh → clear search highlight
      if (trimmed === "noh" || trimmed === "nohlsearch") {
        setStatusMessage("Search highlights cleared");
        setCommandLine("");
        setVimMode("normal");
        return;
      }

      // Default → try as a regular command
      executeCommand(trimmed);
      setCommandLine("");
      setVimMode("normal");
    },
    [executeCommand]
  );

  // ── Keyboard handler ──
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Always allow Escape
      if (e.key === "Escape") {
        e.preventDefault();
        setVimMode("normal");
        setCommandLine("");
        setIsSearching(false);
        setSearchQuery("");
        setPendingG(false);
        setStatusMessage("");
        inputRef.current?.focus();
        return;
      }

      // ── COMMAND mode ──
      if (vimMode === "command") {
        // Don't handle keys here — the command input captures them
        return;
      }

      // ── INSERT mode ──
      if (vimMode === "insert") {
        // Tab completion for commands
        if (e.key === "Tab") {
          e.preventDefault();
          const completed = Object.keys(commands).find((c) =>
            c.startsWith(input.toLowerCase())
          );
          if (completed) setInput(completed);
          return;
        }
        // Enter submits the command
        if (e.key === "Enter") {
          e.preventDefault();
          if (input.trim()) {
            executeCommand(input);
            setInput("");
          }
          return;
        }
        // Arrow up for history
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setHistory((prev) => {
            const last = prev[prev.length - 1];
            if (last) {
              setInput(last.input);
              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.selectionStart = inputRef.current.selectionEnd = last.input.length;
                }
              }, 0);
            }
            return prev;
          });
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setInput("");
          return;
        }
        // Ctrl+U clears line (like bash/vim insert)
        if (e.key === "u" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          setInput("");
          return;
        }
        // Ctrl+A goes to start, Ctrl+E goes to end
        if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = 0;
          }
          return;
        }
        if (e.key === "e" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          if (inputRef.current) {
            const len = inputRef.current.value.length;
            inputRef.current.selectionStart = inputRef.current.selectionEnd = len;
          }
          return;
        }
        // Backspace
        if (e.key === "Backspace") {
          // handled by input naturally
          return;
        }
        // All other keys handled by the input element
        return;
      }

      // ── NORMAL mode ──
      if (vimMode === "normal") {
        const key = e.key;

        // i → insert mode
        if (key === "i") {
          e.preventDefault();
          setVimMode("insert");
          setStatusMessage("");
          setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }

        // a → insert mode after cursor
        if (key === "a") {
          e.preventDefault();
          setVimMode("insert");
          setStatusMessage("");
          setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }

        // o → open new line below, enter insert
        if (key === "o") {
          e.preventDefault();
          setInput("");
          setVimMode("insert");
          setStatusMessage("");
          setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }

        // A → append at end of line (insert)
        if (key === "A") {
          e.preventDefault();
          setVimMode("insert");
          setStatusMessage("");
          setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }

        // I → insert at beginning
        if (key === "I") {
          e.preventDefault();
          setInput("");
          setVimMode("insert");
          setStatusMessage("");
          setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }

        // : → command mode
        if (key === ":") {
          e.preventDefault();
          setVimMode("command");
          setCommandLine(":");
          setTimeout(() => commandInputRef.current?.focus(), 0);
          return;
        }

        // / → search mode
        if (key === "/") {
          e.preventDefault();
          setIsSearching(true);
          setSearchQuery("/");
          setVimMode("command");
          setTimeout(() => commandInputRef.current?.focus(), 0);
          return;
        }

        // j → scroll down
        if (key === "j") {
          e.preventDefault();
          setScrollOffset((prev) => prev + 1);
          return;
        }

        // k → scroll up
        if (key === "k") {
          e.preventDefault();
          setScrollOffset((prev) => Math.max(0, prev - 1));
          return;
        }

        // h → scroll left (no-op in terminal, just show message)
        if (key === "h") {
          e.preventDefault();
          setStatusMessage("← (can't go left in a terminal)");
          return;
        }

        // l → scroll right (no-op)
        if (key === "l") {
          e.preventDefault();
          setStatusMessage("→ (can't go right in a terminal)");
          return;
        }

        // gg → go to top
        if (key === "g") {
          if (pendingG) {
            e.preventDefault();
            setScrollOffset(0);
            setPendingG(false);
            setStatusMessage("Top of history");
          } else {
            e.preventDefault();
            setPendingG(true);
            setStatusMessage("g");
          }
          return;
        }

        // G → go to bottom
        if (key === "G") {
          e.preventDefault();
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
          setStatusMessage("Bottom of history");
          return;
        }

        // u → undo
        if (key === "u") {
          e.preventDefault();
          setHistory((prev) => prev.slice(0, -1));
          setStatusMessage("Undo");
          return;
        }

        // dd → delete all (clear)
        if (key === "d") {
          if (pendingG) {
            e.preventDefault();
            setHistory([]);
            setPendingG(false);
            setStatusMessage("All history cleared");
          } else {
            e.preventDefault();
            setPendingG(true);
            setStatusMessage("d");
          }
          return;
        }

        // yy → yank (copy last command to status)
        if (key === "y") {
          if (pendingG) {
            e.preventDefault();
            setPendingG(false);
            const last = history[history.length - 1];
            if (last) {
              navigator.clipboard?.writeText(last.input);
              setStatusMessage(`Yanked: ${last.input}`);
            }
          } else {
            e.preventDefault();
            setPendingG(true);
            setStatusMessage("y");
          }
          return;
        }

        // p → paste last yanked (re-execute last command)
        if (key === "p") {
          e.preventDefault();
          const last = history[history.length - 1];
          if (last) {
            executeCommand(last.input);
          }
          return;
        }

        // x → delete character (clear input)
        if (key === "x") {
          e.preventDefault();
          setInput("");
          setStatusMessage("Input cleared");
          return;
        }

        // R → replace mode (like insert but with overwrite feel)
        if (key === "R") {
          e.preventDefault();
          setInput("");
          setVimMode("insert");
          setStatusMessage("-- REPLACE --");
          setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }

        // v → visual mode (for fun, just shows status)
        if (key === "v") {
          e.preventDefault();
          setVimMode("visual");
          setStatusMessage("-- VISUAL -- (press Esc to exit)");
          return;
        }

        // w → "write" (save message)
        if (key === "w") {
          e.preventDefault();
          setStatusMessage('"portfolio" written');
          return;
        }

        // q → "quit" (closes terminal)
        if (key === "q") {
          e.preventDefault();
          setIsOpen(false);
          return;
        }

        // Esc from pending
        if (pendingG) {
          setPendingG(false);
          setStatusMessage("");
        }

        return;
      }

      // ── VISUAL mode ──
      if (vimMode === "visual") {
        const key = e.key;
        // j/k scroll
        if (key === "j") {
          e.preventDefault();
          setScrollOffset((prev) => prev + 1);
          return;
        }
        if (key === "k") {
          e.preventDefault();
          setScrollOffset((prev) => Math.max(0, prev - 1));
          return;
        }
        // y → yank all history
        if (key === "y") {
          e.preventDefault();
          const allText = history.map((c) => c.input).join("\n");
          navigator.clipboard?.writeText(allText);
          setStatusMessage("Yanked all history");
          return;
        }
        // d → delete all
        if (key === "d") {
          e.preventDefault();
          setHistory([]);
          setStatusMessage("All history deleted");
          setVimMode("normal");
          return;
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    vimMode,
    input,
    history,
    pendingG,
    executeCommand,
    executeVimCommand,
    commands,
  ]);

  // ── Focus management ──
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (vimMode === "command") {
          commandInputRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [isOpen, vimMode]);

  // ── Auto-scroll ──
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, statusMessage]);

  // ── Scroll with j/k in normal mode ──
  useEffect(() => {
    if (vimMode !== "normal" || !terminalRef.current) return;
    if (scrollOffset === 0 && terminalRef.current.scrollTop > 0) {
      // don't interfere
    }
  }, [scrollOffset, vimMode]);

  // ── Compute visible lines for line numbers ──
  const visibleLines = history.length + 2; // +2 for current input + blank line

  return (
    <>
      {/* FAB when closed */}
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
            <span className="hidden sm:inline">
              Press{" "}
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">`</kbd>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Full-screen Terminal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={wrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 2000,
              transformStyle: "preserve-3d",
            }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0f]"
          >
            {/* ── Background glows ── */}
            <motion.div
              className="pointer-events-none absolute -left-40 -top-40 size-[500px] rounded-full bg-[oklch(0.62_0.2_255/0.08)] blur-[150px]"
              style={{ x: glowX, y: glowY }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-40 -right-40 size-[400px] rounded-full bg-[oklch(0.72_0.16_200/0.06)] blur-[120px]"
              style={{ x: glow2X, y: glow2Y }}
            />

            {/* ── Mac Title Bar ── */}
            <div className="relative flex items-center justify-between border-b border-white/[0.06] bg-[#111118]/90 backdrop-blur-sm px-4 py-2.5 shrink-0 z-20">
              {/* Left: traffic lights + title */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="group relative size-3 rounded-full bg-[#ff5f57] transition-all hover:bg-[#ff4040] hover:shadow-[0_0_8px_rgba(255,95,87,0.5)]"
                    title="Close"
                  >
                    <X className="absolute inset-0 m-auto size-2 text-[#8a0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => setIsMaximized((p) => !p)}
                    className="group relative size-3 rounded-full bg-[#febc2e] transition-all hover:bg-[#f5a623] hover:shadow-[0_0_8px_rgba(254,188,46,0.5)]"
                    title="Minimize"
                  >
                    <Minus className="absolute inset-0 m-auto size-2 text-[#8a5a00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => setIsMaximized((p) => !p)}
                    className="group relative size-3 rounded-full bg-[#28c840] transition-all hover:bg-[#20a834] hover:shadow-[0_0_8px_rgba(40,200,64,0.5)]"
                    title="Maximize"
                  >
                    <Maximize2 className="absolute inset-0 m-auto size-1.5 text-[#005a00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
                <span className="font-mono text-xs text-muted-foreground/70 ml-1">
                  jibril@portfolio — vim — bash
                </span>
              </div>

              {/* Right: mode indicator */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-muted-foreground/50">
                  {history.length} lines
                </span>
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-bold tracking-wider transition-all",
                    modeLabel.color
                  )}
                >
                  {modeLabel.text}
                </span>
              </div>
            </div>

            {/* ── Terminal Body ── */}
            <div
              ref={terminalRef}
              className="relative flex-1 overflow-y-auto overflow-x-hidden bg-[#0a0a0f] font-mono"
            >
              {/* CRT scanline overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.015]"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
                }}
              />

              {/* Content area with line numbers */}
              <div className="flex px-4 py-4">
                <LineNumbers count={visibleLines} cursorLine={history.length} />

                <div className="flex-1 min-w-0">
                  {/* History */}
                  {history.map((cmd, i) => (
                    <div
                      key={i}
                      className={cn(
                        "mb-2 group",
                        cmd.isError && "bg-red-500/5 -mx-2 px-2 rounded"
                      )}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-500/80">~</span>
                        <span className="text-[oklch(0.62_0.2_255)]">visitor</span>
                        <span className="text-muted-foreground/50">❯</span>
                        <span className="text-foreground/90">{cmd.input}</span>
                      </div>
                      {cmd.output && (
                        <div className="mt-1 pl-6 text-muted-foreground">
                          {cmd.output}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Current input line (INSERT mode) */}
                  {vimMode === "insert" && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-500/80">~</span>
                      <span className="text-[oklch(0.62_0.2_255)]">visitor</span>
                      <span className="text-muted-foreground/50">❯</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          setCursorPos(e.target.selectionStart || 0);
                        }}
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
                          if (e.key === "u" && (e.ctrlKey || e.metaKey)) {
                            e.preventDefault();
                            setInput("");
                          }
                        }}
                        className="flex-1 bg-transparent text-sm text-foreground outline-none caret-[oklch(0.62_0.2_255)]"
                        autoComplete="off"
                        spellCheck={false}
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Normal mode cursor line */}
                  {vimMode === "normal" && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-500/80">~</span>
                      <span className="text-[oklch(0.62_0.2_255)]">visitor</span>
                      <span className="text-muted-foreground/50">❯</span>
                      <span className="inline-block w-2 h-4 bg-[oklch(0.62_0.2_255)] animate-pulse" />
                    </div>
                  )}

                  {/* Visual mode cursor */}
                  {vimMode === "visual" && (
                    <div className="flex items-center gap-2 text-xs bg-sky-500/10 -mx-2 px-2 rounded">
                      <span className="text-emerald-500/80">~</span>
                      <span className="text-[oklch(0.62_0.2_255)]">visitor</span>
                      <span className="text-muted-foreground/50">❯</span>
                      <span className="text-sky-400/70 text-[10px] font-semibold tracking-wider">
                        VISUAL
                      </span>
                      <span className="inline-block w-2 h-4 bg-sky-400 animate-pulse" />
                    </div>
                  )}

                  {/* Search mode */}
                  {isSearching && vimMode === "command" && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-sky-400">/</span>
                      <input
                        ref={commandInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            // Search in history
                            const q = searchQuery.replace(/^\//, "").toLowerCase();
                            const match = history.find((h) =>
                              h.input.toLowerCase().includes(q)
                            );
                            if (match) {
                              setStatusMessage(`/${q} — found: "${match.input}"`);
                            } else {
                              setStatusMessage(`E486: Pattern not found: ${q}`);
                            }
                            setIsSearching(false);
                            setVimMode("normal");
                            setCommandLine("");
                          }
                          if (e.key === "Escape") {
                            setIsSearching(false);
                            setVimMode("normal");
                            setCommandLine("");
                          }
                        }}
                        className="flex-1 bg-transparent text-sm text-sky-400 outline-none caret-sky-400"
                        placeholder=""
                        autoFocus
                      />
                    </div>
                  )}

                  <div ref={historyEndRef} />
                </div>
              </div>
            </div>

            {/* ── Command-line bar (: mode) ── */}
            <AnimatePresence>
              {vimMode === "command" && !isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="border-t border-white/[0.06] bg-[#111118]/90 backdrop-blur-sm px-4 py-1.5 shrink-0 z-20"
                >
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-foreground/60">:</span>
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
                          setVimMode("normal");
                          setCommandLine("");
                        }
                        // Tab completion for vim commands
                        if (e.key === "Tab") {
                          e.preventDefault();
                          const partial = commandLine.replace(/^:/, "");
                          const vimCmds = [
                            "q",
                            "q!",
                            "w",
                            "wq",
                            "x",
                            "help",
                            "version",
                            "set",
                            "noh",
                            "nohlsearch",
                          ];
                          const match = vimCmds.find((c) =>
                            c.startsWith(partial)
                          );
                          if (match) setCommandLine(`:${match}`);
                        }
                      }}
                      className="flex-1 bg-transparent text-sm text-foreground outline-none"
                      placeholder=""
                      autoFocus
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Status line (like vim's ruler) ── */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#111118]/90 backdrop-blur-sm px-4 py-1 shrink-0 z-20 font-mono text-[10px]">
              <div className="flex items-center gap-4">
                <span className="text-[oklch(0.62_0.2_255)] font-bold">
                  PORTFOLIO
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="text-muted-foreground/70">
                  {history.length} lines
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="text-muted-foreground/70">
                  {vimMode === "insert" ? `-- INSERT --` : vimMode === "visual" ? `-- VISUAL --` : ""}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {statusMessage && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-amber-400/80 max-w-[300px] truncate"
                  >
                    {statusMessage}
                  </motion.span>
                )}
                <span className="text-muted-foreground/50">
                  {pendingG ? "g" : ""}
                </span>
                <span className="text-muted-foreground/40">
                  vim 9.1 — portfolio edition
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
