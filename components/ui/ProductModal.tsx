"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { cn, formatPrice, slugify, whatsappLink } from "@/lib/utils";
import { DessertArt } from "./DessertArt";
import { Button } from "./Button";
import { CheckIcon, CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "./icons";

const customCakeMessage = `Hello ${site.name}! I'd like to enquire about a CUSTOM CAKE.

Occasion:
Flavour:
Servings / size:
Design or theme:
Needed by:`;

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add, open } = useCart();
  const sound = useSound();
  const [optionIndex, setOptionIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setOptionIndex(0);
    setQty(1);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [product, onClose]);

  const option = product?.options?.[optionIndex];
  const total = (option?.price ?? product?.price ?? 0) * qty;

  const handleAdd = () => {
    if (!product || !option) return;
    add(
      {
        id: `${product.id}-${slugify(option.label)}`,
        name: `${product.name} — ${option.label}`,
        price: option.price,
        category: product.category,
        art: product.art,
        image: product.image,
      },
      qty,
    );
    sound.play("add");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const handleCustom = () => {
    window.open(whatsappLink(customCakeMessage), "_blank", "noopener,noreferrer");
    sound.play("tap");
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            className="relative z-[5] max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-surface shadow-lift"
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              data-cursor
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/55"
            >
              <CloseIcon />
            </button>

            <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-2 md:overflow-visible">
              <div
                className="relative aspect-[4/3] md:aspect-auto md:min-h-[24rem]"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${product.tone[0]}, ${product.tone[1]})`,
                }}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center p-12 text-[#f4e6cf]">
                    <DessertArt type={product.art} />
                  </div>
                )}
              </div>

              <div className="flex flex-col p-6 sm:p-7">
                <span className="eyebrow">{product.category}</span>
                <h2 className="mt-3 font-display text-3xl leading-tight">
                  {product.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {product.description}
                </p>

                {product.custom ? (
                  <div className="mt-auto pt-7">
                    <p className="mb-4 text-sm text-muted">
                      Custom cakes are quoted to order. Share your idea and
                      we&apos;ll take it from there.
                    </p>
                    <Button onClick={handleCustom} fullWidth magnetic={false}>
                      <WhatsAppIcon className="h-5 w-5" /> Enquire on WhatsApp
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mt-6">
                      <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted">
                        {product.category === "Cakes" ? "Weight" : "Pack size"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.options?.map((opt, i) => (
                          <button
                            key={opt.label}
                            data-cursor
                            onClick={() => {
                              setOptionIndex(i);
                              sound.play("tap");
                            }}
                            className={cn(
                              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                              i === optionIndex
                                ? "border-gold bg-gold text-[#23160d]"
                                : "border-line text-ink hover:border-gold",
                            )}
                          >
                            {opt.label} · {formatPrice(opt.price)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <p className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted">
                        Quantity
                      </p>
                      <div className="flex items-center gap-1 rounded-full border border-line">
                        <button
                          onClick={() => {
                            setQty((q) => Math.max(1, q - 1));
                            sound.play("tap");
                          }}
                          aria-label="Decrease quantity"
                          className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:text-gold"
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">
                          {qty}
                        </span>
                        <button
                          onClick={() => {
                            setQty((q) => q + 1);
                            sound.play("tap");
                          }}
                          aria-label="Increase quantity"
                          className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:text-gold"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>

                    <div className="mt-auto pt-7">
                      <div className="mb-3 flex items-baseline justify-between">
                        <span className="text-sm text-muted">Total</span>
                        <span className="font-display text-2xl">
                          {formatPrice(total)}
                        </span>
                      </div>
                      <Button onClick={handleAdd} fullWidth magnetic={false}>
                        {added ? (
                          <>
                            <CheckIcon className="h-5 w-5" /> Added to cart
                          </>
                        ) : (
                          <>
                            <PlusIcon className="h-5 w-5" /> Add to cart
                          </>
                        )}
                      </Button>
                      <button
                        onClick={() => {
                          open();
                          onClose();
                        }}
                        className="mt-3 block w-full text-center text-xs uppercase tracking-eyebrow text-muted transition-colors hover:text-ink"
                      >
                        View cart
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
