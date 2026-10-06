"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Route,
  FolderGit2,
  Wrench,
  Briefcase,
  Award,
  Globe,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dockItems = [
  { label: "Home", href: "/", icon: Compass },
  { label: "Journey", href: "/journey", icon: Route },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Skills", href: "/skills", icon: Wrench },
  { label: "Work", href: "/work", icon: Briefcase },
  { label: "Awards", href: "/awards", icon: Award },
  { label: "Beyond", href: "/beyond", icon: Globe },
  { label: "Mail", href: "mailto:jibirnur32@gmail.com", icon: Mail },
];

const EDGE = 24;

/**
 * macOS-style auto-hiding dock: hidden against the bottom edge until the
 * pointer approaches (or the dock itself is touched), then springs up.
 * Always visible on touch devices, which have no pointer edge.
 */
export function MacDock() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/desktop" || pathname === "/story") return;
    if (window.matchMedia("(hover: none)").matches) {
      setVisible(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      setVisible(e.clientY > window.innerHeight - EDGE);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [pathname]);

  if (pathname === "/desktop" || pathname === "/story") return null;

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-3"
      aria-label="Site dock"
    >
      <nav className="flex items-end gap-1.5 rounded-2xl border-2 border-[#111] bg-white/75 px-3 py-2 shadow-[4px_4px_0_0_#111] backdrop-blur-md sm:gap-2 sm:px-4">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="group relative">
              <motion.span
                whileHover={{ y: -8, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                className={cn(
                  "grid size-10 place-items-center rounded-xl border-2 border-[#111] transition-colors sm:size-11",
                  active
                    ? "bg-[#059669] text-white"
                    : "bg-white text-[#111] group-hover:bg-[#111] group-hover:text-white",
                )}
              >
                <Icon className="size-5" />
              </motion.span>
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border-2 border-[#111] bg-[#111] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white opacity-0 shadow-[2px_2px_0_0_#111] transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
