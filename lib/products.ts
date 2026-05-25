export type DessertType =
  | "cake"
  | "cupcake"
  | "cookie"
  | "brownie"
  | "macaron"
  | "donut"
  | "tart"
  | "croissant"
  | "bomboloni";

export type Category = "Cakes" | "Brownies" | "Cookies" | "Bombolonis";

export interface ProductOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  /** Base ("from") price — the cheapest option. */
  price: number;
  description: string;
  art: DessertType;
  /** Two CSS colors for the card's gradient tile. */
  tone: [string, string];
  badge?: string;
  /** Selectable variants shown in the product modal. */
  options?: ProductOption[];
  /** Custom items skip the cart and open a WhatsApp enquiry instead. */
  custom?: boolean;
  /** Photo in /public; falls back to the DessertArt illustration if absent. */
  image?: string;
}

export const categories: Array<Category | "All"> = [
  "All",
  "Cakes",
  "Brownies",
  "Cookies",
  "Bombolonis",
];

/** Cakes are sold by weight (1 kg = 2x the 500 g price). */
const cake = (p: number): ProductOption[] => [
  { label: "500 g", price: p },
  { label: "1 kg", price: p * 2 },
];
/** Per-piece items are boxed (6 or 8 pieces). */
const box = (perPiece: number): ProductOption[] => [
  { label: "Box of 6", price: perPiece * 6 },
  { label: "Box of 8", price: perPiece * 8 },
];
/** Cookies use explicit box prices. */
const cookieBox = (six: number, eight: number): ProductOption[] => [
  { label: "Box of 6", price: six },
  { label: "Box of 8", price: eight },
];

type BaseProduct = Omit<Product, "price" | "image"> & { price?: number };

const baseProducts: BaseProduct[] = [
  // ---------------------------------------------------------------- Cakes
  {
    id: "belgian-chocolate-cake",
    name: "Belgian Chocolate Cake",
    category: "Cakes",
    description:
      "Layers of velvet sponge soaked in dark Belgian ganache and a whisper of sea salt.",
    art: "cake",
    tone: ["#6f4326", "#2c1a0f"],
    badge: "Bestseller",
    options: cake(450),
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    category: "Cakes",
    description:
      "Cocoa-kissed velvet sponge with a tangy whipped cream-cheese cloud between layers.",
    art: "cake",
    tone: ["#a45645", "#561f1c"],
    options: cake(550),
  },
  {
    id: "black-forest-cake",
    name: "Black Forest Cake",
    category: "Cakes",
    description:
      "Chocolate sponge, fresh cream and morello cherries — the timeless classic.",
    art: "cake",
    tone: ["#5b2f2a", "#2a1410"],
    options: cake(400),
  },
  {
    id: "butterscotch-cake",
    name: "Butterscotch Cake",
    category: "Cakes",
    description:
      "Buttery sponge layered with caramel cream and a praline crunch in every bite.",
    art: "cake",
    tone: ["#b8863a", "#6e4a1c"],
    options: cake(600),
  },
  {
    id: "pineapple-cake",
    name: "Pineapple Cake",
    category: "Cakes",
    description:
      "Light vanilla sponge, airy fresh cream and juicy pineapple — a teatime favourite.",
    art: "cake",
    tone: ["#c9a44e", "#7a5a24"],
    options: cake(600),
  },
  {
    id: "choco-truffle-cake",
    name: "Choco Truffle Cake",
    category: "Cakes",
    description:
      "Decadent chocolate sponge cloaked in glossy truffle ganache. For the chocoholic.",
    art: "cake",
    tone: ["#5e3a23", "#241308"],
    badge: "New",
    options: cake(600),
  },
  {
    id: "custom-cake",
    name: "Custom Cake",
    category: "Cakes",
    price: 0,
    description:
      "Dreaming up something special? Tell us the occasion, flavour and design — we'll craft it just for you.",
    art: "cake",
    tone: ["#7c5a2e", "#2e1d0f"],
    badge: "Made to order",
    custom: true,
  },

  // ------------------------------------------------------------- Brownies
  {
    id: "classic-fudge-brownie",
    name: "Classic Fudge Brownie",
    category: "Brownies",
    description: "Impossibly fudgy centre with a signature crackled top.",
    art: "brownie",
    tone: ["#6f4326", "#2c1a0f"],
    badge: "Bestseller",
    options: box(120),
  },
  {
    id: "walnut-brownie",
    name: "Walnut Brownie",
    category: "Brownies",
    description: "Our fudge brownie loaded with toasted, buttery walnuts.",
    art: "brownie",
    tone: ["#8a5a34", "#3f2613"],
    options: box(140),
  },
  {
    id: "salted-caramel-brownie",
    name: "Salted Caramel Brownie",
    category: "Brownies",
    description: "Dark chocolate brownie rippled with caramel and flaky salt.",
    art: "brownie",
    tone: ["#9c6b35", "#492a14"],
    options: box(150),
  },
  {
    id: "nutella-brownie",
    name: "Nutella Brownie",
    category: "Brownies",
    description: "A molten hazelnut Nutella core hidden inside every square.",
    art: "brownie",
    tone: ["#7a4a2c", "#341c10"],
    options: box(160),
  },
  {
    id: "triple-chocolate-brownie",
    name: "Triple Chocolate Brownie",
    category: "Brownies",
    description: "Dark, milk and white chocolate folded through a fudgy base.",
    art: "brownie",
    tone: ["#5e3a23", "#2a160d"],
    options: box(130),
  },
  {
    id: "biscoff-brownie",
    name: "Biscoff Brownie",
    category: "Brownies",
    description: "Spiced Biscoff swirl and cookie crumble over rich chocolate.",
    art: "brownie",
    tone: ["#b07b3e", "#5e3a1b"],
    badge: "New",
    options: box(160),
  },

  // -------------------------------------------------------------- Cookies
  {
    id: "brown-butter-choc-chip",
    name: "Brown Butter Choc-Chip",
    category: "Cookies",
    description: "Nutty brown-butter dough, gooey middles and pools of chocolate.",
    art: "cookie",
    tone: ["#b78a4e", "#6f4626"],
    badge: "Bestseller",
    options: cookieBox(349, 449),
  },
  {
    id: "double-chocolate-cookie",
    name: "Double Chocolate Cookie",
    category: "Cookies",
    description: "Deep cocoa cookie loaded with milk and dark chunks.",
    art: "cookie",
    tone: ["#5e3a23", "#2a160d"],
    options: cookieBox(369, 469),
  },
  {
    id: "red-velvet-cookie",
    name: "Red Velvet Cookie",
    category: "Cookies",
    description: "Soft red velvet cookie studded with white chocolate chips.",
    art: "cookie",
    tone: ["#a8504a", "#5a221f"],
    options: cookieBox(379, 479),
  },

  // ----------------------------------------------------------- Bombolonis
  {
    id: "nutella-bomboloni",
    name: "Nutella Bomboloni",
    category: "Bombolonis",
    description: "Pillowy sugar-dusted Italian doughnut filled with molten Nutella.",
    art: "bomboloni",
    tone: ["#7a4a2c", "#341c10"],
    badge: "Bestseller",
    options: box(120),
  },
  {
    id: "ganache-bomboloni",
    name: "Chocolate Ganache Bomboloni",
    category: "Bombolonis",
    description: "Soft brioche bun piped generously with silky dark ganache.",
    art: "bomboloni",
    tone: ["#4f3220", "#23130b"],
    options: box(100),
  },
  {
    id: "biscoff-bomboloni",
    name: "Biscoff Bomboloni",
    category: "Bombolonis",
    description: "Caramelised Biscoff cream filling with a cookie-crumb finish.",
    art: "bomboloni",
    tone: ["#b8823f", "#5e3a1b"],
    badge: "New",
    options: box(130),
  },
  {
    id: "berry-bomboloni",
    name: "Mixed Berry Bomboloni",
    category: "Bombolonis",
    description: "Bright mixed-berry compote tucked into a fluffy sugared bun.",
    art: "bomboloni",
    tone: ["#9c5566", "#52232f"],
    options: box(130),
  },
  {
    id: "jam-bomboloni",
    name: "Classic Jam Bomboloni",
    category: "Bombolonis",
    description: "The old-school favourite — fluffy dough and sweet fruit jam.",
    art: "bomboloni",
    tone: ["#b35d54", "#5e2723"],
    options: box(100),
  },
];

