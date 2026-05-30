import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";

const STACK = ["Next.js", "TypeScript", "Node", "PostgreSQL", "Real-time", "Vercel"];

const FEATURE_ICONS: ReactNode[] = [
  <g key="1">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6M22 11h-6" />
  </g>,
  <path key="2" d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V3M9 21h6M12 18v3M3 6h3M18 6h3" />,
  <path key="3" d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  <g key="4">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4m8-4v4M8 14h.01M12 14h.01M16 14h.01" />
  </g>,
];

const HAIRLINE_BAND = {
  background: "var(--bg-2)",
  borderTop: "1px solid var(--hairline)",
  borderBottom: "1px solid var(--hairline)",
} as const;

export default function CasePlayflow() {
  const t = useTranslations("CasePlayflow");
  const meta = t.raw("meta") as { k: string; v: string }[];
  const outcomes = t.raw("outcomes") as { big: string; lab: string; sub: string }[];
  const features = t.raw("features") as { title: string; desc: string }[];

  return (
    <>
      <section className="cs-hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-glow a" />
        </div>
        <div className="wrap cs-inner">
          <div className="page-back" style={{ marginBottom: 6 }}>
            <Link href="/#work">
              <ArrowLeftIcon />
              {t("back")}
            </Link>
          </div>
          <span className="cs-tag">{t("tag")}</span>
          <h1 className="cs-title" style={{ marginTop: 14 }}>
            Playflow
          </h1>
          <p className="cs-dek">{t("dek")}</p>
          <div className="cs-links">
            <a className="btn btn-primary" href="https://playflow.games" target="_blank" rel="noopener noreferrer">
              {t("openApp")}
              <ArrowUpRightIcon />
            </a>
            <a className="btn btn-ghost" href="https://playflow-games.com" target="_blank" rel="noopener noreferrer">
              playflow-games.com
            </a>
          </div>
          <div className="cs-meta-strip">
            {meta.map((m, i) => (
              <div className="cs-meta-cell" key={i}>
                <div className="k">{m.k}</div>
                <div className="v">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App banner — live scoring */}
      <section className="section tight">
        <div className="wrap">
          <Reveal className="pf-banner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/playflow/banner.png"
              alt="Playflow live scoring — tournament matches updating in real time"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section tight" style={HAIRLINE_BAND}>
        <div className="wrap">
          <span className="eyebrow">
            <span className="tick" />
            {t("outcomesEyebrow")}
          </span>
          <h2 className="sec-title" style={{ margin: "16px 0 32px" }}>
            {t("outcomesTitle")}
          </h2>
          <div className="cs-outcomes">
            {outcomes.map((o, i) => (
              <Reveal className="cs-outcome" key={i} delay={i === 0 ? undefined : (i as 1 | 2)}>
                <div className="big">{o.big}</div>
                <div className="lab">{o.lab}</div>
                <div className="sub">{o.sub}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section tight">
        <div className="wrap">
          <div className="cs-section">
            <span className="eyebrow">
              <span className="tick" />
              {t("problemEyebrow")}
            </span>
            <h2 style={{ marginTop: 14 }}>{t("problemTitle")}</h2>
            <p>{t("problemP1")}</p>
            <p>{t.rich("problemP2", { strong: (c) => <strong>{c}</strong> })}</p>
          </div>
        </div>
      </section>

      {/* Living bracket */}
      <section className="section tight" style={HAIRLINE_BAND}>
        <div className="wrap">
          <div className="cs-section" style={{ marginBottom: 30 }}>
            <span className="eyebrow">
              <span className="tick" />
              {t("bracketEyebrow")}
            </span>
            <h2 style={{ marginTop: 14 }}>{t("bracketTitle")}</h2>
          </div>
          <Reveal as="figure" className="cs-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/playflow/bracket.png"
              alt="Playflow single-elimination bracket — quarterfinals through the final"
              loading="lazy"
            />
            <figcaption>{t("bracketCaption")}</figcaption>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section tight">
        <div className="wrap">
          <div className="cs-section" style={{ marginBottom: 28 }}>
            <span className="eyebrow">
              <span className="tick" />
              {t("featuresEyebrow")}
            </span>
            <h2 style={{ marginTop: 14 }}>{t("featuresTitle")}</h2>
          </div>
          <div className="feature-list">
            {features.map((f, i) => (
              <Reveal className="feature" key={i} delay={i % 2 === 1 ? 1 : undefined}>
                <span className="fi">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                    {FEATURE_ICONS[i]}
                  </svg>
                </span>
                <div>
                  <b>{f.title}</b>
                  <span>{f.desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack + next */}
      <section className="section tight" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--hairline)" }}>
        <div className="wrap">
          <div className="cs-section" style={{ marginBottom: 22 }}>
            <span className="eyebrow">
              <span className="tick" />
              {t("stackEyebrow")}
            </span>
            <h2 style={{ marginTop: 14 }}>{t("stackTitle")}</h2>
          </div>
          <div className="cs-stack" style={{ marginBottom: 48 }}>
            {STACK.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <Reveal className="cs-next">
            <div>
              <div className="lbl">{t("nextLbl")}</div>
              <h3>{t("nextTitle")}</h3>
            </div>
            <Link className="btn btn-outline" href="/work/forzive">
              {t("nextCta")}
              <ArrowRightIcon />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
