import type { Config } from "tailwindcss";

/**
 * Colors are driven by CSS custom properties (see app/globals.css) so the
 * light/dark themes can swap tokens while keeping a single utility surface.
 * Tokens are stored as "R G B" triples to support Tailwind's <alpha-value>.
 */
const withVar = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg: withVar("--bg"),
        surface: withVar("--surface"),
        "surface-2": withVar("--surface-2"),
        ink: withVar("--ink"),
        muted: withVar("--muted"),
        line: withVar("--line"),
        gold: withVar("--gold"),
        "gold-2": withVar("--gold-2"),
        blush: withVar("--blush"),
        choco: withVar("--choco"),
        cream: withVar("--cream"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        eyebrow: "0.28em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(40 24 16 / 0.04), 0 12px 40px -12px rgb(40 24 16 / 0.18)",
        lift: "0 30px 80px -30px rgb(40 24 16 / 0.45)",
        glow: "0 0 0 1px rgb(var(--gold) / 0.35), 0 18px 50px -16px rgb(var(--gold) / 0.45)",
        inset: "inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(100deg, rgb(var(--gold-2)) 0%, rgb(var(--gold)) 45%, rgb(var(--gold-2)) 100%)",
        "gold-text":
          "linear-gradient(100deg, rgb(var(--gold-2)), rgb(var(--gold)) 50%, rgb(var(--gold-2)))",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floater: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(6deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floater: "floater 9s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spinSlow 26s linear infinite",
        "pulse-ring": "pulseRing 1.6s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
