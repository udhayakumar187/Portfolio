"use client";

import type { ThemeConfig } from "@/data/themes";

type MapRouteLinesProps = {
  progress: number;
  theme: ThemeConfig;
  reducedMotion: boolean;
};

export function MapRouteLines({ progress, theme, reducedMotion }: MapRouteLinesProps) {
  const routeLength = 1180;
  const dashOffset = reducedMotion ? routeLength * 0.12 : routeLength * (1 - Math.min(1, progress * 1.08));

  return (
    <svg className="treasure-map__routes" viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M90 760 C160 610 240 628 312 505 C388 374 488 428 574 308 C676 166 792 220 884 142 C986 54 1072 86 1130 32"
        fill="none"
        stroke={theme.mapStyle.primary}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeDasharray={routeLength}
        strokeDashoffset={dashOffset}
      />
      <path
        d="M80 794 C220 680 342 700 470 592 C604 476 684 506 796 382 C896 270 1024 268 1150 196"
        fill="none"
        stroke={theme.mapStyle.secondary}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="12 18"
        opacity="0.48"
      />
      <path
        d="M150 210 C284 120 386 148 496 206 C616 270 728 254 866 160 C982 80 1078 104 1170 178"
        fill="none"
        stroke={theme.mapStyle.primary}
        strokeWidth="1"
        strokeDasharray="4 16"
        opacity="0.28"
      />
      {[0, 1, 2, 3, 4].map((index) => (
        <ellipse
          key={index}
          cx={140 + index * 226}
          cy={760 - index * 146 + Math.sin(index) * 34}
          rx={80 + index * 12}
          ry={24 + index * 5}
          fill="none"
          stroke={theme.mapStyle.secondary}
          strokeWidth="1"
          opacity={0.11 + index * 0.018}
        />
      ))}
    </svg>
  );
}
