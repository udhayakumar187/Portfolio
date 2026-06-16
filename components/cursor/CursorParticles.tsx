"use client";

import { colorWithAlpha, type CursorEffectRuntime, type CursorParticle } from "@/lib/cursorEffects";

export function drawCursorParticle(context: CanvasRenderingContext2D, particle: CursorParticle, effect: CursorEffectRuntime) {
  if (!particle.active) {
    return;
  }

  const progress = Math.min(1, particle.age / Math.max(1, particle.life));
  const opacity = (1 - progress) * (particle.kind === "firefly" ? 0.72 : 0.52);
  const x = particle.x;
  const y = particle.y;

  context.save();
  context.translate(x, y);
  context.rotate(particle.spin + progress * Math.PI);

  if (particle.kind === "petal") {
    context.fillStyle = colorWithAlpha(effect.primaryColor, opacity);
    context.beginPath();
    context.ellipse(0, 0, particle.size * 1.85, particle.size * 0.78, 0, 0, Math.PI * 2);
    context.fill();
  } else if (particle.kind === "dust") {
    context.fillStyle = colorWithAlpha(effect.particleColor, opacity * 0.76);
    context.beginPath();
    context.arc(0, 0, particle.size * 1.35, 0, Math.PI * 2);
    context.fill();
  } else if (particle.kind === "mist") {
    context.strokeStyle = colorWithAlpha(effect.secondaryColor, opacity * 0.7);
    context.lineWidth = 0.9;
    context.beginPath();
    context.arc(0, 0, particle.size * 1.8, 0, Math.PI * 1.35);
    context.stroke();
  } else {
    context.fillStyle = colorWithAlpha(particle.kind === "firefly" ? effect.particleColor : effect.primaryColor, opacity);
    context.beginPath();
    context.arc(0, 0, particle.size, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}
