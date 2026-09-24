import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import * as contactLib from "@/lib/contact";

import { ContactForm } from "../ContactForm";

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Jane Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "Interested in working together." },
  });
  fireEvent.click(screen.getByRole("button", { name: /send message/i }));
}

describe("ContactForm", () => {
  it("renders name, email, and message fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders the honeypot field but keeps it out of the accessible form", () => {
    render(<ContactForm />);
    const honeypot = screen.getByLabelText("Website");
    expect(honeypot).toHaveAttribute("tabIndex", "-1");
    expect(honeypot.closest("[aria-hidden='true']")).toBeInTheDocument();
  });

  it("submits the form data via submitContactForm", async () => {
    const spy = vi
      .spyOn(contactLib, "submitContactForm")
      .mockResolvedValue({ status: "ok" });

    render(<ContactForm />);
    fillAndSubmit();

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Interested in working together.",
        website: "",
      });
    });
  });

  it("shows a thank-you message on success", async () => {
    vi.spyOn(contactLib, "submitContactForm").mockResolvedValue({
      status: "ok",
    });

    render(<ContactForm />);
    fillAndSubmit();

    expect(await screen.findByRole("status")).toHaveTextContent(/thanks/i);
  });

  it("shows a rate-limit message when throttled", async () => {
    vi.spyOn(contactLib, "submitContactForm").mockResolvedValue({
      status: "rate_limited",
    });

    render(<ContactForm />);
    fillAndSubmit();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /sent a few messages recently/i
    );
  });

  it("shows an error message on failure", async () => {
    vi.spyOn(contactLib, "submitContactForm").mockResolvedValue({
      status: "error",
      message: "Something went wrong. Please try again shortly.",
    });

    render(<ContactForm />);
    fillAndSubmit();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /something went wrong/i
    );
  });
});
