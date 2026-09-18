import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { Navbar } from "../Navbar";

describe("Navbar", () => {
  it("renders the wordmark and all primary nav links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Prakash Bishi" })).toHaveAttribute(
      "href",
      "/"
    );

    for (const label of ["About", "Projects", "Research", "Startup", "Contact"]) {
      // Desktop nav renders each label once; mobile nav only renders
      // once the menu is opened, so at this point there should be
      // exactly one match per label.
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("mobile menu is closed by default and opens on toggle", () => {
    render(<Navbar />);

    // Before opening, only the desktop nav's links exist — no <ul> list.
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(1);
  });
});
