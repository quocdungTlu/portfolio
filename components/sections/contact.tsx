"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, Send, Globe } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputCls =
  "w-full rounded-lg border border-edge bg-surface-2 px-4 py-2.5 text-sm text-foreground placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (message.length < 10)
      next.message = "Message should be at least 10 characters.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO: nối vào endpoint thật (Formspree / Resend / API route) thay cho mailto
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Looking for an AI Engineer intern who ships past the demo? I'm happy to walk through the TripNest architecture and telemetry live."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="flex h-full flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="card-hover flex items-center gap-3 rounded-xl border border-edge bg-surface px-5 py-4 text-sm"
            >
              <Mail size={17} className="text-accent" aria-hidden />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex items-center gap-3 rounded-xl border border-edge bg-surface px-5 py-4 text-sm"
            >
              <GithubIcon size={17} className="text-accent" aria-hidden />
              github.com/{profile.githubUser}
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-edge bg-surface px-5 py-4 text-sm">
              <Phone size={17} className="text-accent" aria-hidden />
              {profile.phone}
            </div>
            {profile.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-3 rounded-xl border border-edge bg-surface px-5 py-4 text-sm"
              >
                <Globe size={17} className="text-accent" aria-hidden />
                LinkedIn
              </a>
            ) : null}
            {/* TODO: hiển thị LinkedIn/Facebook khi bổ sung link trong data/profile.ts */}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={cn(inputCls, errors.name && "border-red-400/60")}
                  />
                  {errors.name ? (
                    <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    className={cn(inputCls, errors.email && "border-red-400/60")}
                  />
                  {errors.email ? (
                    <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about the role or the problem you're hiring for…"
                  aria-invalid={!!errors.message}
                  className={cn(inputCls, "resize-y", errors.message && "border-red-400/60")}
                />
                {errors.message ? (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-4">
                <Button type="submit">
                  <Send size={15} aria-hidden />
                  Send message
                </Button>
                {sent ? (
                  <p className="text-sm text-accent" role="status">
                    Your email client should open — thanks!
                  </p>
                ) : null}
              </div>
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
