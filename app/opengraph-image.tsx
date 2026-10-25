import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Adee Shaikh | Software Developer & Product Builder";

export default function OpenGraphImage() {
  const iconPath = path.join(process.cwd(), "app", "apple-icon.png");
  const iconBase64 = fs.readFileSync(iconPath).toString("base64");
  const iconSrc = `data:image/png;base64,${iconBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0d0e12",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(22, 119, 255, 0.12) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(70, 76, 92, 0.18) 0%, transparent 60%)",
          color: "#f0f0ed",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "15px",
                letterSpacing: "3px",
                color: "#1677ff",
                fontWeight: 700,
              }}
            >
              ITSADEE.COM
            </span>
            <span style={{ color: "#464c5c", fontSize: "16px" }}>/</span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#8a8f9e",
                textTransform: "uppercase",
              }}
            >
              Dossier & Engineering
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(52, 199, 89, 0.3)",
              backgroundColor: "rgba(52, 199, 89, 0.08)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#34c759",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#34c759",
                letterSpacing: "1px",
              }}
            >
              AVAILABLE FOR NEW WORK
            </span>
          </div>
        </div>

        {/* Center Main Hero */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Avatar Squircle */}
          <img
            src={iconSrc}
            width={144}
            height={144}
            alt="Adee Shaikh"
            style={{
              borderRadius: "34px",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.7)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                margin: 0,
                color: "#ffffff",
                lineHeight: 1.05,
              }}
            >
              Adee Shaikh
            </h1>
            <p
              style={{
                fontSize: "26px",
                color: "#b0b4c2",
                margin: 0,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Software developer & product-minded builder
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#e2e4ea",
                  fontWeight: 500,
                }}
              >
                Native macOS · Swift
              </span>
              <span
                style={{
                  fontSize: "13px",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#e2e4ea",
                  fontWeight: 500,
                }}
              >
                Full-Stack · Next.js · TypeScript
              </span>
              <span
                style={{
                  fontSize: "13px",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#e2e4ea",
                  fontWeight: 500,
                }}
              >
                Web3 · Solidity
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: "14px",
              color: "#8a8f9e",
            }}
          >
            <span>Fettle (macOS)</span>
            <span>·</span>
            <span>StandBy (Web)</span>
            <span>·</span>
            <span>DeFile (Web3)</span>
            <span>·</span>
            <span>Case Studies & Writing</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#b0b4c2",
            }}
          >
            <span>@hey_itsadee</span>
            <span style={{ color: "#464c5c" }}>/</span>
            <span>github.com/adee1455</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
