"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import type { PointerPositionRef } from "@/hooks/usePointerPosition";

export function usePointerVelocity(positionRef: MutableRefObject<PointerPositionRef>, enabled: boolean) {
  const velocityRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      velocityRef.current.x = 0;
      velocityRef.current.y = 0;
      speedRef.current = 0;
      return undefined;
    }

    let frame = 0;
    let lastX = positionRef.current.x;
    let lastY = positionRef.current.y;
    let lastTime = performance.now();

    const updateVelocity = (time: number) => {
      const deltaMs = Math.max(16, time - lastTime);
      const nextVelocityX = ((positionRef.current.x - lastX) / deltaMs) * 16.67;
      const nextVelocityY = ((positionRef.current.y - lastY) / deltaMs) * 16.67;
      const nextSpeed = Math.min(1, Math.hypot(nextVelocityX, nextVelocityY) / 46);

      velocityRef.current.x += (nextVelocityX - velocityRef.current.x) * 0.24;
      velocityRef.current.y += (nextVelocityY - velocityRef.current.y) * 0.24;
      speedRef.current += (nextSpeed - speedRef.current) * 0.18;

      lastX = positionRef.current.x;
      lastY = positionRef.current.y;
      lastTime = time;
      frame = window.requestAnimationFrame(updateVelocity);
    };

    frame = window.requestAnimationFrame(updateVelocity);

    return () => window.cancelAnimationFrame(frame);
  }, [enabled, positionRef]);

  return {
    velocityRef,
    speedRef
  };
}
