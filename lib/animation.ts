export const journeyStops = [
  { id: "hero", label: "Start", href: "#hero" },
  { id: "experience", label: "Virtusa", href: "#experience" },
  { id: "carelon", label: "Carelon", href: "#experience" },
  { id: "philips", label: "Philips", href: "#experience" },
  { id: "ai", label: "AI Future", href: "#ai" },
  { id: "contact", label: "Contact", href: "#contact" }
];

export const navSections = [
  { label: "Start", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "AI", href: "#ai" },
  { label: "Contact", href: "#contact" }
];

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function activeIndexFromProgress(progress: number, total: number) {
  if (total <= 1) {
    return 0;
  }
  return Math.min(total - 1, Math.floor(clamp01(progress) * total));
}

export function stableActiveIndexFromProgress(progress: number, total: number, current: number) {
  if (total <= 1) {
    return 0;
  }

  const clamped = clamp01(progress);
  const next = activeIndexFromProgress(clamped, total);
  const safeCurrent = Math.min(total - 1, Math.max(0, current));
  const hysteresis = 0.012;

  if (Math.abs(next - safeCurrent) > 1 || clamped === 0 || clamped === 1) {
    return next;
  }

  if (next > safeCurrent && clamped >= (safeCurrent + 1) / total + hysteresis) {
    return next;
  }

  if (next < safeCurrent && clamped <= safeCurrent / total - hysteresis) {
    return next;
  }

  return safeCurrent;
}
