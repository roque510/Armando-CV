import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/config/seo";

export const alt = "Armando Roque — Full Stack Engineer & SaaS Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#080b11";
const ACCENT = "#22d3ee";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });
  const tf = await getTranslations({ locale, namespace: "Footer" });
  const host = SITE_URL.replace(/^https?:\/\//, "");
  const headline = `${t("headlineLead")} ${t("headlineInk")}`.replace(/‑/g, "-");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          backgroundImage:
            "radial-gradient(1200px 600px at 80% 0%, rgba(6,182,212,0.18), transparent 60%)",
          padding: 72,
          color: "#e7edf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#021016",
              fontSize: 32,
              fontWeight: 800,
              backgroundImage: "linear-gradient(135deg, #22d3ee, #06b6d4 60%, #155e75)",
            }}
          >
            AR
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#ffffff" }}>
              Armando Roque
            </div>
            <div style={{ fontSize: 20, color: ACCENT, letterSpacing: 3 }}>
              ENGINEER · FOUNDER
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.04,
              color: "#ffffff",
              maxWidth: 1000,
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: 28, color: "#97a4b6" }}>{tf("role")}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#687587",
          }}
        >
          <span>{host}</span>
          <span style={{ color: ACCENT }}>{t("available")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
