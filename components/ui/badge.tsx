import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Badge({
  className,
  tone = "default",
  ...props
}: ComponentProps<"span"> & { tone?: "default" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs whitespace-nowrap",
        tone === "accent"
          ? "border-accent/30 bg-accent-soft text-accent"
          : "border-edge bg-surface-2 text-muted",
        className,
      )}
      {...props}
    />
  );
}
