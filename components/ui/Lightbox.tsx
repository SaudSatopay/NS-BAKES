"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem } from "@/lib/gallery";
import { DessertArt } from "./DessertArt";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null;

  useEffect(() => {
    if (!open || index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        onChange((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open, index, items.length, onChange, onClose]);

  const item = open && index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && index !== null && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            data-cursor
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-white"
          >
            <CloseIcon />
          </button>
          <button
            onClick={() => onChange((index - 1 + items.length) % items.length)}
            aria-label="Previous image"
            data-cursor
            className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-white sm:left-6"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => onChange((index + 1) % items.length)}
            aria-label="Next image"
            data-cursor
            className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-white sm:right-6"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <motion.figure
            key={item.id}
            className="relative z-[5] w-full max-w-2xl"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
              style={{
                backgroundImage: `linear-gradient(145deg, ${item.tone[0]}, ${item.tone[1]})`,
              }}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center p-12 text-[#f4e6cf]">
                  <DessertArt
                    type={item.art}
                    className="max-w-[260px] drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                  />
                </div>
              )}
            </div>
            <figcaption className="mt-5 text-center text-white">
              <p className="text-xs uppercase tracking-eyebrow text-gold">
                {item.tag}
              </p>
              <p className="mt-1 font-display text-2xl">{item.title}</p>
              <p className="mt-1 text-xs text-white/50">
                {index + 1} / {items.length}
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
