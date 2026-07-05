"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [reduce, setReduce] = useState(false);
  const pathname = usePathname();

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth cursor movement
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  // Scale based on hover state
  const scale = useTransform(useMotionValue(0), [0, 1], [1, 2.5]);
  const glowScale = useTransform(useMotionValue(0), [0, 1], [1, 4]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reduce) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Track hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [reduce, isVisible, mouseX, mouseY]);

  // Reset on route change
  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  if (reduce) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      >
        <div className="size-2 rounded-full bg-white" />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        ref={cursorGlowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? (isHovering ? 0.4 : 0.15) : 0,
          scale: isHovering ? 3 : 1.5,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div
          className="size-24 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 140, 255, 0.4) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Click ripple effect */}
      {isVisible && (
        <ClickRipple />
      )}
    </>
  );
}

// Click ripple effect component
function ClickRipple() {
  const ripplesRef = useRef<{ id: number; x: number; y: number }[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      ripplesRef.current.push({ id, x: e.clientX, y: e.clientY });
      setRipples([...ripplesRef.current]);

      // Clean up after animation
      setTimeout(() => {
        ripplesRef.current = ripplesRef.current.filter(r => r.id !== id);
        setRipples([...ripplesRef.current]);
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none fixed z-[9997] hidden md:block"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          exit={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="size-8 rounded-full border border-white/30" />
        </motion.div>
      ))}
    </>
  );
}
