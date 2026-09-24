"use client";

import * as React from "react";
import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { NAV_LINKS, PRIMARY_CTA, STUDIO } from "@/lib/studio";
import { EditorialButton } from "./editorial-button";

export function SiteFooter() {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [logoOk, setLogoOk] = React.useState(true);

  return (
    <footer
      ref={ref}
      className="relative bg-[var(--blue-deep)] text-[var(--paper)]"
    >
      {/* top CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-px mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gold)]">
              Next Step
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
            >
              Have a website in mind? Let&apos;s build it.
            </motion.h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
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
      </div>

      {/* main footer grid */}
      <div className="container-px mx-auto grid max-w-[1400px] gap-10 py-14 md:grid-cols-4">
        {/* brand block */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center" aria-label="Brightyweb — home">
            {logoOk ? (
              <img
                src={STUDIO.logo.src}
                alt={STUDIO.logo.alt}
                height={40}
                style={{ height: 40, width: "auto", objectFit: "contain" }}
                onError={() => setLogoOk(false)}
              />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--gold)] font-sans text-lg font-bold text-[var(--blue-deep)]">
                B
              </span>
            )}
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--paper)]/70">
            Premium website design for businesses and brands — launched without
            expensive monthly hosting costs.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gold)]">
            {STUDIO.tagline}
          </p>
        </div>

        {/* nav */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--paper)]/50">
            Navigation
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--paper)]/80 hover:text-[var(--gold)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--paper)]/50">
            Contact
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${STUDIO.email}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--paper)]/80 hover:text-[var(--gold)]"
              >
                <Mail size={14} />
                {STUDIO.email}
              </a>
            </li>
            <li>
              <a
                href={STUDIO.instagram.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-[var(--paper)]/80 hover:text-[var(--gold)]"
              >
                <Instagram size={14} />
                {STUDIO.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 py-6 text-xs text-[var(--paper)]/50 md:flex-row">
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
