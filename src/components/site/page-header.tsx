"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./section-label";
import { cn } from "@/lib/utils";

type Variant = "blue" | "cream" | "gold";

const variantClasses: Record<Variant, string> = {
  blue: "bg-[var(--blue-deep)] text-[var(--paper)]",
  cream: "bg-[var(--paper)] text-[var(--ink)]",
  gold: "bg-[var(--gold)] text-[var(--blue-deep)]",
};

const labelTone: Record<Variant, "gold" | "blue" | "ink"> = {
  blue: "gold",
  cream: "blue",
  gold: "ink",
};

/**
 * Inner-page editorial page header — Wix-style simpler version.
 */
export function PageHeader({
  label,
  title,
  titleAccent,
  accent,
  intro,
  variant = "blue",
  children,
}: {
  label: string;
  title: string;
  /** Optional second line of title (regular weight). */
  titleAccent?: string;
  /** Accent color word at the end of the title. */
  accent?: string;
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
      <div className="container-px mx-auto max-w-[1400px] pt-6">
        <SectionLabel tone={labelTone[variant]}>{label}</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight max-w-4xl"
        >
          {title}
          {titleAccent && (
            <>
              <br />
              {titleAccent}
            </>
          )}
          {accent && (
            <span className="text-[var(--gold)]"> {accent}</span>
          )}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed",
              variant === "blue" ? "text-[var(--paper)]/75" : "text-[var(--ink)]/65",
            )}
          >
            {intro}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
