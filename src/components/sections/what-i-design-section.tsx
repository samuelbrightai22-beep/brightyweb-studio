"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { SERVICES } from "@/lib/services";

/**
 * What I Design — editorial services list (not a card grid).
 * Deep blue background, paper text, gold accents.
 */
export function WhatIDesignSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--blue)] text-[var(--paper)] section grain"
    >
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel tone="gold">What I design</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(2rem,4.5vw,3.75rem)]"
            >
              One focus, done properly
              <span className="font-display italic text-[var(--gold)]">
                {" "}
                — premium websites, end to end.
              </span>
            </motion.h2>
          </div>
          <EditorialButton href="/services" variant="outline-light" withArrow>
            All services
          </EditorialButton>
        </div>

        {/* services list */}
        <div className="mt-16 border-t border-white/10">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/services#${service.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-white/10 py-8 transition-colors hover:border-[var(--gold)]/40 md:gap-10 md:py-10"
              >
                <span className="numeral text-sm font-semibold text-[var(--gold)] opacity-70">
                  ({service.number})
                </span>
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
                  <h3 className="font-display text-2xl tracking-tight transition-colors group-hover:text-[var(--gold)] md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="max-w-xl text-[0.95rem] leading-relaxed text-[var(--paper)]/65">
                    {service.summary}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-[var(--paper)]/60 transition-all duration-300 group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--blue-deep)]">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* footnote about responsiveness */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-sm text-[var(--paper)]/40"
        >
          Every website is designed mobile-first — responsive layouts are part
          of every build, not a separate service.
        </motion.p>
      </div>
    </section>
  );
}
