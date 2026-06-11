"use client";

import { journeyStops } from "@/lib/animation";
import { useJourneyMotion } from "@/components/MotionProvider";

export function JourneyMiniMap() {
  const { activeStop } = useJourneyMotion();

  return (
    <nav
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-ink/76 p-2 shadow-soft-glow backdrop-blur-xl xl:hidden"
      aria-label="Journey progress"
    >
      {journeyStops.map((item, index) => (
        <a
          key={item.id}
          href={item.href}
          className={`grid h-3.5 w-3.5 place-items-center rounded-full border transition ${
            activeStop >= index
              ? "border-white bg-white shadow-[0_0_18px_rgba(142,234,255,0.62)]"
              : "border-white/30 bg-white/10 hover:border-electric/80"
          }`}
        >
          <span className="sr-only">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
