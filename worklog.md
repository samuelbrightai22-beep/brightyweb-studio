---
Task ID: brightyweb-refine
Agent: main (Super Z)
Task: Refine and upgrade the existing Brightyweb website (https://brightyweb.space-z.ai/) — remove all demo content, apply deep blue + warm yellow palette, restructure homepage with 11 sections (Header, Hero, Why Your Website Matters, What I Design, Selected Work, Why Work With Me, Design Process, $11/Year Hosting, FAQ, Final CTA, Footer), build About/Services/Work/Contact pages, build dynamic project case studies, build a portfolio data system. Use the existing Brightyweb editorial design as the visual foundation; combine Lumio's premium editorial art direction with Golden Funnel Studio's client-focused conversion structure. Keep the $11/year hosting offer real and quiet.

Work Log:
- Browsed the live current Brightyweb site via agent-browser and used VLM to capture the existing visual DNA (warm cream + near-black + electric blue, mixed-styling headlines, asymmetric hero with floating mockups, pill buttons, premium minimalist mood).
- Browsed both reference sites (Lumio + Golden Funnel Studio) and captured their structural + visual principles.
- Initialized the Next.js 16 fullstack dev environment.
- Designed the new brand palette in /src/app/globals.css:
  --blue-deep #071629 (hero, footer, dark sections)
  --blue #0E2A52 (services, process, secondary dark)
  --blue-soft #1B3A6B (hover, borders)
  --gold #E8B23A (primary accent + buttons)
  --gold-soft #F2D079 (lighter hover)
  --gold-deep #B98218 (text accent on light)
  --paper #FBF8F1 (light background)
  --cream #F4EFE3 (alt light)
  Plus Inter sans + Instrument Serif italic display fonts.
- Built shared components: EditorialButton (gold/blue/outline-light/outline-dark/ghost variants, pill shape), SectionLabel (eyebrow with em-dash), BrowserFrame + PhoneFrame mockup wrappers, Reveal + RevealWords (scroll-triggered text reveals), SiteHeader (fixed with scroll-aware bg, animated mobile menu with full-screen overlay and staggered nav items), SiteFooter (with big wordmark + marquee CTA), ProjectCard (browser-frame cover image + hover arrow), FaqAccordion (editorial + / x icon).
- Built portfolio data system in /src/lib/portfolio.ts: type-safe Project interface with all fields requested (title, client, category, year, summary, description, url, theme, cover, desktop, mobile[], gallery[], overview, designDirection, deliverables[]). Includes getProjectBySlug / getFeaturedProjects / getAllProjects / getAllCategories / getNextProject helpers. Documented "how to add a new project" at the top of the file.
- Seeded two honest structural placeholder projects (Brightyweb Studio site + $11/Year Hosting landing) so the system renders correctly out of the box. The user replaces these with their real projects by editing the data file only — no code changes required.
- Built the 11-section homepage (Header & Footer live in layout, so page.tsx composes the 9 inner sections in the exact order requested).
- Built /about with three sub-sections (Who I am / How I approach projects / What clients can expect).
- Built /services with 5 services rendered as alternating blue/cream rhythm, each with What it is / Who it's for / What I design / What you receive, anchored by #slug.
- Built /work with category chips + project grid (asymmetric spacing for editorial rhythm).
- Built /work/[slug] dynamic case study with: Project Hero, Project Information grid, Overview + Design Direction, Desktop Design (in BrowserFrame), Mobile Design (in PhoneFrame, rotated for editorial feel), Additional Screens gallery, Website Link section (gold), Next Project nav (blue), CTA. generateStaticParams + generateMetadata configured.
- Built /contact with form (Name, Email, Business, Project Type select, Project Details textarea) that opens the user's email client prefilled to brightynexaistudio@gmail.com. Plus clickable email + Instagram cards and a "Read the FAQ" deep link to /#faq.
- SEO pass: page-level metadata for every route, OG tags, semantic headings, alt text on every image, sitemap.ts + robots.ts, canonical URLs, clean URL structure (/about, /services, /work, /work/[slug], /contact).
- Verified all 9 routes return 200 (/, /about, /services, /work, /work/brightyweb-studio-site, /work/studio-hosting-offer, /contact, /sitemap.xml, /robots.txt).
- Used agent-browser to verify: homepage renders correctly, mobile menu opens with staggered nav items, contact form fills and submits, #faq anchor scrolls correctly, service #slug anchors work, project case study desktop and mobile screenshots render in frames, no console errors, no runtime errors.
- VLM (z-ai vision) verified the hero, mobile view, mobile menu, contact page, project case study — all confirmed clean, no demo content, palette consistent, no broken sections.
- Lint passes with zero warnings.

Stage Summary:
- Demo content fully removed (no Atelier Noir / Kickside / Launchwave / Northbeam / Maison Verte / Atlas Realty / fake stats / fake testimonials anywhere — verified by grep).
- $11/year hosting offer preserved exactly as specified, on a dedicated gold-background section with a blue CTA, integrated into the homepage flow but not dominating it.
- New deep blue + warm yellow palette applied as a designed brand identity (not random colored blocks): hero is deep blue with gold italic accent, services/process are deep blue with gold accents, hosting section is gold with blue typography + blue CTA, final CTA + footer return to deep blue with gold details. Editorial rhythm alternates blue → cream → blue → cream → gold → cream → blue → cream across the homepage.
- Premium editorial art direction preserved from the original Brightyweb DNA: mixed-weight headlines (sans + italic serif), generous whitespace, browser-frame mockups (never floating UI blobs), pill buttons, subtle grain texture on dark sections, scroll-triggered text reveals, marquee strip in hero.
- Client-focused conversion structure inspired by Golden Funnel Studio: Why Your Website Matters section reframes the conversation from "I build websites" to the visitor's problem; FAQ with 8 honest questions; clear 5-step Design Process; final CTA in the spirit of "Ready for a website that represents your business properly?".
- Files produced:
  - /src/app/globals.css (brand palette + utilities)
  - /src/app/layout.tsx (fonts, metadata, header/footer injection)
  - /src/app/page.tsx (homepage composition)
  - /src/app/about/page.tsx
  - /src/app/services/page.tsx
  - /src/app/work/page.tsx
  - /src/app/work/[slug]/page.tsx
  - /src/app/contact/page.tsx
  - /src/app/sitemap.ts + /src/app/robots.ts
  - /src/lib/studio.ts (brand constants — single source of truth)
  - /src/lib/portfolio.ts (portfolio data system)
  - /src/lib/services.ts (5 services with full detail)
  - /src/lib/faq.ts (8 honest FAQ entries)
  - /src/components/site/{editorial-button,section-label,site-header,site-footer,project-card,page-header,faq-accordion,reveal}
  - /src/components/visual/mockup-frames
  - /src/components/sections/{hero-section,why-matters-section,what-i-design-section,selected-work-section,why-work-section,process-section,hosting-section,faq-section,final-cta-section}
  - /public/favicon.svg (new B mark in blue + gold)
  - /public/work/{brightyweb-studio-site,studio-hosting-offer}/cover.svg + desktop.svg + mobile-1.svg + (gallery) detail-1.svg, detail-2.svg
