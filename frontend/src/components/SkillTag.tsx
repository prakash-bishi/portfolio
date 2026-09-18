type SkillTagProps = {
  children: string;
};

/**
 * A single skill tag. Sharp corners, hairline border — consistent with
 * the design system's sharp-radii/border-over-shadow conventions (see
 * docs/DESIGN.md), not a rounded "pill" default.
 */
export function SkillTag({ children }: SkillTagProps) {
  return (
    <span className="inline-block rounded-[var(--radius-sm)] border border-line px-3 py-1 text-sm text-ink-muted">
      {children}
    </span>
  );
}
