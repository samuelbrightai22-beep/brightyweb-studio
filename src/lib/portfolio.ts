/**
 * Brightyweb portfolio data system
 * ---------------------------------------------------------------
 * TO ADD A NEW PROJECT:
 *   1. Copy the structure of an existing project below.
 *   2. Change `slug` (used in URL: /work/your-slug), `title`, `client`,
 *      `category`, `year`, `description`, `url`, and `summary`.
 *   3. Add a screenshot image to /public/work/<slug>/cover.png (or .jpg)
 *      and reference it via the `cover` field. Optionally also add
 *      `desktop`, `mobile[]`, and `gallery[]` for the case study page.
 *   4. The new project will automatically appear on /work and on the
 *      homepage's Selected Work section if `featured: true`.
 *
 * Do NOT invent client names, fake statistics, or fake results.
 * If a project doesn't have measurable results, leave `results` empty.
 * ---------------------------------------------------------------
 */

export type ProjectCategory =
  | "Barbershop"
  | "Gym & Fitness"
  | "Kitchen & Cookware"
  | "Restaurant"
  | "Clinic"
  | "Skincare"
  | "Beauty"
  | "Marketplace"
  | "Website Design";

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
  /** URL of the live website, used by the "View Live Website" button. */
  url?: string;
  /** Featured projects appear on the homepage Selected Work section. */
  featured?: boolean;
  /** Color theme used for the case study hero — overrides default. */
  theme?: "blue" | "cream" | "gold";
  /** Cover image shown on cards. */
  cover: ProjectShot;
  /** Browser-framed desktop screenshot used in the case study. */
  desktop?: ProjectShot;
  /** Mobile screenshot(s) shown alongside the desktop. */
  mobile?: ProjectShot[];
  /** Additional screens / detail shots for the gallery. */
  gallery?: ProjectShot[];
  /** Optional design direction copy. Keep honest — do not invent. */
  overview?: string;
  designDirection?: string;
  /** Optional bullet list of what was delivered. */
  deliverables?: string[];
}

/**
 * Real Brightyweb portfolio — 12 live websites, all built with AI-assisted
 * web design. Each entry below is a real, deployed project the visitor can
 * click through to verify.
 */
