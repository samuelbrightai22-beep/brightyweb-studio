"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";

const PRINCIPLES = [
  {
    n: "01",
    title: "Thoughtful design",
    body:
      "Every layout decision has a reason — the type size, the spacing, the placement of a button. Nothing is decorative for the sake of it. The result is a website that feels considered rather than assembled.",
  },
  {
    n: "02",
    title: "Clear structure",
    body:
      "Visitors shouldn't have to think about where to go next. The hierarchy, the navigation and the calls to action work together to make the path from landing on the site to taking the next step obvious.",
  },
  {
    n: "03",
    title: "Responsive layouts",
    body:
      "The phone layout is designed first, not squeezed out of the desktop design afterward. Every breakpoint is intentional, so the website looks considered on every screen rather than just acceptable.",
  },
  {
    n: "04",
    title: "Strong visual hierarchy",
    body:
      "What's most important on the page should be the first thing the eye lands on. Type scale, color and spacing are used deliberately to lead the visitor's attention where it needs to go.",
  },
  {
    n: "05",
    title: "User-friendly experiences",
    body:
      "Fast pages. Readable text. Buttons that look like buttons. Forms that don't fight you. A website should feel easy to use, not because the design is loud, but because the experience is honest.",
  },
  {
    n: "06",
    title: "Business-focused websites",
    body:
      "A website exists to help a business grow — earn trust, communicate clearly, turn visitors into enquiries. The design choices serve the business goal, not the other way around.",
  },
];

export function WhyWorkWithMeSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--paper)] text-[var(--ink)] section"
    >
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          {/* left: heading + cta */}
          <div className="md:sticky md:top-32 md:self-start">
            <SectionLabel tone="blue">Why work with me</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(2rem,4vw,3.25rem)]"
            >
              I care about how the website looks
              <span className="font-display italic text-[var(--gold-deep)]">
                {" "}
                and how people experience it.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--ink)]/65"
            >
              The work is about both — design that earns trust in the first
              five seconds, and an experience that holds up after the visitor
              starts to actually use the website.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <EditorialButton href="/about" variant="blue" withArrow>
                More about the studio
              </EditorialButton>
            </motion.div>
          </div>

          {/* right: principles grid */}
          <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--ink)]/10 bg-[var(--ink)]/10 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative bg-[var(--paper)] p-7 transition-colors hover:bg-[var(--cream)] md:p-8"
              >
                <span className="numeral text-xs font-semibold text-[var(--gold-deep)] opacity-70">
                  ({p.n})
                </span>
                <h3 className="mt-4 font-display text-xl tracking-tight md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--ink)]/65">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
