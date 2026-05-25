"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { BagIcon, CloseIcon } from "@/components/ui/icons";

const Wordmark = () => (
  <span className="font-display text-xl font-semibold tracking-tight">
    NS <span className="gold-text">BAKES</span>
  </span>
);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();
  const sound = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const CartButton = ({ className }: { className?: string }) => (
    <button
      onClick={() => {
        open();
        sound.play("open");
      }}
      data-cursor
      data-cart-icon
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-ink backdrop-blur transition-colors hover:border-gold hover:text-gold",
        className,
      )}
    >
      <BagIcon className="h-[1.15rem] w-[1.15rem]" />
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-[#23160d]"
        >
          {count}
        </motion.span>
      )}
    </button>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between rounded-full px-3 transition-all duration-500",
            scrolled ? "glass py-2 shadow-soft" : "py-2",
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-2 pl-2"
            aria-label={`${site.name} — home`}
          >
            <Wordmark />
            <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-300 group-hover:scale-150" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => sound.play("hover")}
                className="link-underline text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2.5 sm:flex">
              <ThemeToggle />
              <SoundToggle />
            </div>
            <CartButton />
            <div className="hidden sm:block">
              <Button href="#order" size="sm">
                Order now
              </Button>
            </div>
            <button
              onClick={() => {
                setMenuOpen(true);
                sound.play("open");
              }}
              data-cursor
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-ink transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="h-0.5 w-5 rounded bg-current" />
                <span className="h-0.5 w-5 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[140] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" />
            <div className="relative flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    sound.play("close");
                  }}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink"
                >
                  <CloseIcon />
                </button>
              </div>
              <nav className="mt-10 flex flex-col" aria-label="Mobile">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08 }}
                    className="border-b border-line py-4 font-display text-3xl"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-3">
                  <ThemeToggle />
                  <SoundToggle />
                </div>
                <Button href="#order" onClick={() => setMenuOpen(false)}>
                  Order now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
