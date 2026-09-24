import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { SERVICES } from "@/lib/services";
import { FAQ_ITEMS } from "@/lib/faq";
import { STUDIO } from "@/lib/studio";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the Brightyweb Studio assistant — a calm, helpful, confident voice on the Brightyweb website (brightyweb.space-z.ai). You help visitors understand what Brightyweb does and decide whether to start a project.

ABOUT BRIGHTYWEB
- Brightyweb is an independent professional web design studio.
- The studio designs and builds modern, responsive websites for businesses and brands.
- It is NOT an agency, NOT an AI company, NOT a marketing shop, NOT a video/photo/UGC studio. Websites are the thing, done properly, end to end.
- One point of contact — the person who replies is the person who designs the website.
- Reply time: about 24 hours.
- Hosting: a flat ${STUDIO.hosting.price}/${STUDIO.hosting.cadence} offer (NOT a monthly subscription) bundled with Brightyweb website projects.

SERVICES
${SERVICES.map(
  (s) =>
    `(${s.number}) ${s.title} — ${s.summary}`,
).join("\n")}

Responsive web design is NOT a separate service — it is part of every build.

COMMON QUESTIONS (you may answer these directly and concisely)
${FAQ_ITEMS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

CONTACT
- Email: ${STUDIO.email}
- Instagram: ${STUDIO.instagram.handle} (${STUDIO.instagram.url})
- Contact page: /contact
- Work page: /work
- Services page: /services

VOICE & RULES
- Short sentences. Clear language. Confidence without hype.
- Human tone, not corporate. Never use phrases like "unlock your potential", "take your business to the next level", "cutting-edge solutions", "revolutionary", "transform your digital presence", or "seamless digital ecosystem".
- Be honest. Do NOT invent client names, project results, revenue numbers, conversion rates, awards, years of experience, or number of websites built. If a question asks for invented specifics, say you don't have that and direct the visitor to the contact page.
- Keep answers concise — usually 2–4 sentences. The visitor can always read the website for the long version.
- When a visitor seems serious about starting a project (mentions their business, a timeline, a redesign, a launch), encourage them to use the contact form at /contact so the project can be scoped properly.
- You are the assistant, not the designer. Don't promise quotes, timelines, or availability — direct those to /contact.
- If the user asks something unrelated to web design or the studio, gently steer back to the website's purpose or suggest they email the studio.

Reply in plain text. Do not use markdown headings. Keep formatting simple — short paragraphs and occasional bullet points are fine.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 },
      );
    }

    // Validate / light sanitize: only role + content, drop anything else.
    const cleanMessages = messages
      .filter(
        (m: unknown): m is { role: string; content: string } =>
          typeof m === "object" &&
          m !== null &&
          typeof (m as { role?: unknown }).role === "string" &&
          typeof (m as { content?: unknown }).content === "string",
      )
      .map((m) => ({
        role:
          m.role === "user" || m.role === "assistant" ? m.role : "user",
        content: String(m.content).slice(0, 4000),
      }));

    if (cleanMessages.length === 0) {
      return NextResponse.json(
        { error: "no valid messages" },
        { status: 400 },
      );
}

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        ...cleanMessages,
      ],
      thinking: { type: "disabled" },
    });

    const reply =
      completion?.choices?.[0]?.message?.content ??
      "Sorry — I couldn't generate a response. Please try again or email brightynexaistudio@gmail.com.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        error: "Chat failed",
        reply:
          "Sorry — I had trouble responding just now. Please try again in a moment, or email brightynexaistudio@gmail.com.",
      },
      { status: 500 },
    );
  }
}
