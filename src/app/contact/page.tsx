"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, Mail, Send } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { Reveal } from "@/components/site/reveal";
import { useToast } from "@/hooks/use-toast";
import { STUDIO } from "@/lib/studio";

const PROJECT_TYPES = [
  "Website Design",
  "Website Redesign",
  "Landing Page Design",
  "Business Website Design",
  "E-commerce Website Design",
  "Other / Not sure yet",
];

export default function ContactPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { toast } = useToast();
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submit (no backend). Honest behaviour: open mail client with the values.
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const business = String(data.get("business") ?? "");
    const type = String(data.get("type") ?? "");
    const details = String(data.get("details") ?? "");

    const subject = encodeURIComponent(`New project enquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBusiness: ${business}\nProject type: ${type}\n\nProject details:\n${details}`,
    );

    // Small delay so the UX feels considered rather than instant.
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      toast({
        title: "Opening your email client…",
        description: "If nothing opens, email me directly at brightynexaistudio@gmail.com.",
      });
      window.location.href = `mailto:${STUDIO.email}?subject=${subject}&body=${body}`;
    }, 600);
  }

  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's build"
        accent="your website."
        intro="Tell me what you're building. Every enquiry gets a real reply within 24 hours — usually with a few questions before any quote is sent, so the project gets scoped properly from the start."
        variant="blue"
      />

      <section
        ref={ref}
        className="section-sm bg-[var(--paper)] text-[var(--ink)]"
      >
        <div className="container-px mx-auto max-w-[1400px] grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:gap-16">
          {/* left: contact info */}
          <div className="space-y-8">
            <Reveal>
              <SectionLabel tone="blue">Direct contact</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="group flex items-start gap-4 rounded-2xl border border-[var(--ink)]/10 bg-white p-5 transition-all hover:border-[var(--gold-deep)]/40 hover:shadow-[0_20px_40px_-20px_rgba(7,22,41,0.15)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--blue)] text-[var(--gold)]">
                    <Mail size={16} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/45">
                      Email
                    </span>
                    <span className="mt-1 block font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--gold-deep)]">
                      {STUDIO.email}
                    </span>
                  </span>
                </a>
                <a
                  href={STUDIO.instagram.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-4 rounded-2xl border border-[var(--ink)]/10 bg-white p-5 transition-all hover:border-[var(--gold-deep)]/40 hover:shadow-[0_20px_40px_-20px_rgba(7,22,41,0.15)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--blue)] text-[var(--gold)]">
                    <Instagram size={16} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/45">
                      Instagram
                    </span>
                    <span className="mt-1 block font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--gold-deep)]">
                      {STUDIO.instagram.handle}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/45">
                  Good to know
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/70">
                  The form opens your email client with the project details
                  prefilled. If you prefer, write to me directly — every
                  enquiry is read and replied to by the person who will
                  actually design the website.
                </p>
              </div>
            </Reveal>
          </div>

          {/* right: form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(7,22,41,0.4)] md:p-10"
            >
              <div className="grid gap-6">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Your name"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
                <Field
                  label="Business"
                  name="business"
                  placeholder="Business or brand name (optional)"
                />
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/50">
                    Project type
                  </label>
                  <select
                    name="type"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-md border border-[var(--ink)]/15 bg-white px-4 py-3 text-base font-medium text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold)]/30"
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/50">
                    Project details
                  </label>
                  <textarea
                    name="details"
                    rows={5}
                    required
                    placeholder="What are you building? Who is it for? Any timeline or budget you have in mind?"
                    className="mt-2 w-full resize-y rounded-md border border-[var(--ink)]/15 bg-white px-4 py-3 text-base leading-relaxed text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink)]/35 focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold)]/30"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <EditorialButton
                    type="submit"
                    variant="blue"
                    size="lg"
                    withArrow
                  >
                    {submitting ? "Sending…" : done ? "Sent" : "Start a Project"}
                  </EditorialButton>
                  <a
                    href={`mailto:${STUDIO.email}`}
                    className="text-sm font-medium text-[var(--ink)]/55 hover:text-[var(--gold-deep)]"
                  >
                    or email me directly
                  </a>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="section-sm bg-[var(--blue-deep)] text-[var(--paper)]">
        <div className="container-px mx-auto max-w-[1400px] flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <SectionLabel tone="gold">Common questions</SectionLabel>
            <p className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight">
              Not sure about something?
            </p>
            <p className="mt-2 text-base text-[var(--paper)]/65">
              The homepage has an honest FAQ with the questions that come up
              most.
            </p>
          </div>
          <EditorialButton href="/#faq" variant="gold" withArrow>
            Read the FAQ
          </EditorialButton>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/50">
        {label}
        {required && <span className="ml-1 text-[var(--gold-deep)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-md border border-[var(--ink)]/15 bg-white px-4 py-3 text-base font-medium text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink)]/35 focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold)]/30"
      />
    </div>
  );
}
