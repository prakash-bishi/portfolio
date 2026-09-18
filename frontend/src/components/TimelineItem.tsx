type TimelineItemProps = {
  title: string;
  subtitle: string;
  period: string;
  current?: boolean;
  detail?: string;
};

/**
 * A single Experience or Education entry. Shared because both sections
 * use the identical title/subtitle/period/detail shape — see
 * frontend/src/content/profile.ts.
 */
export function TimelineItem({
  title,
  subtitle,
  period,
  current,
  detail,
}: TimelineItemProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div>
        <h3 className="font-display text-base font-medium">{title}</h3>
        <p className="text-ink-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-ink-muted sm:shrink-0">
        {current && (
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
        )}
        <span>
          {period}
          {detail && ` (${detail})`}
        </span>
      </div>
    </div>
  );
}
