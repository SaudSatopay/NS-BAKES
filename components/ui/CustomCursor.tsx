"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * A soft gold follow-cursor (ring + dot) layered over the native cursor.
 * Only enabled on fine-pointer devices and when motion is allowed.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 800, damping: 36 });
  const dotY = useSpring(y, { stiffness: 800, damping: 36 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest(
          "a, button, [data-cursor], input, textarea, [role='button']",
        ),
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.45 : 0.85 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[130] -ml-4 -mt-4 hidden h-8 w-8 rounded-full border border-gold md:block"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[130] -ml-[3px] -mt-[3px] hidden h-1.5 w-1.5 rounded-full bg-gold md:block"
      />
    </>
  );
}
