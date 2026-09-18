import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders the current year in the copyright line", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders links matching the primary nav destinations", () => {
    render(<Footer />);
    for (const label of ["About", "Projects", "Research", "Startup", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});
