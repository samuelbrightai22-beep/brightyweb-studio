"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";

const POINTS = [
  {
    n: "01",
    title: "Represents the brand properly",
    body:
      "Your website is part of your brand. The typography, the layout, the colors — every choice either reinforces what your business stands for or works against it.",
  },
  {
    n: "02",
    title: "Makes information easy to understand",
    body:
      "Visitors scan, they don't read. A good website organizes information so the right person understands what you do and what to do next within seconds.",
  },
  {
    n: "03",
    title: "Works beautifully on every device",
    body:
      "Most of your visitors arrive on a phone. A website that only looks good on desktop is half a website. Every layout is planned for mobile first.",
  },
  {
    n: "04",
    title: "Builds trust",
    body:
      "People judge businesses by their websites. A clean, fast, well-structured site tells visitors the business pays attention to detail.",
  },
  {
    n: "05",
    title: "Guides visitors toward action",
    body:
      "A website without a clear next step is a brochure. A good website quietly guides every visitor toward the action that matters.",
  },
];

export function WhyMattersSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--cream)] text-[var(--ink)] section"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <SectionLabel tone="blue">Why your website matters</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight"
          >
            Your website is often the first impression people have of your{" "}
            <span className="text-[var(--gold-deep)]">business.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--ink)]/65"
          >
            Before a visitor reads a word, the website has already told them
            something. The goal of design is to make sure that first message is
            the one you actually want to send.
          </motion.p>
        </div>

        {/* Wix-style card grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.06,
                ease: "easeOut",
              }}
              className="card-hover rounded-2xl border border-[var(--ink)]/10 bg-white p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--blue)] font-bold text-sm text-[var(--gold)]">
                {p.n}
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/65">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
