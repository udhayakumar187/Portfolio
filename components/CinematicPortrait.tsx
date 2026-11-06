"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Holographic portrait artwork with lightweight scan and particle overlays. */
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

    const particles = Array.from({ length: reducedMotion ? 18 : 64 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.6 + Math.random() * 1.7,
      speed: 0.00025 + Math.random() * 0.00065,
      alpha: 0.18 + Math.random() * 0.55,
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
        if (particle.y < -0.02) {
          particle.y = 1.02;
          particle.x = Math.random();
        }
        context.beginPath();
        context.fillStyle = `rgba(103, 232, 249, ${particle.alpha})`;
        context.shadowColor = "rgba(34, 211, 238, 0.9)";
        context.shadowBlur = 10;
        context.arc(particle.x * width, particle.y * height, particle.radius, 0, Math.PI * 2);
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
      className="relative mx-auto w-full max-w-[42rem] lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-end"
      initial={reducedMotion ? false : { opacity: 0, x: 36, scale: 0.96 }}
      animate={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-full overflow-hidden">
        <motion.img
          src="/images/udhaya-cutout.png"
          alt="Udhaya Kumar, isolated from the original photograph"
          className="relative z-0 block h-auto w-full select-none object-contain drop-shadow-[0_0_28px_rgba(34,211,238,0.22)]"
          draggable={false}
          animate={reducedMotion ? undefined : { filter: ["brightness(0.96) saturate(1.05)", "brightness(1.08) saturate(1.2)", "brightness(0.96) saturate(1.05)"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          loading="eager"
        />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true" />
        <motion.div
          className="pointer-events-none absolute inset-x-[8%] top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-100 to-transparent shadow-[0_0_18px_4px_rgba(103,232,249,.55)]"
          animate={reducedMotion ? undefined : { y: ["0%", "95%", "0%"], opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="pointer-events-none absolute bottom-2 right-4 z-20 text-[9px] font-semibold uppercase tracking-[0.3em] text-cyan-100/65 sm:bottom-4 sm:right-8">
        Digital identity // signal online
      </p>
    </motion.div>
  );
}
