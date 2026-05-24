import { cn } from "@/lib/utils";

type Props = { className?: string };

export function Sparkle({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <path d="M12 0c1 7 4 11 12 12-8 1-11 5-12 12-1-7-4-11-12-12 8-1 11-5 12-12Z" />
    </svg>
  );
}

export function Ring({ className }: Props) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <circle cx="30" cy="30" r="28" strokeDasharray="2 7" strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle({ className }: Props) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <path d="M3 12q12 -12 24 0t24 0t24 0t24 0t18 0" />
    </svg>
  );
}

export function Dots({ className }: Props) {
  const cells = Array.from({ length: 16 });
  return (
    <svg
      viewBox="0 0 80 80"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {cells.map((_, i) => (
        <circle
          key={i}
          cx={10 + (i % 4) * 20}
          cy={10 + Math.floor(i / 4) * 20}
          r={2.4}
        />
      ))}
    </svg>
  );
}

export function Bean({ className }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <ellipse cx="20" cy="20" rx="11" ry="16" transform="rotate(28 20 20)" />
      <path d="M14 11q6 9 12 18" transform="rotate(28 20 20)" />
    </svg>
  );
}

export function Wheat({ className }: Props) {
  return (
    <svg
      viewBox="0 0 40 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <path d="M20 76V26" />
      {[30, 38, 46, 54].map((y) => (
        <g key={y}>
          <path d={`M20 ${y}q-12 -4 -14 -14`} />
          <path d={`M20 ${y}q12 -4 14 -14`} />
        </g>
      ))}
      <path d="M20 24q-7 -6 -6 -16q9 2 6 16Z" />
    </svg>
  );
}
