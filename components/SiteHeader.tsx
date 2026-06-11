import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "AI", href: "#ai" }
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/68 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 font-semibold text-white" aria-label="Go to hero">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-white/[0.05] text-sm text-electric">
            UKM
          </span>
          <span className="hidden sm:inline">{profile.title}</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 text-sm font-semibold text-white transition hover:border-electric/60 hover:bg-electric/10"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Contact</span>
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
