import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Browser chrome frame for desktop screenshots.
 * Pass an <img> child as the page content.
 */
export function BrowserFrame({
  url = "brightyweb.space-z.ai",
  children,
  className,
  barTone = "auto",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
  /** "auto" picks dark chrome; pass "light" for light chrome variants */
  barTone?: "auto" | "light";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-black/10 bg-[var(--blue-deep)] shadow-[0_30px_80px_-30px_rgba(7,22,41,0.45)]",
        className,
      )}
    >
      {/* chrome */}
      <div
        className={cn(
          "flex h-10 items-center gap-2 border-b border-white/5 px-4",
          barTone === "light"
            ? "bg-[#F2D079] text-[var(--ink)]"
            : "bg-[var(--ink)] text-white/70",
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className={cn("h-2.5 w-2.5 rounded-full", barTone === "light" ? "bg-[var(--ink)]/30" : "bg-[var(--blue-soft)]")} />
          <span className={cn("h-2.5 w-2.5 rounded-full", barTone === "light" ? "bg-[var(--ink)]/30" : "bg-[var(--blue-soft)]")} />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
        </div>
        <div className="mx-auto flex items-center">
          <div
            className={cn(
              "flex h-6 w-[min(70%,30rem)] items-center justify-center rounded-full px-3 text-[11px] font-medium tracking-tight",
              barTone === "light" ? "bg-[var(--gold-soft)]/60 text-[var(--ink)]" : "bg-[var(--blue-deep)]/70 text-white/60",
            )}
          >
            {url}
          </div>
        </div>
      </div>
      {/* content */}
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * Phone frame for mobile screenshots.
 */
export function PhoneFrame({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] rounded-[2.4rem] p-2.5 shadow-[0_30px_80px_-30px_rgba(7,22,41,0.55)]",
        tone === "dark" ? "bg-[var(--ink)]" : "bg-[var(--ink)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.9rem]">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80" />
        {children}
      </div>
    </div>
  );
}
