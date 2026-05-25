import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "./site";

/** Merge Tailwind classes safely (resolves conflicts, dedupes). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** URL/id-safe slug, e.g. "1 kg" -> "1-kg". Shared so cart variant ids match. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

export type OrderDetails = {
  name?: string;
  address?: string;
  wantedBy?: string;
  notes?: string;
  isGift?: boolean;
  giftMessage?: string;
};

/** Build a wa.me link pre-filled with the cart contents and customer details. */
export function buildCartWhatsAppLink(
  items: OrderLine[],
  subtotal: number,
  details: OrderDetails = {},
) {
  const lines = items
    .map((i) => `- ${i.qty} x ${i.name}  (${formatPrice(i.price * i.qty)})`)
    .join("\n");

  const parts = [
    `Hello ${site.name}!`,
    "",
    "I'd like to place an order:",
    "",
    lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    `Name: ${details.name || "-"}`,
    `Delivery address: ${details.address || "-"}`,
    `Wanted by: ${details.wantedBy || "-"}`,
  ];

  if (details.notes) parts.push(`Notes: ${details.notes}`);
  if (details.isGift) {
    parts.push("Gift order: Yes");
    if (details.giftMessage) parts.push(`Gift message: ${details.giftMessage}`);
  }

  return whatsappLink(parts.join("\n"));
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
