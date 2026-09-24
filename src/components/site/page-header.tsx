"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./section-label";
import { cn } from "@/lib/utils";

type Variant = "blue" | "cream" | "gold";

const variantClasses: Record<Variant, string> = {
  blue: "bg-[var(--blue-deep)] text-[var(--paper)] grain",
  cream: "bg-[var(--paper)] text-[var(--ink)]",
  gold: "bg-[var(--gold)] text-[var(--blue-deep)]",
};

const labelTone: Record<Variant, "gold" | "blue" | "ink"> = {
  blue: "gold",
  cream: "blue",
  gold: "ink",
};

/**
 * Inner-page editorial page header.
 * Big headline with optional italic accent + supporting copy.
 */
export function PageHeader({
  label,
  title,
  titleAccent,
  italicAccent,
  intro,
  variant = "blue",
  children,
}: {
  label: string;
  title: string;
  /** Optional second line of title (regular weight). */
  titleAccent?: string;
  /** Italic accent at the end of the title (gold or gold-deep). */
  italicAccent?: string;
  intro?: string;
  variant?: Variant;
  children?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden section-sm",
        variantClasses[variant],
      )}
    >
      <div className="container-px mx-auto max-w-[1600px] pt-8">
        <SectionLabel tone={labelTone[variant]}>{label}</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-8 text-[clamp(2.5rem,6vw,5rem)] max-w-5xl"
        >
          {title}
          {titleAccent && (
            <>
              <br />
              {titleAccent}
            </>
          )}
          {italicAccent && (
            <span className="font-display italic text-[var(--gold)]">
              {" "}
              {italicAccent}
            </span>
          )}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-8 max-w-2xl body-prose",
              variant === "blue" ? "text-[var(--paper)]/70" : "text-[var(--ink)]/65",
            )}
          >
            {intro}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
