"use client";

import { useEffect, useRef } from "react";

export type PointerPositionRef = {
  x: number;
  y: number;
};

export function usePointerPosition(enabled: boolean) {
  const positionRef = useRef<PointerPositionRef>({ x: -1000, y: -1000 });
  const normalizedRef = useRef<PointerPositionRef>({ x: -1, y: -1 });
  const activeRef = useRef(false);
  const downRef = useRef(false);
  const tapStampRef = useRef(0);
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
  const viewportRef = useRef({ width: 1, height: 1 });

  useEffect(() => {
    if (!enabled) {
      activeRef.current = false;
      return undefined;
    }

    const syncViewport = () => {
      viewportRef.current.width = Math.max(1, window.innerWidth);
      viewportRef.current.height = Math.max(1, window.innerHeight);
    };

    const syncPointer = (event: PointerEvent) => {
      const width = viewportRef.current.width;
      const height = viewportRef.current.height;

      positionRef.current.x = event.clientX;
      positionRef.current.y = event.clientY;
      normalizedRef.current.x = event.clientX / width;
      normalizedRef.current.y = event.clientY / height;
      pointerTypeRef.current = event.pointerType === "touch" ? "touch" : event.pointerType === "pen" ? "pen" : "mouse";
      activeRef.current = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      syncPointer(event);
    };

    const handlePointerDown = (event: PointerEvent) => {
      downRef.current = true;
      tapStampRef.current += 1;
      syncPointer(event);
    };

    const handlePointerUp = () => {
      downRef.current = false;
    };

    const handlePointerLeave = () => {
      activeRef.current = false;
      downRef.current = false;
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("resize", syncViewport);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled]);

  return {
    positionRef,
    normalizedRef,
    activeRef,
    downRef,
    tapStampRef,
    pointerTypeRef,
    viewportRef
  };
}
