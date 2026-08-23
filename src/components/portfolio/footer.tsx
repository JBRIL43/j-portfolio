"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, socials } from "@/lib/portfolio-data";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/desktop") return null;

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/12 bg-[linear-gradient(180deg,oklch(0.09_0.008_264)_0%,oklch(0.05_0.005_264)_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[oklch(0.62_0.2_255/0.75)] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,oklch(0.62_0.2_255/0.18),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-5 py-14 relative">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg glass-strong shadow-[0_0_0_1px_oklch(0.62_0.2_255/0.18)]">
                <span className="text-[13px] font-semibold text-gradient-blue">
                  JB
                </span>
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Jibril Nuredin
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/80">
              Building technology, communities, and digital experiences —
              grounded in faith, discipline, and curiosity.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid size-9 place-items-center rounded-lg glass-strong transition-all hover:border-white/20 hover:bg-white/12 hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-9 place-items-center rounded-lg glass-strong transition-all hover:border-white/20 hover:bg-white/12 hover:text-foreground"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={socials.email}
                aria-label="Email"
                className="grid size-9 place-items-center rounded-lg glass-strong transition-all hover:border-white/20 hover:bg-white/12 hover:text-foreground"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* nav */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/75 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* status */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Status
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </div>
              <p className="text-sm text-foreground/75">
                Hawassa University · Ethiopia
              </p>
              <p className="font-mono text-xs text-foreground/65">
                Built with Next.js · Tailwind · Framer Motion
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/12 pt-6 sm:flex-row">
          <p className="text-xs text-foreground/65">
            © {new Date().getFullYear()} Jibril Nuredin. Crafted with intent.
          </p>
          <button
            onClick={toTop}
            className="group inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs text-foreground transition-all hover:border-white/20 hover:bg-white/12"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
