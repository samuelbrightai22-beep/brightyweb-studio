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
      className="relative bg-[var(--paper)] text-[var(--ink)] section"
    >
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          {/* left */}
          <div className="md:sticky md:top-32 md:self-start">
            <SectionLabel tone="blue">Common questions</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(2rem,4vw,3.25rem)]"
            >
              Honest answers to
              <span className="font-display italic text-[var(--gold-deep)]">
                {" "}
                the questions that come up most.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--ink)]/65"
            >
              If something you want to know isn&apos;t here, send it through the
              contact form — every question gets a real reply within 24 hours.
            </motion.p>
          </div>

          {/* right: accordion */}
          <FaqAccordion items={FAQ_ITEMS} tone="light" />
        </div>
      </div>
    </section>
  );
}
