"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  categories,
  products,
  type Category,
  type Product,
} from "@/lib/products";
import { useSound } from "@/context/SoundContext";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductModal } from "@/components/ui/ProductModal";

export function Products() {
  const [active, setActive] = useState<Category | "All">("All");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const sound = useSound();

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="menu" className="relative py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Signature menu"
          title={
            <>
              Bakes worth <span className="gold-text">savouring</span>.
            </>
          }
          description="From celebration cakes to midnight cookie cravings — each one made fresh to order, never from a shelf. Tap any item to choose your size."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                data-cursor
                onMouseEnter={() => sound.play("hover")}
                onClick={() => {
                  setActive(cat);
                  sound.play("tap");
                }}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-[#23160d]" : "text-ink/70 hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-gold-gradient"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={() => {
                  setActiveProduct(product);
                  sound.play("open");
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}
