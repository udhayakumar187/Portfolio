"use client";

import { CursorTrailCanvas } from "@/components/cursor/CursorTrailCanvas";
import { useTheme } from "@/components/ThemeProvider";
import { experienceFeatures } from "@/data/experienceFeatures";
import { useMobileMode } from "@/hooks/useMobileMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { resolveCursorEffect } from "@/lib/cursorEffects";

export function MagicCursorLayer() {
  const { theme } = useTheme();
  const mobileMode = useMobileMode("(pointer: coarse)");
  const reducedMotion = useReducedMotion();
  const effect = resolveCursorEffect(theme, mobileMode, reducedMotion);
  const enabled = experienceFeatures.enableMagicCursor && (!reducedMotion || effect.maxParticles > 0);

  if (!enabled) {
    return null;
  }

  return (
    <div className="magic-cursor-layer" aria-hidden="true">
      <CursorTrailCanvas effect={effect} enabled={enabled} mobileMode={mobileMode} reducedMotion={reducedMotion} />
    </div>
  );
}
