"use client";

import type { ActiveSectionId } from "@/hooks/useActiveSection";
import type { ThemeConfig } from "@/data/themes";

type QuestUnlocksProps = {
  activeSection: ActiveSectionId;
  activeStop: number;
  theme: ThemeConfig;
};

const unlocks: Array<{ section: ActiveSectionId; label: string; left: string; top: string }> = [
  { section: "experience", label: "Route unlocked", left: "24%", top: "64%" },
  { section: "skills", label: "Artifact found", left: "46%", top: "46%" },
  { section: "work", label: "Quest discovered", left: "63%", top: "34%" },
  { section: "ai", label: "Signal detected", left: "78%", top: "23%" },
  { section: "contact", label: "Summit reached", left: "87%", top: "13%" }
];

export function QuestUnlocks({ activeSection, activeStop, theme }: QuestUnlocksProps) {
  return (
    <div className="treasure-map__unlocks" aria-hidden="true">
      {unlocks.map((unlock, index) => {
        const active = unlock.section === activeSection || activeStop > index;

        return (
          <span
            key={unlock.section}
            className={active ? "treasure-map__unlock treasure-map__unlock--active" : "treasure-map__unlock"}
            style={{
              left: unlock.left,
              top: unlock.top,
              color: theme.mapStyle.glow
            }}
          >
            {unlock.label}
          </span>
        );
      })}
    </div>
  );
}
