"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSound } from "@/context/SoundContext";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  target?: string;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-[color,background-color,border-color,box-shadow] duration-300 will-change-transform focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-gradient bg-[length:200%_auto] text-[#23160d] shadow-glow hover:bg-[position:right_center]",
  outline:
    "border border-ink/20 text-ink hover:border-gold hover:text-gold",
  ghost: "text-ink hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.82rem]",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-[0.95rem]",
};

export function Button({
  children,
  href,
  target,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  magnetic = true,
  fullWidth = false,
  disabled,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const sound = useSound();
  const wrapRef = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduceMotion || !magnetic || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.28);
    y.set(offsetY * 0.4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const shine =
    variant !== "ghost" ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45),transparent_70%)] transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
      />
    ) : null;

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {shine}
    </>
  );

  return (
    <motion.span
      ref={wrapRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => sound.play("hover")}
      onClick={() => sound.play("tap")}
      data-cursor="lift"
      className={cn("inline-block", fullWidth && "block w-full")}
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel}
          className={classes}
          onClick={onClick}
        >
          {inner}
        </a>
      ) : (
        <button
          type={type}
          disabled={disabled}
          aria-label={ariaLabel}
          className={classes}
          onClick={onClick}
        >
          {inner}
        </button>
      )}
    </motion.span>
  );
}
