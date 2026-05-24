"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim gold progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-gold-gradient shadow-[0_0_12px_rgb(var(--gold)/0.6)]"
    />
  );
}
