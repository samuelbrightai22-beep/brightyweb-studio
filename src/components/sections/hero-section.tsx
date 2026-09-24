"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { EditorialButton } from "@/components/site/editorial-button";
import { STUDIO } from "@/lib/studio";

/**
 * Homepage hero — Wix-style: solid deep blue background,
 * large bold sans headline, supporting copy, two buttons, image on the right.
 */
export function HeroSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--blue-deep)] text-[var(--paper)]"
    >
      {/* subtle soft blob accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[10%] h-[60vh] w-[60vh] rounded-full bg-[var(--blue)] opacity-50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] bottom-0 h-[35vh] w-[35vh] rounded-full bg-[var(--gold)] opacity-[0.08] blur-[120px]"
      />

      <div className="container-px mx-auto max-w-[1400px] pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 text-[var(--paper)]/60"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                </span>
                Accepting new projects
              </span>
              <span className="text-xs font-medium text-[var(--paper)]/45">
                — deployment from {STUDIO.hosting.price}/{STUDIO.hosting.cadence}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
            >
              We design websites people{" "}
              <span className="text-[var(--gold)]">remember.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--paper)]/75"
            >
              Modern, responsive websites designed around your brand, your
              audience and your goals — launched without expensive monthly
              hosting costs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <EditorialButton
                href="/work"
                variant="gold"
                size="lg"
                withArrow
                className="w-full sm:w-auto"
              >
                View My Work
              </EditorialButton>
              <EditorialButton
                href="/contact"
                variant="outline-light"
                size="lg"
                className="w-full sm:w-auto"
              >
                Start a Project
              </EditorialButton>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[var(--paper)]/60"
            >
              {["Fixed quotes", "Launch in 1–3 weeks", "Deployed from $11/year"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                    {item}
                  </li>
                ),
              )}
            </motion.ul>
          </div>

          {/* right: simple image card — Wix-style, not floating UI blobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <HeroMockup />
          </motion.div>
        </div>
      </div>

      {/* marquee strip */}
      <Marquee />
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--ink)] shadow-[0_40px_80px_-30px_rgba(7,22,41,0.6)]">
      {/* browser chrome */}
      <div className="flex h-10 items-center gap-1.5 bg-[var(--blue)] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--blue-soft)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--blue-soft)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
        <div className="mx-auto flex h-6 max-w-[60%] items-center rounded-full bg-[var(--blue-deep)] px-3 text-[11px] font-medium text-white/50">
          brightyweb.space-z.ai
        </div>
      </div>
      {/* mock content */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[var(--blue)] to-[var(--blue-deep)] p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px] font-semibold tracking-[0.12em] text-white/60">
          <span>BRIGHTYWEB</span>
          <span className="hidden sm:inline">HOME · ABOUT · SERVICES · WORK · CONTACT</span>
        </div>
        <div className="pt-6">
          <div className="h-3 w-2/3 rounded bg-[var(--gold)]/90" />
          <div className="mt-2 h-3 w-1/2 rounded bg-white/15" />
          <div className="mt-1.5 h-3 w-1/3 rounded bg-white/15 opacity-60" />
          <div className="mt-5 flex gap-2">
            <div className="h-7 w-24 rounded-full bg-[var(--gold)]" />
            <div className="h-7 w-24 rounded-full border border-white/25" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="h-16 rounded bg-white/[0.04]" />
            <div className="h-16 rounded bg-white/[0.08]" />
            <div className="h-16 rounded bg-[var(--gold)]/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = [
    "Web Design Studio",
    "Website Design",
    "Website Redesign",
    "Landing Page Design",
    "Business Website Design",
    "E-commerce Website Design",
    "Deployed from $11/year",
    "Mobile-first Responsive Build",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[var(--blue-deep)] py-4">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--paper)]/45">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--gold)]/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
