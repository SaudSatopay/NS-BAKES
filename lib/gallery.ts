import type { DessertType } from "./products";

export type TileSize = "tall" | "wide" | "big" | "normal";

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  art: DessertType;
  tone: [string, string];
  size: TileSize;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Midnight Ganache",
    tag: "Signature cake",
    art: "cake",
    tone: ["#6f4326", "#2c1a0f"],
    size: "tall",
  },
  {
    id: "g2",
    title: "Nutella Bombolonis",
    tag: "Bombolonis",
    art: "bomboloni",
    tone: ["#7a4a2c", "#341c10"],
    size: "normal",
  },
  {
    id: "g3",
    title: "Fudge Squares",
    tag: "Brownies",
    art: "brownie",
    tone: ["#5b3823", "#241308"],
    size: "wide",
  },
  {
    id: "g4",
    title: "Petal & Pistachio",
    tag: "Celebration cake",
    art: "cake",
    tone: ["#caa17f", "#7c4f39"],
    size: "normal",
  },
  {
    id: "g5",
    title: "Berry Bombolonis",
    tag: "Bombolonis",
    art: "bomboloni",
    tone: ["#9c5566", "#52232f"],
    size: "normal",
  },
  {
    id: "g6",
    title: "Chocolate Pools",
    tag: "Cookies",
    art: "cookie",
    tone: ["#b78a4e", "#6f4626"],
    size: "tall",
  },
  {
    id: "g7",
    title: "Caramel Drip",
    tag: "Layer cake",
    art: "tart",
    tone: ["#b07b3e", "#5e3a1b"],
    size: "wide",
  },
  {
    id: "g8",
    title: "Velvet Slice",
    tag: "Red velvet",
    art: "cake",
    tone: ["#a45645", "#561f1c"],
    size: "normal",
  },
];
