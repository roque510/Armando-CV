import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

const GITHUB = "https://github.com/roque510";

type Outcome = { big: string; sub: string };

const MINI_ICONS: ReactNode[] = [
  <g key="1">
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M9 13h6M9 17h4" />
  </g>,
  <path key="2" d="M4 17l6-6-6-6M12 19h8" />,
  <g key="3">
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </g>,
];

const MINI_META = [
  { href: GITHUB, stack: ["LangChain", "Ollama", "OpenAI"] },
  { href: GITHUB, stack: ["TypeScript", "Node"] },
  { href: GITHUB, stack: ["@roque510"] },
];

function Stack({ tokens }: { tokens: string[] }) {
  return (
    <div className="mini-stack">
      {tokens.map((tok, i) => (
        <span key={i}>
          {i > 0 && <span style={{ marginRight: 6 }}>·</span>}
          {tok}
        </span>
      ))}
    </div>
  );
}

export default function Work() {
  const t = useTranslations("Work");
  const fOut = t.raw("forzive.outcomes") as Outcome[];
  const pOut = t.raw("playflow.outcomes") as Outcome[];
  const mini = t.raw("mini") as { title: string; desc: string }[];

  return (
    <section
      className="section"
      id="work"
      style={{ background: "var(--bg-2)", borderTop: "1px solid var(--hairline)" }}
    >
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">
            <span className="tick" />
            {t("eyebrow")}
          </span>
          <h2 className="sec-title" style={{ marginTop: 18 }}>
            {t("title")}
          </h2>
          <p>{t("sub")}</p>
        </Reveal>

        <div className="proj-grid">
          {/* Forzive */}
          <Reveal className="card case-card hoverable">
            <div className="case-media">
              <div className="grid-ov" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/forzive/dashboard.png" alt="Forzive dashboard" loading="lazy" width={560} />
            </div>
            <div className="case-body">
              <div className="case-kick">
                <span className="role">{t("forzive.kick")}</span>
              </div>
              <div className="case-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="lg" src="/assets/forzive-logo.png" alt="Forzive" />
              </div>
              <p className="case-desc">{t("forzive.desc")}</p>
              <div className="outcomes">
                {fOut.map((o, i) => (
                  <div className="outcome" key={i}>
                    <b>{o.big}</b>
                    <span>{o.sub}</span>
                  </div>
                ))}
              </div>
              <div className="case-foot">
                <Link className="btn btn-outline btn-sm stretch" href="/work/forzive">
                  {t("readCase")}
                  <ArrowRightIcon />
                </Link>
                <span className="crumb">
                  <a href="https://forzive.com" target="_blank" rel="noopener noreferrer">
                    forzive.com ↗
                  </a>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Playflow */}
          <Reveal className="card case-card hoverable" delay={1}>
            <div className="case-media">
              <div className="grid-ov" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/playflow/bracket.png" alt="Playflow tournament bracket" loading="lazy" width={560} />
            </div>
            <div className="case-body">
              <div className="case-kick">
                <span className="role">{t("playflow.kick")}</span>
              </div>
              <div className="case-title">Playflow</div>
              <p className="case-desc">{t("playflow.desc")}</p>
              <div className="outcomes">
                {pOut.map((o, i) => (
                  <div className="outcome" key={i}>
                    <b>{o.big}</b>
                    <span>{o.sub}</span>
                  </div>
                ))}
              </div>
              <div className="case-foot">
                <Link className="btn btn-outline btn-sm stretch" href="/work/playflow">
                  {t("readCase")}
                  <ArrowRightIcon />
                </Link>
                <span className="crumb">
                  <a href="https://playflow.games" target="_blank" rel="noopener noreferrer">
                    playflow.games ↗
                  </a>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* mini projects */}
        <div className="mini-grid">
          {MINI_META.map((m, i) => (
            <Reveal
              as="a"
              key={i}
              className="card mini hoverable"
              delay={i === 0 ? undefined : (i as 1 | 2)}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mini-top">
                <span className="mini-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                    {MINI_ICONS[i]}
                  </svg>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="var(--fg-subtle)"
                  strokeWidth={1.7}
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </div>
              <h4>{mini[i].title}</h4>
              <p>{mini[i].desc}</p>
              <Stack tokens={m.stack} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
