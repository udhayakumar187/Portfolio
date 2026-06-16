"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { ParticleType } from "@/data/themes";

type PortalParticlesProps = {
  colors: [string, string, string];
  particleType: ParticleType;
  duration: number;
  reducedMotion: boolean;
};

function seededNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123;
  return value - Math.floor(value);
}

function particleGlyph(type: ParticleType) {
  if (type === "petals") {
    return "rounded-[70%_30%_70%_30%]";
  }

  if (type === "dust" || type === "mist") {
    return "rounded-full blur-[1px]";
  }

  if (type === "fireflies") {
    return "rounded-full shadow-[0_0_18px_currentColor]";
  }

  return "rounded-full";
}

export function PortalParticles({ colors, particleType, duration, reducedMotion }: PortalParticlesProps) {
  const particleCount = useMemo(() => {
    if (reducedMotion) {
      return 0;
    }

    const mobile = typeof window !== "undefined" && window.innerWidth < 720;
    return mobile ? 30 : 66;
  }, [reducedMotion]);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, index) => {
      const left = seededNoise(index * 7 + 1) * 100;
      const top = seededNoise(index * 7 + 2) * 100;
      const size = 3 + seededNoise(index * 7 + 3) * 8;
      const color = colors[index % colors.length];
      const driftX = (50 - left) * (0.18 + seededNoise(index * 7 + 4) * 0.28);
      const driftY = (50 - top) * (0.18 + seededNoise(index * 7 + 5) * 0.28);

      return {
        color,
        delay: seededNoise(index * 7 + 6) * duration * 0.28,
        driftX,
        driftY,
        left,
        rotate: (seededNoise(index * 7 + 7) - 0.5) * 260,
        size,
        top
      };
    });
  }, [colors, duration, particleCount]);

  if (!particleCount) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className={`absolute block ${particleGlyph(particleType)}`}
          style={{
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particleType === "fireflies" ? 18 : 10}px ${particle.color}`,
            color: particle.color,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particleType === "petals" ? particle.size * 1.8 : particle.size
          }}
          initial={{ opacity: 0, scale: 0.35, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, particleType === "dust" ? 0.34 : 0.72, 0],
            scale: [0.35, 1.1, 0.58],
            x: `${particle.driftX}vw`,
            y: `${particle.driftY}vh`,
            rotate: particle.rotate
          }}
          transition={{
            delay: particle.delay,
            duration: duration * 0.82,
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      ))}
    </div>
  );
}
