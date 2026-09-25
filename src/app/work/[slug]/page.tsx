import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { SectionLabel } from "@/components/site/section-label";
import { EditorialButton } from "@/components/site/editorial-button";
import { Reveal } from "@/components/site/reveal";
import { BrowserFrame, PhoneFrame } from "@/components/visual/mockup-frames";
import {
  getProjectBySlug,
  getNextProject,
  projects,
} from "@/lib/portfolio";
import { STUDIO } from "@/lib/studio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `${STUDIO.siteUrl}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Brightyweb`,
      description: project.summary,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const isGold = project.theme === "gold";

  return (
    <>
      {/* HERO */}
      <section
        className={
          isGold
            ? "section-sm bg-[var(--gold)] text-[var(--blue-deep)] grain"
            : "section-sm bg-[var(--blue-deep)] text-[var(--paper)] grain relative overflow-hidden"
        }
      >
        {!isGold && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[15%] -top-[10%] h-[50vh] w-[50vh] rounded-full bg-[var(--blue)] opacity-60 blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[10%] bottom-0 h-[35vh] w-[35vh] rounded-full bg-[var(--gold)] opacity-[0.08] blur-[120px]"
            />
          </>
        )}
        <div className="container-px relative mx-auto max-w-[1400px]">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-medium opacity-60 transition-opacity hover:opacity-100"
            >
              <ArrowLeft size={14} />
              Back to all work
            </Link>
          </Reveal>
          <div className="mt-8 grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Reveal>
                <SectionLabel tone={isGold ? "ink" : "gold"}>
                  {project.category} — {project.year}
                </SectionLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-tight tracking-tight">
                  {project.title}
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="space-y-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  >
                    {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}
                <p
                  className={
                    isGold
                      ? "text-base leading-relaxed text-[var(--blue-deep)]/75"
                      : "text-base leading-relaxed text-[var(--paper)]/70"
                  }
                >
                  {project.summary}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECT INFORMATION */}
      <section className="section-sm bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="grid gap-6 rounded-2xl border border-[var(--ink)]/10 bg-white p-6 py-8 md:grid-cols-4 md:p-8">
            <InfoCell label="Client" value={project.client} />
            <InfoCell label="Category" value={project.category} />
            <InfoCell label="Year" value={project.year} />
            <InfoCell
              label="Website"
              value={
                project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[var(--gold-deep)] hover:underline"
                  >
                    View live site
                  </a>
                ) : (
                  "—"
                )
              }
            />
          </div>
        </div>
      </section>

      {/* OVERVIEW + DESIGN DIRECTION */}
      {(project.overview || project.designDirection) && (
        <section className="section bg-[var(--paper)] text-[var(--ink)]">
          <div className="container-px mx-auto max-w-[1400px] grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:gap-16">
            <Reveal>
              <SectionLabel tone="blue">Overview</SectionLabel>
            </Reveal>
            <div className="space-y-10">
              {project.overview && (
                <Reveal delay={0.1}>
                  <p className="text-lg leading-relaxed text-[var(--ink)]/85">
                    {project.overview}
                  </p>
                </Reveal>
              )}
              {project.designDirection && (
                <Reveal delay={0.15}>
                  <div>
                    <SectionLabel tone="blue">Design direction</SectionLabel>
                    <p className="mt-4 text-lg leading-relaxed text-[var(--ink)]/75">
                      {project.designDirection}
                    </p>
                  </div>
                </Reveal>
              )}
              {project.deliverables && project.deliverables.length > 0 && (
                <Reveal delay={0.2}>
                  <div>
                    <SectionLabel tone="blue">What was delivered</SectionLabel>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {project.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2.5 text-sm text-[var(--ink)]/70"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-deep)]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* DESKTOP DESIGN */}
      <section
        className={
          isGold
            ? "section bg-[var(--blue-deep)] text-[var(--paper)]"
            : "section bg-[var(--blue)] text-[var(--paper)]"
        }
      >
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionLabel tone="gold">Desktop design</SectionLabel>
                <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
                  The full desktop experience.
                </h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 overflow-hidden rounded-xl border border-white/10 shadow-[0_50px_120px_-50px_rgba(7,22,41,0.8)]">
              <BrowserFrame url={(project.url ?? "brightyweb.space-z.ai").replace(/^https?:\/\//, "")}>
                <img
                  src={(project.desktop ?? project.cover).src}
                  alt={(project.desktop ?? project.cover).alt}
                  className="block h-auto w-full"
                  loading="lazy"
                />
              </BrowserFrame>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MOBILE DESIGN — only render when mobile screenshots exist */}
      {project.mobile && project.mobile.length > 0 && (
        <section className="section bg-[var(--paper)] text-[var(--ink)]">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal>
              <div className="max-w-2xl">
                <SectionLabel tone="blue">Mobile design</SectionLabel>
                <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
                  Designed mobile-first, always.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--ink)]/65">
                  The phone layout is planned first, not squeezed out of the
                  desktop design. Every breakpoint is intentional.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-start justify-center gap-10 md:gap-16">
                {project.mobile.map((shot, i) => (
                  <div
                    key={i}
                    className="w-full max-w-[280px]"
                  >
                    <PhoneFrame>
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </PhoneFrame>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ADDITIONAL SCREENS */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="section bg-[var(--blue-deep)] text-[var(--paper)]">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal>
              <div className="max-w-2xl">
                <SectionLabel tone="gold">Additional screens</SectionLabel>
                <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
                  More from the project.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {project.gallery.map((shot, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(7,22,41,0.6)]">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="block h-auto w-full"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WEBSITE LINK */}
      {project.url && (
        <section className="section-sm bg-[var(--gold)] text-[var(--blue-deep)]">
          <div className="container-px mx-auto max-w-[1400px] flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <SectionLabel tone="ink">Website link</SectionLabel>
              <p className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                Visit the live website.
              </p>
            </div>
            <EditorialButton
              href={project.url}
              external
              variant="blue"
              size="lg"
              withArrow
            >
              Open website
            </EditorialButton>
          </div>
        </section>
      )}

      {/* NEXT PROJECT */}
      <section className="section-sm bg-[var(--blue-deep)] text-[var(--paper)]">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="group block"
            >
              <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gold)]">Next project</p>
                  <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight transition-colors group-hover:text-[var(--gold)]">
                    {next.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--paper)]/60">
                    {next.category} — {next.year}
                  </p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--blue-deep)]">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-px mx-auto max-w-[1400px] flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gold-deep)]">Have a project?</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight">
              Let&apos;s design yours.
            </h2>
          </div>
          <EditorialButton href="/contact" variant="blue" size="lg" withArrow>
            Start a Project
          </EditorialButton>
        </div>
      </section>
    </>
  );
}

function InfoCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink)]/40">{label}</p>
      <p className="mt-2 text-base font-semibold text-[var(--ink)]/85">
        {value}
      </p>
    </div>
  );
}
