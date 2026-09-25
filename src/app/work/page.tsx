import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { ProjectCard } from "@/components/site/project-card";
import { EditorialButton } from "@/components/site/editorial-button";
import { Reveal } from "@/components/site/reveal";
import { getAllProjects, getAllCategories } from "@/lib/portfolio";
import { STUDIO } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected website projects designed and built by Brightyweb. Website design, redesign, landing page and e-commerce case studies.",
  alternates: { canonical: `${STUDIO.siteUrl}/work` },
};

export default function WorkPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();

  return (
    <>
      <PageHeader
        label="Selected Work"
        title="Websites designed to give brands presence."
        intro="Real projects, designed end to end. Each project has its own page with the design direction, the desktop and mobile layouts, and what was delivered. Add a new project in src/lib/portfolio.ts and it will appear here automatically."
        variant="blue"
      />

      {/* filter chips */}
      <section className="section-sm bg-[var(--blue-deep)] text-[var(--paper)]">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--paper)]/50">
                Categories
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-[var(--paper)]/75"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* project grid */}
      <section className="section bg-[var(--blue-deep)] text-[var(--paper)]">
        <div className="container-px mx-auto max-w-[1400px]">
          {projects.length === 0 ? (
            <p className="text-center text-[var(--paper)]/55">
              No projects yet. Add them in{" "}
              <code>src/lib/portfolio.ts</code>.
            </p>
          ) : (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                  variant="feature"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-[var(--blue-deep)] text-[var(--paper)]">
        <div className="container-px mx-auto max-w-[1400px] flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gold)]">
              Have a project in mind?
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight">
              Let&apos;s design the next one.
            </h2>
          </div>
          <EditorialButton href="/contact" variant="gold" size="lg" withArrow>
            Start a Project
          </EditorialButton>
        </div>
      </section>
    </>
  );
}
