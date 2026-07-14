import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowRow } from "@/types";

const kindStyle = {
  primary: "border-accent/40 bg-accent-soft",
  store: "border-accent-2/30 bg-accent-2/8",
  external: "border-edge-strong bg-surface-2",
  default: "border-edge bg-surface",
} as const;

/**
 * Sơ đồ kiến trúc dạng flow (thay cho Mermaid) — render thuần CSS,
 * mỗi hàng là một tầng, mũi tên nối giữa các tầng.
 */
export function FlowDiagram({ rows }: { rows: FlowRow[] }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {rows.map((row, i) => (
        <div key={row[0].id} className="contents">
          {i > 0 ? (
            <ArrowDown size={18} className="text-faint" aria-hidden />
          ) : null}
          <div className="flex w-full flex-wrap justify-center gap-3">
            {row.map((node) => (
              <div
                key={node.id}
                className={cn(
                  "min-w-40 flex-1 rounded-lg border px-4 py-3 text-center sm:max-w-64",
                  kindStyle[node.kind ?? "default"],
                )}
              >
                <p className="text-sm font-semibold">{node.label}</p>
                {node.sublabel ? (
                  <p className="mt-0.5 font-mono text-xs text-muted">{node.sublabel}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
