import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#16100c",
          backgroundImage:
            "radial-gradient(circle at 22% 18%, rgba(214,176,96,0.30), transparent 45%), radial-gradient(circle at 82% 88%, rgba(226,182,173,0.22), transparent 45%)",
          color: "#f4eadc",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#d6b060",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 600,
            lineHeight: 1,
            marginTop: 18,
            letterSpacing: -4,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 26,
            color: "#bca58f",
          }}
        >
          Cakes · Brownies · Cupcakes · Cookies — {site.location.city}
        </div>
      </div>
    ),
    { ...size },
  );
}
