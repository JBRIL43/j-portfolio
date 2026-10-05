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
    <footer className="relative mt-auto overflow-hidden manga-panel-lg border-3 border-[#111] bg-white">
      {/* Top edge accent */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-[#059669] to-transparent" />

      <div className="mx-auto max-w-6xl px-5 py-12 relative">
        {/* Manga panel gutters */}
        <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/[0.08]" />
          <div className="absolute top-0 left-0 right-0 h-full" style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 6px, #111 6px, #111 7px)",
            opacity: 0.12
          }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/[0.08]" />
          <div className="absolute top-0 left-0 right-0 h-full" style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 6px, #111 6px, #111 7px)",
            opacity: 0.12
          }} />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="relative grid size-9 place-items-center rounded-lg manga-panel-sm bg-white border-2 border-[#111] shadow-[3px_3px_0_0_#111]">
                <span className="text-[14px] font-mono font-bold text-[#111]">
                  JB
                </span>
              </span>
              <span className="text-sm font-mono font-bold tracking-tight text-foreground">
                Jibril Nuredin
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building technology, communities, and digital experiences —
              grounded in faith, discipline, and curiosity.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="relative grid size-9 place-items-center rounded-lg border-2 border-[#111] bg-white transition-all duration-200 hover:bg-[#059669] hover:border-[#059669] hover:text-white hover:shadow-[3px_3px_0_0_#111]"
              >
                <Github className="size-4 text-[#111]" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="relative grid size-9 place-items-center rounded-lg border-2 border-[#111] bg-white transition-all duration-200 hover:bg-[#059669] hover:border-[#059669] hover:text-white hover:shadow-[3px_3px_0_0_#111]"
              >
                <Linkedin className="size-4 text-[#111]" />
              </a>
              <a
                href={socials.email}
                aria-label="Email"
                className="relative grid size-9 place-items-center rounded-lg border-2 border-[#111] bg-white transition-all duration-200 hover:bg-[#059669] hover:border-[#059669] hover:text-white hover:shadow-[3px_3px_0_0_#111]"
              >
                <Mail className="size-4 text-[#111]" />
              </a>
            </div>
          </div>

          {/* nav */}
          <div>
            <p className="mb-3 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:bg-black/[0.06] hover:text-foreground hover:text-[#059669]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* status */}
          <div>
            <p className="mb-3 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-medium">Available for work</span>
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

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jibril Nuredin. Crafted with intent.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative group inline-flex items-center gap-2 rounded-lg border-2 border-[#111] bg-white px-4 py-2 text-xs font-mono font-medium text-foreground transition-all duration-150 hover:bg-[#059669] hover:border-[#059669] hover:text-white hover:shadow-[3px_3px_0_0_#111]"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}