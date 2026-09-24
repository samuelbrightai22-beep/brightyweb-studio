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

  // Detect scroll to switch header background to solid.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "bg-[var(--blue-deep)]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent",
        )}
      >
        <div className="container-px mx-auto flex h-[var(--header-h,72px)] max-w-[1600px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative flex items-center gap-2.5 py-2"
            aria-label={`${STUDIO.name} — home`}
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-md bg-[var(--gold)] font-display text-[1.05rem] leading-none text-[var(--blue-deep)]"
              aria-hidden="true"
            >
              B
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[0.95rem] font-semibold tracking-tight text-[var(--paper)]">
                {STUDIO.name}
              </span>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--paper)]/55">
                {STUDIO.tagline}
              </span>
            </span>
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
                    "relative px-4 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300",
                    active
                      ? "text-[var(--gold)]"
                      : "text-[var(--paper)]/70 hover:text-[var(--paper)]",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-[var(--gold)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
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
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--paper)] transition-colors hover:bg-white/5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Spacer so content starts below the fixed header */}
      <div className="h-[var(--header-h,72px)]" aria-hidden="true" />

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--blue-deep)] md:hidden"
            style={{ paddingTop: "var(--header-h,72px)" }}
          >
            <div className="container-px mx-auto flex h-full max-w-[1600px] flex-col">
              <nav className="flex flex-1 flex-col justify-center gap-2">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.05 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-baseline justify-between border-b border-white/5 py-5"
                      >
                        <span
                          className={cn(
                            "font-display text-5xl tracking-tight transition-colors",
                            active
                              ? "text-[var(--gold)]"
                              : "text-[var(--paper)] group-hover:text-[var(--gold)]",
                          )}
                        >
                          {link.label}
                        </span>
                        <span className="numeral text-xs font-medium text-[var(--paper)]/40">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.45, delay: 0.4 }}
                className="flex flex-col gap-3 py-8"
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
                  className="text-center text-sm text-[var(--paper)]/60 hover:text-[var(--gold)]"
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
