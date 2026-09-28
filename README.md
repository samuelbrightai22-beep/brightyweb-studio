# Brightyweb — Professional Web Design Studio

The marketing website for **Brightyweb**, an independent web design studio. Built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui. Live at [brightyweb.space-z.ai](https://brightyweb.space-z.ai).

## What's inside

- **Homepage** with 11 editorial sections (hero, why your website matters, what I design, selected work, why work with me, design process, $11/year hosting, FAQ, final CTA, footer)
- **Pages**: Home, About, Services, Work, Contact, Start a Project, plus dynamic project case study pages at `/work/<slug>`
- **12 real portfolio projects** in `/src/lib/portfolio.ts` — barbershop, gym, kitchen, restaurant, clinic, skincare, beauty, marketplace
- **Project Inquiry form** at `/start-a-project` — 12 fields, conditional logic, validation, honeypot spam protection, real Gmail SMTP email delivery
- **AI chatbot assistant** floating bottom-right on every page (powered by z-ai-web-dev-sdk)
- **Premium design system** — Open Sans font, deep blue + warm yellow brand palette, Wix-inspired card layouts

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion) for animations
- [Nodemailer](https://nodemailer.com) for SMTP email delivery
- [z-ai-web-dev-sdk](https://www.npmjs.com/package/z-ai-web-dev-sdk) for the chatbot LLM

## Local development

```bash
# Install dependencies
bun install

# Run database migrations (only if you use Prisma — the website itself doesn't)
bun run db:push

# Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

Required for the Start a Project form:

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server host (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (465 for SSL, 587 for STARTTLS) |
| `SMTP_USER` | SMTP username (your Gmail address) |
| `SMTP_PASS` | SMTP password (16-char Google App Password for Gmail) |
| `SMTP_FROM` | "From" email address (usually same as `SMTP_USER`) |
| `MAIL_TO` | Email address that receives form submissions |

`.env.local` is git-ignored and never committed. See [Gmail App Password setup](https://myaccount.google.com/apppasswords).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no build config needed.
4. In **Settings → Environment Variables**, add the 6 SMTP variables listed above.
5. Deploy. The site will be live at `<project>.vercel.app`.

### Important notes for Vercel

- **Serverless function timeout**: the SMTP email send needs to complete within Vercel's function timeout (10s on Hobby tier, 60s on Pro). Gmail SMTP usually responds within 2-5 seconds — well under the limit.
- **Cold starts**: the first request after a cold start may take an extra second or two. This is normal for serverless.
- **Prisma + SQLite**: the schema is included but the website itself doesn't query the database. If you add database features later, switch to [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Neon](https://neon.tech) — SQLite file storage doesn't work on serverless.

## Deploying on Z.ai sandbox (this workspace)

The Z.ai sandbox uses a different runtime — `bun` + `next dev` for development, `bun .next/standalone/server.js` for production. The build/start scripts in `.zscripts/` handle this automatically.

## Adding a new portfolio project

1. Open `/src/lib/portfolio.ts`.
2. Copy any existing project entry.
3. Change `slug`, `title`, `client`, `category`, `year`, `summary`, `description`, `url`, and `cover` image path.
4. Drop the cover image at `/public/work/<slug>/cover.png`.
5. Optionally set `featured: true` to show it on the homepage's Selected Work section.
6. The new project automatically appears on `/work` and (if featured) on the homepage.

## License

Private project. All rights reserved.
