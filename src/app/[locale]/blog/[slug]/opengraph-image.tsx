import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { getArticleBody } from "@/content";
import { POST_BY_SLUG } from "@/data/posts";
import { SITE_URL } from "@/config/seo";

export const alt = "Article — Armando Roque";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#080b11";
const ACCENT = "#22d3ee";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = POST_BY_SLUG[slug];
  const body = getArticleBody(slug, locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const title = body?.title ?? "Armando Roque";
  const category = post ? t(`cat.${post.category}`) : "Blog";
  const host = SITE_URL.replace(/^https?:\/\//, "");

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
            "radial-gradient(1200px 600px at 15% 0%, rgba(6,182,212,0.18), transparent 60%)",
          padding: 72,
          color: "#e7edf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ACCENT,
              fontWeight: 600,
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.06,
              color: "#ffffff",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#021016",
                fontSize: 24,
                fontWeight: 800,
                backgroundImage: "linear-gradient(135deg, #22d3ee, #06b6d4 60%, #155e75)",
              }}
            >
              AR
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
              Armando Roque
            </div>
          </div>
          <span style={{ fontSize: 22, color: "#687587" }}>{host}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
