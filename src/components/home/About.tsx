import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

const FACT_ICONS = [
  <path key="1" d="M12 2v4m0 12v4m10-10h-4M6 12H2m15-7-3 3M7 17l-3 3m13 0-3-3M7 7 4 4" />,
  <g key="2">
    <path d="M3 3h18v14H3z" />
    <path d="M3 9h18M8 21h8M12 17v4" />
  </g>,
  <g key="3">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </g>,
  <g key="4">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </g>,
];

export default function About() {
  const t = useTranslations("About");
  const facts = t.raw("facts") as { title: string; sub: string }[];

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="about-grid">
          <Reveal className="about-body">
            <span className="eyebrow">
              <span className="tick" />
              {t("eyebrow")}
            </span>
            <h2 className="sec-title" style={{ margin: "18px 0 24px" }}>
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>
            <p>{t.rich("p1", { strong: (c) => <strong>{c}</strong> })}</p>
            <p>{t.rich("p2", { strong: (c) => <strong>{c}</strong> })}</p>
            <p>{t.rich("p3", { strong: (c) => <strong>{c}</strong> })}</p>
            <p>{t.rich("p4", { strong: (c) => <strong>{c}</strong> })}</p>
          </Reveal>

          <Reveal className="about-aside" delay={1}>
            {facts.map((f, i) => (
              <div className="fact" key={i}>
                <span className="fi">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                  >
                    {FACT_ICONS[i]}
                  </svg>
                </span>
                <div>
                  <b>{f.title}</b>
                  <span>{f.sub}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
