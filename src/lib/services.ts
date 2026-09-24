export type Service = {
  /** Number used in the editorial list (matches nav-like ordering). */
  number: string;
  /** URL-safe slug, used as the #anchor on /services. */
  slug: string;
  /** Service title. */
  title: string;
  /** One-line summary (homepage + services list). */
  summary: string;
  /** Longer description (services page). */
  description: string;
  /** Who this service is for. */
  whoFor: string;
  /** What gets designed during the project. */
  whatIDesign: string[];
  /** What the client receives at the end. */
  whatYouReceive: string[];
};

/**
 * Five core services. Responsive web design is intentionally NOT a separate
 * service — responsiveness is part of every build.
 */
export const SERVICES: Service[] = [
  {
    number: "01",
    slug: "website-design",
    title: "Website Design",
    summary:
      "Custom websites designed around your brand, your audience and your goals — never a recycled template.",
    description:
      "A full custom website built from a blank page. The design starts with your business — who you serve, what makes you different, what your visitors need to do — and ends with a website that earns trust in the first five seconds. Every page, every section and every interaction is designed intentionally rather than assembled from a template.",
    whoFor:
      "Businesses and brands that need a credible, original website — startups, service businesses, studios, founders and creators who want a site that actually reflects what they do.",
    whatIDesign: [
      "Information architecture and page structure",
      "Visual direction, typography and color system",
      "Desktop, tablet and mobile layouts",
      "Component and section design",
      "Hover states, transitions and micro-interactions",
      "Responsive build that adapts to every screen",
    ],
    whatYouReceive: [
      "A live, responsive website",
      "All designed pages and sections",
      "Editable content management system",
      "SEO foundation (titles, descriptions, headings)",
      "Launch-ready deployment",
      "Handover walkthrough",
    ],
  },
  {
    number: "02",
    slug: "website-redesign",
    title: "Website Redesign",
    summary:
      "Transform an outdated website into a cleaner, faster, more credible experience that reflects the business you are now.",
    description:
      "A redesign takes what's already working on your current site and rebuilds it from the visual foundation up. Most outdated websites aren't broken — they just look like they belong to an earlier version of the business. A redesign brings the design language, the structure and the speed in line with where the business is today.",
    whoFor:
      "Businesses with an existing website that looks dated, loads slowly, doesn't work on mobile or no longer reflects the brand. Also for businesses that have grown but whose website still looks like the early days.",
    whatIDesign: [
      "Audit of the current site's content and structure",
      "Refreshed visual direction aligned with the current brand",
      "Cleaner page hierarchy and navigation",
      "Modern, fast-loading component design",
      "Responsive layout for every device",
      "Smooth migration of existing content",
    ],
    whatYouReceive: [
      "A redesigned, responsive live website",
      "All carried-over content restructured cleanly",
      "Improved loading speed and performance",
      "Updated SEO foundation",
      "Launch-ready deployment",
      "Handover walkthrough",
    ],
  },
  {
    number: "03",
    slug: "landing-page-design",
    title: "Landing Page Design",
    summary:
      "A focused page with one message and one action — designed to turn visitors into enquiries or signups.",
    description:
      "A landing page is a single, focused page built around one message and one action. Whether it's a product launch, a campaign, a lead magnet or a single service, the goal is the same: remove every distraction and guide the visitor toward taking the one action the page exists for.",
    whoFor:
      "Founders, marketers and creators running a campaign, launching a product or promoting a single offer — anyone who needs a focused page that converts rather than a multi-page website.",
    whatIDesign: [
      "Single-page narrative structure",
      "Clear visual hierarchy from hero to CTA",
      "Conversion-focused copy support",
      "Responsive layout for mobile-first traffic",
      "Form or signup interaction design",
      "Performance-optimised build",
    ],
    whatYouReceive: [
      "A live, responsive landing page",
      "Designed form or signup flow",
      "SEO foundation tuned for the campaign",
      "Launch-ready deployment",
      "Handover walkthrough",
    ],
  },
  {
    number: "04",
    slug: "business-website-design",
    title: "Business Website Design",
    summary:
      "Multi-page websites that make your business look established — services, about, and clear paths to contact you.",
    description:
      "A multi-page website designed for businesses that need more than a single page. Typical structure: home, services, about, work and contact. The goal is to make the business look established, make the services easy to understand, and give visitors a clear path from landing on the site to getting in touch.",
    whoFor:
      "Service businesses, consultancies, agencies, studios and professionals who need a complete online presence rather than a single landing page. Anyone whose customers need to understand the business before getting in touch.",
    whatIDesign: [
      "Multi-page information architecture",
      "Home, services, about, work and contact pages",
      "Consistent design system across every page",
      "Clear conversion paths to contact",
      "Responsive layout for every device",
      "Content-managed sections you can edit",
    ],
    whatYouReceive: [
      "A live, multi-page responsive website",
      "All designed pages with consistent system",
      "Editable content management system",
      "SEO foundation across the site",
      "Launch-ready deployment",
      "Handover walkthrough",
    ],
  },
  {
    number: "05",
    slug: "ecommerce-website-design",
    title: "E-commerce Website Design",
    summary:
      "Stores that feel trustworthy and buy-fast: clean catalogs, smooth checkout, mobile-first from the first sketch.",
    description:
      "An e-commerce website designed around two things: trust and speed. Customers have to trust the store enough to give it their money, and they have to be able to find what they want and check out without friction. The design reflects the brand, the catalog is clean, and the checkout is short.",
    whoFor:
      "Product brands, independent stores and creators selling physical or digital products online — anyone who needs an e-commerce site that converts visitors into customers without looking like a generic template store.",
    whatIDesign: [
      "Store-wide information architecture",
      "Product listing and product detail pages",
      "Cart and checkout flow design",
      "Trust-building visual language",
      "Responsive layout — mobile-first because most shoppers are on phones",
      "Content-managed catalog you can update yourself",
    ],
    whatYouReceive: [
      "A live, responsive e-commerce website",
      "Designed catalog, product and checkout flows",
      "Editable product management system",
      "SEO foundation for products and categories",
      "Launch-ready deployment",
      "Handover walkthrough",
    ],
  },
];
