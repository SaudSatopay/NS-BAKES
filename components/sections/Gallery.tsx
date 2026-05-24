"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryItems, type TileSize } from "@/lib/gallery";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DessertArt } from "@/components/ui/DessertArt";
import { Lightbox } from "@/components/ui/Lightbox";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const sizeAspect: Record<TileSize, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  big: "aspect-square",
  normal: "aspect-[5/6]",
};

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative bg-surface-2/30 py-24 lg:py-32"
    >
      <div className="container">
        <SectionHeading
          eyebrow="The gallery"
          title={
            <>
              A feast for the <span className="gold-text">eyes</span>.
            </>
          }
          description="A peek at recent bakes leaving our kitchen. Tap any piece to take a closer look."
        />

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.id}
              data-cursor
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl text-[#f4e6cf] shadow-soft",
                sizeAspect[item.size],
              )}
              style={{
                backgroundImage: `linear-gradient(150deg, ${item.tone[0]}, ${item.tone[1]})`,
              }}
              aria-label={`View ${item.title}`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        "radial-gradient(60% 50% at 30% 18%, rgba(255,255,255,0.26), transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center p-10 transition-transform duration-500 ease-out group-hover:scale-110">
                    <DessertArt type={item.art} className="max-w-[150px]" />
                  </div>
                </>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-left">
                  <p className="text-[0.66rem] uppercase tracking-eyebrow text-gold">
                    {item.tag}
                  </p>
                  <p className="font-display text-lg">{item.title}</p>
                </div>
                <ArrowUpRightIcon className="h-5 w-5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        items={galleryItems}
        index={index}
        onClose={() => setIndex(null)}
        onChange={setIndex}
      />
    </section>
  );
}
