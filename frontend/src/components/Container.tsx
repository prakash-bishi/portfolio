import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Max-width content wrapper with responsive side padding. The one
 * horizontal-rhythm primitive every page section should use, so content
 * edges line up consistently across the site.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
