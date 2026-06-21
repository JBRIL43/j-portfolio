"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { navItems, socials } from "@/lib/portfolio-data";

export function Footer() {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-auto border-t border-white/8 bg-[oklch(0.06_0.006_264)]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg glass">
                <span className="text-[13px] font-semibold text-gradient-blue">
                  JN
                </span>
              </span>
              <span className="text-sm font-medium tracking-tight text-foreground">
                Jibril Nuredin
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building technology, communities, and digital experiences —
              grounded in faith, discipline, and curiosity.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid size-9 place-items-center rounded-lg glass transition-colors hover:bg-white/10"
              >
                <Github className="size-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-9 place-items-center rounded-lg glass transition-colors hover:bg-white/10"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={socials.email}
                aria-label="Email"
                className="grid size-9 place-items-center rounded-lg glass transition-colors hover:bg-white/10"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* nav */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() =>
                      document
                        .querySelector(item.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* status */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </div>
              <p className="text-sm text-muted-foreground">
                Hawassa University · Ethiopia
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                Built with Next.js · Tailwind · Framer Motion
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jibril Nuredin. Crafted with intent.
          </p>
          <button
            onClick={toTop}
            className="group inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-white/10"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
