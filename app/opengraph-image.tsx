import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#090909", color: "#eeeeea", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px", fontFamily: "sans-serif" }}>
      <div style={{ color: "#1677ff", fontSize: 24, letterSpacing: 2 }}>ITSADEE / PORTFOLIO</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div style={{ fontFamily: "serif", fontSize: 92, lineHeight: 1 }}>Adee Shaikh</div><div style={{ color: "#b6b6b0", fontSize: 32 }}>Software developer · product-minded builder</div></div>
      <div style={{ color: "#b6b6b0", fontSize: 24 }}>Web · native macOS · Web3</div>
    </div>,
    size,
  );
}
