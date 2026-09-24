"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { ProjectCard } from "@/components/site/project-card";
import { getFeaturedProjects } from "@/lib/portfolio";

/**
 * Selected Work — Wix-style portfolio grid.
 */
export function SelectedWorkSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const projects = getFeaturedProjects(2);

  return (
    <section
      ref={ref}
      id="work"
      className="relative bg-[var(--blue-deep)] text-[var(--paper)] section"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel tone="gold">Selected Work</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight"
            >
              Websites designed to give brands a stronger presence online.
            </motion.h2>
          </div>
          <EditorialButton href="/work" variant="outline-light" withArrow>
            View all work
          </EditorialButton>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-16 text-center text-[var(--paper)]/50">
            Projects coming soon. Add them in{" "}
            <code>src/lib/portfolio.ts</code>.
          </p>
        )}
      </div>
    </section>
  );
}
