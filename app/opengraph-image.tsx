import { ImageResponse } from "next/og";
import { business } from "@/data/business";

export const alt = `${business.name} — Phones, Laptops, Accessories & Repairs in Accra, Ghana`;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 10%, rgba(18,181,214,0.35), transparent 55%), #07090c",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#0c1015",
              border: "2px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 32 32">
              <path
                d="M7 11.5 11.2 23 16 14.2 20.8 23 25 11.5"
                fill="none"
                stroke="#3dd1ec"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="8" r="1.5" fill="#7fe3f5" />
              <circle cx="16" cy="10.4" r="1.5" fill="#3dd1ec" />
              <circle cx="25" cy="8" r="1.5" fill="#12b5d6" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            WaterKings<span style={{ color: "#3dd1ec" }}>Tech</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            <span>Your Next Device.</span>
            <span style={{ color: "#b9f1fb" }}>Your Trusted Tech Partner.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9aa4b1" }}>
            Phones • Laptops • Accessories • Repairs — Circle Mall, Accra
          </div>
        </div>
      </div>
    ),
    size,
  );
}
