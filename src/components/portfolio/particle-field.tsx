"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: [number, number, number];
  pulsePhase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

/**
 * Global cursor-reactive particle constellation with enhanced effects.
 *
 * Features:
 * - Dynamic particles that respond to cursor
 * - Constellation lines between nearby particles
 * - Occasional shooting stars
 * - Subtle color variations
 * - Breathing glow effect
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let shootingStars: ShootingStar[] = [];
    let time = 0;
    let lastShootingStar = 0;

    // Color palettes - electric blue with variations
    const colors: [number, number, number][] = [
      [120, 170, 255], // Electric blue
      [100, 150, 255], // Lighter blue
      [140, 180, 255], // Soft blue
      [80, 130, 255], // Deep blue
      [160, 200, 255], // Sky blue
    ];

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      baseAlpha: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulsePhase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        90,
        Math.max(32, Math.floor((width * height) / 22000)),
      );
      particles = new Array(target).fill(0).map(() => spawn());
      shootingStars = [];
    };

    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    const REPULSION = 140;
    const LINK_DIST = 130;

    // Spawn a shooting star occasionally
    const maybeSpawnShootingStar = () => {
      const now = Date.now();
      if (now - lastShootingStar > 8000 + Math.random() * 12000) {
        lastShootingStar = now;
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          vx: 4 + Math.random() * 3,
          vy: 2 + Math.random() * 2,
          life: 1,
          maxLife: 1,
          size: 1 + Math.random(),
        });
      }
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Update and draw shooting stars
      maybeSpawnShootingStar();
      shootingStars = shootingStars.filter((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.015;

        if (star.life > 0) {
          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - star.vx * 15,
            star.y - star.vy * 15,
          );
          gradient.addColorStop(0, `rgba(200, 220, 255, ${star.life * 0.8})`);
          gradient.addColorStop(1, "rgba(200, 220, 255, 0)");

          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.vx * 15, star.y - star.vy * 15);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = star.size;
          ctx.lineCap = "round";
          ctx.stroke();

          // Star head
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
          ctx.fill();

          return true;
        }
        return false;
      });

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPULSION && dist > 0) {
            const force = (1 - dist / REPULSION) * 1.8;
            p.vx += (dx / dist) * force * 0.2;
            p.vy += (dy / dist) * force * 0.2;
          }
        }

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Friction
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Gentle baseline motion
        p.vx += (Math.random() - 0.5) * 0.012;
        p.vy += (Math.random() - 0.5) * 0.012;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Breathing alpha effect
        const pulse = Math.sin(time * 1.5 + p.pulsePhase) * 0.15 + 0.85;
        const alpha = mouse.active
          ? Math.min(0.95, p.baseAlpha * pulse + 0.25)
          : p.baseAlpha * pulse;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2.5,
        );
        gradient.addColorStop(
          0,
          `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${alpha})`,
        );
        gradient.addColorStop(
          0.4,
          `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${alpha * 0.4})`,
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const o = (1 - dist / LINK_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99, 140, 255, ${o})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Line to cursor when close
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPULSION) {
            const o = (1 - dist / REPULSION) * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(140, 180, 255, ${o})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    let raf = 0;
    let running = false;

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      start();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full"
    />
  );
}
