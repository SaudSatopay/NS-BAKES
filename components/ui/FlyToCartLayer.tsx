"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FlyDetail } from "@/lib/flyToCart";

type Fly = FlyDetail & { id: number; tx: number; ty: number };

/** Renders short-lived images that fly from a product to the navbar cart icon. */
export function FlyToCartLayer() {
  const [items, setItems] = useState<Fly[]>([]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<FlyDetail>).detail;
      const cart = document.querySelector("[data-cart-icon]");
      const rect = cart?.getBoundingClientRect();
      const tx = rect ? rect.left + rect.width / 2 : window.innerWidth - 48;
      const ty = rect ? rect.top + rect.height / 2 : 40;
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { ...detail, id, tx, ty }]);
      window.setTimeout(
        () => setItems((prev) => prev.filter((i) => i.id !== id)),
        850,
      );
    };
    window.addEventListener("ns:flytocart", handler as EventListener);
    return () =>
      window.removeEventListener("ns:flytocart", handler as EventListener);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <AnimatePresence>
        {items.map((it) => (
          <motion.img
            key={it.id}
            src={it.image}
            alt=""
            initial={{ x: it.x - 32, y: it.y - 32, opacity: 1, scale: 1 }}
            animate={{ x: it.tx - 14, y: it.ty - 14, opacity: 0.15, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-16 w-16 rounded-full object-cover shadow-lift ring-2 ring-gold/50"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
