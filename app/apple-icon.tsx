import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1015",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path
            d="M7 11.5 11.2 23 16 14.2 20.8 23 25 11.5"
            fill="none"
            stroke="#3dd1ec"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="8" r="1.6" fill="#7fe3f5" />
          <circle cx="16" cy="10.4" r="1.6" fill="#3dd1ec" />
          <circle cx="25" cy="8" r="1.6" fill="#12b5d6" />
        </svg>
      </div>
    ),
    size,
  );
}
