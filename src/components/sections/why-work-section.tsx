"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";

const PRINCIPLES = [
  {
    icon: "eye",
    title: "Thoughtful design",
    body:
      "Every layout decision has a reason — type size, spacing, button placement. Nothing is decorative for the sake of it.",
  },
  {
    icon: "layout",
    title: "Clear structure",
    body:
      "Visitors shouldn't think about where to go next. Hierarchy, navigation and CTAs work together to make the path obvious.",
  },
  {
    icon: "phone",
    title: "Responsive layouts",
    body:
      "The phone layout is designed first, not squeezed out of the desktop afterward. Every breakpoint is intentional.",
  },
  {
    icon: "layers",
    title: "Strong visual hierarchy",
    body:
      "What's most important is what the eye lands on first. Type scale, color and spacing lead attention deliberately.",
  },
  {
    icon: "heart",
    title: "User-friendly experiences",
    body:
      "Fast pages, readable text, buttons that look like buttons. A website should feel easy to use.",
  },
  {
    icon: "briefcase",
    title: "Business-focused websites",
    body:
      "A website exists to help a business grow. Design choices serve the business goal, not the other way around.",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  eye: <EyeIcon />,
  layout: <LayoutIcon />,
  phone: <PhoneIcon />,
  layers: <LayersIcon />,
  heart: <HeartIcon />,
  briefcase: <BriefcaseIcon />,
};

export function WhyWorkWithMeSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--paper)] text-[var(--ink)] section"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <SectionLabel tone="blue">Why work with me</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight"
          >
            I care about how the website looks and how people experience it.
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.06,
                ease: "easeOut",
              }}
              className="card-hover rounded-2xl border border-[var(--ink)]/10 bg-white p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--blue)]/10 text-[var(--blue)]">
                {ICONS[p.icon]}
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/65">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-10"
        >
          <EditorialButton href="/about" variant="blue" withArrow>
            More about the studio
          </EditorialButton>
        </motion.div>
      </div>
    </section>
  );
}

/* Lucide-style inline icons (kept inline so we don't add a new import surface) */
function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function LayoutIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2"/>
      <path d="M12 18h.01"/>
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18 8.18 4.6a1 1 0 0 1 0 1.7l-8.18 4.6a2 2 0 0 1-1.66 0L2.99 8.48a1 1 0 0 1 0-1.7l8.18-4.6a2 2 0 0 1 1.66 0Z"/>
      <path d="m2 12 9.17 5.16a2 2 0 0 0 1.66 0L22 12"/>
      <path d="m2 17 9.17 5.16a2 2 0 0 0 1.66 0L22 17"/>
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <path d="M2 11h20"/>
    </svg>
  );
}
