type SectionHeadingProps = {
  children: string;
  id?: string;
};

/**
 * Consistent section header for content pages (About now; Projects,
 * Research, Startup will want the same pattern later). Small
 * hairline-underline rather than a heavier treatment, matching the
 * "clean" design pillar.
 */
export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="font-display border-b border-line pb-3 text-xl font-medium"
    >
      {children}
    </h2>
  );
}
