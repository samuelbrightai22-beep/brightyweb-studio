"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink, MessageCircle } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Variant = "feature" | "compact";

/**
 * Wix-style project card with image, meta, and two CTAs:
 *   - "View Live Website" (external link, opens in new tab)
 *   - "Discuss a Similar Project" (internal → /start-a-project)
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
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        delay: (index % 2) * 0.08,
        ease: "easeOut",
      }}
      className={cn("group flex flex-col", className)}
    >
      {/* image card — links to the case study page on click */}
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="card-hover relative block overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)]"
      >
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
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      {/* meta below card */}
      <div className="mt-4 flex flex-1 flex-col">
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
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--paper)]/65">
          {project.summary}
        </p>

        {/* two CTA buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-4 py-2.5 text-xs font-bold tracking-tight text-[var(--blue-deep)] transition-all hover:-translate-y-0.5 hover:bg-[var(--gold-soft)]"
            >
              <ExternalLink size={13} />
              View Live Website
            </a>
          )}
          <Link
            href="/start-a-project"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-xs font-bold tracking-tight text-[var(--paper)] transition-all hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <MessageCircle size={13} />
            Discuss a Similar Project
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
