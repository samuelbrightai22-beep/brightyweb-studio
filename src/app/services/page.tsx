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
        italicAccent="properly."
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
                  ? "section bg-[var(--blue)] text-[var(--paper)] grain relative overflow-hidden"
                  : "section bg-[var(--paper)] text-[var(--ink)]"
              }
            >
              <div className="container-px mx-auto max-w-[1600px] grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:gap-20">
                {/* left: number + title */}
                <div className="md:sticky md:top-32 md:self-start">
                  <Reveal>
                    <span
                      className={
                        isAlt
                          ? "numeral text-sm font-semibold text-[var(--gold)] opacity-70"
                          : "numeral text-sm font-semibold text-[var(--gold-deep)] opacity-70"
                      }
                    >
                      ({service.number})
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="display mt-6 text-[clamp(2rem,4vw,3.25rem)]">
                      {service.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p
                      className={
                        isAlt
                          ? "mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--paper)]/70"
                          : "mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--ink)]/65"
                      }
                    >
                      {service.summary}
                    </p>
                  </Reveal>
                </div>

                {/* right: detail */}
                <div className="space-y-10">
                  <Reveal delay={0.15}>
                    <div>
                      <SectionLabel tone={isAlt ? "gold" : "blue"}>
                        What it is
                      </SectionLabel>
                      <p
                        className={
                          isAlt
                            ? "mt-4 body-prose text-[var(--paper)]/80"
                            : "mt-4 body-prose text-[var(--ink)]/80"
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
                            ? "mt-4 body-prose text-[var(--paper)]/75"
                            : "mt-4 body-prose text-[var(--ink)]/75"
                        }
                      >
                        {service.whoFor}
                      </p>
                    </div>
                  </Reveal>

                  <div className="grid gap-10 sm:grid-cols-2">
                    <Reveal delay={0.25}>
                      <div>
                        <SectionLabel tone={isAlt ? "gold" : "blue"}>
                          What I design
                        </SectionLabel>
                        <ul
                          className={
                            isAlt
                              ? "mt-4 space-y-2.5 text-[0.9rem] text-[var(--paper)]/70"
                              : "mt-4 space-y-2.5 text-[0.9rem] text-[var(--ink)]/70"
                          }
                        >
                          {service.whatIDesign.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span
                                className={
                                  isAlt
                                    ? "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]"
                                    : "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--gold-deep)]"
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
                              ? "mt-4 space-y-2.5 text-[0.9rem] text-[var(--paper)]/70"
                              : "mt-4 space-y-2.5 text-[0.9rem] text-[var(--ink)]/70"
                          }
                        >
                          {service.whatYouReceive.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span
                                className={
                                  isAlt
                                    ? "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]"
                                    : "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--gold-deep)]"
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
        <div className="container-px mx-auto max-w-[1600px]">
          <Reveal>
            <p className="max-w-2xl text-[0.95rem] leading-relaxed text-[var(--ink)]/55">
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
