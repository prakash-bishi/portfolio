/**
 * Static profile content for the About page.
 *
 * Source of truth: docs/PRD.md "Reference Facts". Every value here must
 * trace back to that document — see RULES.md's Truth Rule. Do not add
 * anything here (dates, institutions, skills, descriptions) that isn't
 * already documented there.
 *
 * This is intentionally static/hardcoded rather than Django-CMS-backed:
 * this content changes rarely, and building a full model+API+admin for
 * it now would be premature (see docs/DECISIONS.md). Revisit only if a
 * real, recurring editing need emerges.
 */

export type ExperienceEntry = {
  role: string;
  organization: string;
  period: string;
  current?: boolean;
  description?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Assistant Professor",
    organization:
      "Shri Shankaracharya Institute of Professional Management & Technology (SSIPMT), Raipur",
    period: "Current",
    current: true,
  },
  {
    role: "AIML Trainer",
    organization: "PM SHRI Schools, Chhattisgarh",
    period: "Previous",
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    degree: "M.Tech, Artificial Intelligence & Machine Learning",
    institution: "SSIPMT, Raipur",
    period: "Completed 2024",
    detail: "76.59%",
  },
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "RCET, Raipur",
    period: "Completed 2020",
  },
];

export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "AI / ML",
    skills: ["Machine Learning", "Deep Learning", "PyTorch"],
  },
  {
    label: "Computer Vision",
    skills: ["Computer Vision", "OpenCV", "YOLOv8", "YOLOv9"],
  },
  {
    label: "Image & Data Annotation",
    skills: [
      "Bounding Box Annotation",
      "Polygon Annotation",
      "Segmentation Annotation",
      "Keypoint Annotation",
      "3D Cuboid Annotation",
      "Text Categorization",
      "Text Data Cleaning",
      "Audio Categorization",
      "Dataset Preparation",
    ],
  },
  {
    label: "Web Development",
    skills: ["Python", "Django", "HTML", "CSS", "JavaScript", "PHP (beginner)"],
  },
];
