import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "../page";

describe("About page", () => {
  it("renders Experience, Education, and Skills sections", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  });

  it("renders both experience entries with their organizations", () => {
    render(<AboutPage />);
    expect(screen.getByText("Assistant Professor")).toBeInTheDocument();
    expect(screen.getByText(/SSIPMT, Raipur/)).toBeInTheDocument();
    expect(screen.getByText("AIML Trainer")).toBeInTheDocument();
    expect(screen.getByText(/PM SHRI Schools/)).toBeInTheDocument();
  });

  it("renders both education entries with correct completion details", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/M\.Tech, Artificial Intelligence & Machine Learning/)
    ).toBeInTheDocument();
    expect(screen.getByText(/76\.59%/)).toBeInTheDocument();
    expect(
      screen.getByText(/B\.Tech, Computer Science & Engineering/)
    ).toBeInTheDocument();
    expect(screen.getByText(/RCET, Raipur/)).toBeInTheDocument();
  });

  it("renders skill group labels and at least one skill from each group", () => {
    render(<AboutPage />);
    for (const label of [
      "AI / ML",
      "Computer Vision",
      "Image & Data Annotation",
      "Web Development",
    ]) {
      expect(
        screen.getByRole("heading", { name: label, level: 3 })
      ).toBeInTheDocument();
    }
    expect(screen.getByText("PyTorch")).toBeInTheDocument();
    expect(screen.getByText("YOLOv8")).toBeInTheDocument();
    expect(screen.getByText("Bounding Box Annotation")).toBeInTheDocument();
    expect(screen.getByText("Django")).toBeInTheDocument();
  });
});
