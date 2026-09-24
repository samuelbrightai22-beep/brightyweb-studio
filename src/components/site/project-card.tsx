"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Variant = "feature" | "compact";

/**
 * Premium editorial project card. Renders the project's cover image inside
 * a browser frame, with project metadata and a hover reveal.
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
  const isGold = project.theme === "gold";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.8,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group", className)}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block"
        aria-label={`View project: ${project.title}`}
      >
        {/* mockup */}
        <div className="relative overflow-hidden rounded-xl border border-black/10 shadow-[0_30px_80px_-30px_rgba(7,22,41,0.45)]">
          {/* chrome */}
          <div
            className={cn(
              "flex h-9 items-center gap-1.5 px-4",
              isGold ? "bg-[var(--gold-soft)]" : "bg-[var(--ink)]",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isGold ? "bg-[var(--ink)]/30" : "bg-[var(--blue-soft)]",
              )}
            />
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isGold ? "bg-[var(--ink)]/30" : "bg-[var(--blue-soft)]",
              )}
            />
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            <div
              className={cn(
                "ml-3 hidden h-5 max-w-[40%] flex-1 items-center rounded-full px-3 text-[10px] font-medium tracking-tight sm:flex",
                isGold
                  ? "bg-[var(--gold-soft)]/60 text-[var(--ink)]/60"
                  : "bg-[var(--blue-deep)]/70 text-white/50",
              )}
            >
              {project.url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "view case study"}
            </div>
          </div>
          {/* image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            {/* hover overlay */}
            <div className="absolute inset-0 bg-[var(--blue-deep)]/0 transition-colors duration-500 group-hover:bg-[var(--blue-deep)]/30" />
            <div className="absolute right-5 top-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[var(--gold)] text-[var(--blue-deep)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
        {/* meta */}
        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-[var(--gold-deep)]">
              {project.category} — {project.year}
            </p>
            <h3
              className={cn(
                "mt-2 font-display tracking-tight",
                variant === "feature" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
              )}
            >
              {project.title}
            </h3>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-xs text-[var(--ink)]/50">{project.client}</p>
          </div>
        </div>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[var(--ink)]/65">
          {project.summary}
        </p>
      </Link>
    </motion.div>
  );
}
