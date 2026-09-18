import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../Button";

describe("Button", () => {
  it("renders a real <button> when no href is given", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders a Next.js Link when href is given", () => {
    render(<Button href="/contact">Get in touch</Button>);
    const link = screen.getByRole("link", { name: "Get in touch" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("does not leak the href prop onto a real <button>", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).not.toHaveAttribute("href");
  });
});
