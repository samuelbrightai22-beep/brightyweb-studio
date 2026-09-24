"use client";

import * as React from "react";
import { motion, type Variants, type UseInViewProps } from "framer-motion";
import { useInView } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "span" | "li" | "p";
};

/**
 * Generic scroll-reveal wrapper. Subtle, premium.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  as = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" } as UseInViewProps);
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word headline reveal. Splits a string into words and animates each.
 * Used for big editorial headlines.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" } as UseInViewProps);
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span variants={word} style={{ display: "inline-block" }}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
