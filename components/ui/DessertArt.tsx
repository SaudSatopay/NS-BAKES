import type { DessertType } from "@/lib/products";
import { cn } from "@/lib/utils";

const GOLD = "#ecca84";

/**
 * Hand-built line-art illustrations for each dessert type.
 * Primary strokes use `currentColor` (set by the parent), gold is the accent.
 * Swap these for real photography later by replacing the tile contents in
 * ProductCard / Gallery — the data model already carries an image-friendly id.
 */
const art: Record<DessertType, React.ReactNode> = {
  cake: (
    <>
      <ellipse cx="60" cy="104" rx="42" ry="6" opacity="0.45" />
      <path d="M30 64 q30 -14 60 0 v26 q-30 12 -60 0 z" />
      <path d="M30 72 q30 12 60 0" opacity="0.7" />
      <path
        d="M36 52 q24 -12 48 0 v6 q-24 12 -48 0 z"
        fill={GOLD}
        fillOpacity="0.18"
      />
      <path d="M36 56 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" />
      <circle cx="60" cy="41" r="6" fill={GOLD} stroke="none" />
      <path d="M60 35 q4 -6 9 -7" />
    </>
  ),
  cupcake: (
    <>
      <path d="M38 70 h44 l-6 33 q-16 6 -32 0 z" />
      <path d="M45 78 l-3 21 M55 80 l-2 22 M66 80 l2 22 M76 78 l3 21" opacity="0.7" />
      <path
        d="M38 70 q-7 -23 22 -25 q29 2 22 25 z"
        fill={GOLD}
        fillOpacity="0.16"
      />
      <path d="M44 61 q16 -16 32 0" />
      <path d="M48 52 q12 -12 24 0" />
      <circle cx="60" cy="35" r="5.5" fill={GOLD} stroke="none" />
      <path d="M60 30 q3 -5 8 -6" />
    </>
  ),
  cookie: (
    <>
      <circle cx="60" cy="60" r="36" />
      <circle cx="47" cy="49" r="4.4" fill={GOLD} stroke="none" />
      <circle cx="71" cy="46" r="3.6" fill="currentColor" stroke="none" />
      <circle cx="75" cy="69" r="4.4" fill={GOLD} stroke="none" />
      <circle cx="49" cy="73" r="3.6" fill="currentColor" stroke="none" />
      <circle cx="60" cy="60" r="2.8" fill={GOLD} stroke="none" />
      <circle cx="40" cy="62" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="62" cy="40" r="2.2" fill="currentColor" stroke="none" />
    </>
  ),
  brownie: (
    <>
      <rect x="32" y="40" width="56" height="49" rx="9" />
      <path d="M32 53 q28 -10 56 0" opacity="0.7" />
      <rect x="44" y="59" width="7" height="7" rx="2" fill={GOLD} stroke="none" />
      <rect x="66" y="65" width="7" height="7" rx="2" fill="currentColor" stroke="none" />
      <rect x="56" y="75" width="6" height="6" rx="2" fill={GOLD} stroke="none" />
      <path d="M40 84 q20 6 40 0" opacity="0.4" />
    </>
  ),
  macaron: (
    <>
      <ellipse cx="60" cy="49" rx="32" ry="15" />
      <ellipse cx="60" cy="77" rx="32" ry="15" />
      <rect
        x="28"
        y="57"
        width="64"
        height="13"
        rx="6.5"
        fill={GOLD}
        fillOpacity="0.28"
      />
      <path d="M31 60 q3 4 7 4 M89 60 q-3 4 -7 4" opacity="0.7" />
    </>
  ),
  donut: (
    <>
      <circle cx="60" cy="63" r="34" />
      <circle cx="60" cy="63" r="12" />
      <path
        d="M28 60 q4 -12 16 -12 q9 0 13 6 q6 -8 17 -6 q12 2 12 13 q0 4 -2 8 q-26 -10 -54 0 q-2 -6 -2 -9 z"
        fill={GOLD}
        fillOpacity="0.22"
      />
      <path d="M45 51 l3 6 M59 49 l1 6 M72 53 l-3 6" stroke={GOLD} />
    </>
  ),
  tart: (
    <>
      <ellipse cx="60" cy="72" rx="38" ry="10" />
      <path d="M22 72 q0 -24 38 -24 q38 0 38 24" />
      <path d="M22 72 q38 14 76 0" opacity="0.6" />
      <circle cx="48" cy="56" r="4" fill={GOLD} stroke="none" />
      <circle cx="62" cy="51" r="4" fill={GOLD} stroke="none" />
      <circle cx="74" cy="57" r="4" fill={GOLD} stroke="none" />
    </>
  ),
  croissant: (
    <>
      <path
        d="M22 78 q0 -30 38 -30 q38 0 38 30 q-19 -9 -38 -9 q-19 0 -38 9 z"
        fill={GOLD}
        fillOpacity="0.14"
      />
      <path d="M22 78 q0 -30 38 -30 q38 0 38 30" />
      <path d="M40 56 l-6 17 M54 51 l-3 19 M68 51 l3 19 M82 56 l6 17" opacity="0.7" />
    </>
  ),
  bomboloni: (
    <>
      <circle cx="60" cy="62" r="35" />
      <path d="M26 60 q34 12 68 0" opacity="0.45" />
      <circle cx="60" cy="58" r="7" fill={GOLD} fillOpacity="0.4" stroke="none" />
      <circle cx="44" cy="46" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="74" cy="44" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="84" cy="64" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="38" cy="68" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="66" cy="82" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
};

export function DessertArt({
  type,
  className,
}: {
  type: DessertType;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {art[type]}
    </svg>
  );
}
