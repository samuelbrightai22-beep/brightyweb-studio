"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";

/**
 * Why Your Website Matters — client-focused framing inspired by
 * Golden Funnel Studio's "your business needs more than..." section.
 * Cream background, deep blue ink, gold accents.
 */
export function WhyMattersSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const points = [
    {
      n: "01",
      title: "Represents the brand properly",
      body:
        "Your website is part of your brand. The typography, the layout, the colors, the way images are framed — every choice either reinforces what your business stands for, or quietly works against it.",
    },
    {
      n: "02",
      title: "Makes information easy to understand",
      body:
        "Visitors don't read websites — they scan them. A good website organizes information so the right person understands what you do, who you do it for and what to do next within the first few seconds.",
    },
    {
      n: "03",
      title: "Works beautifully on every device",
      body:
        "Most of your visitors will arrive on a phone. A website that only looks good on a desktop is half a website. Every layout has to be planned for the phone first and the desktop second.",
    },
    {
      n: "04",
      title: "Builds trust",
      body:
        "People judge businesses by their websites. A clean, fast, well-structured site tells visitors the business pays attention to detail — and that they can be trusted with a customer's time and money.",
    },
    {
      n: "05",
      title: "Guides visitors toward taking action",
      body:
        "A website without a clear next step is a brochure. A good website quietly guides every visitor toward the action that matters — getting in touch, signing up, or making a purchase.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-[var(--paper)] text-[var(--ink)] section"
    >
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          {/* left: section heading */}
          <div className="md:sticky md:top-32 md:self-start">
            <SectionLabel tone="blue">Why your website matters</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(2rem,4vw,3.25rem)]"
            >
              Your website is often the first impression people have of
              <span className="font-display italic text-[var(--gold-deep)]">
                {" "}
                your business.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--ink)]/65"
            >
              Before a visitor reads a word, the website has already told them
              something. The goal of design is to make sure that first message is
              the one you actually want to send.
            </motion.p>
          </div>

          {/* right: list */}
          <ol className="divide-y divide-[var(--ink)]/10">
            {points.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid grid-cols-[auto_1fr] gap-6 py-8 md:gap-10"
              >
                <span className="numeral text-xs font-semibold text-[var(--gold-deep)] opacity-70">
                  ({p.n})
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[var(--ink)]/65">
                    {p.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
