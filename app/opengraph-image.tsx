import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/data/business";

export const alt = `${business.name} — Phones, Laptops, Accessories & Repairs at Circle Mall, Accra`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const toDataUri = (base64: string) => `data:image/png;base64,${base64}`;

export default async function OpengraphImage() {
  const [markFile, wordmarkFile] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo-mark.png"), "base64"),
    readFile(join(process.cwd(), "public/brand/logo-wordmark.png"), "base64"),
  ]);
  const mark = toDataUri(markFile);
  const wordmark = toDataUri(wordmarkFile);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", fontFamily: "sans-serif", background: "#eef4fa" }}>
        <div
          style={{
            width: 470,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            padding: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={300} height={203} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmark} width={380} height={40} alt="" style={{ marginTop: 22 }} />
          <div style={{ display: "flex", alignItems: "center", marginTop: 14, width: 380 }}>
            <div style={{ flex: 1, height: 3, background: "#25c3f4", borderRadius: 3 }} />
            <div style={{ display: "flex", padding: "0 18px", fontSize: 22, letterSpacing: 14, color: "#0c6de2", fontWeight: 700 }}>
              TECH
            </div>
            <div style={{ flex: 1, height: 3, background: "#25c3f4", borderRadius: 3 }} />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            background: "linear-gradient(135deg, #0b468f 0%, #0c6de2 60%, #108bd5 100%)",
            color: "white",
          }}
        >
          <div style={{ display: "flex", fontSize: 58, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Phones, laptops, accessories &amp; repairs
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 28, color: "#a0e5f9" }}>UK used · Brand new · Installment</div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              alignSelf: "flex-start",
              padding: "12px 20px",
              borderRadius: 12,
              background: "#ff8a1f",
              color: "#0f1b2d",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            Circle Mall, Accra — Blue Gate, Gate 2 Exit
          </div>
        </div>
      </div>
    ),
    size,
  );
}
