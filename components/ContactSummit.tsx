import { Download, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactSummit() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative flex min-h-[86svh] items-center py-28 sm:py-36">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold text-mint">Final Destination</p>
          <h2 id="contact-title" className="text-4xl font-semibold text-white sm:text-6xl">
            Let&apos;s build something meaningful.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Available for conversations around software architecture, cloud engineering, distributed
            systems, healthcare technology, and AI-assisted engineering.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft-glow transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="min-w-0 break-all text-center">Send Email</span>
            </a>
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              Connect on LinkedIn
            </a>
            <a
              href="/Resume_udhayaKumar_ind.pdf"
              download
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-mint/60 hover:bg-mint/10"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
