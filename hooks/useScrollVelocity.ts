"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

type ScrollVelocityResult = {
  velocityRef: MutableRefObject<number>;
  normalizedVelocityRef: MutableRefObject<number>;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useScrollVelocity(): ScrollVelocityResult {
  const velocityRef = useRef(0);
  const normalizedVelocityRef = useRef(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      velocityRef.current = 0;
      normalizedVelocityRef.current = 0;
      return undefined;
    }

    let frame = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let targetVelocity = 0;

    const tick = () => {
      frame = 0;
      velocityRef.current += (targetVelocity - velocityRef.current) * 0.18;
      targetVelocity *= 0.84;
      normalizedVelocityRef.current = clamp01(Math.abs(velocityRef.current) / 2.2);

      if (Math.abs(targetVelocity) > 0.01 || Math.abs(velocityRef.current) > 0.01) {
        frame = window.requestAnimationFrame(tick);
      } else {
        targetVelocity = 0;
        velocityRef.current = 0;
        normalizedVelocityRef.current = 0;
      }
    };

    const scheduleTick = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const handleScroll = () => {
      const now = performance.now();
      const nextY = window.scrollY;
      const deltaY = nextY - lastY;
      const deltaTime = Math.max(16, now - lastTime);

      targetVelocity = deltaY / deltaTime;
      lastY = nextY;
      lastTime = now;
      scheduleTick();
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        targetVelocity = 0;
        velocityRef.current = 0;
        normalizedVelocityRef.current = 0;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      motionQuery.removeEventListener("change", handleMotionChange);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return { velocityRef, normalizedVelocityRef };
}
