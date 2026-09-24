"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Variant = "feature" | "compact";

/**
 * Wix-style project card — rounded image card with overlay info on hover.
 */
export function ProjectCard({
  project,
  variant = "feature",
  index = 0,
  className,
}: {
  project: Project;
  variant?: Variant;
  index?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        delay: (index % 2) * 0.08,
        ease: "easeOut",
      }}
      className={cn("group", className)}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block"
        aria-label={`View project: ${project.title}`}
      >
        {/* image card */}
        <div className="card-hover relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)]">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {/* hover overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--blue-deep)]/90 via-[var(--blue-deep)]/30 to-transparent p-6 opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
            <span className="inline-flex h-10 w-10 items-center justify-center self-end rounded-full bg-[var(--gold)] text-[var(--blue-deep)]">
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
        {/* meta below card */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gold)]">
            {project.category} — {project.year}
          </p>
          <h3
            className={cn(
              "mt-2 font-bold tracking-tight text-[var(--paper)]",
              variant === "feature" ? "text-2xl" : "text-xl",
            )}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--paper)]/65">
            {project.summary}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
