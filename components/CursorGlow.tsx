"use client";

import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    const syncEnabled = () => setEnabled(pointerQuery.matches && !motionQuery.matches);
    syncEnabled();

    motionQuery.addEventListener("change", syncEnabled);
    pointerQuery.addEventListener("change", syncEnabled);

    return () => {
      motionQuery.removeEventListener("change", syncEnabled);
      pointerQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const glow = glowRef.current;

        if (!glow) {
          return;
        }

        glow.style.transform = `translate3d(${pointerRef.current.x}px, ${pointerRef.current.y}px, 0) translate(-50%, -50%)`;
      });
    };

    window.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-64 w-64 rounded-full opacity-35 blur-3xl will-change-transform"
      style={{
        transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
        background:
          "conic-gradient(from 180deg, rgba(73,211,255,0.34), rgba(139,92,246,0.26), rgba(124,247,212,0.2), rgba(73,211,255,0.34))"
      }}
    />
  );
}
