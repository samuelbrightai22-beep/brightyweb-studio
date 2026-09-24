import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { Reveal } from "@/components/site/reveal";
import { STUDIO } from "@/lib/studio";

export const metadata: Metadata = {
  title: "About",
  description:
    "Brightyweb is a professional web design studio. Who I am, what I design, how I approach projects, and what clients can expect when we work together.",
  alternates: { canonical: `${STUDIO.siteUrl}/about` },
};

const APPROACH = [
  {
    n: "1",
    title: "Start with the business",
    body:
      "Every project begins with the business — who you serve, what makes you different, what your visitors need to do. The design follows the business, not the other way around.",
  },
  {
    n: "2",
    title: "Design intentionally",
    body:
      "Typography, layout, color and spacing are decisions, not defaults. Every choice on the page has a reason behind it. The result feels considered rather than assembled.",
  },
  {
    n: "3",
    title: "Plan for mobile first",
    body:
      "Most of your visitors will arrive on a phone. The mobile layout is designed first, not adapted afterward. Every breakpoint is planned.",
  },
  {
    n: "4",
    title: "Build something that lasts",
    body:
      "The goal isn't a website that looks good in a launch screenshot. It's a website that still feels clean, fast and credible three years from now.",
  },
];

const EXPECTATIONS = [
  {
    title: "A real conversation",
    body:
      "Before any quote is sent, we talk through what you're building. The goal is to understand the project well enough to know whether I'm the right person for it.",
  },
  {
    title: "A fixed quote",
    body:
      "Once the project is scoped, the price is fixed. No hourly billing surprises, no scope creep charges halfway through. You know what the project costs before it starts.",
  },
  {
    title: "One point of contact",
    body:
      "You deal with the person actually designing the website. No account manager, no handoffs, no waiting for someone to relay a message back. The conversation is direct.",
  },
  {
    title: "A clear timeline",
    body:
      "Most projects land between one and three weeks depending on scope. The timeline is confirmed before we start so you know what to expect, not a vague estimate that drifts.",
  },
  {
    title: "A handover walkthrough",
    body:
      "When the site is live, you get a walkthrough of how to make basic updates yourself — change a heading, swap an image, add a page. You're not stuck waiting on someone else.",
  },
  {
    title: "Honest hosting",
    body:
      "If you want hosting through the studio, it's a flat $11/year — not a monthly subscription. The offer is real and simple, and it's there to help your site stay online.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About the studio"
        title="A professional web design"
        accent="studio."
        intro="Brightyweb is an independent web design studio. The focus is simple — design professional websites for businesses and brands, and back the design with a real, honest process. No agency layers. No recycled templates. No invented guarantees."
        variant="blue"
      />

      {/* Who I am */}
      <section className="section bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-px mx-auto max-w-[1400px] grid gap-10 md:grid-cols-[0.4fr_1fr] md:gap-16">
          <Reveal>
            <SectionLabel tone="blue">Who I am</SectionLabel>
          </Reveal>
          <div className="max-w-3xl space-y-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-[var(--ink)]/85">
                I'm a web designer who builds professional websites for
                businesses and brands. The studio is independent — meaning
                every project is designed and built by the same person you
                speak to from the first email.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-[var(--ink)]/65">
                The work is about two things: design that earns trust in the
                first five seconds, and a website that holds up after the
                visitor starts using it. A site can look good and still lose
                people — the goal is to make one that does both.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg leading-relaxed text-[var(--ink)]/65">
                Brightyweb is positioned as a web design studio — not an agency,
                not an AI company, not a marketing shop. Websites are the
                thing, done properly, end to end.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How I approach projects */}
      <section className="section bg-[var(--blue)] text-[var(--paper)] relative overflow-hidden">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel tone="gold">How I approach projects</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight">
                A clear process from first call to launch.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((item, i) => (
              <Reveal key={item.n} delay={0.1 + i * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gold)] font-bold text-[var(--blue-deep)]">
                    {item.n}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--paper)]/70">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What clients can expect */}
      <section className="section bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-px mx-auto max-w-[1400px] grid gap-10 md:grid-cols-[0.4fr_1fr] md:gap-16">
          <Reveal>
            <SectionLabel tone="blue">What clients can expect</SectionLabel>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight">
                Working with the studio — in plain terms.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {EXPECTATIONS.map((item, i) => (
                <Reveal key={item.title} delay={0.15 + i * 0.04}>
                  <div className="card-hover rounded-2xl border border-[var(--ink)]/10 bg-white p-6">
                    <h3 className="text-lg font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/65">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4}>
              <div className="mt-10">
                <EditorialButton href="/contact" variant="blue" size="lg" withArrow>
                  Start a Project
                </EditorialButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
