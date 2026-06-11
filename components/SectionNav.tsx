"use client";

import { Map, Send } from "lucide-react";
import { navSections } from "@/lib/animation";
import { useJourneyMotion } from "@/components/MotionProvider";
import { useTheme } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";

export function SectionNav() {
  const { activeStop } = useJourneyMotion();
  const { theme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/58 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 text-sm font-semibold text-white" aria-label="Go to start">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-white/[0.05] text-electric">
            UKM
          </span>
          <span className="hidden sm:inline">{theme.name} Journey</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navSections.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeStop >= Math.min(index, 5)
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#experience"
            className="hidden h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 text-sm font-semibold text-white transition hover:border-electric/60 hover:bg-electric/10 md:inline-flex"
          >
            <Map className="h-4 w-4" aria-hidden="true" />
            Trail
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 text-sm font-semibold text-white transition hover:border-electric/60 hover:bg-electric/10"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
}
