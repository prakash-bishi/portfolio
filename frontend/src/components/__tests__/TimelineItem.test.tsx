import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TimelineItem } from "../TimelineItem";

describe("TimelineItem", () => {
  it("renders title, subtitle, and period", () => {
    render(
      <TimelineItem
        title="Assistant Professor"
        subtitle="SSIPMT, Raipur"
        period="Current"
      />
    );
    expect(screen.getByText("Assistant Professor")).toBeInTheDocument();
    expect(screen.getByText("SSIPMT, Raipur")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders the detail in parentheses, not a middle-dot separator", () => {
    render(
      <TimelineItem
        title="M.Tech"
        subtitle="SSIPMT, Raipur"
        period="Completed 2024"
        detail="76.59%"
      />
    );
    expect(screen.getByText("Completed 2024 (76.59%)")).toBeInTheDocument();
  });

  it("does not render a detail suffix when no detail is given", () => {
    render(
      <TimelineItem
        title="B.Tech"
        subtitle="RCET, Raipur"
        period="Completed 2020"
      />
    );
    expect(screen.getByText("Completed 2020")).toBeInTheDocument();
  });
});
