export type DessertType =
  | "cake"
  | "cupcake"
  | "cookie"
  | "brownie"
  | "macaron"
  | "donut"
  | "tart"
  | "croissant";

export type Category =
  | "Cakes"
  | "Brownies"
  | "Cupcakes"
  | "Cookies"
  | "Macarons";

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
}

export const categories: Array<Category | "All"> = [
  "All",
  "Cakes",
  "Brownies",
  "Cupcakes",
  "Cookies",
  "Macarons",
];

export const products: Product[] = [
  {
    id: "belgian-chocolate-cake",
    name: "Belgian Chocolate Cake",
    category: "Cakes",
    price: 899,
    unit: "500 g",
    description:
      "Four layers of velvet sponge soaked in dark Belgian ganache and a whisper of sea salt.",
    art: "cake",
    tone: ["#6f4326", "#2c1a0f"],
    badge: "Bestseller",
  },
  {
    id: "pistachio-rose-cake",
    name: "Pistachio & Rose Cake",
    category: "Cakes",
    price: 1049,
    unit: "500 g",
    description:
      "Toasted pistachio crumb, rose-water cream and candied petals — quietly elegant.",
    art: "cake",
    tone: ["#caa17f", "#7c4f39"],
    badge: "New",
  },
  {
    id: "biscoff-caramel-cake",
    name: "Biscoff Caramel Cake",
    category: "Cakes",
    price: 949,
    unit: "500 g",
    description:
      "Spiced cookie layers folded with molten caramel and a crackle of Biscoff crunch.",
    art: "tart",
    tone: ["#b07b3e", "#5e3a1b"],
  },
  {
    id: "red-velvet-dream",
    name: "Red Velvet Dream",
    category: "Cakes",
    price: 849,
    unit: "500 g",
    description:
      "Cocoa-kissed velvet with a tangy whipped cream-cheese cloud between every layer.",
    art: "cake",
    tone: ["#a45645", "#561f1c"],
  },
  {
    id: "triple-choc-brownie",
    name: "Triple-Choc Fudge Brownie",
    category: "Brownies",
    price: 399,
    unit: "box of 9",
    description:
      "Impossibly fudgy centre, crackled top, three kinds of chocolate in every square.",
    art: "brownie",
    tone: ["#5b3823", "#241308"],
    badge: "Bestseller",
  },
  {
    id: "salted-caramel-brownie",
    name: "Salted Caramel Brownie",
    category: "Brownies",
    price: 449,
    unit: "box of 9",
    description:
      "Dark chocolate brownie rippled with salted caramel and a flutter of flaky salt.",
    art: "brownie",
    tone: ["#9c6b35", "#492a14"],
  },
  {
    id: "vanilla-bean-cupcakes",
    name: "Vanilla Bean Cupcakes",
    category: "Cupcakes",
    price: 349,
    unit: "box of 6",
    description:
      "Madagascar vanilla sponge crowned with a tall swirl of silky buttercream.",
    art: "cupcake",
    tone: ["#d8b98a", "#9a6f44"],
  },
  {
    id: "nutella-stuffed-cupcakes",
    name: "Nutella-Stuffed Cupcakes",
    category: "Cupcakes",
    price: 429,
    unit: "box of 6",
    description:
      "Chocolate sponge with a hidden hazelnut core and a glossy ganache cap.",
    art: "cupcake",
    tone: ["#7a4a2c", "#341c10"],
    badge: "New",
  },
  {
    id: "brown-butter-choc-chip",
    name: "Brown Butter Choc-Chip",
    category: "Cookies",
    price: 299,
    unit: "box of 6",
    description:
      "Nutty brown-butter dough, gooey middles and pools of dark chocolate.",
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
    description:
      "Deep cocoa cookie loaded with milk and dark chunks — for the true chocoholic.",
    art: "cookie",
    tone: ["#5e3a23", "#2a160d"],
  },
  {
    id: "pistachio-cookie",
    name: "Pistachio Crunch Cookie",
    category: "Cookies",
    price: 349,
    unit: "box of 6",
    description:
      "Buttery cookie studded with slivered pistachios and a hint of cardamom.",
    art: "cookie",
    tone: ["#bfa06a", "#7a5a32"],
  },
  {
    id: "french-macarons",
    name: "French Macaron Box",
    category: "Macarons",
    price: 599,
    unit: "box of 12",
    description:
      "Delicate almond shells with seasonal ganache fillings, finished by hand.",
    art: "macaron",
    tone: ["#cf9fa0", "#7f4b56"],
  },
];
