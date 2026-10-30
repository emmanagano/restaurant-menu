import { readFile } from "node:fs/promises";
import { join } from "node:path";
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
};

const headline = footer.tagline.split(", ");

// Read once at build time (this route is static). Photo credit: see supabase/migrations/*_add_launch_photos.sql.
const embers = await readFile(join(process.cwd(), "public/images/embers.jpg"));
const embersSrc = `data:image/jpeg;base64,${embers.toString("base64")}`;

/** Share image for every page: the ember photo under a dark wash, plus the tagline. No logos. */
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
          backgroundColor: colors.ember,
        }}
      >
        <img
          src={embersSrc}
          alt=""
          width={size.width}
          height={size.height}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to top, ${colors.ember}b3, ${colors.ember}e6 70%)`,
          }}
        />
        <div style={{ position: "relative", fontSize: 44, fontWeight: 700, letterSpacing: 2 }}>Uling</div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>
            {/* Break after the comma so "coals." never sits alone. */}
            <div>{`${headline[0]},`}</div>
            <div>{headline[1]}</div>
          </div>
          <div style={{ fontSize: 36, color: colors.creamMuted }}>
            Modern Kapampangan grill &amp; bar in San Fernando, Pampanga
          </div>
        </div>
        <div style={{ position: "relative", fontSize: 26, color: colors.creamMuted }}>
          A fictional restaurant: a web design concept
        </div>
      </div>
    ),
    size,
  );
}
