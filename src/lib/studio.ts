/**
 * Brightyweb brand constants
 * Single source of truth for studio information used across the website.
 * Edit values here to update them everywhere.
 */

export const STUDIO = {
  name: "Brightyweb",
  longName: "Brightyweb Studio",
  tagline: "Web Design Studio",
  positioning: "Professional web design studio",
  email: "brightynexaistudio@gmail.com",
  instagram: {
    handle: "@brightynexaistudio",
    url: "https://www.instagram.com/brightynexaistudio/",
  },
  hosting: {
    price: "$11",
    cadence: "year",
    note: "Deployment from $11/year",
  },
  siteUrl: "https://brightyweb.space-z.ai",
  /** Logo image — uploaded by the user. Path under /public/. */
  logo: {
    src: "/logo.jpg",
    alt: "Brightyweb logo",
    /** Width hint for the rendered logo in the header (px). */
    headerHeight: 36,
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export const PRIMARY_CTA = {
  label: "Start a Project",
  href: "/contact",
} as const;
