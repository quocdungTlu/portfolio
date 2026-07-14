"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1800;

/** Gõ/xóa luân phiên các cụm từ; reduced-motion thì hiển thị tĩnh cụm đầu */
export function Typing({ phrases }: { phrases: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = phrases[index % phrases.length];

  useEffect(() => {
    if (reduce) return;
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && length === phrase.length) delay = HOLD_MS;

    const t = setTimeout(() => {
      if (!deleting && length === phrase.length) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setLength((l) => l + (deleting ? -1 : 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [length, deleting, phrase, phrases.length, reduce]);

  if (reduce) {
    return <span className="text-accent">{phrases[0]}</span>;
  }

  return (
    <span className="text-accent">
      {phrase.slice(0, length)}
      <span aria-hidden className="animate-pulse text-accent-2">
        ▍
      </span>
      <span className="sr-only">{phrases.join(", ")}</span>
    </span>
  );
}
