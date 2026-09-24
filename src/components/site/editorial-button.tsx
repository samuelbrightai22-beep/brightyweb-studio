import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "blue" | "outline-light" | "outline-dark" | "ghost-light";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 ease-out rounded-full whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Primary: warm yellow background, deep blue text. Used on dark + light sections.
  gold: "bg-[var(--gold)] text-[var(--blue-deep)] hover:bg-[var(--gold-soft)] hover:-translate-y-0.5 shadow-[0_8px_30px_-12px_rgba(232,178,58,0.5)]",
  // Primary dark: deep blue background, white text. Used on yellow sections.
  blue: "bg-[var(--blue)] text-[var(--paper)] hover:bg-[var(--blue-soft)] hover:-translate-y-0.5 shadow-[0_8px_30px_-12px_rgba(7,22,41,0.5)]",
  // Outline on dark sections
  "outline-light":
    "bg-transparent text-[var(--paper)] border border-[var(--paper)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)]",
  // Outline on light sections
  "outline-dark":
    "bg-transparent text-[var(--ink)] border border-[var(--ink)]/25 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]",
  // Ghost on dark
  "ghost-light": "bg-transparent text-[var(--paper)] hover:text-[var(--gold)]",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.8125rem] px-4 py-2",
  md: "text-[0.875rem] px-5 py-2.5",
  lg: "text-[0.95rem] px-7 py-3.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
};

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type AsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function EditorialButton(props: AsLink | AsButton) {
  const {
    variant = "gold",
    size = "md",
    className,
    children,
    withArrow = false,
  } = props;

  const cls = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if (typeof props.href === "string") {
    const isExternal =
      props.external ||
      /^(https?:|mailto:|tel:|#)/.test(props.href);

    if (isExternal) {
      return (
        <a
          href={props.href}
          className={cls}
          target={props.href.startsWith("http") ? "_blank" : undefined}
          rel={props.href.startsWith("http") ? "noreferrer noopener" : undefined}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls}
    >
      {content}
    </button>
  );
}
