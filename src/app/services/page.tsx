import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { Reveal } from "@/components/site/reveal";
import { SERVICES } from "@/lib/services";
import { STUDIO } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brightyweb services — Website Design, Website Redesign, Landing Page Design, Business Website Design and E-commerce Website Design. Mobile-first, end to end.",
  alternates: { canonical: `${STUDIO.siteUrl}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="One focus — done"
        accent="properly."
        intro="Five core services, all centered on the same thing: designing professional websites for businesses and brands. Responsive layouts are part of every build, not a separate service."
        variant="blue"
      />

      {/* services list — alternating blue / cream rhythm */}
      <div>
        {SERVICES.map((service, i) => {
          const isAlt = i % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className={
                isAlt
                  ? "section bg-[var(--blue)] text-[var(--paper)] relative overflow-hidden"
                  : "section bg-[var(--paper)] text-[var(--ink)]"
              }
            >
              <div className="container-px mx-auto max-w-[1400px] grid gap-8 md:grid-cols-[0.4fr_0.6fr] md:gap-16">
                {/* left: number + title */}
                <div>
                  <Reveal>
                    <span
                      className={
                        isAlt
                          ? "grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)] font-bold text-[var(--blue-deep)]"
                          : "grid h-12 w-12 place-items-center rounded-full bg-[var(--blue)] font-bold text-[var(--gold)]"
                      }
                    >
                      {service.number}
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
                      {service.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p
                      className={
                        isAlt
                          ? "mt-4 max-w-md text-base leading-relaxed text-[var(--paper)]/75"
                          : "mt-4 max-w-md text-base leading-relaxed text-[var(--ink)]/65"
                      }
                    >
                      {service.summary}
                    </p>
                  </Reveal>
                </div>

                {/* right: detail */}
                <div className="space-y-8">
                  <Reveal delay={0.15}>
                    <div>
                      <SectionLabel tone={isAlt ? "gold" : "blue"}>
                        What it is
                      </SectionLabel>
                      <p
                        className={
                          isAlt
                            ? "mt-4 text-base leading-relaxed text-[var(--paper)]/85"
                            : "mt-4 text-base leading-relaxed text-[var(--ink)]/85"
                        }
                      >
                        {service.description}
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <div>
                      <SectionLabel tone={isAlt ? "gold" : "blue"}>
                        Who it&apos;s for
                      </SectionLabel>
                      <p
                        className={
                          isAlt
                            ? "mt-4 text-base leading-relaxed text-[var(--paper)]/80"
                            : "mt-4 text-base leading-relaxed text-[var(--ink)]/75"
                        }
                      >
                        {service.whoFor}
                      </p>
                    </div>
                  </Reveal>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <Reveal delay={0.25}>
                      <div>
                        <SectionLabel tone={isAlt ? "gold" : "blue"}>
                          What I design
                        </SectionLabel>
                        <ul
                          className={
                            isAlt
                              ? "mt-4 space-y-2.5 text-sm text-[var(--paper)]/75"
                              : "mt-4 space-y-2.5 text-sm text-[var(--ink)]/70"
                          }
                        >
                          {service.whatIDesign.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span
                                className={
                                  isAlt
                                    ? "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]"
                                    : "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-deep)]"
                                }
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                      <div>
                        <SectionLabel tone={isAlt ? "gold" : "blue"}>
                          What you receive
                        </SectionLabel>
                        <ul
                          className={
                            isAlt
                              ? "mt-4 space-y-2.5 text-sm text-[var(--paper)]/75"
                              : "mt-4 space-y-2.5 text-sm text-[var(--ink)]/70"
                          }
                        >
                          {service.whatYouReceive.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span
                                className={
                                  isAlt
                                    ? "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]"
                                    : "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-deep)]"
                                }
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>

                  <Reveal delay={0.35}>
                    <div className="pt-2">
                      <EditorialButton
                        href="/contact"
                        variant={isAlt ? "gold" : "blue"}
                        withArrow
                      >
                        Start this project
                      </EditorialButton>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* footnote about responsiveness */}
      <section className="section-sm bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--ink)]/55">
              Responsive web design is intentionally not listed as a separate
              service. Every website above is designed mobile-first, so it
              works beautifully on every device — phone, tablet and desktop —
              from the first sketch onward.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
