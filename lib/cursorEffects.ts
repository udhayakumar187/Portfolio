import type { CursorEffectType, ThemeConfig } from "@/data/themes";

export type CursorParticleKind = "spark" | "dust" | "firefly" | "mist" | "petal";

export type CursorParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  spin: number;
  active: boolean;
  kind: CursorParticleKind;
};

export type CursorRippleState = {
  x: number;
  y: number;
  age: number;
  life: number;
  radius: number;
  strength: number;
  active: boolean;
};

export type CursorEffectRuntime = {
  type: CursorEffectType;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  particleColor: string;
  maxParticles: number;
  rippleEnabled: boolean;
};

export function resolveCursorEffect(theme: ThemeConfig, mobileMode: boolean, reducedMotion: boolean): CursorEffectRuntime {
  const particleScale = reducedMotion ? 0.14 : mobileMode ? 0.46 : 1;

  return {
    ...theme.cursorEffect,
    maxParticles: Math.max(0, Math.round(theme.cursorEffect.maxParticles * particleScale)),
    rippleEnabled: theme.cursorEffect.rippleEnabled && !reducedMotion
  };
}

export function createCursorParticles(maxParticles: number): CursorParticle[] {
  return Array.from({ length: maxParticles }, () => ({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    age: 0,
    life: 1,
    size: 1,
    spin: 0,
    active: false,
    kind: "spark"
  }));
}

export function createCursorRipples(maxRipples: number): CursorRippleState[] {
  return Array.from({ length: maxRipples }, () => ({
    x: -1000,
    y: -1000,
    age: 0,
    life: 1,
    radius: 1,
    strength: 0,
    active: false
  }));
}

export function colorWithAlpha(hexColor: string, alpha: number) {
  const hex = hexColor.replace("#", "");
  const normalizedHex = hex.length === 3 ? hex.split("").map((value) => `${value}${value}`).join("") : hex;
  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${Math.max(0, Math.min(1, alpha))})`;
}

export function particleKindForEffect(type: CursorEffectType): CursorParticleKind {
  if (type === "sand") {
    return "dust";
  }

  if (type === "fireflies") {
    return "firefly";
  }

  if (type === "water") {
    return "mist";
  }

  if (type === "petals") {
    return "petal";
  }

  return "spark";
}

export function cursorRippleLife(type: CursorEffectType) {
  return type === "water" ? 1180 : type === "sand" ? 980 : type === "petals" ? 860 : 760;
}

export function cursorParticleLife(type: CursorEffectType) {
  return type === "fireflies" ? 2200 : type === "petals" ? 1600 : type === "water" ? 1100 : type === "sand" ? 1250 : 1000;
}
