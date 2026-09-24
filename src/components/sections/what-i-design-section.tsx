"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { SERVICES } from "@/lib/services";

/**
 * What I Design — Wix-style card grid (rounded cards with hover lift).
 */
export function WhatIDesignSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--paper)] text-[var(--ink)] section"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel tone="blue">What I design</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight"
            >
              One focus, done properly.
            </motion.h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--ink)]/65">
              Five core services, all centered on the same thing: designing
              professional websites for businesses and brands.
            </p>
          </div>
          <EditorialButton href="/services" variant="blue" withArrow>
            All services
          </EditorialButton>
        </div>

        {/* card grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.45,
                delay: 0.05 + i * 0.06,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/services#${service.slug}`}
                className="card-hover group block h-full rounded-2xl border border-[var(--ink)]/10 bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--blue)] font-bold text-[var(--gold)]">
                    {service.number}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-[var(--ink)]/30 transition-colors group-hover:text-[var(--blue)]"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-[var(--ink)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/65">
                  {service.summary}
                </p>
              </Link>
            </motion.div>
          ))}

          {/* 6th tile = CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.45, delay: 0.05 + 5 * 0.06, ease: "easeOut" }}
          >
            <Link
              href="/contact"
              className="card-hover group block h-full rounded-2xl bg-[var(--blue)] p-6 text-[var(--paper)]"
            >
              <div className="flex items-center gap-2 text-[var(--gold)]">
                <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                  Not sure?
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                Start a project
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--paper)]/70">
                Tell me what you&apos;re building and I&apos;ll help you figure out
                which service fits best.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)]">
                Get in touch
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>

        <p className="mt-10 text-sm text-[var(--ink)]/45">
          Every website is designed mobile-first — responsive layouts are part of
          every build, not a separate service.
        </p>
      </div>
    </section>
  );
}
