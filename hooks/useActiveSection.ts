"use client";

import { useEffect, useState } from "react";

export type ActiveSectionId = "hero" | "experience" | "skills" | "work" | "ai" | "contact";

const defaultSectionIds: ActiveSectionId[] = ["hero", "experience", "skills", "work", "ai", "contact"];

export function useActiveSection(sectionIds: ActiveSectionId[] = defaultSectionIds) {
  const [activeSection, setActiveSection] = useState<ActiveSectionId>("hero");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return undefined;
    }

    const scores = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          scores.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextSection: ActiveSectionId = "hero";
        let nextScore = 0;

        sectionIds.forEach((id) => {
          const score = scores.get(id) ?? 0;
          if (score > nextScore) {
            nextScore = score;
            nextSection = id;
          }
        });

        if (nextScore > 0) {
          setActiveSection((current) => (current === nextSection ? current : nextSection));
        }
      },
      {
        root: null,
        rootMargin: "-24% 0px -42% 0px",
        threshold: [0.08, 0.18, 0.32, 0.48, 0.64]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
