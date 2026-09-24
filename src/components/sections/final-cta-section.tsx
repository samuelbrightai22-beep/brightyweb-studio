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
      className="relative overflow-hidden bg-[var(--blue-deep)] text-[var(--paper)] section text-center"
    >
      {/* soft accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-0 h-[40vh] w-[40vh] rounded-full bg-[var(--blue)] opacity-60 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] bottom-0 h-[35vh] w-[35vh] rounded-full bg-[var(--gold)] opacity-[0.08] blur-[120px]"
      />

      <div className="container-px relative mx-auto max-w-[1400px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <SectionLabel tone="gold" className="justify-center">
            Let&apos;s talk
          </SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-tight tracking-tight"
          >
            Ready for a website that represents your business{" "}
            <span className="text-[var(--gold)]">properly?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--paper)]/75"
          >
            Tell me what you&apos;re building and let&apos;s create a website around
            it. No hard sell — just a real conversation about whether this is a
            good fit for what you need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
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
