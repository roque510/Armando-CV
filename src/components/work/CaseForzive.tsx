import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";

const EMAIL = "roque09215@gmail.com";
const STACK = ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Vultr", "Cloudflare", "ZKTeco"];

const FEATURE_ICONS: ReactNode[] = [
  <g key="1">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3m4 4v.01M17 21h.01M21 17h.01" />
  </g>,
  <g key="2">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4m8-4v4" />
  </g>,
  <g key="3">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </g>,
  <g key="4">
    <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </g>,
];

const HAIRLINE_BAND = {
  background: "var(--bg-2)",
  borderTop: "1px solid var(--hairline)",
  borderBottom: "1px solid var(--hairline)",
} as const;

export default function CaseForzive() {
  const t = useTranslations("CaseForzive");
  const meta = t.raw("meta") as { k: string; v: string }[];
  const outcomes = t.raw("outcomes") as { big: string; lab: string; sub: string }[];
  const arch = t.raw("arch") as { k: string; bold: string; rest: string }[];
  const features = t.raw("features") as { title: string; desc: string }[];
  const figs = t.raw("figCaptions") as Record<string, string>;

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cs-logo" src="/assets/forzive-logo.png" alt="Forzive" />
          <h1 className="cs-title">{t("title")}</h1>
          <p className="cs-dek">{t("dek")}</p>
          <div className="cs-links">
            <a className="btn btn-primary" href="https://forzive.com" target="_blank" rel="noopener noreferrer">
              {t("visit")}
              <ArrowUpRightIcon />
            </a>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>
              {t("ask")}
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

      {/* Outcomes */}
      <section className="section tight">
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
      <section className="section tight" style={HAIRLINE_BAND}>
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

      {/* Screenshot */}
      <section className="section tight">
        <div className="wrap">
          <Reveal as="figure" className="cs-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/forzive/dashboard.png" alt="Forzive dashboard" loading="lazy" />
            <figcaption>{figs.dashboard}</figcaption>
          </Reveal>
        </div>
      </section>

      {/* Architecture */}
      <section className="section tight" style={HAIRLINE_BAND}>
        <div className="wrap">
          <div className="cs-section" style={{ marginBottom: 28 }}>
            <span className="eyebrow">
              <span className="tick" />
              {t("archEyebrow")}
            </span>
            <h2 style={{ marginTop: 14 }}>{t("archTitle")}</h2>
            <p>{t("archIntro")}</p>
          </div>
          <div className="arch-list">
            {arch.map((a, i) => (
              <Reveal className="arch-row" key={i}>
                <div className="k">{a.k}</div>
                <div className="v">
                  <b>{a.bold}</b> — {a.rest}
                </div>
              </Reveal>
            ))}
          </div>
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

      {/* Screenshot grid */}
      <section className="section tight" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--hairline)" }}>
        <div className="wrap">
          <div className="proj-grid" style={{ gap: 24 }}>
            <Reveal as="figure" className="cs-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/forzive/schedule.png" alt="Forzive class schedule" loading="lazy" />
              <figcaption>{figs.schedule}</figcaption>
            </Reveal>
            <Reveal as="figure" className="cs-figure" delay={1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/forzive/plans.png" alt="Forzive membership plans" loading="lazy" />
              <figcaption>{figs.plans}</figcaption>
            </Reveal>
          </div>
          <div style={{ marginTop: 24 }}>
            <Reveal as="figure" className="cs-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/forzive/progress.png" alt="Forzive athlete progress charts" loading="lazy" />
              <figcaption>{figs.progress}</figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stack + next */}
      <section className="section tight">
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
            <Link className="btn btn-outline" href="/work/playflow">
              {t("nextCta")}
              <ArrowRightIcon />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
