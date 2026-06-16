"use client";

import { colorWithAlpha, type CursorEffectRuntime, type CursorRippleState } from "@/lib/cursorEffects";

export function drawCursorRipple(context: CanvasRenderingContext2D, ripple: CursorRippleState, effect: CursorEffectRuntime) {
  if (!ripple.active) {
    return;
  }

  const progress = Math.min(1, ripple.age / Math.max(1, ripple.life));
  const opacity = (1 - progress) * 0.34 * ripple.strength;
  const radius = ripple.radius + progress * (effect.type === "water" ? 56 : effect.type === "sand" ? 42 : 34);

  context.beginPath();
  context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
  context.strokeStyle = colorWithAlpha(effect.secondaryColor, opacity);
  context.lineWidth = effect.type === "sand" ? 1.2 : 1.6;
  context.stroke();

  if (effect.type === "frost" || effect.type === "petals") {
    context.beginPath();
    context.arc(ripple.x, ripple.y, radius * 0.58, 0, Math.PI * 2);
    context.strokeStyle = colorWithAlpha(effect.primaryColor, opacity * 0.54);
    context.lineWidth = 0.9;
    context.stroke();
  }
}
