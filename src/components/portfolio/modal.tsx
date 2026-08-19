"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
  /** Pass `null` to close the modal. */
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Tailwind max-width class for the panel. */
  maxWidth?: string;
  /** Tailwind max-height class for the panel. */
  maxHeight?: string;
  /** Whether to show the built-in close button (top-right). Default true. */
  closeButton?: boolean;
  className?: string;
};

export function Modal({
  open,
  onClose,
  children,
  maxWidth = "max-w-xl",
  maxHeight = "max-h-[88vh]",
  closeButton = true,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative z-10 flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.1_0.008_264)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]",
              maxWidth,
              maxHeight,
              className,
            )}
          >
            {/* Close button — sticky top-right */}
            {closeButton && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 grid size-9 shrink-0 place-items-center rounded-lg glass transition-colors hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
