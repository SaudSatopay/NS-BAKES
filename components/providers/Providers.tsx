"use client";

import { ThemeProvider } from "next-themes";
import { SoundProvider } from "@/context/SoundContext";
import { CartProvider } from "@/context/CartContext";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <SoundProvider>
        <CartProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}
