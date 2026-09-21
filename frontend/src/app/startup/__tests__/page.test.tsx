import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import StartupPage from "../page";

describe("Startup page", () => {
  it("renders the Capabilities section", () => {
    render(<StartupPage />);
    expect(
      screen.getByRole("heading", { name: "Capabilities" })
    ).toBeInTheDocument();
  });

  it("renders all three capability group titles", () => {
    render(<StartupPage />);
    for (const label of ["AI Data", "Computer Vision", "AI / ML"]) {
      expect(
        screen.getByRole("heading", { name: label, level: 3 })
      ).toBeInTheDocument();
    }
  });

  it("renders capability items traceable to real skills", () => {
    render(<StartupPage />);
    expect(screen.getByText("Bounding Box Annotation")).toBeInTheDocument();
    expect(screen.getByText("YOLOv8")).toBeInTheDocument();
    expect(screen.getByText("PyTorch")).toBeInTheDocument();
  });

  it("includes an honest early-stage framing, not overstated claims", () => {
    render(<StartupPage />);
    expect(
      screen.getByText(/not an established company/i)
    ).toBeInTheDocument();
  });

  it("links to /contact for the get-in-touch CTA", () => {
    render(<StartupPage />);
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
