import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "On Board — your community board. One board, your whole campus. Clean slate every Monday.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Statically generated at build. Mirrors the hero: badge, giant wordmark,
// tagline — plus one tilted board card bleeding off the right edge, the same
// masonry card the site (and the app) is built from.
export default async function Image() {
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "assets/ZalandoSansExpanded-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/ZalandoSansSemiExpanded-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "ZalandoSemiExpanded",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left column — the hero, condensed. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 72,
            paddingRight: 420,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#000000",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 600,
              padding: "10px 26px",
              borderRadius: 9999,
              marginBottom: 40,
            }}
          >
            Closed Beta · IVC
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ZalandoExpanded",
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              marginLeft: -6,
            }}
          >
            On Board.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              color: "#5c5c5c",
              marginTop: 36,
              lineHeight: 1.35,
              maxWidth: 620,
            }}
          >
            One board, your whole campus. Clean slate every Monday.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              color: "#9a9a9a",
              marginTop: 44,
            }}
          >
            onboardapp.org
          </div>
        </div>

        {/* One board card, tilted, bleeding off the right edge. */}
        <div
          style={{
            position: "absolute",
            right: -36,
            top: 96,
            width: 400,
            height: 480,
            display: "flex",
            flexDirection: "column",
            background: "#d2f0ee",
            color: "#111111",
            border: "2px solid rgba(17,17,17,0.12)",
            borderRadius: 40,
            padding: 36,
            transform: "rotate(5deg)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.14)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "ZalandoExpanded",
              fontSize: 32,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            the squirrels are getting bold
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.5,
              color: "rgba(17,17,17,0.55)",
              marginTop: 18,
              flexGrow: 1,
            }}
          >
            one made direct eye contact while i ate a granola bar. i think it
            wanted the bar. i let it win.
          </div>
          <div style={{ display: "flex", marginBottom: 18 }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 600,
                background: "rgba(127,127,127,0.18)",
                padding: "6px 18px",
                borderRadius: 9999,
              }}
            >
              #campus-life
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(17,17,17,0.55)",
            }}
          >
            💀 52&nbsp;&nbsp;·&nbsp;&nbsp;❤️ 18&nbsp;&nbsp;·&nbsp;&nbsp;🫂 2
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "ZalandoExpanded", data: display, style: "normal", weight: 800 },
        { name: "ZalandoSemiExpanded", data: body, style: "normal", weight: 600 },
      ],
    }
  );
}
