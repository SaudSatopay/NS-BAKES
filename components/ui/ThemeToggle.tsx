"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSound } from "@/context/SoundContext";
import { SunIcon, MoonIcon } from "./icons";

const buttonClass =
  "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-ink backdrop-blur transition-colors duration-300 hover:border-gold hover:text-gold";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const sound = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      data-cursor
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
        sound.play("toggle");
      }}
      className={cn(buttonClass, className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 40, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? (
            <SunIcon className="h-[1.15rem] w-[1.15rem]" />
          ) : (
            <MoonIcon className="h-[1.15rem] w-[1.15rem]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
