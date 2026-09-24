"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body:
      "Understand the business, the audience and the goals. Before a single layout is drawn, the project starts with a conversation about who the website is for and what it needs to do.",
  },
  {
    n: "02",
    title: "Structure",
    body:
      "Plan the pages, the content and the user journey. The information architecture is mapped out — which pages the site needs, what each one is for, and how a visitor moves between them.",
  },
  {
    n: "03",
    title: "Design",
    body:
      "Create the visual direction and the responsive layouts. The typography, the color system, the page composition and the mobile layout are all designed intentionally, then reviewed before any code is written.",
  },
  {
    n: "04",
    title: "Build",
    body:
      "Turn the approved design into a functional, fast, responsive website. Every page is implemented as a real, working webpage — not a static mockup — and tested on real devices as it goes.",
  },
  {
    n: "05",
    title: "Launch",
    body:
      "Test everything and prepare the website for launch. Final checks on performance, mobile, links, SEO and content — then the site is deployed, the domain is connected, and the website goes live.",
  },
];

export function ProcessSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--blue)] text-[var(--paper)] section grain"
    >
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="max-w-2xl">
          <SectionLabel tone="gold">Design process</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-6 text-[clamp(2rem,4.5vw,3.75rem)]"
          >
            We start with the journey.
            <span className="font-display italic text-[var(--gold)]">
              {" "}
              Then build the website.
            </span>
          </motion.h2>
        </div>

        {/* editorial numbered process — strong typography, not card grid */}
        <ol className="mt-16 grid gap-px md:grid-cols-5">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col gap-4 border-t border-white/15 pt-8 md:pr-8"
            >
              <span className="numeral font-display text-6xl text-[var(--gold)] opacity-90 md:text-7xl">
                {step.n}
              </span>
              <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                {step.title}
              </h3>
              <p className="max-w-xs text-[0.9rem] leading-relaxed text-[var(--paper)]/65">
                {step.body}
              </p>
              <span className="mt-4 hidden h-px w-full bg-gradient-to-r from-[var(--gold)]/60 to-transparent md:block" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
