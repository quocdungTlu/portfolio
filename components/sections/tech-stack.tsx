import {
  Brain,
  Server,
  Layout,
  Database,
  Cloud,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { techGroups } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/section";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  server: Server,
  layout: Layout,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
};

export function TechStack() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Tools I build with"
        description="The stack behind TripNest AI and my day-to-day work — AI-first, but full-stack end to end."
      />
      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techGroups.map((group) => {
          const Icon = icons[group.icon] ?? Wrench;
          return (
            <StaggerItem key={group.name}>
              <Card className="card-hover h-full">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="rounded-lg bg-accent-soft p-2 text-accent">
                    <Icon size={17} aria-hidden />
                  </span>
                  <h3 className="text-sm font-semibold">{group.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
