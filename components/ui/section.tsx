import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import type { ReactNode } from "react";

export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-6 py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-14">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}
