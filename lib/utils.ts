import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "./site";

/** Merge Tailwind classes safely (resolves conflicts, dedupes). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as an INR price (whole rupees). */
export function formatPrice(value: number) {
  return `${site.currency}${value.toLocaleString("en-IN")}`;
}

export type OrderLine = { name: string; price: number; qty: number };

/** Build a wa.me link from a free-form message. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Build a wa.me link pre-filled with the cart contents. */
export function buildCartWhatsAppLink(items: OrderLine[], subtotal: number) {
  const lines = items
    .map((i) => `- ${i.qty} x ${i.name}  (${formatPrice(i.price * i.qty)})`)
    .join("\n");

  const message = [
    `Hello ${site.name}!`,
    "",
    "I'd like to place an order:",
    "",
    lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    "Name:",
    "Pickup or delivery:",
    "Preferred date & time:",
  ].join("\n");

  return whatsappLink(message);
}

/** Build a wa.me link from the contact / inquiry form. */
export function buildInquiryWhatsAppLink(input: {
  name: string;
  phone: string;
  message: string;
}) {
  const message = [
    `Hello ${site.name}!`,
    "",
    `Name: ${input.name || "-"}`,
    `Phone: ${input.phone || "-"}`,
    "",
    input.message || "I'd love to know more about your bakes.",
  ].join("\n");

  return whatsappLink(message);
}
