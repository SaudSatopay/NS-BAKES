"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DessertArt } from "@/components/ui/DessertArt";
import { Squiggle } from "@/components/ui/Decorations";
import { ArrowRightIcon } from "@/components/ui/icons";

const values = [
  {
    title: "Premium ingredients",
    desc: "Real butter, Belgian chocolate, Madagascar vanilla — never a shortcut.",
  },
  {
    title: "Baked to order",
    desc: "Nothing sits on a shelf. Every box leaves the kitchen fresh that day.",
  },
  {
    title: "Finished by hand",
    desc: "Small batches, careful detail, and a signature gold-touch on every bake.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-28, 52]);

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative mx-auto w-full max-w-md lg:mx-0">
          <motion.div
            style={{
              y: y1,
              backgroundImage: "linear-gradient(160deg, #6f4326, #2c1a0f)",
            }}
            className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-[14rem_14rem_2rem_2rem] p-16 text-[#f4e6cf] shadow-lift"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(50% 40% at 50% 20%, rgba(255,255,255,0.22), transparent 60%)",
              }}
            />
            <DessertArt type="cake" className="relative" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-8 -right-3 w-40 sm:w-48"
          >
            <div className="rounded-3xl border border-gold/40 bg-surface p-4 shadow-soft">
              <div
                className="grid aspect-square place-items-center rounded-2xl p-5 text-[#f4e6cf]"
                style={{
                  backgroundImage: "linear-gradient(150deg, #caa17f, #7c4f39)",
                }}
              >
                <DessertArt type="cupcake" />
              </div>
              <p className="mt-3 text-center text-[0.68rem] uppercase tracking-eyebrow text-muted">
                From our home kitchen
              </p>
            </div>
          </motion.div>

          <Squiggle className="absolute -left-5 top-12 hidden h-6 w-24 text-gold/50 lg:block" />
        </div>

        <div>
          <Reveal>
            <span className="eyebrow">Our story</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest sm:text-5xl">
              A little kitchen with <span className="gold-text">big</span>{" "}
              dreams.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
              NS BAKES started the way the best things do — with a single recipe,
              a warm oven, and friends asking for &ldquo;just one more.&rdquo;
              What began as weekend baking grew into a small studio dedicated to
              desserts that taste as beautiful as they look.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              We still bake everything in small batches, by hand, to order — so
              each cake, brownie and cookie arrives at its absolute peak.
            </p>
          </Reveal>

          <div className="mt-9 space-y-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.28 + i * 0.06}>
                <div className="flex gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-10">
              <Button href="#menu" variant="outline">
                Discover the menu
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
