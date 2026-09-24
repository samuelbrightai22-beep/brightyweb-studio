"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { EditorialButton } from "@/components/site/editorial-button";

/**
 * Homepage hero — premium dark editorial with studio photograph
 * behind a controlled black overlay, content centered.
 */
export function HeroSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-black text-[var(--paper)]"
    >
      {/* background photograph */}
      <img
        src="/hero/studio.jpg"
        alt="Professional male web designer working at a computer in a modern creative studio"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        loading="eager"
      />
      {/* semi-transparent black overlay — keeps image visible, gives text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/35"
      />
      {/* subtle bottom-to-mid black gradient for premium editorial depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/30 to-black/50"
      />

      <div className="container-px mx-auto flex min-h-[88vh] max-w-[1400px] flex-col items-center justify-center py-24 text-center md:min-h-[92vh] md:py-32">
        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-[clamp(2.5rem,6.5vw,5rem)] font-bold leading-[1.05] tracking-tight"
        >
          We design websites people{" "}
          <span className="text-[var(--gold)]">remember.</span>
        </motion.h1>

        {/* supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg md:text-white/90"
        >
          Modern, responsive websites designed around your brand, your
          audience and your goals — launched without expensive monthly
          hosting costs.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
      </div>

      {/* marquee strip — unchanged */}
      <Marquee />
    </section>
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
