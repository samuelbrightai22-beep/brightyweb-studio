"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { ProjectCard } from "@/components/site/project-card";
import { getFeaturedProjects } from "@/lib/portfolio";

/**
 * Selected Work — premium editorial portfolio presentation.
 * Alternates blue and yellow section backgrounds to create rhythm.
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
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel tone="gold">Selected Work</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(2rem,4.5vw,3.75rem)]"
            >
              Websites designed to give brands a
              <span className="font-display italic text-[var(--gold)]">
                {" "}
                stronger presence online.
              </span>
            </motion.h2>
          </div>
          <EditorialButton href="/work" variant="outline-light" withArrow>
            View all work
          </EditorialButton>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-16 text-center text-[var(--paper)]/50">
            Projects coming soon. Add them in <code>src/lib/portfolio.ts</code>.
          </p>
        )}
      </div>
    </section>
  );
}
