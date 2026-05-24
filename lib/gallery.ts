import type { DessertType } from "./products";

export type TileSize = "tall" | "wide" | "big" | "normal";

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  art: DessertType;
  tone: [string, string];
  size: TileSize;
  /** Photo in /public; falls back to the DessertArt illustration if absent. */
  image?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Midnight Ganache",
    tag: "Signature cake",
    art: "cake",
    tone: ["#6f4326", "#2c1a0f"],
    size: "tall",
    image: "/images/menu/choc-cake.jpg",
  },
  {
    id: "g2",
    title: "Nutella Bombolonis",
    tag: "Bombolonis",
    art: "bomboloni",
    tone: ["#7a4a2c", "#341c10"],
    size: "normal",
    image: "/images/menu/bomboloni-1.jpg",
  },
  {
    id: "g3",
    title: "Fudge Squares",
    tag: "Brownies",
    art: "brownie",
    tone: ["#5b3823", "#241308"],
    size: "wide",
    image: "/images/menu/brownie-1.jpg",
  },
  {
    id: "g4",
    title: "Truffle Indulgence",
    tag: "Celebration cake",
    art: "cake",
    tone: ["#5e3a23", "#241308"],
    size: "normal",
    image: "/images/menu/truffle-cake.jpg",
  },
  {
    id: "g5",
    title: "Berry Bombolonis",
    tag: "Bombolonis",
    art: "bomboloni",
    tone: ["#9c5566", "#52232f"],
    size: "normal",
    image: "/images/menu/bomboloni-2.jpg",
  },
  {
    id: "g6",
    title: "Chocolate Pools",
    tag: "Cookies",
    art: "cookie",
    tone: ["#b78a4e", "#6f4626"],
    size: "tall",
    image: "/images/menu/cookie-1.jpg",
  },
  {
    id: "g7",
    title: "Caramel Drip",
    tag: "Butterscotch cake",
    art: "tart",
    tone: ["#b07b3e", "#5e3a1b"],
    size: "wide",
    image: "/images/menu/butterscotch.jpg",
  },
  {
    id: "g8",
    title: "Velvet Slice",
    tag: "Red velvet",
    art: "cake",
    tone: ["#a45645", "#561f1c"],
    size: "normal",
    image: "/images/menu/red-velvet.jpg",
  },
];
