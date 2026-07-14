"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-xl px-4 py-2.5 glass sm:mx-6 lg:mx-auto">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="text-accent">~/</span>lqdung
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.cvPath}
            download
            className="hidden items-center gap-1.5 rounded-md border border-edge px-3 py-1.5 text-sm text-muted transition-colors hover:border-edge-strong hover:text-foreground md:inline-flex"
          >
            <FileDown size={14} aria-hidden />
            CV
          </a>
          <button
            className="rounded-md p-2 text-muted hover:text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-4 mt-2 overflow-hidden rounded-xl glass transition-all duration-300 md:hidden",
          open
            ? "visible max-h-80 opacity-100"
            : "invisible max-h-0 border-transparent opacity-0",
        )}
      >
        <ul className="flex flex-col p-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={profile.cvPath}
              download
              className="block rounded-md px-3 py-2.5 text-sm text-accent"
            >
              Download CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