export const projects: Project[] = [
  {
    slug: "brass-and-blade-barbershop",
    title: "Brass & Blade",
    client: "Brass & Blade",
    category: "Barbershop",
    year: "2025",
    summary:
      "A master barbershop website for a downtown studio offering classic cuts, hot towel shaves and beard sculpting — built around chair booking.",
    description:
      "A barbershop website built to convert visitors into booked appointments. The hero presents the studio's craft immediately, the services are organized around what a downtown customer actually needs (cuts, shaves, beard work, color), and the booking path is one tap from any page. The visual language borrows from old-school barber signage — warm brass tones, dark woods, and strong type — translated into a modern, fast-loading responsive build.",
    url: "https://barbrr.space-z.ai/#/",
    featured: true,
    theme: "blue",
    cover: {
      src: "/work/barber/cover.png",
      alt: "Brass & Blade master barbershop website — homepage hero with brass and dark wood palette",
    },
  },
  {
    slug: "ironpulse-athletics",
    title: "IRONPULSE Athletics",
    client: "IRONPULSE Athletics",
    category: "Gym & Fitness",
    year: "2025",
    summary:
      "A strength-training brand storefront for performance apparel, equipment and gym accessories — \"Train hard. Live strong.\"",
    description:
      "A performance brand website built for an audience that shows up. The hero states the brand promise in three words, the catalog is organized by what the customer is actually doing (training, recovering, accessorizing), and the product pages are designed to load fast and convert quickly. The visual language is industrial — heavy blacks, sharp accent colors, no soft edges — matching the audience that doesn't want soft.",
    url: "https://gymmz.space-z.ai/",
    featured: true,
    theme: "blue",
    cover: {
      src: "/work/gym/cover.png",
      alt: "IRONPULSE Athletics performance apparel and equipment storefront",
    },
  },
  {
    slug: "emberline-kitchen-co",
    title: "Emberline Kitchen Co.",
    client: "Emberline Kitchen Co.",
    category: "Kitchen & Cookware",
    year: "2025",
    summary:
      "A premium cookware storefront for enamelled cast iron, hand-finished knives and small-batch copper — \"cookware worth passing down.\"",
    description:
      "A kitchen-goods storefront built around the idea that cookware is an heirloom, not a disposable. The hero introduces the brand's craft positioning, the product pages give equal weight to material, story and use, and the catalog resists the temptation to look like a generic e-commerce store. The visual language borrows from premium print catalogues — warm paper backgrounds, considered typography, generous whitespace.",
    url: "https://kitchenn.space-z.ai/",
    featured: true,
    theme: "cream",
    cover: {
      src: "/work/kitchen/cover.png",
      alt: "Emberline Kitchen Co. premium cookware and knives storefront",
    },
  },
  {
    slug: "flame-and-bun",
    title: "Flame & Bun",
    client: "Flame & Bun",
    category: "Restaurant",
    year: "2025",
    summary:
      "A craft-burger restaurant website for a six-location chain — hand-formed patties, locally sourced produce, online ordering for pickup and delivery.",
    description:
      "A multi-location restaurant website built to drive online orders. The hero introduces the signature flame-grilled positioning, the menu is structured for scanning, and each of the six locations is one tap away from the homepage. The visual language borrows from classic American diner signage — bold reds, hand-lettered accents, no pretense — modernized for a fast-loading responsive build.",
    url: "https://eatery.space-z.ai/",
    featured: false,
    theme: "blue",
    cover: {
      src: "/work/restaurant/cover.png",
      alt: "Flame & Bun craft burger restaurant website with online ordering",
    },
  },
  {
    slug: "bolt-burgers",
    title: "Bolt Burgers",
    client: "Bolt Burgers",
    category: "Restaurant",
    year: "2025",
    summary:
      "A modern fast-food chain website for flame-grilled burgers served in under six minutes — open kitchens, hand-pressed patties, brioche buns.",
    description:
      "A fast-food chain website built around one promise: a great burger shouldn't make you wait. The hero presents the speed promise immediately, the menu is organized for one-tap ordering, and the open-kitchen concept is made visible through the site's photography and layout. The visual language is bright, fast and confident — no fluff, no soft edges.",
    url: "https://resturant.space-z.ai/",
    featured: false,
    theme: "gold",
    cover: {
      src: "/work/bolt-burger/cover.png",
      alt: "Bolt Burgers fast-food chain website with flame-grilled menu",
    },
  },
  {
    slug: "meridian-health-clinic",
    title: "Meridian Health Clinic",
    client: "Meridian Health Clinic",
    category: "Clinic",
    year: "2025",
    summary:
      "A multi-specialty medical clinic in Lagos — family medicine, cardiology, paediatrics, diagnostics and 24/7 emergency care, with online appointment booking.",
    description:
      "A medical clinic website built around trust and access. The hero states what the clinic is and where it is immediately, the services are organized by who in the family needs care, and the booking path is one tap from any page. The visual language is calm and clinical — soft blues, generous whitespace, considered typography — designed to make a stressed visitor feel they're in capable hands.",
    url: "https://hosptal.space-z.ai/",
    featured: true,
    theme: "blue",
    cover: {
      src: "/work/clinic/cover.png",
      alt: "Meridian Health Clinic multi-specialty medical centre website",
    },
  },
  {
    slug: "aurelia-clean-beauty",
    title: "AURÉLIA",
    client: "AURÉLIA",
    category: "Skincare",
    year: "2025",
    summary:
      "A clean beauty house website for skincare, cosmetics and rituals that celebrate radiant skin — \"the ritual of radiance.\"",
    description:
      "A clean beauty brand website built to communicate craft and intention. The hero introduces the brand's ritual positioning, the product pages balance ingredient transparency with sensory photography, and the catalog resists the cluttered, sale-driven feel of mass-market beauty. The visual language is editorial — warm neutrals, generous whitespace, soft serif accents — designed to feel like a print beauty journal rather than a drugstore shelf.",
    url: "https://skinn.space-z.ai/",
    featured: false,
    theme: "cream",
    cover: {
      src: "/work/aurelia/cover.png",
      alt: "AURÉLIA clean beauty and skincare brand website",
    },
  },
  {
    slug: "solene-botanics",
    title: "Solène Botanics",
    client: "Solène Botanics",
    category: "Beauty",
    year: "2025",
    summary:
      "A clean, vegan, sun-kissed skincare brand — cold-pressed botanicals, clinically proven actives, serums and rituals for radiant skin.",
    description:
      "A skincare brand website built around the idea of \"sun-kissed botanical.\" The hero introduces the brand's warm-botanical positioning, the product pages give weight to both ingredient story and clinical efficacy, and the catalog balances the sensory with the scientific. The visual language is warm and luminous — soft golds, sun-warmed neutrals, generous light — designed to feel like a Mediterranean apothecary rather than a clinical counter.",
    url: "https://skincarebeauty.space-z.ai/#/",
    featured: true,
    theme: "gold",
    cover: {
      src: "/work/solene-botanics/cover.png",
      alt: "Solène Botanics clean vegan skincare brand website",
    },
  },
  {
    slug: "lumiere-botanical-skincare",
    title: "Lumière",
    client: "Lumière",
    category: "Skincare",
    year: "2025",
    summary:
      "A botanical skincare house — clinically-effective serums and creams from rare plant actives. Vegan, cruelty-free, dermatologist-tested.",
    description:
      "A skincare brand website built around clinical efficacy communicated through botanical storytelling. The hero introduces the rare-plant-actives positioning, the product pages balance ingredient science with sensorial photography, and the catalog leads with proof over promotion. The visual language is calm and editorial — soft botanical greens, cream backgrounds, generous whitespace — designed to feel like a botanical journal rather than a counter display.",
    url: "https://skincare.space-z.ai/",
    featured: true,
    theme: "cream",
    cover: {
      src: "/work/lumiere/cover.png",
      alt: "Lumière botanical skincare brand website",
    },
  },
  {
    slug: "veloir-luxury-beauty",
    title: "VELOIR",
    client: "VELOIR",
    category: "Beauty",
    year: "2025",
    summary:
      "A Parisian-inspired luxury beauty house — high-performance cosmetics, skincare and fragrance. \"Where beauty meets mystery.\"",
    description:
      "A luxury beauty house website built to communicate mystery and craft. The hero introduces the brand's Parisian-inspired positioning, the product pages balance ingredient performance with sensory atmosphere, and the catalog spans cosmetics, skincare and fragrance without losing coherence. The visual language is dark and opulent — deep blacks, brass accents, dramatic photography — designed to feel like a Parisian fragrance boutique rather than a digital catalogue.",
    url: "https://beauty2.space-z.ai/",
    featured: true,
    theme: "blue",
    cover: {
      src: "/work/veloir/cover.png",
      alt: "VELOIR Parisian-inspired luxury beauty house website",
    },
  },
  {
    slug: "solene-botanical-skincare",
    title: "Solène",
    client: "Solène",
    category: "Beauty",
    year: "2025",
    summary:
      "Cold-pressed botanical skincare, made in small batches — clean formulas, ethically sourced ingredients, rituals that reveal natural radiance.",
    description:
      "A botanical skincare brand website built around small-batch craft. The hero introduces the cold-pressed positioning, the product pages give weight to ingredient provenance and ritual use, and the catalog resists the clinical-counter feel of mass-market skincare. The visual language is soft and botanical — warm creams, leaf greens, generous whitespace — designed to feel like a small-batch apothecary rather than a drugstore shelf.",
    url: "https://solene.space-z.ai/",
    featured: false,
    theme: "cream",
    cover: {
      src: "/work/solene/cover.png",
      alt: "Solène cold-pressed botanical skincare brand website",
    },
  },
  {
    slug: "hearth-and-harbor-marketplace",
    title: "Hearth & Harbor",
    client: "Hearth & Harbor",
    category: "Marketplace",
    year: "2025",
    summary:
      "A curated marketplace for considered home goods — kitchen, dining, bath, decor, tools, watches and books. Considered goods for the modern home.",
    description:
      "A multi-category marketplace website built around the idea of curation over volume. The hero introduces the \"considered goods\" positioning, the catalog spans kitchen, dining, bath, decor, tools, watches and books without losing coherence, and each product page treats its product like a feature in a magazine rather than a row in a database. The visual language borrows from premium print catalogues — warm paper backgrounds, considered typography, generous whitespace.",
    url: "https://cook.space-z.ai/",
    featured: true,
    theme: "cream",
    cover: {
      src: "/work/all-in-one/cover.png",
      alt: "Hearth & Harbor curated home goods marketplace website",
    },
  },
];

/** Convenience helpers */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  const featured = projects.filter((p) => p.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

export function getAllProjects(): Project[] {
  return [...projects];
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
