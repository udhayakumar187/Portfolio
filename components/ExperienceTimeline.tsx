"use client";

import { journeyExperiences } from "@/data/experiences";
import { ExperienceCard } from "@/components/ExperienceCard";
import { useJourneyMotion } from "@/components/MotionProvider";

export function ExperienceTimeline() {
  const { activeStop } = useJourneyMotion();

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-electric">Adventure Path</p>
          <h2 id="experience-title" className="text-3xl font-semibold text-white sm:text-5xl">
            Scroll through the checkpoints that shaped the engineering journey.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            The explorer moves through each location as the portfolio moves from foundation work to
            healthcare platforms and AI-assisted engineering.
          </p>
        </div>

        <div className="grid gap-14">
          {journeyExperiences.map((experience, index) => (
            <div key={experience.id} className="flex min-h-[72svh] items-center">
              <div className={`w-full ${index % 2 ? "lg:ml-auto lg:max-w-3xl" : "lg:max-w-3xl"}`}>
                <ExperienceCard experience={experience} index={index} active={activeStop >= index + 1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
