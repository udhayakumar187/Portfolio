import { Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-ink to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-lines bg-[length:72px_72px] opacity-[0.08]" aria-hidden="true" />
      <div className="section-shell relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold text-electric">Contact</p>
          <h2 id="contact-title" className="text-4xl font-semibold text-white sm:text-6xl">
            Let&apos;s build something meaningful.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Available for architecture, cloud, full-stack, and AI engineering conversations.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft-glow transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              <Mail className="h-4 w-4 transition group-hover:-translate-y-0.5" aria-hidden="true" />
              <span className="min-w-0 break-all text-center">{profile.email}</span>
            </a>
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10"
            >
              <Linkedin className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
