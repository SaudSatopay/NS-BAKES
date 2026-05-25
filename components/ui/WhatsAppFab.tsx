"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

const link = whatsappLink(`Hello ${site.name}! I'd like to place an order.`);

export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with NS BAKES on WhatsApp"
          data-cursor
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="group fixed bottom-5 right-5 z-[95] inline-flex items-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lift sm:bottom-6 sm:right-6"
        >
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-pulse-ring" />
          <WhatsAppIcon className="h-6 w-6 shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[150px] group-hover:opacity-100">
            Chat to order
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
