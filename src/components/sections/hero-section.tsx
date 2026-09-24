"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { EditorialButton } from "@/components/site/editorial-button";
import { SectionLabel } from "@/components/site/section-label";
import { RevealWords } from "@/components/site/reveal";
import { STUDIO } from "@/lib/studio";

/**
 * Homepage hero. Sells WEB DESIGN (not hosting).
 * Deep blue background, white typography, warm yellow italic accent.
 */
export function HeroSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--blue-deep)] text-[var(--paper)] grain"
    >
      {/* decorative blue gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] -top-[10%] h-[70vh] w-[70vh] rounded-full bg-[var(--blue)] opacity-50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] bottom-0 h-[40vh] w-[40vh] rounded-full bg-[var(--gold)] opacity-[0.06] blur-[120px]"
      />

      <div className="container-px mx-auto max-w-[1600px] pt-16 pb-24 md:pt-24 md:pb-32">
        {/* status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 text-[var(--paper)]/60"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium tracking-tight">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            </span>
            Accepting new projects
          </span>
          <span className="text-xs tracking-tight text-[var(--paper)]/45">
            — deployment from {STUDIO.hosting.price}/{STUDIO.hosting.cadence}
          </span>
        </motion.div>

        <div className="mt-8 grid items-end gap-12 md:mt-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          {/* headline + copy */}
          <div>
            <h1 className="display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95]">
              <RevealWords text="We design websites" delay={0.05} />
              <span className="block">
                <RevealWords text="people" delay={0.35} />
                {"\u00A0"}
                <span className="font-display italic text-[var(--gold)]">
                  <RevealWords text="remember." delay={0.45} />
                </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl body-prose text-[var(--paper)]/70"
            >
              Modern, responsive websites designed around your brand, your
              audience and your goals — launched without expensive monthly
              hosting costs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
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
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--paper)]/55"
            >
              {["Fixed quotes", "Launch in 1–3 weeks", "Deployed from $11/year"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />
                    {item}
                  </li>
                ),
              )}
            </motion.ul>
          </div>

          {/* right: floating mockup composition */}
          <HeroMockup />
        </div>
      </div>

      {/* marquee strip */}
      <Marquee />
    </section>
  );
}

function HeroMockup() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: -1.5 }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotate: -1.5 }
          : { opacity: 0, y: 30, rotate: -1.5 }
      }
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden md:block"
    >
      {/* mock browser */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--ink)] shadow-[0_50px_100px_-40px_rgba(7,22,41,0.7)]">
        <div className="flex h-9 items-center gap-1.5 bg-[var(--blue)] px-4">
          <span className="h-2 w-2 rounded-full bg-[var(--blue-soft)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--blue-soft)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
          <div className="mx-auto flex h-5 max-w-[50%] items-center rounded-full bg-[var(--blue-deep)] px-3 text-[10px] text-white/40">
            brightyweb.space-z.ai
          </div>
        </div>
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--blue)] to-[var(--blue-deep)] p-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3 text-[10px] text-white/50">
            <span className="font-semibold tracking-[0.18em]">BRIGHTYWEB</span>
            <span>HOME · ABOUT · SERVICES · WORK · CONTACT</span>
          </div>
          <div className="pt-6">
            <div className="h-3 w-2/3 rounded bg-[var(--gold)]/80" />
            <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
            <div className="mt-1 h-3 w-1/3 rounded bg-white/10 opacity-60" />
            <div className="mt-5 flex gap-2">
              <div className="h-7 w-24 rounded-full bg-[var(--gold)]" />
              <div className="h-7 w-24 rounded-full border border-white/20" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="h-16 rounded bg-white/[0.03]" />
              <div className="h-16 rounded bg-white/[0.06]" />
              <div className="h-16 rounded bg-[var(--gold)]/10" />
            </div>
          </div>
        </div>
      </div>

      {/* floating mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 30 }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: 30 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-12 -right-8 w-32 rotate-[6deg]"
      >
        <div className="overflow-hidden rounded-[1.4rem] border-2 border-[var(--ink)] bg-[var(--blue-deep)] shadow-[0_30px_60px_-30px_rgba(7,22,41,0.6)]">
          <div className="mx-auto mt-2 h-4 w-12 rounded-full bg-black/80" />
          <div className="p-3 pt-2">
            <div className="h-1.5 w-1/2 rounded bg-[var(--gold)]" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/15" />
            <div className="mt-3 h-12 rounded bg-white/[0.05]" />
            <div className="mt-2 h-1.5 w-1/2 rounded bg-white/10" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/10" />
            <div className="mt-3 h-6 w-full rounded-full bg-[var(--gold)]" />
          </div>
        </div>
      </motion.div>

      {/* floating tag */}
      <motion.div
        initial={{ opacity: 0, y: -10, x: -20 }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: -10, x: -20 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute -left-6 top-6 rounded-md border border-[var(--gold)]/40 bg-[var(--blue-deep)]/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--gold)] backdrop-blur"
      >
        Web Design
      </motion.div>
    </motion.div>
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
    <div className="relative overflow-hidden border-y border-white/5 bg-[var(--blue-deep)] py-4">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--paper)]/40">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--gold)]/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
