"use client";

import { useEffect, useRef } from "react";
import { drawCursorParticle } from "@/components/cursor/CursorParticles";
import { drawCursorRipple } from "@/components/cursor/CursorRipple";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { usePointerVelocity } from "@/hooks/usePointerVelocity";
import {
  colorWithAlpha,
  createCursorParticles,
  createCursorRipples,
  cursorParticleLife,
  cursorRippleLife,
  particleKindForEffect,
  type CursorEffectRuntime,
  type CursorParticle,
  type CursorRippleState
} from "@/lib/cursorEffects";

type CursorTrailCanvasProps = {
  effect: CursorEffectRuntime;
  enabled: boolean;
  mobileMode: boolean;
  reducedMotion: boolean;
};

const maxRipples = 18;

function resetCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function spawnRipple(ripple: CursorRippleState, x: number, y: number, effect: CursorEffectRuntime, strength: number) {
  ripple.x = x;
  ripple.y = y;
  ripple.age = 0;
  ripple.life = cursorRippleLife(effect.type);
  ripple.radius = effect.type === "water" ? 8 : effect.type === "sand" ? 6 : 4;
  ripple.strength = strength;
  ripple.active = true;
}

function spawnParticle(particle: CursorParticle, x: number, y: number, effect: CursorEffectRuntime, speed: number, angleSeed: number) {
  const kind = particleKindForEffect(effect.type);
  const angle = angleSeed + Math.random() * Math.PI * 2;
  const force =
    effect.type === "fireflies"
      ? 0.25 + Math.random() * 0.65
      : effect.type === "petals"
        ? 0.72 + Math.random() * 1.6
        : effect.type === "sand"
          ? 0.6 + Math.random() * 1.8
          : 0.45 + Math.random() * 1.45;

  particle.x = x + (Math.random() - 0.5) * 12;
  particle.y = y + (Math.random() - 0.5) * 12;
  particle.vx = Math.cos(angle) * force + (Math.random() - 0.5) * speed * 1.8;
  particle.vy = Math.sin(angle) * force + (effect.type === "sand" ? 0.5 : -0.18) + (Math.random() - 0.5) * speed * 1.2;
  particle.age = 0;
  particle.life = cursorParticleLife(effect.type) * (0.76 + Math.random() * 0.48);
  particle.size = effect.type === "petals" ? 2.2 + Math.random() * 2.6 : effect.type === "fireflies" ? 1.5 + Math.random() * 1.6 : 1 + Math.random() * 2.2;
  particle.spin = Math.random() * Math.PI * 2;
  particle.kind = kind;
  particle.active = true;
}

