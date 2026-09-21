/**
 * Static content for the Startup page.
 *
 * Every capability listed here traces back to a skill already verified
 * in docs/PRD.md's Reference Facts — this page reframes real technical
 * skills as commercial capabilities, it does not introduce new claims.
 *
 * Per RULES.md's Truth Rule: no fabricated clients, services currently
 * "offered", case studies, or traction. Capabilities are described as
 * what the underlying skills genuinely support, not as an established
 * service catalog with pricing or delivery guarantees.
 */

export type CapabilityGroup = {
  title: string;
  description: string;
  items: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "AI Data",
    description:
      "Preparing and annotating data for computer vision and text/audio " +
      "models — the groundwork most AI projects actually depend on.",
    items: [
      "Bounding Box Annotation",
      "Polygon Annotation",
      "Segmentation Annotation",
      "Keypoint Annotation",
      "3D Cuboid Annotation",
      "Dataset Preparation",
      "Text Categorization",
      "Text Data Cleaning",
      "Audio Categorization",
    ],
  },
  {
    title: "Computer Vision",
    description:
      "Building and applying object detection, classification, and " +
      "segmentation models to real images and video.",
    items: ["Computer Vision", "OpenCV", "YOLOv8", "YOLOv9"],
  },
  {
    title: "AI / ML",
    description:
      "Training and experimenting with machine learning and deep " +
      "learning models.",
    items: ["Machine Learning", "Deep Learning", "PyTorch"],
  },
];
