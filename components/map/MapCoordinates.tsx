"use client";

import type { ThemeConfig } from "@/data/themes";

type MapCoordinatesProps = {
  progress: number;
  theme: ThemeConfig;
};

const coordinates = [
  { left: "11%", top: "74%", value: "EJ-01 / 07.18N" },
  { left: "31%", top: "56%", value: "SYS-24 / 11.42E" },
  { left: "53%", top: "38%", value: "ART-36 / 18.05N" },
  { left: "73%", top: "25%", value: "QST-48 / 29.13E" },
  { left: "86%", top: "14%", value: "SIG-60 / 41.21N" }
];

export function MapCoordinates({ progress, theme }: MapCoordinatesProps) {
  return (
    <div className="treasure-map__coordinates" aria-hidden="true">
      {coordinates.map((coordinate, index) => {
        const visible = progress > index * 0.16;

        return (
          <span
            key={coordinate.value}
            style={{
              left: coordinate.left,
              top: coordinate.top,
              color: theme.mapStyle.glow,
              opacity: visible ? 0.34 : 0.08
            }}
          >
            {coordinate.value}
          </span>
        );
      })}
    </div>
  );
}
