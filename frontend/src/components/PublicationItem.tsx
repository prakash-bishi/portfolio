import type { Publication } from "@/lib/research";

type PublicationItemProps = {
  publication: Publication;
};

function formatVenueAndYear(publication: Publication): string {
  const { venue, year } = publication;
  if (venue && year) return `${venue} (${year})`;
  if (venue) return venue;
  if (year) return String(year);
  return "";
}

/**
 * A single publication entry. Venue/year are joined with parentheses,
 * not a middle-dot separator — see DESIGN.md's "Explicitly Avoided"
 * list and the regression this project already hit once with
 * TimelineItem (docs/DECISIONS.md).
 */
export function PublicationItem({ publication }: PublicationItemProps) {
  const meta = formatVenueAndYear(publication);

  return (
    <div className="flex flex-col gap-1 border-b border-line py-5 last:border-b-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-display text-base font-medium">
          {publication.title}
        </h3>
        <span className="text-sm text-ink-muted sm:shrink-0">
          {publication.publication_type_display}
        </span>
      </div>
      <p className="text-ink-muted">{publication.authors}</p>
      {meta && <p className="text-sm text-ink-muted">{meta}</p>}
      {publication.summary && (
        <p className="mt-1 max-w-2xl text-ink-muted">{publication.summary}</p>
      )}
      {publication.external_url && (
        <a
          href={publication.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block w-fit text-sm text-accent underline underline-offset-4 hover:no-underline"
        >
          View
        </a>
      )}
    </div>
  );
}
