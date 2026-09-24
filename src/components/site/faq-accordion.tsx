"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = {
  q: string;
  a: string;
};

/**
 * Editorial FAQ accordion. Used on homepage and contact page.
 * Each item is a single thin row with a + / x icon and smooth expand.
 */
export function FaqAccordion({
  items,
  className,
  tone = "light",
}: {
  items: FaqItem[];
  className?: string;
  /** "light" = on light bg with ink text; "dark" = on blue bg with paper text */
  tone?: "light" | "dark";
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("w-full", className)}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className={cn(
            "group border-b transition-colors",
            tone === "dark"
              ? "border-white/10 hover:border-[var(--gold)]/40"
              : "border-[var(--ink)]/10 hover:border-[var(--ink)]/30",
          )}
        >
          <AccordionTrigger
            className={cn(
              "items-center gap-6 py-6 text-left hover:no-underline",
              tone === "dark" ? "text-[var(--paper)]" : "text-[var(--ink)]",
            )}
          >
            <span className="numeral w-8 shrink-0 text-xs text-[var(--gold-deep)] opacity-70">
              0{i + 1}
            </span>
            <span className="flex-1 font-display text-lg tracking-tight md:text-xl">
              {item.q}
            </span>
            <Plus
              className="size-4 shrink-0 text-[var(--gold-deep)] transition-transform duration-300 group-data-[state=open]:rotate-45"
              aria-hidden="true"
            />
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "pl-14 text-[0.95rem] leading-relaxed",
              tone === "dark" ? "text-[var(--paper)]/70" : "text-[var(--ink)]/65",
            )}
          >
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
