"use client";

import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/app/components/ui";
import { site } from "@/app/lib/site";

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject || `Hello from ${name || "your site"}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
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

          {/* Right panel — white: the form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-7 sm:p-9"
            style={{ background: "var(--color-surface-card)" }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <label htmlFor="c-name" style={labelStyle}>Name</label>
              <input
                id="c-name"
                type="text"
                required
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="ds-field"
                style={{ ...fieldStyle, resize: "vertical", minHeight: 120 }}
              />
            </motion.div>
            <motion.div variants={item}>
              <Button type="submit" variant="primary" size="md">
                Send message
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
