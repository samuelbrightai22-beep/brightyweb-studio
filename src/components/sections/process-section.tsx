"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";

const STEPS = [
  {
    n: "1",
    title: "Discover",
    body:
      "Understand the business, the audience and the goals. Before a single layout is drawn, the project starts with a conversation about who the website is for and what it needs to do.",
  },
  {
    n: "2",
    title: "Structure",
    body:
      "Plan the pages, the content and the user journey. Information architecture is mapped out — which pages the site needs, what each one is for, and how a visitor moves between them.",
  },
  {
    n: "3",
    title: "Design",
    body:
      "Create the visual direction and the responsive layouts. Typography, color system, page composition and mobile layout are all designed intentionally before any code is written.",
  },
  {
    n: "4",
    title: "Build",
    body:
      "Turn the approved design into a functional, fast, responsive website. Every page is implemented as a real, working webpage — not a static mockup — and tested on real devices.",
  },
  {
    n: "5",
    title: "Launch",
    body:
      "Test everything and prepare the website for launch. Final checks on performance, mobile, links, SEO and content — then the site is deployed and goes live.",
  },
];

export function ProcessSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--blue)] text-[var(--paper)] section"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <SectionLabel tone="gold">Design process</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight"
          >
            We start with the journey. Then build the website.
          </motion.h2>
        </div>

        {/* horizontal step rail on desktop, vertical on mobile */}
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.08,
                ease: "easeOut",
              }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)] text-xl font-bold text-[var(--blue-deep)]">
                {step.n}
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--paper)]/70">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
