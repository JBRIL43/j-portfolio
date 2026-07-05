"use client";

import { useRef, useEffect, useState } from "react";
import { useSmoothScroll } from "./use-smooth-scroll";
import { Portfolio3D } from "./experience";
import { motion, AnimatePresence } from "framer-motion";

// Section heights for scroll
const SECTION_HEIGHT = 100; // vh

interface ScrollContainerProps {
  children?: React.ReactNode;
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [is3DActive, setIs3DActive] = useState(false);
  const [show3D, setShow3D] = useState(false);

  // Initialize smooth scroll
  useSmoothScroll();

  // Detect if 3D should be active
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isLowEnd = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

      setIs3DActive(!isMobile && !prefersReducedMotion && !isLowEnd);
    };

    checkDevice();

    // Delay showing 3D until after initial load
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Set up the scrollable height
  useEffect(() => {
    if (!is3DActive || !containerRef.current) return;

    const totalHeight = SECTION_HEIGHT * 6; // 6 sections
    containerRef.current.style.height = `${totalHeight}vh`;
  }, [is3DActive]);

  if (!is3DActive) {
    // Render 2D fallback
    return (
      <div className="relative">
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* 3D Background */}
      <AnimatePresence>
        {show3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-0"
          >
            <Portfolio3D />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll-triggered overlay UI */}
      <div className="relative z-10 pointer-events-none">
        {children}
      </div>

      {/* Hidden scroll container for smooth scrolling */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: `${SECTION_HEIGHT * 6}vh`,
        }}
      />
    </div>
  );
}

// Section component for positioning
export function Section({
  children,
  className = "",
  style = {},
  "data-section": sectionName
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "data-section"?: string;
}) {
  return (
    <section
      data-section={sectionName}
      className={`relative min-h-screen ${className}`}
      style={{
        ...style,
        pointerEvents: 'none',
      }}
    >
      {/* Allow pointer events for interactive elements */}
      <div className="pointer-events-auto">
        {children}
      </div>
    </section>
  );
}

// Navigation overlay
export function NavigationOverlay() {
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "peakcraft", label: "Peak Craft" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (index: number) => {
    const height = window.innerHeight;
    window.scrollTo({
      top: height * index,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(i)}
          className="group relative w-3 h-3 rounded-full bg-white/20 hover:bg-[oklch(0.62_0.2_255)] transition-colors"
          aria-label={`Go to ${section.label}`}
        >
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-xs text-white/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

// Progress indicator
export function ProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const newProgress = scrollTop / scrollHeight;
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/5 z-50">
      <div
        className="h-full bg-gradient-to-r from-[oklch(0.62_0.2_255)] via-[oklch(0.78_0.16_220)] to-[oklch(0.72_0.16_200)] transition-all duration-300"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
