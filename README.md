# NS BAKES — Premium Home Bakery Website

A visually rich, highly interactive marketing site for **NS BAKES**, a home bakery brand.
Built with Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion, with a
cart that checks out straight to **WhatsApp** — no backend required.

> Aesthetic: editorial luxury patisserie — warm **cream**, deep **chocolate**, and
> **gold** accents, with light/dark themes, a film-grain texture, a follow-cursor,
> magnetic buttons, buttery smooth scrolling, scroll-reveals, and optional
> (muted-by-default) interface sounds.

---

## Features

- **Cinematic hero** with an animated word-by-word headline, parallax floating
  desserts, and a spinning brand badge.
- **About** storytelling section with parallax image panels.
- **Signature menu** with category filtering (animated pill) and **add-to-cart**.
- **Cart drawer** that builds a pre-filled **WhatsApp order** message from your items.
- **Masonry gallery** with a keyboard-accessible **lightbox**.
- **Testimonials** carousel (auto-play, drag, dots).
- **Order / contact** section: WhatsApp CTA, "open cart", and an animated inquiry
  form that opens a pre-filled WhatsApp chat.
- **Light / dark mode** toggle, **sound** toggle (Web Audio — no audio files shipped).
- Production niceties: SEO metadata, JSON-LD `Bakery` schema, dynamic Open Graph
  image, sitemap, robots, web manifest, `prefers-reduced-motion` support, and
  keyboard/focus accessibility.

## Tech stack

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Framework      | Next.js 14 (App Router)         |
| Language       | TypeScript                      |
| Styling        | Tailwind CSS v3 (CSS variables) |
| Animation      | Framer Motion                   |
| Smooth scroll  | Lenis                           |
| Theme          | next-themes                     |

---

## Getting started

**Prerequisites:** Node.js **18.17+** (Node 20 recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional but recommended)
cp .env.example .env.local
#   then edit .env.local — see "Configuration" below

# 3. Run the dev server
npm run dev
# open http://localhost:3000

# 4. Production build + run
npm run build
npm run start
```

---

## Configuration

### Environment variables (`.env.local`)

```bash
# WhatsApp number that receives orders — international format, digits only, no "+"
NEXT_PUBLIC_WHATSAPP_NUMBER=917304158620

# Public site URL (SEO canonical / sitemap / Open Graph)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> If you skip the env file, a placeholder WhatsApp number is used — **set a real
> number before launch** or orders won't reach you.

### Brand & content

Everything content-related lives in plain TypeScript files:

- **`lib/site.ts`** — brand name, tagline, contact details, hours, social links.
- **`lib/products.ts`** — menu items, categories, prices (INR), descriptions.
- **`lib/testimonials.ts`** — reviews.
- **`lib/gallery.ts`** — gallery tiles.

### Colors & theme

All colors are CSS variables defined in **`app/globals.css`** (`:root` for light,
`.dark` for dark). Tweak the `R G B` triples there and the whole site updates.

### Using real photography

The desserts are currently elegant hand-built SVG illustrations
(`components/ui/DessertArt.tsx`) so the site looks designed out of the box. To use
real photos, drop images in `public/images/` and replace the `<DessertArt … />`
tiles inside `components/ui/ProductCard.tsx` and `components/sections/Gallery.tsx`
with Next.js `<Image>` components.

---

## Project structure

```
app/
  layout.tsx          # root layout, fonts, SEO metadata, JSON-LD, chrome
  page.tsx            # section composition
  globals.css         # design tokens (light/dark) + base styles
  opengraph-image.tsx # dynamic social preview
  icon.svg            # favicon
  sitemap.ts robots.ts manifest.ts
components/
  layout/             # Navbar, Footer
  sections/           # Hero, About, Products, Gallery, Testimonials, Order
  ui/                 # Button, Reveal, Marquee, CartDrawer, Lightbox, icons, …
  providers/          # Theme + Cart + Sound + SmoothScroll
context/              # CartContext, SoundContext
lib/                  # site config, products, testimonials, gallery, utils
```

---

## Deployment

The app is a standard Next.js App Router project and deploys with **zero config**
to both platforms.

### Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project** and import the repo (framework auto-detected as
   Next.js; a `vercel.json` is included).
3. Add environment variables `NEXT_PUBLIC_WHATSAPP_NUMBER` and
   `NEXT_PUBLIC_SITE_URL` under **Settings → Environment Variables**.
4. **Deploy.**

Or via CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

### Netlify

1. Push the repo to your git host.
2. In Netlify, **Add new site → Import an existing project** and select the repo.
3. Build settings are picked up from `netlify.toml` (build `npm run build`); the
   official **@netlify/plugin-nextjs** runtime is added automatically.
4. Add the same environment variables under **Site settings → Environment variables.**
5. **Deploy site.**

Or via CLI:

```bash
npm i -g netlify-cli
netlify deploy            # preview
netlify deploy --prod     # production
```

---

## Accessibility & performance

- Honors `prefers-reduced-motion` (disables Lenis, the cursor, and heavy motion).
- Sound is **off by default** and user-toggleable.
- Semantic landmarks, skip-link, focus-visible rings, keyboard-operable cart &
  lightbox, and labelled controls.
- Fonts via `next/font` (self-hosted, no layout shift); animations use
  transform/opacity; below-the-fold work is reveal-on-scroll.

## License

Private project for NS BAKES. All rights reserved.
