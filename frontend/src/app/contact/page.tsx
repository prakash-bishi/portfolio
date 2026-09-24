import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Contact — Prakash Bishi",
  description: "Get in touch about a project, collaboration, or question.",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-16 sm:py-20">
        <h1 className="text-3xl font-medium sm:text-4xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Have a project, question, or collaboration in mind? Send a
          message below.
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
