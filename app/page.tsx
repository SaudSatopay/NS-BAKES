import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Order } from "@/components/sections/Order";
import { Marquee } from "@/components/ui/Marquee";

const marqueeItems = [
  "Freshly baked daily",
  "Small-batch & handmade",
  "Premium Belgian chocolate",
  "Baked to order",
  "Made with love in Thane",
  "Zero preservatives",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />
      <About />
      <Products />
      <Gallery />
      <Testimonials />
      <Order />
    </>
  );
}
