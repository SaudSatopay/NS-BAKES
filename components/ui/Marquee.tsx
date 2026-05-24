import { cn } from "@/lib/utils";
import { Sparkle } from "./Decorations";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const Row = () => (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((text, i) => (
        <span key={i} className="flex items-center gap-12">
          <span className="whitespace-nowrap font-display text-xl text-ink/80 sm:text-2xl">
            {text}
          </span>
          <Sparkle className="h-3.5 w-3.5 shrink-0 text-gold" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-hidden="true"
      className={cn(
        "mask-fade-x overflow-hidden border-y border-line bg-surface-2/40 py-5",
        className,
      )}
    >
      <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
    </section>
  );
}
