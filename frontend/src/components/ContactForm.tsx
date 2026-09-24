"use client";

import { useState } from "react";

import { submitContactForm } from "@/lib/contact";

import { Button } from "./Button";

type Status = "idle" | "submitting" | "success" | "error" | "rate_limited";

const fieldClasses =
  "w-full rounded-[var(--radius-sm)] border border-line bg-surface px-3 py-2 text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-accent";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — real visitors never see this field (visually hidden
  // below) or have a reason to fill it. See lib/contact.ts and
  // backend/contact/serializers.py.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const result = await submitContactForm({ name, email, message, website });

    if (result.status === "ok") {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    if (result.status === "rate_limited") {
      setStatus("rate_limited");
      return;
    }

    setStatus("error");
    setErrorMessage(result.message);
  }

  if (status === "success") {
    return (
      <p className="text-ink-muted" role="status">
        Thanks — your message has been sent. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-xl flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1.5 ${fieldClasses}`}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1.5 ${fieldClasses}`}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`mt-1.5 ${fieldClasses}`}
        />
      </div>

      {/* Honeypot field — hidden from sighted users via CSS (not
          `display:none`/`hidden`, since some bots skip those; this
          stays in the accessibility tree removed via aria-hidden and
          off-screen positioning) and skipped in tab order. */}
      <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-ink-muted" role="alert">
          {errorMessage}
        </p>
      )}
      {status === "rate_limited" && (
        <p className="text-sm text-ink-muted" role="alert">
          You&apos;ve sent a few messages recently — please wait a bit before
          sending another.
        </p>
      )}

      <div>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
