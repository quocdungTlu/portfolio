import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * Cover cho project card. Nếu project có ảnh thật (public/projects/...)
 * thì dùng ảnh; nếu chưa có, render cover sinh tự động (gradient + tên)
 * để card vẫn đẹp trong lúc chờ screenshot.
 * TODO: thêm screenshot thật vào public/projects/<slug>/cover.png và set
 * `image` trong data/projects.ts.
 */
export function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={project.image}
          alt={`Ảnh minh hoạ ${project.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-surface-2",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <span className="relative font-mono text-xl font-semibold tracking-tight text-foreground/80 sm:text-2xl">
        {project.name}
      </span>
    </div>
  );
}
