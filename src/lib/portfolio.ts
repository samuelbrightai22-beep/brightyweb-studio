/**
 * Brightyweb portfolio data system
 * ---------------------------------------------------------------
 * TO ADD A NEW PROJECT:
 *   1. Copy the structure of an existing project below.
 *   2. Change `slug` (used in URL: /work/your-slug), `title`, `client`,
 *      `category`, `year`, `description`, `url`, and `details`.
 *   3. Add screenshot images to /public/work/<slug>/ and reference them
 *      via the `cover`, `desktop`, `mobile`, and `gallery` arrays.
 *   4. The new project will automatically appear on /work and can be
 *      featured on the homepage by setting `featured: true`.
 *
 * Do NOT invent client names, fake statistics, or fake results.
 * If a project doesn't have measurable results, leave `results` empty.
 * ---------------------------------------------------------------
 */

export type ProjectCategory =
  | "Website Design"
  | "Website Redesign"
  | "Landing Page"
  | "Business Website"
  | "E-commerce";

export interface ProjectShot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  /** One-line summary used on cards and previews. */
  summary: string;
  /** Longer description shown on the case study page. */
  description: string;
  /** URL of the live website, if any. */
  url?: string;
  /** Featured projects appear on the homepage Selected Work section. */
  featured?: boolean;
  /** Color theme used for the case study hero — overrides default. */
  theme?: "blue" | "cream" | "gold";
  /** Cover image shown on cards. */
  cover: ProjectShot;
  /** Browser-framed desktop screenshot used in the case study. */
  desktop: ProjectShot;
  /** Mobile screenshot(s) shown alongside the desktop. */
  mobile: ProjectShot[];
  /** Additional screens / detail shots for the gallery. */
  gallery?: ProjectShot[];
  /** Optional design direction copy. Keep honest — do not invent. */
  overview?: string;
  designDirection?: string;
  /** Optional bullet list of what was delivered. */
  deliverables?: string[];
}

/**
 * Starter portfolio.
 *
 * NOTE: Replace these with real Brightyweb projects. Each entry below is a
 * structural placeholder showing the system — the URLs and image paths are
 * examples so the website renders correctly out of the box.
 */
export const projects: Project[] = [
  {
    slug: "brightyweb-studio-site",
    title: "Brightyweb Studio",
    client: "Brightyweb",
    category: "Website Design",
    year: "2025",
    summary:
      "A premium editorial website for a web design studio — built around large typography, deep blue sections and a quiet $11/year hosting offer.",
    description:
      "The studio's own website. The brief was simple: design a website that itself demonstrates web design ability. The structure follows a clear narrative — first explain why websites matter, then show what is on offer, then prove it with real work, then make it easy to start a project. The hosting offer is kept honest and quiet rather than dominating the page.",
    url: "https://brightyweb.space-z.ai/",
    featured: true,
    theme: "blue",
    overview:
      "A web design studio's website has one job: convince the visitor in five seconds that this person designs professional websites. Every section is built around that single goal — large typography, generous whitespace, real mockups instead of generic illustrations, and a clear path from problem to contact.",
    designDirection:
      "Deep editorial blue as the dominant background, warm yellow as the only accent color. Mixed-weight headlines (sans + italic serif) borrow from print editorial design. Mockups are presented as real browser and phone frames, never as floating UI blobs. Animations are limited to subtle text reveals and image scaling so the site feels expensive rather than busy.",
    deliverables: [
      "Editorial homepage with 11-section narrative",
      "Services, About, Work, and Contact pages",
      "Dynamic case study system",
      "Mobile-first responsive build",
      "SEO foundation with clean URLs and OG tags",
    ],
    cover: {
      src: "/work/brightyweb-studio-site/cover.svg",
      alt: "Brightyweb studio homepage with deep blue hero and warm yellow accents",
    },
    desktop: {
      src: "/work/brightyweb-studio-site/desktop.svg",
      alt: "Brightyweb studio homepage desktop view",
    },
    mobile: [
      {
        src: "/work/brightyweb-studio-site/mobile-1.svg",
        alt: "Brightyweb studio homepage mobile view",
      },
    ],
    gallery: [
      {
        src: "/work/brightyweb-studio-site/detail-1.svg",
        alt: "Brightyweb services section detail",
      },
      {
        src: "/work/brightyweb-studio-site/detail-2.svg",
        alt: "Brightyweb portfolio section detail",
      },
    ],
  },
  {
    slug: "studio-hosting-offer",
    title: "$11/Year Hosting Page",
    client: "Brightyweb",
    category: "Landing Page",
    year: "2025",
    summary:
      "A focused single-purpose page that explains the $11/year hosting offer without making the studio look like a cheap hosting company.",
    description:
      "A landing page that exists to honestly explain the $11/year hosting offer that comes with every Brightyweb website. The page treats hosting as a supporting service — not the main business — and keeps the visual language consistent with the rest of the studio site.",
    url: "https://brightyweb.space-z.ai/#hosting",
    featured: true,
    theme: "gold",
    overview:
      "Hosting pages on most small-studio websites look like spam. The brief here was the opposite — present a real, simple offer the way a premium publication would present a single product: one section, clear copy, one call to action, no invented guarantees.",
    designDirection:
      "Warm yellow background with deep blue typography flips the page's usual contrast so the offer feels like a feature in a magazine, not a banner ad. The blue CTA button is the only saturated element on the page, pulling the eye toward the next step.",
    deliverables: [
      "Single-section hosting landing experience",
      "Honest offer copy with no fake guarantees",
      "Blue CTA on yellow background for contrast",
      "Integrated with the rest of the studio's navigation",
    ],
    cover: {
      src: "/work/studio-hosting-offer/cover.svg",
      alt: "$11/year hosting landing page with yellow background and blue CTA",
    },
    desktop: {
      src: "/work/studio-hosting-offer/desktop.svg",
      alt: "$11/year hosting landing page desktop view",
    },
    mobile: [
      {
        src: "/work/studio-hosting-offer/mobile-1.svg",
        alt: "$11/year hosting landing page mobile view",
      },
    ],
  },
];

/** Convenience helpers */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  const featured = projects.filter((p) => p.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => (a.year < b.year ? 1 : -1));
}

export function getAllCategories(): ProjectCategory[] {
  const set = new Set<ProjectCategory>();
  projects.forEach((p) => set.add(p.category));
  return Array.from(set);
}

/** Get the next project in the list, looping back to the first. */
export function getNextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return projects[0];
  return projects[(idx + 1) % projects.length];
}
