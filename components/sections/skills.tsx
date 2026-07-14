import { skillTags } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/section";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { SkillLevel } from "@/types";

const levelStyle: Record<SkillLevel, string> = {
  Proficient: "border-accent/40 bg-accent-soft text-accent",
  Comfortable: "border-accent-2/30 bg-accent-2/10 text-accent-2",
  Familiar: "border-edge bg-surface-2 text-muted",
};

const levels: SkillLevel[] = ["Proficient", "Comfortable", "Familiar"];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="What I'm good at"
        description="Honest levels — no fake percentage bars. Proficient means I've shipped it to production."
      />
      <div className="space-y-8">
        {levels.map((level) => (
          <div key={level}>
            <h3 className="mb-3 font-mono text-xs tracking-[0.15em] text-faint uppercase">
              {level}
            </h3>
            <StaggerGroup className="flex flex-wrap gap-2.5">
              {skillTags
                .filter((s) => s.level === level)
                .map((s) => (
                  <StaggerItem key={s.name}>
                    <span
                      className={cn(
                        "inline-flex rounded-lg border px-3.5 py-2 text-sm",
                        levelStyle[s.level],
                      )}
                    >
                      {s.name}
                    </span>
                  </StaggerItem>
                ))}
            </StaggerGroup>
          </div>
        ))}
      </div>
    </Section>
  );
}
