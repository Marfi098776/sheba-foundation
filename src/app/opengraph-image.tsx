import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/content/site";

export const runtime = "nodejs";

/**
 * Default Open Graph image generator.
 *
 * Generates a professional social card using only verified brand information:
 * - Organization name: "Canadian Sheba Foundation"
 * - Tagline: "Serving Communities, Supporting Dreams, Creating Opportunities."
 *
 * Does not invent charity claims, statistics, registration numbers, or slogans.
 * Uses design tokens from the project's color system.
 */

const WIDTH = 1200;
const HEIGHT = 630;

// Colors derived from design tokens in globals.css
const PRIMARY = "#4A6F8A"; // oklch(0.44 0.072 208)
const BACKGROUND = "#FEFDF8"; // oklch(0.995 0.002 90)
const FOREGROUND = "#364052"; // oklch(0.21 0.025 235)
const MUTED = "#7A8592"; // oklch(0.44 0.02 225)

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundColor: BACKGROUND,
          color: FOREGROUND,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "900px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Organization name */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              color: FOREGROUND,
            }}
          >
            {SITE_NAME}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              lineHeight: 1.4,
              color: MUTED,
              marginBottom: "48px",
            }}
          >
            {SITE_TAGLINE}
          </div>

          {/* Divider */}
          <div
            style={{
              width: "120px",
              height: "3px",
              backgroundColor: PRIMARY,
              margin: "0 auto 48px",
              borderRadius: "2px",
            }}
          />

          {/* Bottom attribution */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: PRIMARY,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Official Website
          </div>
        </div>

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: PRIMARY,
          }}
        />

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: PRIMARY,
          }}
        />
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    }
  );
}