/** Product photos live in /public/images/menu. Swap for your own anytime. */
const productImages: Record<string, string> = {
  "belgian-chocolate-cake": "/images/menu/choc-cake.jpg",
  "red-velvet-cake": "/images/menu/red-velvet.jpg",
  "black-forest-cake": "/images/menu/black-forest.jpg",
  "butterscotch-cake": "/images/menu/butterscotch.jpg",
  "pineapple-cake": "/images/menu/pineapple.jpg",
  "choco-truffle-cake": "/images/menu/truffle-cake.jpg",
  "custom-cake": "/images/menu/custom-cake.jpg",
  "classic-fudge-brownie": "/images/menu/brownie-1.jpg",
  "walnut-brownie": "/images/menu/brownie-2.jpg",
  "salted-caramel-brownie": "/images/menu/brownie-3.jpg",
  "nutella-brownie": "/images/menu/brownie-1.jpg",
  "triple-chocolate-brownie": "/images/menu/brownie-2.jpg",
  "biscoff-brownie": "/images/menu/brownie-3.jpg",
  "brown-butter-choc-chip": "/images/menu/cookie-1.jpg",
  "double-chocolate-cookie": "/images/menu/cookie-2.jpg",
  "red-velvet-cookie": "/images/menu/cookie-3.jpg",
  "nutella-bomboloni": "/images/menu/bomboloni-1.jpg",
  "ganache-bomboloni": "/images/menu/bomboloni-2.jpg",
  "biscoff-bomboloni": "/images/menu/bomboloni-3.jpg",
  "berry-bomboloni": "/images/menu/bomboloni-2.jpg",
  "jam-bomboloni": "/images/menu/bomboloni-1.jpg",
};

export const products: Product[] = baseProducts.map((p) => ({
  ...p,
  price: p.price ?? p.options?.[0]?.price ?? 0,
  image: productImages[p.id],
}));
