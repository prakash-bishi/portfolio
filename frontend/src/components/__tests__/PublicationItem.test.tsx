import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Publication } from "@/lib/research";

import { PublicationItem } from "../PublicationItem";

const basePublication: Publication = {
  id: 1,
  title: "A Novel Approach to Testing",
  authors: "Prakash Bishi",
  venue: "",
  year: null,
  publication_type: "paper",
  publication_type_display: "Paper",
  summary: "",
  external_url: "",
};

describe("PublicationItem", () => {
  it("renders title, authors, and publication type", () => {
    render(<PublicationItem publication={basePublication} />);
    expect(screen.getByText(basePublication.title)).toBeInTheDocument();
    expect(screen.getByText("Prakash Bishi")).toBeInTheDocument();
    expect(screen.getByText("Paper")).toBeInTheDocument();
  });

  it("formats venue and year in parentheses, not a middle-dot separator", () => {
    render(
      <PublicationItem
        publication={{ ...basePublication, venue: "IEEE Test Conference", year: 2025 }}
      />
    );
    expect(screen.getByText("IEEE Test Conference (2025)")).toBeInTheDocument();
  });

  it("shows only the venue when year is missing", () => {
    render(
      <PublicationItem publication={{ ...basePublication, venue: "Some Journal" }} />
    );
    expect(screen.getByText("Some Journal")).toBeInTheDocument();
  });

  it("shows only the year when venue is missing", () => {
    render(<PublicationItem publication={{ ...basePublication, year: 2024 }} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("does not render a link when external_url is empty", () => {
    render(<PublicationItem publication={basePublication} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders a link when external_url is set", () => {
    render(
      <PublicationItem
        publication={{ ...basePublication, external_url: "https://example.com/paper" }}
      />
    );
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute(
      "href",
      "https://example.com/paper"
    );
  });
});
