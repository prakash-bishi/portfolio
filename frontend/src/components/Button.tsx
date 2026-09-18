import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

const base =
  "font-display inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-bg hover:bg-accent hover:text-accent-ink",
  secondary: "border border-line text-ink hover:border-ink bg-transparent",
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  href?: undefined;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return props.href !== undefined;
}

/**
 * Sharp corners (matches the design system's radius tokens — see
 * docs/DESIGN.md), not the rounded-pill default. One deliberate accent
 * moment on hover for the primary variant; secondary stays quiet.
 *
 * Pass `href` to render as a Next.js Link (internal navigation); omit it
 * to render as a real <button> (form actions, click handlers).
 */
export function Button(props: ButtonProps) {
  const classes = `${base} ${variants[props.variant ?? "primary"]} rounded-[var(--radius-sm)] ${props.className ?? ""}`;

  if (isLinkProps(props)) {
    const { href, variant, className, ...rest } = props;
    return <Link href={href} className={classes} {...rest} />;
  }

  const { variant, className, href, ...rest } = props;
  return <button className={classes} {...rest} />;
}
