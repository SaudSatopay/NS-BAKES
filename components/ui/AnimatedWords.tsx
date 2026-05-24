"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Segment = { text: string; gold?: boolean; italic?: boolean };

type Props = {
  segments: Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Headline reveal: each word rises out of a clipped line with a stagger. */
export function AnimatedWords({
  segments,
  className,
  delay = 0,
  stagger = 0.07,
}: Props) {
  const reduceMotion = useReducedMotion();

  const words = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, gold: seg.gold, italic: seg.italic })),
  );

  return (
    <span className={cn("inline", className)}>
      {words.map((item, i) => (
        <span
          key={`${item.w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className={cn(
              "inline-block",
              item.gold && "gold-text",
              item.italic && "font-light italic",
            )}
            initial={reduceMotion ? false : { y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {item.w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
