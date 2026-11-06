"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A layered portrait reveal for the expedition hero.
 * The portrait remains a real photograph; the canvas adds a lightweight
 * snow/ice particle field and the image responds to pointer movement.
 */
export function CinematicPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const particleCount = reducedMotion ? 24 : 88;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.7 + Math.random() * 2.2,
      speed: 0.00035 + Math.random() * 0.0011,
      drift: (Math.random() - 0.5) * 0.0007,
      alpha: 0.2 + Math.random() * 0.65,
    }));

    let width = 0;
    let height = 0;
    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.y -= particle.speed;
        particle.x += particle.drift;
        if (particle.y < -0.04) {
          particle.y = 1.04;
          particle.x = Math.random();
        }
        if (particle.x < -0.04) particle.x = 1.04;
        if (particle.x > 1.04) particle.x = -0.04;

        const x = particle.x * width;
        const y = particle.y * height;
        context.beginPath();
        context.fillStyle = `rgba(190, 235, 255, ${particle.alpha})`;
        context.shadowColor = "rgba(103, 232, 249, 0.85)";
        context.shadowBlur = particle.size * 3;
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
      if (!reducedMotion) frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  return (
    <motion.div
      className="group relative mx-auto w-full max-w-[min(76vw,25rem)] lg:absolute lg:right-[5%] lg:top-1/2 lg:mx-0 lg:w-[min(34vw,27rem)] lg:-translate-y-1/2"
      initial={reducedMotion ? false : { opacity: 0, y: 48, scale: 0.88, rotateY: -12 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.25, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative aspect-[3/4] overflow-hidden rounded-[48%_48%_28%_28%] border border-cyan-100/25 bg-slate-950/50 shadow-[0_0_70px_rgba(34,211,238,0.18)]"
        whileHover={reducedMotion ? undefined : { rotateX: -3, rotateY: 4, scale: 1.025 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(103,232,249,0.22),transparent_58%)]" />
        <motion.img
          src="/udhaya-portrait.webp"
          alt="Portrait of Udhaya Kumar"
          className="absolute inset-0 h-full w-full object-cover object-[center_18%] [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
          initial={reducedMotion ? false : { scale: 1.18, filter: "saturate(.55) contrast(1.15) brightness(.72)" }}
          animate={reducedMotion ? undefined : { scale: 1, filter: "saturate(.92) contrast(1.04) brightness(.96)" }}
          transition={{ duration: 1.8, delay: 0.55, ease: "easeOut" }}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-cyan-100/10" />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
        <motion.div
          className="pointer-events-none absolute -inset-[18%] rounded-full border border-cyan-100/20"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-[12%] top-[17%] h-px bg-gradient-to-r from-transparent via-cyan-100/80 to-transparent shadow-[0_0_18px_4px_rgba(103,232,249,.28)]"
          animate={reducedMotion ? undefined : { y: [0, 210, 0], opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[48%] bg-cyan-300/10 blur-3xl" />
      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-100/65 lg:justify-start">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
        Expedition profile // live signal
      </div>
    </motion.div>
  );
}
