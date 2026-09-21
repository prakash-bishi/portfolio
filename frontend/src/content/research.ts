/**
 * Static research interests content for the Research page.
 *
 * Unlike Publications (CMS-backed, see backend/research/), these
 * interest descriptions are static: general, honest descriptions of
 * each research area (what the problem is, why it matters) rather than
 * claims about specific results Prakash has personally achieved — those
 * aren't documented anywhere, so they aren't asserted here. See
 * RULES.md's Truth Rule and docs/DECISIONS.md for the reasoning.
 *
 * The three areas themselves were provided directly by the project
 * owner; the descriptions were written by Claude with explicit
 * permission to elaborate, kept to general/factual field descriptions.
 */

export type ResearchInterest = {
  title: string;
  description: string;
};

export const researchInterests: ResearchInterest[] = [
  {
    title: "Computer Vision for Agriculture",
    description:
      "Applying object detection, segmentation, and classification to " +
      "real-world agricultural and environmental settings — monitoring " +
      "crops, plants, and aquatic life in field conditions that are " +
      "messier and more variable than typical benchmark datasets.",
  },
  {
    title: "Novel Class Discovery (Object Detection)",
    description:
      "Most object detectors only recognize a fixed, predefined set of " +
      "categories. Novel class discovery is the problem of identifying " +
      "and learning to detect object categories that weren't present in " +
      "the original labeled training data — extending a detector beyond " +
      "its original closed vocabulary.",
  },
  {
    title: "Efficient Object Detection",
    description:
      "Making detection models faster and lighter without giving up too " +
      "much accuracy — relevant for deploying models like the YOLO " +
      "family on constrained hardware or in real-time settings, rather " +
      "than only in a research environment with unlimited compute.",
  },
  {
    title: "Robustness and Generalization",
    description:
      "Improving the ability of detection models to generalize to new " +
      "domains, datasets, and conditions — for example, training on " +
      "images from one camera or environment and testing on images from " +
      "another, or training on one dataset and testing on another.",
  },
];
