export type FlyDetail = { image: string; x: number; y: number };

/** Trigger the fly-to-cart animation handled by <FlyToCartLayer />. */
export function flyToCart(image: string, origin: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<FlyDetail>("ns:flytocart", {
      detail: { image, x: origin.x, y: origin.y },
    }),
  );
}
