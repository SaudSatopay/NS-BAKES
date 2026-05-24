"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/testimonials";
import { useSound } from "@/context/SoundContext";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  QuoteIcon,
  StarIcon,
} from "@/components/ui/icons";

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const sound = useSound();
  const count = testimonials.length;

  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + count) % count, delta]),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 5500);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const t = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Kind words"
          title={
            <>
              Loved by <span className="gold-text">sweet</span> tooths.
            </>
          }
        />

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <QuoteIcon className="mx-auto h-12 w-12 text-gold/40" />

          <div className="relative mt-4 min-h-[20rem] sm:min-h-[16rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={t.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="absolute inset-0 flex cursor-grab flex-col items-center text-center active:cursor-grabbing"
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote className="mt-5 text-balance font-display text-2xl leading-snug sm:text-[1.7rem]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted"> — {t.location}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => {
                go(-1);
                sound.play("tap");
              }}
              aria-label="Previous testimonial"
              data-cursor
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeftIcon />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-gold" : "w-2 bg-line hover:bg-muted",
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => {
                go(1);
                sound.play("tap");
              }}
              aria-label="Next testimonial"
              data-cursor
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
