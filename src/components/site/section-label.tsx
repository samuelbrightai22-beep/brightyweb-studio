import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial eyebrow label. Renders like:
 *   — SELECTED WORK
 * Use `tone` to pick accent color (gold on dark, blue on light).
 */
export function SectionLabel({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "blue" | "ink" | "paper";
  className?: string;
}) {
  const color = {
    gold: "text-[var(--gold)]",
    blue: "text-[var(--blue)]",
    ink: "text-[var(--ink)]",
    paper: "text-[var(--paper)]",
  }[tone];

  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        color,
        className,
      )}
    >
      <span className="inline-block w-6 h-px bg-current opacity-60" />
      {children}
    </span>
  );
}
