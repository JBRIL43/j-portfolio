"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

// Simple audio context for UI sounds - could be expanded with actual sounds
export function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context on first interaction
  useEffect(() => {
    if (!isEnabled || hasInteracted) return;

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      setHasInteracted(true);
    } catch (e) {
      console.log("Audio not supported");
    }
  }, [isEnabled, hasInteracted]);

  // Play a simple click sound using oscillator (very subtle)
  const playClickSound = () => {
    if (!audioContextRef.current || !isEnabled) return;

    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Silently fail
    }
  };

  const toggleSound = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      playClickSound();
    }
  };

  // Play sound on route change (if enabled)
  useEffect(() => {
    if (isEnabled && hasInteracted) {
      playClickSound();
    }
  }, [pathname]);

  // The story page is a quiet manga experience: no sound UI there.
  if (pathname === "/story") return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      onClick={toggleSound}
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full glass px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label={isEnabled ? "Mute sounds" : "Enable sounds"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isEnabled ? (
          <motion.div
            key="on"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 className="size-3.5" />
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX className="size-3.5" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="hidden sm:inline">
        {isEnabled ? "Sound On" : "Sound Off"}
      </span>
    </motion.button>
  );
}
