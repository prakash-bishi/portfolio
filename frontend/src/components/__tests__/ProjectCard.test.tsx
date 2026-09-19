import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Project } from "@/lib/projects";

import { ProjectCard } from "../ProjectCard";

const baseProject: Project = {
  id: 1,
  title: "Yoga Pose Estimation using YOLOv8",
  slug: "yoga-pose-estimation-yolov8",
  summary: "Pose estimation for yoga postures using YOLOv8.",
  tags: ["YOLOv8", "Computer Vision"],
  status: "",
  status_display: "",
  external_url: "",
};

describe("ProjectCard", () => {
  it("renders the title, summary, and tags", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText(baseProject.title)).toBeInTheDocument();
    expect(screen.getByText(baseProject.summary)).toBeInTheDocument();
    expect(screen.getByText("YOLOv8")).toBeInTheDocument();
    expect(screen.getByText("Computer Vision")).toBeInTheDocument();
  });

  it("links to the project's detail page", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/projects/yoga-pose-estimation-yolov8"
    );
  });

  it("does not render a status badge when status_display is empty", () => {
    render(<ProjectCard project={baseProject} />);
    // Only title and summary text should be present, no extra status span
    expect(screen.queryByText("In development")).not.toBeInTheDocument();
  });

  it("renders a status badge when status_display is set", () => {
    render(
      <ProjectCard project={{ ...baseProject, status_display: "In development" }} />
    );
    expect(screen.getByText("In development")).toBeInTheDocument();
  });
});
