import { NextResponse } from "next/server";
import { sendInquiryEmails, type InquiryData } from "@/lib/email";

export const runtime = "nodejs";

const NEED_OPTIONS = [
  "New Website",
  "Website Redesign",
  "Landing Page",
  "Business Website",
  "E-commerce Website",
  "Other",
];

const PAGES_OPTIONS = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Shop",
  "Contact",
  "Blog",
  "Other",
];

const CONTENT_OPTIONS = [
  "Yes, everything is ready",
  "I have some content",
  "No, I need help",
];

const BUDGET_OPTIONS = ["Under $200", "$200–$500", "$500–$1,000", "$1,000+", "Not sure yet"];

const LAUNCH_OPTIONS = [
  "As soon as possible",
  "Within 2–4 weeks",
  "Within 1–2 months",
  "Flexible",
];

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isUrl(s: string): boolean {
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    return Boolean(u.hostname);
  } catch {
    return false;
  }
}

function asArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string") return [v];
  return [];
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot: a hidden "company_website" field. Real users never fill it;
  // bots filling every field do. Silently succeed if it's filled.
  const honeypot = typeof body.company_website === "string" ? body.company_website : "";
  if (honeypot.trim().length > 0) {
    // Pretend success — don't reveal to the bot that it was caught.
    return NextResponse.json({ ok: true, mode: "smtp" });
  }

  // Extract & validate all fields
  const errors: Record<string, string> = {};

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  if (!fullName) errors.fullName = "Please enter your full name.";

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) errors.email = "Please enter your email address.";
  else if (!isEmail(email)) errors.email = "Please enter a valid email address.";

  const business = typeof body.business === "string" ? body.business.trim() : "";
  if (!business) errors.business = "Please enter your business or brand name.";

  const need = typeof body.need === "string" ? body.need : "";
  if (!need) errors.need = "Please select what you need.";
  else if (!NEED_OPTIONS.includes(need)) errors.need = "Please select a valid option.";

  const hasWebsite = typeof body.hasWebsite === "string" ? body.hasWebsite : "";
  if (!hasWebsite) errors.hasWebsite = "Please let me know if you already have a website.";
  else if (!["yes", "no"].includes(hasWebsite)) errors.hasWebsite = "Please select Yes or No.";

  let currentUrl = "";
  if (hasWebsite === "yes") {
    currentUrl = typeof body.currentUrl === "string" ? body.currentUrl.trim() : "";
    if (!currentUrl) errors.currentUrl = "Please enter your current website URL.";
    else if (!isUrl(currentUrl)) errors.currentUrl = "Please enter a valid website URL.";
  }

  const goal = typeof body.goal === "string" ? body.goal.trim() : "";
  if (!goal) errors.goal = "Please describe the main goal of your website.";

  const pages = asArray(body.pages).filter((p) => PAGES_OPTIONS.includes(p));

  const contentStatus = typeof body.contentStatus === "string" ? body.contentStatus : "";
  if (!contentStatus) errors.contentStatus = "Please select your content status.";
  else if (!CONTENT_OPTIONS.includes(contentStatus))
    errors.contentStatus = "Please select a valid option.";

  const styleRefs = typeof body.styleRefs === "string" ? body.styleRefs.trim() : "";

  const budget = typeof body.budget === "string" ? body.budget : "";
  if (!budget) errors.budget = "Please select a budget range.";
  else if (!BUDGET_OPTIONS.includes(budget)) errors.budget = "Please select a valid option.";

  const launchTime = typeof body.launchTime === "string" ? body.launchTime : "";
  if (!launchTime) errors.launchTime = "Please select a desired launch time.";
  else if (!LAUNCH_OPTIONS.includes(launchTime)) errors.launchTime = "Please select a valid option.";

  const projectDetails =
    typeof body.projectDetails === "string" ? body.projectDetails.trim() : "";
  if (!projectDetails) errors.projectDetails = "Please tell me about your project.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Send the emails
  const data: InquiryData = {
    fullName,
    email,
    business,
    need,
    hasWebsite,
    currentUrl,
    goal,
    pages,
    contentStatus,
    styleRefs,
    budget,
    launchTime,
    projectDetails,
  };

  const result = await sendInquiryEmails(data);

  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          "We couldn't send your inquiry just now. Please try again in a moment, or email brightynexaistudio@gmail.com directly.",
      },
      { status: 500 },
    );
  }

  // For mailto: fallback, the client opens the visitor's email client with the prefilled body.
  if (result.mode === "mailto") {
    return NextResponse.json({
      ok: true,
      mode: "mailto",
      mailtoUrl: result.mailtoUrl,
    });
  }

  // SMTP success — emails sent server-side.
  return NextResponse.json({ ok: true, mode: "smtp" });
}
