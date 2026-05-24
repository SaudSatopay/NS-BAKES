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

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  unit?: string;
  description: string;
  art: DessertType;
  /** Two CSS colors for the card's gradient tile. */
  tone: [string, string];
  badge?: string;
  /** Custom items skip the cart and open a WhatsApp enquiry instead. */
  custom?: boolean;
}

export const categories: Array<Category | "All"> = [
  "All",
  "Cakes",
  "Brownies",
  "Cookies",
  "Bombolonis",
];

export const products: Product[] = [
  // ---------------------------------------------------------------- Cakes
  {
    id: "belgian-chocolate-cake",
    name: "Belgian Chocolate Cake",
    category: "Cakes",
    price: 899,
    unit: "500 g",
    description:
      "Layers of velvet sponge soaked in dark Belgian ganache and a whisper of sea salt.",
    art: "cake",
    tone: ["#6f4326", "#2c1a0f"],
    badge: "Bestseller",
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    category: "Cakes",
    price: 849,
    unit: "500 g",
    description:
      "Cocoa-kissed velvet sponge with a tangy whipped cream-cheese cloud between layers.",
    art: "cake",
    tone: ["#a45645", "#561f1c"],
  },
  {
    id: "black-forest-cake",
    name: "Black Forest Cake",
    category: "Cakes",
    price: 799,
    unit: "500 g",
    description:
      "Chocolate sponge, fresh cream and morello cherries — the timeless classic.",
    art: "cake",
    tone: ["#5b2f2a", "#2a1410"],
  },
  {
    id: "butterscotch-cake",
    name: "Butterscotch Cake",
    category: "Cakes",
    price: 749,
    unit: "500 g",
    description:
      "Buttery sponge layered with caramel cream and a praline crunch in every bite.",
    art: "cake",
    tone: ["#b8863a", "#6e4a1c"],
  },
  {
    id: "pineapple-cake",
    name: "Pineapple Cake",
    category: "Cakes",
    price: 699,
    unit: "500 g",
    description:
      "Light vanilla sponge, airy fresh cream and juicy pineapple — a teatime favourite.",
    art: "cake",
    tone: ["#c9a44e", "#7a5a24"],
  },
  {
    id: "choco-truffle-cake",
    name: "Choco Truffle Cake",
    category: "Cakes",
    price: 949,
    unit: "500 g",
    description:
      "Decadent chocolate sponge cloaked in glossy truffle ganache. For the chocoholic.",
    art: "cake",
    tone: ["#5e3a23", "#241308"],
    badge: "New",
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
    price: 120,
    unit: "per piece",
    description: "Impossibly fudgy centre with a signature crackled top.",
    art: "brownie",
    tone: ["#6f4326", "#2c1a0f"],
    badge: "Bestseller",
  },
  {
    id: "walnut-brownie",
    name: "Walnut Brownie",
    category: "Brownies",
    price: 140,
    unit: "per piece",
    description: "Our fudge brownie loaded with toasted, buttery walnuts.",
    art: "brownie",
    tone: ["#8a5a34", "#3f2613"],
  },
  {
    id: "salted-caramel-brownie",
    name: "Salted Caramel Brownie",
    category: "Brownies",
    price: 150,
    unit: "per piece",
    description: "Dark chocolate brownie rippled with caramel and flaky salt.",
    art: "brownie",
    tone: ["#9c6b35", "#492a14"],
  },
  {
    id: "nutella-brownie",
    name: "Nutella Brownie",
    category: "Brownies",
    price: 160,
    unit: "per piece",
    description: "A molten hazelnut Nutella core hidden inside every square.",
    art: "brownie",
    tone: ["#7a4a2c", "#341c10"],
  },
  {
    id: "triple-chocolate-brownie",
    name: "Triple Chocolate Brownie",
    category: "Brownies",
    price: 150,
    unit: "per piece",
    description: "Dark, milk and white chocolate folded through a fudgy base.",
    art: "brownie",
    tone: ["#5e3a23", "#2a160d"],
  },
  {
    id: "biscoff-brownie",
    name: "Biscoff Brownie",
    category: "Brownies",
    price: 160,
    unit: "per piece",
    description: "Spiced Biscoff swirl and cookie crumble over rich chocolate.",
    art: "brownie",
    tone: ["#b07b3e", "#5e3a1b"],
    badge: "New",
  },

  // -------------------------------------------------------------- Cookies
  {
    id: "brown-butter-choc-chip",
    name: "Brown Butter Choc-Chip",
    category: "Cookies",
    price: 299,
    unit: "box of 6",
    description: "Nutty brown-butter dough, gooey middles and pools of chocolate.",
    art: "cookie",
    tone: ["#b78a4e", "#6f4626"],
    badge: "Bestseller",
  },
  {
    id: "double-chocolate-cookie",
    name: "Double Chocolate Cookie",
    category: "Cookies",
    price: 319,
    unit: "box of 6",
    description: "Deep cocoa cookie loaded with milk and dark chunks.",
    art: "cookie",
    tone: ["#5e3a23", "#2a160d"],
  },
  {
    id: "red-velvet-cookie",
    name: "Red Velvet Cookie",
    category: "Cookies",
    price: 329,
    unit: "box of 6",
    description: "Soft red velvet cookie studded with white chocolate chips.",
    art: "cookie",
    tone: ["#a8504a", "#5a221f"],
  },
  {
    id: "oatmeal-raisin-cookie",
    name: "Oatmeal Raisin Cookie",
    category: "Cookies",
    price: 279,
    unit: "box of 6",
    description: "Chewy spiced oat cookie with plump, juicy raisins.",
    art: "cookie",
    tone: ["#c2a06a", "#7a5a32"],
  },

  // ----------------------------------------------------------- Bombolonis
  {
    id: "nutella-bomboloni",
    name: "Nutella Bomboloni",
    category: "Bombolonis",
    price: 120,
    unit: "per piece",
    description: "Pillowy sugar-dusted Italian doughnut filled with molten Nutella.",
    art: "bomboloni",
    tone: ["#7a4a2c", "#341c10"],
    badge: "Bestseller",
  },
  {
    id: "ganache-bomboloni",
    name: "Chocolate Ganache Bomboloni",
    category: "Bombolonis",
    price: 110,
    unit: "per piece",
    description: "Soft brioche bun piped generously with silky dark ganache.",
    art: "bomboloni",
    tone: ["#4f3220", "#23130b"],
  },
  {
    id: "biscoff-bomboloni",
    name: "Biscoff Bomboloni",
    category: "Bombolonis",
    price: 130,
    unit: "per piece",
    description: "Caramelised Biscoff cream filling with a cookie-crumb finish.",
    art: "bomboloni",
    tone: ["#b8823f", "#5e3a1b"],
    badge: "New",
  },
  {
    id: "berry-bomboloni",
    name: "Mixed Berry Bomboloni",
    category: "Bombolonis",
    price: 110,
    unit: "per piece",
    description: "Bright mixed-berry compote tucked into a fluffy sugared bun.",
    art: "bomboloni",
    tone: ["#9c5566", "#52232f"],
  },
  {
    id: "jam-bomboloni",
    name: "Classic Jam Bomboloni",
    category: "Bombolonis",
    price: 90,
    unit: "per piece",
    description: "The old-school favourite — fluffy dough and sweet fruit jam.",
    art: "bomboloni",
    tone: ["#b35d54", "#5e2723"],
  },
];
