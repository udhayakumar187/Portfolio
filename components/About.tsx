import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold text-electric">About</p>
            <h2 id="about-title" className="text-3xl font-semibold text-white sm:text-5xl">
              Engineering dependable systems for high-trust domains.
            </h2>
          </div>
          <div className="glass-panel rounded-lg p-6 sm:p-8">
            <p className="text-lg leading-8 text-slate-300">{profile.about}</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                ["7+", "Years"],
                ["3", "Domains"],
                ["Cloud", "Native"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-4">
                  <div className="text-2xl font-semibold text-white">{value}</div>
                  <div className="mt-1 text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
