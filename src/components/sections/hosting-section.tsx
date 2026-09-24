"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { STUDIO } from "@/lib/studio";

/**
 * $11/year hosting section.
 * Yellow background, deep blue typography, blue CTA — visually distinct,
 * but premium rather than cheap-feeling. Honest copy only.
 */
export function HostingSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const included = [
    "Reliable shared hosting",
    "SSL certificate",
    "Custom domain setup",
    "Email forwarding",
    "Backup configuration",
  ];

  return (
    <section
      ref={ref}
      id="hosting"
      className="relative bg-[var(--gold)] text-[var(--blue-deep)] section"
    >
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="grid items-end gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
          {/* left: price + copy */}
          <div>
            <SectionLabel tone="ink">Website hosting</SectionLabel>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-baseline gap-3"
            >
              <span className="display text-[clamp(5rem,15vw,11rem)] leading-none text-[var(--blue-deep)]">
                {STUDIO.hosting.price}
              </span>
              <span className="font-display text-3xl italic text-[var(--blue-deep)]/60 md:text-5xl">
                /{STUDIO.hosting.cadence}
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-lg leading-relaxed text-[var(--blue-deep)]/75"
            >
              A real, simple hosting offer that comes with every Brightyweb
              website. No monthly bill, no surprise renewals — just a flat
              hosting cost that covers what your website actually needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <EditorialButton href="/contact" variant="blue" size="lg" withArrow>
                Get Started
              </EditorialButton>
              <EditorialButton href="/contact" variant="outline-dark" size="lg">
                Start Your Website
              </EditorialButton>
            </motion.div>
            <p className="mt-8 max-w-md text-xs leading-relaxed text-[var(--blue-deep)]/55">
              {STUDIO.hosting.price}/{STUDIO.hosting.cadence} is a flat hosting
              deployment cost — not a recurring subscription model. Available
              when hosting is bundled with a Brightyweb website project.
            </p>
          </div>

          {/* right: included panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--blue-deep)]/15 bg-[var(--gold-soft)]/40 p-8 md:p-10"
          >
            <p className="eyebrow text-[var(--blue-deep)]/60">What&apos;s included</p>
            <h3 className="mt-4 font-display text-2xl tracking-tight md:text-3xl">
              A real home for your new website.
            </h3>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[0.95rem] text-[var(--blue-deep)]"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--blue-deep)] text-[var(--gold)]">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-[var(--blue-deep)]/15 pt-6">
              <p className="text-xs leading-relaxed text-[var(--blue-deep)]/55">
                Brightyweb is a web design studio. Hosting is a supporting
                service that helps clients launch — it&apos;s not the main
                business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