export function CursorTrailCanvas({ effect, enabled, mobileMode, reducedMotion }: CursorTrailCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef(effect);
  const particlesRef = useRef<CursorParticle[]>([]);
  const ripplesRef = useRef<CursorRippleState[]>([]);
  const particleCursorRef = useRef(0);
  const rippleCursorRef = useRef(0);
  const lastRippleTimeRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  const lastTapStampRef = useRef(0);
  const pointer = usePointerPosition(enabled);
  const { speedRef } = usePointerVelocity(pointer.positionRef, enabled);

  useEffect(() => {
    effectRef.current = effect;
    particlesRef.current = createCursorParticles(effect.maxParticles);
    ripplesRef.current = createCursorRipples(maxRipples);
    particleCursorRef.current = 0;
    rippleCursorRef.current = 0;
  }, [effect]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !enabled) {
      return undefined;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return undefined;
    }

    let frame = 0;
    let lastTime = performance.now();
    let hasVisibleFrame = false;

    const handleResize = () => resetCanvas(canvas, context);

    const emitParticles = (count: number, x: number, y: number, speed: number, angleSeed: number) => {
      const particles = particlesRef.current;

      if (!particles.length) {
        return;
      }

      for (let index = 0; index < count; index += 1) {
        const particle = particles[particleCursorRef.current];
        spawnParticle(particle, x, y, effectRef.current, speed, angleSeed + index * 0.7);
        particleCursorRef.current = (particleCursorRef.current + 1) % particles.length;
      }
    };

    const emitRipple = (x: number, y: number, strength: number) => {
      const ripples = ripplesRef.current;

      if (!effectRef.current.rippleEnabled || !ripples.length) {
        return;
      }

      const ripple = ripples[rippleCursorRef.current];
      spawnRipple(ripple, x, y, effectRef.current, strength);
      rippleCursorRef.current = (rippleCursorRef.current + 1) % ripples.length;
    };

    const drawGlow = (x: number, y: number, strength: number) => {
      const radius = effectRef.current.type === "fireflies" ? 82 : effectRef.current.type === "water" ? 76 : 68;
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, colorWithAlpha(effectRef.current.glowColor, 0.18 * strength));
      gradient.addColorStop(0.46, colorWithAlpha(effectRef.current.secondaryColor, 0.075 * strength));
      gradient.addColorStop(1, colorWithAlpha(effectRef.current.primaryColor, 0));
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const render = (time: number) => {
      const effectConfig = effectRef.current;
      const frameInterval = mobileMode ? 42 : effectConfig.type === "frost" || effectConfig.type === "fireflies" ? 34 : 26;

      if (time - lastTime < frameInterval) {
        frame = window.requestAnimationFrame(render);
        return;
      }

      const delta = Math.min(64, Math.max(12, time - lastTime));
      const pointerActive = pointer.activeRef.current;
      const pointerIsTouch = pointer.pointerTypeRef.current === "touch";
      const speed = speedRef.current;
      const x = pointer.positionRef.current.x;
      const y = pointer.positionRef.current.y;
      const hasLiveEffects =
        ripplesRef.current.some((ripple) => ripple.active) || particlesRef.current.some((particle) => particle.active);

      if (!pointerActive && !hasLiveEffects) {
        if (hasVisibleFrame) {
          context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          hasVisibleFrame = false;
        }

        lastTime = time;
        frame = window.requestAnimationFrame(render);
        return;
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";
      hasVisibleFrame = true;

      if (pointerActive && !reducedMotion && (!mobileMode || pointer.downRef.current || !pointerIsTouch)) {
        const strength = Math.min(1, 0.28 + speed * 1.25);
        const tapChanged = pointer.tapStampRef.current !== lastTapStampRef.current;
        const shouldRipple = effectConfig.rippleEnabled && (tapChanged || (speed > 0.12 && time - lastRippleTimeRef.current > (mobileMode ? 420 : 150)));
        const particleInterval = effectConfig.type === "fireflies" ? 95 : effectConfig.type === "frost" ? 72 : mobileMode ? 90 : 44;
        const particleCount = Math.min(
          effectConfig.type === "fireflies" ? 2 : effectConfig.type === "frost" ? 3 : mobileMode ? 3 : 6,
          Math.max(1, Math.round((effectConfig.type === "fireflies" ? 1 : 2) + speed * (mobileMode ? 4 : 7)))
        );

        drawGlow(x, y, strength);

        if (shouldRipple) {
          emitRipple(x, y, strength);
          lastRippleTimeRef.current = time;
        }

        if (tapChanged) {
          lastTapStampRef.current = pointer.tapStampRef.current;
          emitParticles(effectConfig.type === "fireflies" || effectConfig.type === "frost" ? (mobileMode ? 4 : 7) : mobileMode ? 8 : 12, x, y, 1, time * 0.004);
          lastParticleTimeRef.current = time;
        } else if (!pointerIsTouch && speed > (effectConfig.type === "fireflies" ? 0.055 : 0.045) && time - lastParticleTimeRef.current > particleInterval) {
          emitParticles(particleCount, x, y, speed, time * 0.002);
          lastParticleTimeRef.current = time;
        }
      }

      ripplesRef.current.forEach((ripple) => {
        if (!ripple.active) {
          return;
        }

        ripple.age += delta;
        if (ripple.age >= ripple.life) {
          ripple.active = false;
          return;
        }

        drawCursorRipple(context, ripple, effectConfig);
      });

      particlesRef.current.forEach((particle) => {
        if (!particle.active) {
          return;
        }

        particle.age += delta;
        if (particle.age >= particle.life) {
          particle.active = false;
          return;
        }

        if (effectConfig.type === "fireflies" && pointerActive) {
          particle.vx += (x - particle.x) * 0.0009;
          particle.vy += (y - particle.y) * 0.0009;
        } else if (effectConfig.type === "petals" && pointerActive) {
          particle.vx += (x - particle.x) * 0.00028;
          particle.vy += (y - particle.y) * 0.00028;
        }

        particle.x += particle.vx * (delta / 16.67);
        particle.y += particle.vy * (delta / 16.67);
        particle.vx *= effectConfig.type === "fireflies" ? 0.988 : 0.972;
        particle.vy *= effectConfig.type === "sand" ? 0.982 : 0.974;
        particle.spin += 0.018 * (delta / 16.67);

        drawCursorParticle(context, particle, effectConfig);
      });

      context.globalCompositeOperation = "source-over";
      lastTime = time;
      frame = window.requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled, mobileMode, pointer, reducedMotion, speedRef]);

  return <canvas ref={canvasRef} className="magic-cursor-canvas" />;
}
