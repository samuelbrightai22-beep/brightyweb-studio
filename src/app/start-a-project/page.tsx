"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const NEED_OPTIONS = [
  "New Website",
  "Website Redesign",
  "Landing Page",
  "Business Website",
  "E-commerce Website",
  "Other",
];

const PAGES_OPTIONS = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Shop",
  "Contact",
  "Blog",
  "Other",
];

const CONTENT_OPTIONS = [
  "Yes, everything is ready",
  "I have some content",
  "No, I need help",
];

const BUDGET_OPTIONS = ["Under $200", "$200–$500", "$500–$1,000", "$1,000+", "Not sure yet"];

const LAUNCH_OPTIONS = [
  "As soon as possible",
  "Within 2–4 weeks",
  "Within 1–2 months",
  "Flexible",
];

type Errors = Partial<Record<FieldName, string>>;
type FieldName =
  | "fullName"
  | "email"
  | "business"
  | "need"
  | "hasWebsite"
  | "currentUrl"
  | "goal"
  | "pages"
  | "contentStatus"
  | "styleRefs"
  | "budget"
  | "launchTime"
  | "projectDetails";

export default function StartAProjectPage() {
  const [values, setValues] = React.useState<Record<FieldName, string | string[]>>({
    fullName: "",
    email: "",
    business: "",
    need: "",
    hasWebsite: "",
    currentUrl: "",
    goal: "",
    pages: [],
    contentStatus: "",
    styleRefs: "",
    budget: "",
    launchTime: "",
    projectDetails: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [topError, setTopError] = React.useState<string | null>(null);

  function update(field: FieldName, value: string | string[]) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function togglePage(page: string) {
    setValues((v) => {
      const current = Array.isArray(v.pages) ? v.pages : [];
      const next = current.includes(page)
        ? current.filter((p) => p !== page)
        : [...current, page];
      return { ...v, pages: next };
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTopError(null);

    // Light client-side validation — server is the source of truth.
    const clientErrors: Errors = {};
    if (!String(values.fullName).trim()) clientErrors.fullName = "Please enter your full name.";
    if (!String(values.email).trim()) clientErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email)))
      clientErrors.email = "Please enter a valid email address.";
    if (!String(values.business).trim())
      clientErrors.business = "Please enter your business or brand name.";
    if (!String(values.need).trim()) clientErrors.need = "Please select what you need.";
    if (!String(values.hasWebsite).trim())
      clientErrors.hasWebsite = "Please let me know if you already have a website.";
    if (values.hasWebsite === "yes" && !String(values.currentUrl).trim())
      clientErrors.currentUrl = "Please enter your current website URL.";
    if (!String(values.goal).trim())
      clientErrors.goal = "Please describe the main goal of your website.";
    if (!String(values.contentStatus).trim())
      clientErrors.contentStatus = "Please select your content status.";
    if (!String(values.budget).trim()) clientErrors.budget = "Please select a budget range.";
    if (!String(values.launchTime).trim())
      clientErrors.launchTime = "Please select a desired launch time.";
    if (!String(values.projectDetails).trim())
      clientErrors.projectDetails = "Please tell me about your project.";

    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      // Scroll to first error
      const firstErr = document.querySelector('[data-error="true"]');
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    try {
      // Honeypot — hidden field that bots fill but real users never see.
      const payload = {
        ...values,
        company_website: "", // honeypot — must be empty
      };
      const res = await fetch("/api/start-a-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) {
          setErrors(data.errors as Errors);
          setTopError("Please check the highlighted fields and try again.");
        } else {
          setTopError(
            data?.error ??
              "We couldn't send your inquiry just now. Please try again, or email brightynexaistudio@gmail.com directly.",
          );
        }
        setSubmitting(false);
        return;
      }

      // For mailto: fallback mode, open the visitor's email client with prefilled body.
      if (data?.mode === "mailto" && typeof data.mailtoUrl === "string") {
        window.location.href = data.mailtoUrl;
      }

      setDone(true);
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setTopError(
        "We couldn't send your inquiry just now. Please try again in a moment, or email brightynexaistudio@gmail.com directly.",
      );
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <>
        <PageHeader
          label="Start a Project"
          title="LET'S BUILD YOUR"
          accent="website."
          variant="blue"
        />
        <section className="section bg-[var(--paper)] text-[var(--ink)]">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--ink)]/10 bg-white p-8 text-center shadow-[0_30px_80px_-50px_rgba(7,22,41,0.4)] md:p-12">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gold)] text-[var(--blue-deep)]">
                  <Check size={28} strokeWidth={3} />
                </span>
                <h2 className="mt-6 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
                  THANK YOU — YOUR PROJECT DETAILS HAVE BEEN RECEIVED.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--ink)]/70 md:text-lg">
                  I&apos;ll review your information and get back to you as soon as possible.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--blue)] px-5 py-3 text-sm font-semibold text-[var(--paper)] transition-all hover:bg-[var(--blue-soft)]"
                  >
                    Back to Home
                  </a>
                  <a
                    href="/work"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ink)]/20 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-all hover:border-[var(--ink)]"
                  >
                    View My Work
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        label="Start a Project"
        title="LET'S BUILD YOUR"
        accent="website."
        intro="Tell me a little about your business, your goals and the website you have in mind. I'll review your project details and get back to you."
        variant="blue"
      />

      <section className="section bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(7,22,41,0.4)] md:p-10"
              >
                {/* honeypot — visually hidden, never filled by real users */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="company_website">Company Website (leave empty)</label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Top error */}
                <AnimatePresence>
                  {topError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {topError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-8">
                  {/* 1 + 2 — Full name + Email */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      label="1. Full Name"
                      required
                      error={errors.fullName}
                      htmlFor="fullName"
                    >
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={String(values.fullName)}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Your full name"
                        data-error={Boolean(errors.fullName)}
                        className={inputClass(Boolean(errors.fullName))}
                      />
                    </Field>
                    <Field
                      label="2. Email Address"
                      required
                      error={errors.email}
                      htmlFor="email"
                    >
                      <input
                        id="email"
                        type="email"
                        required
                        value={String(values.email)}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@company.com"
                        data-error={Boolean(errors.email)}
                        className={inputClass(Boolean(errors.email))}
                      />
                    </Field>
                  </div>

                  {/* 3 — Business / Brand Name */}
                  <Field
                    label="3. Business / Brand Name"
                    required
                    error={errors.business}
                    htmlFor="business"
                  >
                    <input
                      id="business"
                      type="text"
                      required
                      value={String(values.business)}
                      onChange={(e) => update("business", e.target.value)}
                      placeholder="Your business or brand name"
                      data-error={Boolean(errors.business)}
                      className={inputClass(Boolean(errors.business))}
                    />
                  </Field>

                  {/* 4 — What do you need? */}
                  <Field
                    label="4. What do you need?"
                    required
                    error={errors.need}
                    htmlFor="need"
                  >
                    <select
                      id="need"
                      required
                      value={String(values.need)}
                      onChange={(e) => update("need", e.target.value)}
                      data-error={Boolean(errors.need)}
                      className={selectClass(Boolean(errors.need))}
                    >
                      <option value="" disabled>
                        Select what you need
                      </option>
                      {NEED_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* 5 — Do you already have a website? */}
                  <Field
                    label="5. Do you already have a website?"
                    required
                    error={errors.hasWebsite}
                  >
                    <div className="flex flex-wrap gap-3">
                      {[
                        { v: "yes", label: "Yes" },
                        { v: "no", label: "No" },
                      ].map((o) => (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => update("hasWebsite", o.v)}
                          className={cn(
                            "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                            values.hasWebsite === o.v
                              ? "border-[var(--blue)] bg-[var(--blue)] text-[var(--paper)]"
                              : "border-[var(--ink)]/15 bg-white text-[var(--ink)] hover:border-[var(--ink)]/40",
                          )}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* 5a — Current Website URL (conditional) */}
                  <AnimatePresence initial={false}>
                    {values.hasWebsite === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <Field
                          label="Current Website URL"
                          required
                          error={errors.currentUrl}
                          htmlFor="currentUrl"
                        >
                          <input
                            id="currentUrl"
                            type="url"
                            value={String(values.currentUrl)}
                            onChange={(e) => update("currentUrl", e.target.value)}
                            placeholder="https://your-current-website.com"
                            data-error={Boolean(errors.currentUrl)}
                            className={inputClass(Boolean(errors.currentUrl))}
                          />
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 6 — Website Goal */}
                  <Field
                    label="6. What is the main goal of your website?"
                    required
                    error={errors.goal}
                    htmlFor="goal"
                  >
                    <textarea
                      id="goal"
                      required
                      rows={4}
                      value={String(values.goal)}
                      onChange={(e) => update("goal", e.target.value)}
                      placeholder="Tell me what you want the website to achieve for your business."
                      data-error={Boolean(errors.goal)}
                      className={textareaClass(Boolean(errors.goal))}
                    />
                  </Field>

                  {/* 7 — Pages checklist */}
                  <Field
                    label="7. What pages do you need?"
                    hint="Select all that apply."
                    error={errors.pages}
                  >
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {PAGES_OPTIONS.map((p) => {
                        const selected = (values.pages as string[]).includes(p);
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => togglePage(p)}
                            className={cn(
                              "flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all",
                              selected
                                ? "border-[var(--blue)] bg-[var(--blue)] text-[var(--paper)]"
                                : "border-[var(--ink)]/15 bg-white text-[var(--ink)]/75 hover:border-[var(--ink)]/40 hover:text-[var(--ink)]",
                            )}
                          >
                            {selected && <Check size={13} strokeWidth={3} />}
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  {/* 8 — Content status */}
                  <Field
                    label="8. Do you have your content ready?"
                    required
                    error={errors.contentStatus}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      {CONTENT_OPTIONS.map((o) => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => update("contentStatus", o)}
                          className={cn(
                            "rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                            values.contentStatus === o
                              ? "border-[var(--blue)] bg-[var(--blue)] text-[var(--paper)]"
                              : "border-[var(--ink)]/15 bg-white text-[var(--ink)]/75 hover:border-[var(--ink)]/40 hover:text-[var(--ink)]",
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* 9 — Style / References */}
                  <Field
                    label="9. Do you have a preferred style or website reference?"
                    hint="Optional"
                    htmlFor="styleRefs"
                  >
                    <textarea
                      id="styleRefs"
                      rows={3}
                      value={String(values.styleRefs)}
                      onChange={(e) => update("styleRefs", e.target.value)}
                      placeholder="Share any websites, styles, colors or ideas you like."
                      className={textareaClass(false)}
                    />
                  </Field>

                  {/* 10 + 11 — Budget + Launch */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      label="10. Project Budget"
                      required
                      error={errors.budget}
                      htmlFor="budget"
                    >
                      <select
                        id="budget"
                        required
                        value={String(values.budget)}
                        onChange={(e) => update("budget", e.target.value)}
                        data-error={Boolean(errors.budget)}
                        className={selectClass(Boolean(errors.budget))}
                      >
                        <option value="" disabled>
                          Select a budget range
                        </option>
                        {BUDGET_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="11. Desired Launch Time"
                      required
                      error={errors.launchTime}
                      htmlFor="launchTime"
                    >
                      <select
                        id="launchTime"
                        required
                        value={String(values.launchTime)}
                        onChange={(e) => update("launchTime", e.target.value)}
                        data-error={Boolean(errors.launchTime)}
                        className={selectClass(Boolean(errors.launchTime))}
                      >
                        <option value="" disabled>
                          Select a launch time
                        </option>
                        {LAUNCH_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* 12 — Project Details */}
                  <Field
                    label="12. Tell Me About Your Project"
                    required
                    error={errors.projectDetails}
                    htmlFor="projectDetails"
                  >
                    <textarea
                      id="projectDetails"
                      required
                      rows={6}
                      value={String(values.projectDetails)}
                      onChange={(e) => update("projectDetails", e.target.value)}
                      placeholder="Give me any additional details that will help me understand your project."
                      data-error={Boolean(errors.projectDetails)}
                      className={textareaClass(Boolean(errors.projectDetails))}
                    />
                  </Field>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 text-base font-bold tracking-tight text-[var(--blue-deep)] shadow-[0_8px_30px_-12px_rgba(232,178,58,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[var(--gold-soft)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--blue-deep)]/40 border-t-[var(--blue-deep)]" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          SEND PROJECT DETAILS
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-xs text-[var(--ink)]/45">
                      Your information is sent securely. I&apos;ll reply to your email within
                      about 24 hours.
                    </p>
                  </div>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- helpers ---------- */

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-white px-4 py-3 text-base font-medium text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink)]/35",
    hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-200"
      : "border-[var(--ink)]/15 focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold)]/30",
  );
}

function textareaClass(hasError: boolean) {
  return cn(
    "w-full resize-y rounded-md border bg-white px-4 py-3 text-base leading-relaxed text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink)]/35",
    hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-200"
      : "border-[var(--ink)]/15 focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold)]/30",
  );
}

function selectClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-white px-4 py-3 text-base font-medium text-[var(--ink)] outline-none transition-colors",
    hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-200"
      : "border-[var(--ink)]/15 focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold)]/30",
  );
}

function Field({
  label,
  hint,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-error={Boolean(error)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-bold tracking-tight text-[var(--ink)]"
      >
        {label}
        {required && <span className="ml-1 text-[var(--gold-deep)]">*</span>}
        {hint && (
          <span className="ml-2 text-xs font-medium text-[var(--ink)]/45">— {hint}</span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
