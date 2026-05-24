import { cn } from "@/lib/utils";

type IconProps = { className?: string };

const stroke = (className?: string) =>
  cn("h-5 w-5", className);

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function VolumeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7.5 7.5 0 0 1 0 12" />
    </svg>
  );
}

export function VolumeOffIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M22 9l-6 6M16 9l6 6" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={stroke(className)} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={stroke(className)} aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" className={stroke(className)} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={stroke(className)} aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M12 2.6l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 20.2 6.6 19.1l1.2-6L3.3 8.9l6.1-.7L12 2.6Z" />
    </svg>
  );
}

export function QuoteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={cn("h-10 w-10", className)} aria-hidden="true">
      <path d="M20 12c-6 2-10 7-10 14v10h12V26h-6c0-4 2-7 6-9l-2-5Zm18 0c-6 2-10 7-10 14v10h12V26h-6c0-4 2-7 6-9l-2-5Z" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.6 14.2c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4-.2-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4 0 .6-.1l.9-1c.2-.3.4-.2.6-.1l1.8.9c.3.1.5.2.5.4.1.1.1.7-.1 1.4Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={stroke(className)} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={stroke(className)} aria-hidden="true">
      <path d="M16 3c.4 2.4 1.8 3.9 4 4.2v3c-1.5 0-2.9-.5-4-1.2v5.7A6.2 6.2 0 1 1 9.8 8.5v3.1A3.1 3.1 0 1 0 13 14.7V3h3Z" />
    </svg>
  );
}

export function SnapchatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={stroke(className)} aria-hidden="true">
      <path d="M12 2.6c2.6 0 4.3 2 4.4 4.5 0 .6 0 1.2-.1 1.8.5.3 1.1.2 1.7-.1.6-.3 1.2.6.5 1.1-.5.4-1.3.6-1.8.9.6 1.7 2 3 3.5 3.4.6.2.5 1-.1 1.2-.7.2-1.4.2-1.8.8-.2.4-.1 1-.7 1-.6 0-1.2-.4-2-.4-.9 0-1.6.9-3.2.9s-2.3-.9-3.2-.9c-.8 0-1.4.4-2 .4-.6 0-.5-.6-.7-1-.4-.6-1.1-.6-1.8-.8-.6-.2-.7-1-.1-1.2 1.5-.4 2.9-1.7 3.5-3.4-.5-.3-1.3-.5-1.8-.9-.7-.5-.1-1.4.5-1.1.6.3 1.2.4 1.7.1-.1-.6-.1-1.2-.1-1.8C7.7 4.6 9.4 2.6 12 2.6Z" />
    </svg>
  );
}
