"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DessertType } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { buildCartWhatsAppLink, formatPrice } from "@/lib/utils";
import { DessertArt } from "./DessertArt";
import { Button } from "./Button";
import {
  ArrowRightIcon,
  BagIcon,
  ChevronLeftIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WhatsAppIcon,
} from "./icons";

const inputClass =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold [color-scheme:light] dark:[color-scheme:dark]";
const labelClass =
  "mb-1.5 block text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted";

type Step = "cart" | "details";

const emptyForm = { name: "", address: "", wantedBy: "", notes: "" };

function formatWantedBy(value: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export function CartDrawer() {
  const { items, isOpen, close, subtotal, count, setQty, remove, clear } =
    useCart();
  const sound = useSound();

  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState(emptyForm);

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

  // Reset to the cart view whenever the drawer closes or the cart empties.
  useEffect(() => {
    if (!isOpen) setStep("cart");
  }, [isOpen]);
  useEffect(() => {
    if (items.length === 0) setStep("cart");
  }, [items.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const pad = (n: number) => String(n).padStart(2, "0");
  const now = new Date();
  const minDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const isPastWanted =
    form.wantedBy !== "" && new Date(form.wantedBy).getTime() < Date.now();

  const canSend =
    form.name.trim() !== "" && form.address.trim() !== "" && !isPastWanted;

  const handleSend = () => {
    if (!canSend) return;
    const link = buildCartWhatsAppLink(
      items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
      subtotal,
      {
        name: form.name.trim(),
        address: form.address.trim(),
        wantedBy: formatWantedBy(form.wantedBy),
        notes: form.notes.trim(),
      },
    );
    window.open(link, "_blank", "noopener,noreferrer");
    sound.play("add");
  };

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
              {step === "details" && items.length > 0 ? (
                <button
                  onClick={() => {
                    setStep("cart");
                    sound.play("tap");
                  }}
                  data-cursor
                  aria-label="Back to cart"
                  className="-ml-2 inline-flex items-center gap-1 rounded-full p-2 text-muted transition-colors hover:text-gold"
                >
                  <ChevronLeftIcon />
                  <span className="font-display text-xl text-ink">Details</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <BagIcon className="h-5 w-5 text-gold" />
                  <h2 className="font-display text-xl">Your cart</h2>
                  <span className="text-sm text-muted">({count})</span>
                </div>
              )}
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  {step === "cart" ? (
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
                                <p className="font-medium leading-tight">
                                  {item.name}
                                </p>
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
                        <Button
                          onClick={() => {
                            setStep("details");
                            sound.play("tap");
                          }}
                          size="lg"
                          fullWidth
                          magnetic={false}
                        >
                          Continue to details
                          <ArrowRightIcon className="h-4 w-4" />
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
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto px-6 py-5">
                        <p className="text-sm leading-relaxed text-muted">
                          Pop in your details and we&apos;ll confirm everything
                          on WhatsApp. Final total &amp; delivery are shared in
                          chat.
                        </p>
                        <div className="mt-5 space-y-4">
                          <div>
                            <label className={labelClass} htmlFor="cart-name">
                              Name *
                            </label>
                            <input
                              id="cart-name"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass} htmlFor="cart-address">
                              Delivery address *
                            </label>
                            <textarea
                              id="cart-address"
                              name="address"
                              rows={2}
                              value={form.address}
                              onChange={handleChange}
                              placeholder="Flat / building, area, Thane…"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass} htmlFor="cart-when">
                              When do you need it?
                            </label>
                            <input
                              id="cart-when"
                              name="wantedBy"
                              type="datetime-local"
                              value={form.wantedBy}
                              min={minDateTime}
                              onChange={handleChange}
                              aria-invalid={isPastWanted}
                              className={inputClass}
                            />
                            {isPastWanted ? (
                              <p className="mt-1.5 text-xs text-red-400">
                                Please pick a date &amp; time in the future.
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className={labelClass} htmlFor="cart-notes">
                              Anything else?
                            </label>
                            <textarea
                              id="cart-notes"
                              name="notes"
                              rows={2}
                              value={form.notes}
                              onChange={handleChange}
                              placeholder="Allergies, message on the cake, extra enquiry…"
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-line px-6 py-5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted">
                            {count} item{count === 1 ? "" : "s"} · Subtotal
                          </span>
                          <span className="font-display text-xl">
                            {formatPrice(subtotal)}
                          </span>
                        </div>
                        <Button
                          onClick={handleSend}
                          disabled={!canSend}
                          size="lg"
                          fullWidth
                          magnetic={false}
                        >
                          <WhatsAppIcon className="h-5 w-5" /> Send order on
                          WhatsApp
                        </Button>
                        <p className="text-center text-xs text-muted">
                          {canSend
                            ? "Opens WhatsApp with your order pre-filled."
                            : isPastWanted
                              ? "Choose a future date & time to continue."
                              : "Add your name and address to continue."}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
