"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PRIMARY_CTA, STUDIO } from "@/lib/studio";
import { EditorialButton } from "./editorial-button";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [logoOk, setLogoOk] = React.useState(true);

  // Detect scroll to switch header background to solid.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open.
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on route change.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "bg-white shadow-[0_1px_0_rgba(7,22,41,0.08)]"
            : "bg-white shadow-[0_1px_0_rgba(7,22,41,0.08)]",
        )}
      >
        <div className="container-px mx-auto flex h-[var(--header-h,72px)] max-w-[1400px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 py-2"
            aria-label={`${STUDIO.name} — home`}
          >
            {logoOk ? (
              <img
                src={STUDIO.logo.src}
                alt={STUDIO.logo.alt}
                height={STUDIO.logo.headerHeight}
                style={{
                  height: STUDIO.logo.headerHeight,
                  width: "auto",
                  objectFit: "contain",
                }}
                onError={() => setLogoOk(false)}
              />
            ) : (
              <span
                className="grid h-9 w-9 place-items-center rounded-md bg-[var(--blue)] font-sans text-[1.05rem] font-bold leading-none text-[var(--gold)]"
                aria-hidden="true"
              >
                B
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-4 py-2 text-[0.875rem] font-semibold transition-colors",
                    active
                      ? "text-[var(--blue)]"
                      : "text-[var(--ink)]/70 hover:text-[var(--blue)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <EditorialButton href={PRIMARY_CTA.href} variant="gold" size="sm" withArrow>
              {PRIMARY_CTA.label}
            </EditorialButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-[var(--ink)] transition-colors hover:bg-[var(--ink)]/5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Spacer so content starts below the fixed header */}
      <div className="h-[var(--header-h,72px)]" aria-hidden="true" />

      {/* Mobile menu overlay — Wix-style slide-down panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-[var(--header-h,72px)] z-40 bg-white shadow-[0_20px_40px_-20px_rgba(7,22,41,0.2)] md:hidden"
          >
            <div className="container-px mx-auto max-w-[1400px] py-4">
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.04 * i,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block border-b border-[var(--ink)]/5 py-4 text-lg font-semibold",
                          active ? "text-[var(--blue)]" : "text-[var(--ink)]",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, delay: 0.25 }}
                className="flex flex-col gap-3 py-6"
              >
                <EditorialButton
                  href={PRIMARY_CTA.href}
                  variant="gold"
                  size="lg"
                  withArrow
                  className="w-full"
                >
                  {PRIMARY_CTA.label}
                </EditorialButton>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="text-center text-sm font-medium text-[var(--ink)]/60 hover:text-[var(--blue)]"
                >
                  {STUDIO.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
