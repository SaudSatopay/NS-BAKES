"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnimatedWords } from "@/components/ui/AnimatedWords";
import { DessertArt } from "@/components/ui/DessertArt";
import { Sparkle } from "@/components/ui/Decorations";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";

const stats = [
  { value: "500+", label: "Happy orders" },
  { value: "100%", label: "Homemade" },
  { value: "5.0", label: "Avg. rating" },
];

function SpinningBadge() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-28 w-28 animate-spin-slow text-ink/55"
      aria-hidden="true"
    >
      <defs>
        <path
          id="ns-badge-curve"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
        />
      </defs>
      <text fontSize="13.5" letterSpacing="3" fill="currentColor">
        <textPath href="#ns-badge-curve">
          FRESHLY BAKED · MADE WITH LOVE · FRESHLY BAKED ·
        </textPath>
      </text>
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yPlate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yUp = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yDown = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const orderLink = whatsappLink(
    `Hello ${site.name}! I'd like to place an order.`,
  );

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-mesh pt-28 sm:pt-32"
    >
      {/* Floating decorations */}
      <motion.div
        style={{ y: yUp }}
        className="pointer-events-none absolute left-[6%] top-[26%] hidden h-14 w-14 text-gold/80 sm:block"
      >
        <div className="animate-floater">
          <DessertArt type="macaron" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: yDown }}
        className="pointer-events-none absolute left-[14%] bottom-[18%] hidden h-12 w-12 text-choco/70 dark:text-[#e9c98a]/70 lg:block"
      >
        <div className="animate-float">
          <DessertArt type="cookie" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: yUp }}
        className="pointer-events-none absolute right-[8%] bottom-[22%] hidden h-10 w-10 text-gold/70 lg:block"
      >
        <Sparkle className="animate-pulse" />
      </motion.div>
      <div className="pointer-events-none absolute right-[18%] top-[20%] hidden h-5 w-5 text-gold/60 sm:block">
        <Sparkle />
      </div>

      <div className="container relative z-10 grid items-center gap-14 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        {/* Copy */}
        <motion.div style={{ opacity: fade }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {site.tagline} — {site.location.city}
          </motion.span>

          <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tightest sm:text-6xl lg:text-[4.9rem]">
            <AnimatedWords
              delay={0.18}
              segments={[
                { text: "Handcrafted desserts for" },
                { text: "life's" },
                { text: "sweetest moments.", gold: true, italic: true },
              ]}
            />
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Small-batch cakes, brownies, cupcakes &amp; cookies — baked to order
            with premium ingredients and a whole lot of love.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
          >
            <Button href="#menu" size="lg">
              Explore the menu
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href={orderLink} target="_blank" variant="outline" size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              Order on WhatsApp
            </Button>
          </motion.div>

          <motion.dl
            className="mt-12 flex gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.7rem] uppercase tracking-eyebrow text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Focal visual */}
        <motion.div
          style={{ y: yPlate }}
          className="relative mx-auto aspect-square w-full max-w-[26rem]"
        >
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 0.82, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-surface to-surface-2 shadow-lift ring-1 ring-line" />
            <div className="absolute inset-[6%] rounded-full border border-gold/30" />
            <div className="absolute inset-0 grid place-items-center p-[22%] text-choco dark:text-[#ecca84]">
              <DessertArt type="cake" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: yUp }}
            className="absolute -right-3 -top-3 grid place-items-center sm:-right-5 sm:-top-5"
          >
            <SpinningBadge />
          </motion.div>

          <motion.div
            style={{ y: yDown }}
            className="absolute -left-5 bottom-12 h-20 w-20 text-gold sm:-left-8"
          >
            <div className="animate-floater rounded-3xl bg-surface/70 p-3 shadow-soft ring-1 ring-line backdrop-blur">
              <DessertArt type="cupcake" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: yUp }}
            className="absolute -right-2 bottom-2 h-16 w-16 text-choco dark:text-[#ecca84]"
          >
            <div className="animate-float rounded-2xl bg-surface/70 p-2.5 shadow-soft ring-1 ring-line backdrop-blur">
              <DessertArt type="brownie" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted lg:flex">
        <span className="text-[0.68rem] uppercase tracking-eyebrow">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gold"
            animate={{ y: [-16, 40] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
