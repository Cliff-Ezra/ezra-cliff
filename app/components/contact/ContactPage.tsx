"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/app/components/ui";
import { site } from "@/app/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/** Uppercase mono field label, matching the contact mock. */
const labelStyle: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: 8,
};

const fieldStyle: CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  color: "var(--color-ink)",
  background: "var(--color-surface-card)",
  border: "1px solid var(--color-hairline-strong)",
  borderRadius: "var(--radius-md)",
  outline: "none",
  boxSizing: "border-box",
};

/** A labelled detail in the left column (email / phone / github / linkedin). */
function Detail({ label, href, value, external }: { label: string; href: string; value: string; external?: boolean }) {
  return (
    <div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}>{label}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          color: "var(--color-text-link)",
          textDecoration: "none",
          wordBreak: "break-word",
        }}
      >
        {value}
      </a>
    </div>
  );
}

/**
 * ContactPage — a split card: context + direct links on a soft-tone
 * left panel, the contact form on a white right panel, divided by a hairline.
 */
export function ContactPage() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never see/fill this
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // Staggered entrance: each panel cascades its children in.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-success)" }}
      >
        $ ./contact.sh
      </motion.p>

      {/* Two-toned split card */}
      <div
        className="mt-5 overflow-hidden"
        style={{
          border: "1px solid var(--color-hairline-strong)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left panel — soft tone: context + direct links */}
          <motion.div
            className="border-b border-[var(--color-hairline-strong)] p-7 sm:p-9 md:border-b-0 md:border-r"
            style={{ background: "var(--color-canvas-soft)" }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={item} className="ds-display-lg">
              Let&apos;s talk.
            </motion.h1>
            <motion.p variants={item} className="ds-body" style={{ marginTop: 14, maxWidth: 380, fontSize: 16 }}>
              Open to full-stack roles, freelance builds and interesting
              collaborations. Usually reply within a day.
            </motion.p>

            <div className="mt-8 flex flex-col gap-5">
              <motion.div variants={item}>
                <Detail label="email" href={`mailto:${site.email}`} value={site.email} />
              </motion.div>
              <motion.div variants={item}>
                <Detail label="phone" href={`tel:${site.phone.replace(/\s+/g, "")}`} value={site.phone} />
              </motion.div>
              <motion.div variants={item}>
                <Detail label="github" href={site.github} value={site.githubLabel} external />
              </motion.div>
              <motion.div variants={item}>
                <Detail label="linkedin" href={site.linkedin} value={site.linkedinLabel} external />
              </motion.div>
            </div>
          </motion.div>

          {/* Right panel — white: the form, or a success state once sent */}
          <div className="p-7 sm:p-9" style={{ background: "var(--color-surface-card)" }}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col items-start justify-center gap-3"
                  role="status"
                  aria-live="polite"
                >
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-pill)",
                      background: "var(--color-surface-strong)",
                      color: "var(--color-success)",
                    }}
                  >
                    <Check size={20} strokeWidth={2.5} />
                  </span>
                  <h2 className="ds-display-sm">Message sent.</h2>
                  <p className="ds-body" style={{ fontSize: 15, maxWidth: 320 }}>
                    Thanks for reaching out — I&apos;ll get back to you within a day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    style={{
                      marginTop: 4,
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "var(--color-text-link)",
                    }}
                  >
                    send another →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                >
                  {/* Honeypot — hidden from real users; bots that fill it are dropped. */}
                  <div aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                    <label htmlFor="c-company">Company</label>
                    <input
                      id="c-company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <motion.div variants={item}>
                    <label htmlFor="c-name" style={labelStyle}>Name</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="ds-field"
                      style={fieldStyle}
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <label htmlFor="c-email" style={labelStyle}>Email</label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      maxLength={200}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="ds-field"
                      style={fieldStyle}
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <label htmlFor="c-subject" style={labelStyle}>What&apos;s this about?</label>
                    <input
                      id="c-subject"
                      type="text"
                      maxLength={150}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="ds-field"
                      style={fieldStyle}
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <label htmlFor="c-message" style={labelStyle}>Message</label>
                    <textarea
                      id="c-message"
                      required
                      rows={5}
                      maxLength={5000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="ds-field"
                      style={{ ...fieldStyle, resize: "vertical", minHeight: 120 }}
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <Button type="submit" variant="primary" size="md" disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending…" : "Send message"}
                    </Button>
                    {status === "error" && (
                      <p
                        role="alert"
                        className="mt-3"
                        style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--color-warning)" }}
                      >
                        {errorMsg}
                      </p>
                    )}
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
