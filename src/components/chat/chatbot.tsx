"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { STUDIO } from "@/lib/studio";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

const SUGGESTIONS = [
  "What services do you offer?",
  "How long does a website take?",
  "What does $11/year hosting include?",
  "Can you redesign my existing website?",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Hi — I'm the Brightyweb assistant. I can help you understand the studio's services, the $11/year hosting offer, and how to start a project. What would you like to know?",
  ts: Date.now(),
};

export function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([INITIAL_GREETING]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [unread, setUnread] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Mark unread if closed and a new assistant reply arrives
  React.useEffect(() => {
    if (!open && messages.length > 1) {
      const last = messages[messages.length - 1];
      if (last.role === "assistant") setUnread(true);
    }
  }, [messages, open]);

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setUnread(false);
      const t = window.setTimeout(() => inputRef.current?.focus(), 250);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed, ts: Date.now() };
    const history: Msg[] = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      // Only send the last ~8 messages to keep payload small.
      const payload = history.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = await res.json();
      const reply: string =
        typeof data?.reply === "string" && data.reply.length > 0
          ? data.reply
          : "Sorry — I couldn't generate a response. Please try again or email me at brightynexaistudio@gmail.com.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, ts: Date.now() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry — I had trouble responding just now. Please try again in a moment, or email me at brightynexaistudio@gmail.com.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)] text-[var(--blue-deep)] shadow-[0_10px_30px_-10px_rgba(232,178,58,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 md:bottom-6 md:right-6"
      >
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--paper)] bg-[var(--blue)]" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare size={22} strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 flex h-[560px] max-h-[80vh] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_40px_80px_-30px_rgba(7,22,41,0.4)] md:right-6"
            role="dialog"
            aria-label="Brightyweb assistant"
          >
            {/* header */}
            <div className="flex items-center justify-between bg-[var(--blue-deep)] px-5 py-4 text-[var(--paper)]">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gold)] font-bold text-[var(--blue-deep)]">
                  B
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">Brightyweb Assistant</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-[var(--paper)]/65">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                    </span>
                    Usually replies in seconds
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--paper)]/70 transition-colors hover:bg-white/10 hover:text-[var(--paper)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto bg-[var(--paper)] px-4 py-5 scrollbar-thin"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
              {loading && <TypingBubble />}

              {/* suggestions — only show before user sends first message */}
              {messages.length === 1 && !loading && (
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)]/45">
                    Try asking
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-[var(--ink)]/15 bg-white px-3.5 py-2 text-left text-sm font-medium text-[var(--ink)]/80 transition-all hover:border-[var(--gold-deep)]/40 hover:bg-[var(--cream)] hover:text-[var(--ink)]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* contact nudge */}
              {messages.length >= 4 && !loading && (
                <a
                  href="/contact"
                  className="flex items-center justify-between gap-2 rounded-xl border border-[var(--gold-deep)]/30 bg-[var(--gold)]/10 px-3.5 py-2.5 text-sm font-semibold text-[var(--blue-deep)] transition-colors hover:bg-[var(--gold)]/20"
                >
                  Start a project on the contact page
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-black/10 bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Brightyweb…"
                disabled={loading}
                className="flex-1 rounded-full border border-[var(--ink)]/15 bg-[var(--paper)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink)]/40 focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold)]/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--blue)] text-[var(--gold)] transition-all hover:bg-[var(--blue-soft)] disabled:opacity-40 disabled:hover:bg-[var(--blue)]"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-[var(--blue)] text-[var(--paper)]"
            : "rounded-bl-md border border-[var(--ink)]/10 bg-white text-[var(--ink)]",
        )}
      >
        <p className="whitespace-pre-wrap">{msg.content}</p>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[var(--ink)]/10 bg-white px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--ink)]/40 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--ink)]/40 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--ink)]/40 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
