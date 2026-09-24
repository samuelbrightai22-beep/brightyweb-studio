"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { NAV_LINKS, PRIMARY_CTA, STUDIO } from "@/lib/studio";
import { EditorialButton } from "./editorial-button";
import { SectionLabel } from "./section-label";

export function SiteFooter() {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-[var(--blue-deep)] text-[var(--paper)]"
    >
      {/* top divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      {/* main */}
      <div className="container-px mx-auto grid max-w-[1600px] gap-12 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
        {/* left: brand + cta */}
        <div className="flex flex-col justify-between gap-12">
          <div>
            <SectionLabel tone="gold">Next Step</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--paper)]"
            >
              Have a website in mind?
              <br />
              <span className="font-display italic text-[var(--gold)]">
                Let&apos;s build it.
              </span>
            </motion.h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <EditorialButton href={PRIMARY_CTA.href} variant="gold" size="lg" withArrow>
              {PRIMARY_CTA.label}
            </EditorialButton>
            <EditorialButton
              href={`mailto:${STUDIO.email}`}
              variant="outline-light"
              size="lg"
            >
              Email me instead
            </EditorialButton>
          </div>
        </div>

        {/* right: nav + contact */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="eyebrow text-[var(--paper)]/40">Navigation</p>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="editorial-link text-[var(--paper)]/85 hover:text-[var(--gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-[var(--paper)]/40">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="group inline-flex items-center gap-1.5 text-[var(--paper)]/85 hover:text-[var(--gold)]"
                >
                  <Mail size={14} />
                  <span className="editorial-link">{STUDIO.email}</span>
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href={STUDIO.instagram.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 text-[var(--paper)]/85 hover:text-[var(--gold)]"
                >
                  <Instagram size={14} />
                  <span className="editorial-link">{STUDIO.instagram.handle}</span>
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* big wordmark */}
      <div className="container-px mx-auto max-w-[1600px] overflow-hidden border-t border-white/5">
        <div
          aria-hidden="true"
          className="select-none py-12 text-center font-display text-[clamp(5rem,18vw,18rem)] leading-none text-[var(--paper)]/[0.04]"
        >
          {STUDIO.name}
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-px mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 py-6 text-xs text-[var(--paper)]/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {STUDIO.longName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            {STUDIO.hosting.note} · Web design studio
          </p>
        </div>
      </div>
    </footer>
  );
}
