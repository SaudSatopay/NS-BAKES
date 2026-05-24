"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { cn, formatPrice, whatsappLink } from "@/lib/utils";
import { DessertArt } from "./DessertArt";
import { CheckIcon, PlusIcon, WhatsAppIcon } from "./icons";

const customCakeMessage = `Hello ${site.name}! I'd like to enquire about a CUSTOM CAKE.

Occasion:
Flavour:
Servings / size:
Design or theme:
Needed by:`;

export const ProductCard = forwardRef<HTMLElement, { product: Product }>(
  function ProductCard({ product }, ref) {
    const { add } = useCart();
    const sound = useSound();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
      add({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        art: product.art,
      });
      sound.play("add");
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1400);
    };

    const handleCustom = () => {
      window.open(
        whatsappLink(customCakeMessage),
        "_blank",
        "noopener,noreferrer",
      );
      sound.play("tap");
    };

    return (
      <motion.article
        ref={ref}
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <div
          className="relative aspect-[5/4] overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(150deg, ${product.tone[0]}, ${product.tone[1]})`,
          }}
        >
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent"
              />
            </>
          ) : (
            <div className="absolute inset-0 grid place-items-center p-9 text-[#f4e6cf]">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 55% at 26% 18%, rgba(255,255,255,0.30), transparent 60%)",
                }}
              />
              <div className="relative z-[1] flex h-full w-full max-w-[160px] items-center justify-center transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-110">
                <DessertArt type={product.art} />
              </div>
            </div>
          )}

          {product.badge ? (
            <span
              className={cn(
                "absolute left-4 top-4 z-10 inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold shadow-sm backdrop-blur",
                product.badge === "Bestseller"
                  ? "bg-gold text-[#23160d]"
                  : "bg-black/45 text-[#f4e6cf]",
              )}
            >
              {product.badge}
            </span>
          ) : null}
          <span className="absolute right-4 top-4 z-10 text-[0.68rem] uppercase tracking-eyebrow text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
            {product.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-tight">{product.name}</h3>
            <div className="text-right">
              {product.custom ? (
                <p className="whitespace-nowrap text-sm font-semibold italic text-gold">
                  Made to order
                </p>
              ) : (
                <>
                  <p className="whitespace-nowrap font-semibold text-gold">
                    {formatPrice(product.price)}
                  </p>
                  {product.unit ? (
                    <p className="text-[0.7rem] text-muted">{product.unit}</p>
                  ) : null}
                </>
              )}
            </div>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          {product.custom ? (
            <button
              onClick={handleCustom}
              data-cursor
              aria-label="Enquire about a custom cake on WhatsApp"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
            </button>
          ) : (
            <button
              onClick={handleAdd}
              data-cursor
              aria-label={`Add ${product.name} to cart`}
              className={cn(
                "mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300",
                added
                  ? "border-gold bg-gold text-[#23160d]"
                  : "border-ink/15 hover:border-gold hover:text-gold",
              )}
            >
              {added ? (
                <>
                  <CheckIcon className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <PlusIcon className="h-4 w-4" /> Add to cart
                </>
              )}
            </button>
          )}
        </div>
      </motion.article>
    );
  },
);

ProductCard.displayName = "ProductCard";
