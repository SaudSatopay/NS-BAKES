"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DessertType } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { buildCartWhatsAppLink, formatPrice } from "@/lib/utils";
import { DessertArt } from "./DessertArt";
import { Button } from "./Button";
import {
  BagIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WhatsAppIcon,
} from "./icons";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, count, setQty, remove, clear } =
    useCart();
  const sound = useSound();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  const waLink = buildCartWhatsAppLink(
    items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
    subtotal,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150]"
          role="dialog"
          aria-modal="true"
          aria-label="Your cart"
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bg shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-center gap-3">
                <BagIcon className="h-5 w-5 text-gold" />
                <h2 className="font-display text-xl">Your cart</h2>
                <span className="text-sm text-muted">({count})</span>
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                data-cursor
                className="rounded-full p-2 text-muted transition-colors hover:text-gold"
              >
                <CloseIcon />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-gold">
                  <BagIcon className="h-8 w-8" />
                </div>
                <p className="text-muted">
                  Your cart is empty — let&apos;s fix that.
                </p>
                <Button href="#menu" variant="outline" size="sm" onClick={close}>
                  Browse the menu
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-2xl border border-line bg-surface p-3"
                    >
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-choco to-[#2a160d] p-2.5 text-[#f4e6cf]">
                        {item.art ? (
                          <DessertArt type={item.art as DessertType} />
                        ) : (
                          <BagIcon />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium leading-tight">{item.name}</p>
                          <button
                            onClick={() => {
                              remove(item.id);
                              sound.play("tap");
                            }}
                            aria-label={`Remove ${item.name}`}
                            className="text-muted transition-colors hover:text-red-400"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                        <p className="mt-0.5 text-sm text-gold">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-line">
                            <button
                              onClick={() => {
                                setQty(item.id, item.qty - 1);
                                sound.play("tap");
                              }}
                              aria-label="Decrease quantity"
                              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:text-gold"
                            >
                              <MinusIcon />
                            </button>
                            <span className="w-6 text-center text-sm tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => {
                                setQty(item.id, item.qty + 1);
                                sound.play("tap");
                              }}
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:text-gold"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                          <span className="text-sm font-semibold tabular-nums">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-display text-2xl">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted">
                    Delivery &amp; final total are confirmed on WhatsApp — every
                    order is baked fresh to order.
                  </p>
                  <Button
                    href={waLink}
                    target="_blank"
                    size="lg"
                    fullWidth
                    magnetic={false}
                  >
                    <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
                  </Button>
                  <button
                    onClick={() => {
                      clear();
                      sound.play("tap");
                    }}
                    className="w-full text-center text-xs uppercase tracking-eyebrow text-muted transition-colors hover:text-ink"
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
