"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { cn, formatPrice, slugify } from "@/lib/utils";
import { flyToCart } from "@/lib/flyToCart";
import { DessertArt } from "./DessertArt";
import { ArrowUpRightIcon, CheckIcon, PlusIcon, WhatsAppIcon } from "./icons";

export const ProductCard = forwardRef<
  HTMLElement,
  { product: Product; onOpen: () => void }
>(function ProductCard({ product, onOpen }, ref) {
  const { add } = useCart();
  const sound = useSound();
  const [added, setAdded] = useState(false);

  const fromPrice = product.options?.[0]?.price ?? product.price;
  const baseLabel = product.options?.[0]?.label;
  const hasRange = (product.options?.length ?? 0) > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const opt = product.options?.[0];
    if (!opt) return;
    add(
      {
        id: `${product.id}-${slugify(opt.label)}`,
        name: `${product.name} — ${opt.label}`,
        price: opt.price,
        category: product.category,
        art: product.art,
        image: product.image,
      },
      1,
    );
    sound.play("add");
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (product.image) {
      flyToCart(product.image, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
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
      onClick={onOpen}
      data-cursor
      className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift"
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

        {!product.custom && product.options ? (
          <button
            type="button"
            onClick={handleQuickAdd}
            data-cursor
            aria-label={`Quick add ${product.name} (${baseLabel}) to cart`}
            className={cn(
              "absolute bottom-4 right-4 z-20 grid h-11 w-11 place-items-center rounded-full shadow-lift transition-all duration-300 hover:scale-110",
              added ? "bg-white text-[#23160d]" : "bg-gold text-[#23160d]",
            )}
          >
            {added ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <PlusIcon className="h-5 w-5" />
            )}
          </button>
        ) : null}
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
                  {hasRange ? `from ${formatPrice(fromPrice)}` : formatPrice(fromPrice)}
                </p>
                {baseLabel ? (
                  <p className="text-[0.7rem] text-muted">{baseLabel}</p>
                ) : null}
              </>
            )}
          </div>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          {product.custom ? (
            <>
              <WhatsAppIcon className="h-4 w-4" /> Enquire
            </>
          ) : (
            <>
              Select options
              <ArrowUpRightIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
});

ProductCard.displayName = "ProductCard";
