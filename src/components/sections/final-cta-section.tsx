"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { STUDIO } from "@/lib/studio";

export function FinalCtaSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--blue-deep)] text-[var(--paper)] section grain"
    >
      {/* decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] top-0 h-[50vh] w-[50vh] rounded-full bg-[var(--blue)] opacity-60 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] bottom-0 h-[40vh] w-[40vh] rounded-full bg-[var(--gold)] opacity-[0.08] blur-[120px]"
      />

      <div className="container-px relative mx-auto max-w-[1600px] text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <SectionLabel tone="gold" className="justify-center">
            Final CTA
          </SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-8 text-[clamp(2.5rem,6vw,5rem)]"
          >
            Ready for a website that represents
            <br className="hidden md:block" /> your business
            <span className="font-display italic text-[var(--gold)]">
              {" "}
              properly?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl body-prose text-[var(--paper)]/70"
          >
            Tell me what you&apos;re building and let&apos;s create a website
            around it. No hard sell — just a real conversation about whether
            this is a good fit for what you need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <EditorialButton href="/contact" variant="gold" size="lg" withArrow>
              Start a Project
            </EditorialButton>
            <EditorialButton
              href={`mailto:${STUDIO.email}`}
              variant="outline-light"
              size="lg"
            >
              Email me instead
            </EditorialButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
