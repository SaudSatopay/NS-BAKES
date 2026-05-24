"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSound } from "@/context/SoundContext";
import { VolumeIcon, VolumeOffIcon } from "./icons";

const buttonClass =
  "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-ink backdrop-blur transition-colors duration-300 hover:border-gold hover:text-gold";

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      data-cursor
      aria-pressed={enabled}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      onClick={toggle}
      className={cn(buttonClass, className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={enabled ? "on" : "off"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {enabled ? (
            <VolumeIcon className="h-[1.15rem] w-[1.15rem]" />
          ) : (
            <VolumeOffIcon className="h-[1.15rem] w-[1.15rem]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
