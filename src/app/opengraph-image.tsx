import { ImageResponse } from "next/og";
import { footer } from "@/content/microcopy";

export const alt = "Uling: Kapampangan, over the coals.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse can't read the Tailwind theme, so these mirror the tokens in globals.css.
const colors = {
  ember: "#241c17",
  cream: "#fbf6ee",
  creamMuted: "#d9cdbb",
  glow: "#e8a33d",
};

const headline = footer.tagline.split(", ");

/** Share image for every page: type and ember glow only, no photos and no logos. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: colors.cream,
          background: `linear-gradient(to top, ${colors.glow}59, ${colors.ember} 62%)`,
          backgroundColor: colors.ember,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: 2 }}>Uling</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>
            {/* Break after the comma so "coals." never sits alone. */}
            <div>{`${headline[0]},`}</div>
            <div>{headline[1]}</div>
          </div>
          <div style={{ fontSize: 36, color: colors.creamMuted }}>
            Modern Kapampangan grill &amp; bar in San Fernando, Pampanga
          </div>
        </div>
        <div style={{ fontSize: 26, color: colors.creamMuted }}>A fictional restaurant: a web design concept</div>
      </div>
    ),
    size,
  );
}
