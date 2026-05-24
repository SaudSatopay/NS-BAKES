/**
 * Central brand + contact configuration.
 * Update these values (and NEXT_PUBLIC_* env vars) before launch.
 */
export const site = {
  name: "NS BAKES",
  legalName: "NS BAKES Home Bakery",
  tagline: "Artisan home bakery",
  description:
    "NS BAKES is a premium home bakery in Thane crafting small-batch cakes, brownies, cupcakes and cookies — baked to order with the finest ingredients and a whole lot of love.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nsbakes.example.com",

  /** International format, digits only, no leading "+". e.g. 917304158620 */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917304158620",

  email: "satopaysaud@gmail.com",
  phoneDisplay: "+91 73041 58620",

  location: {
    area: "Thane West",
    city: "Thane",
    region: "Maharashtra",
    country: "India",
  },
  hours: "Daily · 10:00 – 21:00",
  currency: "₹",

  socials: [
    {
      name: "Instagram",
      handle: "@nsbakes17",
      href: "https://www.instagram.com/nsbakes17/",
    },
  ],
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Story", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Love", href: "#testimonials" },
  { label: "Order", href: "#order" },
];
