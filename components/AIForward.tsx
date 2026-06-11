"use client";

import { TerminalSquare } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { aiKeywords } from "@/data/profile";

export function AIForward() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="ai" aria-labelledby="ai-title" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold text-electric">AI Forward</p>
            <h2 id="ai-title" className="text-3xl font-semibold text-white sm:text-5xl">
              Exploring the next generation of software engineering.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Exploring the next generation of software engineering with Generative AI, Spring AI, RAG,
              MCP, AI agents, prompt engineering, and AI-assisted development tools such as ChatGPT,
              Claude, GitHub Copilot, and Codex.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {aiKeywords.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.025 }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            className="glass-panel relative min-h-[32rem] overflow-hidden rounded-lg p-5 sm:p-7"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-grid-lines bg-[length:38px_38px] opacity-[0.12]" aria-hidden="true" />
            <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 520 520" aria-hidden="true">
              <defs>
                <linearGradient id="aiLine" x1="0" x2="1" y1="0" y2="1">
                  <stop stopColor="#49D3FF" />
                  <stop offset="0.58" stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#7CF7D4" />
                </linearGradient>
              </defs>
              {[70, 150, 240, 340, 450].map((y, index) => (
                <motion.path
                  key={y}
                  d={`M30 ${y} C160 ${y - 90} 280 ${y + 90} 490 ${y - 24}`}
                  fill="none"
                  stroke={index % 2 === 0 ? "url(#aiLine)" : "rgba(255,255,255,0.18)"}
                  strokeWidth="1.4"
                  initial={prefersReducedMotion ? false : { pathLength: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.25, delay: index * 0.09, ease: "easeOut" }}
                />
              ))}
              {[80, 190, 300, 420].map((x, index) => (
                <motion.circle
                  key={x}
                  cx={x}
                  cy={index % 2 === 0 ? 178 : 334}
                  r="5"
                  fill={index % 2 === 0 ? "#49D3FF" : "#7CF7D4"}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: [0.45, 1, 0.45],
                          scale: [1, 1.35, 1]
                        }
                  }
                  transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.25 }}
                />
              ))}
            </svg>

            <div className="relative ml-auto flex max-w-md flex-col rounded-lg border border-white/12 bg-ink/75 p-5 shadow-2xl">
              <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
                <TerminalSquare className="h-4 w-4 text-electric" aria-hidden="true" />
                agentic-workflow.ts
              </div>
              <pre className="overflow-hidden whitespace-pre-wrap text-sm leading-6 text-slate-300">
                <code>{`const workflow = compose({
  context: "healthtech",
  stack: ["Spring AI", "RAG", "MCP"],
  goal: "ship reliable software",
});

await engineer.with({
  humanJudgment: true,
  aiAssistance: "focused",
  productionCare: "always",
});`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
