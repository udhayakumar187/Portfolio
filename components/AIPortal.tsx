"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const keywords = [
  { label: "Generative AI", tip: "AI systems that create and transform software-relevant content" },
  { label: "Spring AI", tip: "AI application development in the Spring ecosystem" },
  { label: "RAG", tip: "Retrieval-Augmented Generation" },
  { label: "MCP", tip: "Model Context Protocol" },
  { label: "AI Agents", tip: "Tool-using intelligent workflows" },
  { label: "Prompt Engineering", tip: "Clear instruction design for reliable AI output" },
  { label: "ChatGPT", tip: "AI-assisted development and reasoning workflows" },
  { label: "Claude", tip: "AI collaboration for analysis and implementation" },
  { label: "GitHub Copilot", tip: "Code completion and assisted implementation" },
  { label: "Codex", tip: "Agentic coding workflows for software delivery" }
];

const terminalLines = [
  "scan: healthtech systems + cloud paths",
  "index: rag context, mcp tools, agent plans",
  "output: reliable AI-assisted engineering"
];

export function AIPortal() {
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  return (
    <section id="ai" aria-labelledby="ai-title" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold text-electric">{theme.name} AI Portal</p>
            <h2 id="ai-title" className="text-3xl font-semibold text-white sm:text-5xl">
              The {theme.name.toLowerCase()} trail opens into a future lab.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Exploring the next generation of software engineering with Generative AI, Spring AI, RAG,
              MCP, AI agents, prompt engineering, and AI-assisted development tools such as ChatGPT,
              Claude, GitHub Copilot, and Codex.
            </p>
          </div>

          <motion.div
            className="ai-card adventure-card relative min-h-[34rem] overflow-hidden rounded-lg p-6"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="portal-ring absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden="true" />
            <div className="relative z-10 flex h-full min-h-[30rem] flex-wrap content-center items-center justify-center gap-3 px-1 pb-32 pt-8 sm:pb-28">
              {keywords.map((keyword) => (
                <span key={keyword.label} className="group relative">
                  <button
                    type="button"
                    className="rounded-full border border-white/10 bg-ink/70 px-3 py-2 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-electric/60 hover:bg-electric/10 hover:text-white"
                  >
                    {keyword.label}
                  </button>
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-md border border-white/10 bg-ink px-3 py-2 text-xs leading-5 text-slate-200 opacity-0 shadow-2xl transition group-hover:opacity-100 group-focus-within:opacity-100">
                    {keyword.tip}
                  </span>
                </span>
              ))}
            </div>
            <motion.div
              className="ai-terminal absolute inset-x-5 bottom-5 z-20 rounded-md border border-white/15 bg-ink/72 p-4 font-mono text-xs leading-6 text-slate-200 shadow-soft-glow backdrop-blur-xl"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              aria-label="AI engineering terminal preview"
            >
              {terminalLines.map((line) => (
                <p
                  key={line}
                  className="flex min-w-0 items-center gap-2"
                >
                  <span className="text-electric">$</span>
                  <span className="min-w-0 break-words">{line}</span>
                </p>
              ))}
              <span
                className="ai-cursor mt-1 inline-block h-4 w-2 bg-electric/80 align-middle"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
