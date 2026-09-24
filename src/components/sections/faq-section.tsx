"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { FAQ_ITEMS } from "@/lib/faq";

export function FaqSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      id="faq"
      className="relative bg-[var(--cream)] text-[var(--ink)] section"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:gap-16">
          {/* left */}
          <div className="md:sticky md:top-32 md:self-start">
            <SectionLabel tone="blue">Common questions</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-5 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight"
            >
              Honest answers to the questions that come up most.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-5 max-w-md text-base leading-relaxed text-[var(--ink)]/65"
            >
              If something you want to know isn&apos;t here, send it through the
              contact form — every question gets a real reply within 24 hours.
            </motion.p>
          </div>

          {/* right: accordion */}
          <div className="rounded-2xl border border-[var(--ink)]/10 bg-white p-2 md:p-4">
            <FaqAccordion items={FAQ_ITEMS} tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
