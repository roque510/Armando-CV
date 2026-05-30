import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

type Meta = { period: string; lead?: boolean; founder?: boolean; stack: string[] };
type Item = { role: string; company: string; companyDesc: string; desc: string };

const META: Meta[] = [
  {
    period: "2022 — Present",
    lead: true,
    founder: true,
    stack: ["Next.js 14", "Prisma", "PostgreSQL", "Stripe", "Vultr", "Cloudflare"],
  },
  {
    period: "2021 — Present",
    founder: true,
    stack: ["Next.js", "TypeScript", "Node", "PostgreSQL"],
  },
  { period: "2021 — 2023", stack: ["React", "Node", "PostgreSQL", "AWS"] },
  { period: "2019 — 2021", stack: ["React", "React Native", "GraphQL", "Firebase"] },
  { period: "2018 — 2019", stack: ["React", "Node", "Twilio"] },
  { period: "2011 — 2018", stack: ["C#", "Angular", "Vue", "SQL"] },
];

export default function Experience() {
  const t = useTranslations("Experience");
  const items = t.raw("items") as Item[];

  return (
    <section className="section" id="experience">
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

        <div className="timeline">
          {META.map((m, i) => {
            const item = items[i];
            const delay = i === 0 ? undefined : (Math.min(i, 2) as 1 | 2);
            return (
              <Reveal
                key={i}
                className={`tl-item${m.lead ? " lead" : ""}`}
                delay={delay}
              >
                <span className="tl-dot" />
                <div className="tl-meta">
                  <span className="tl-period">{m.period}</span>
                  {m.founder && <span className="tl-badge">{t("founderBadge")}</span>}
                </div>
                <div className="tl-role">{item.role}</div>
                <div className="tl-company">
                  <b>{item.company}</b> — {item.companyDesc}
                </div>
                <p className="tl-desc">{item.desc}</p>
                <div className="tl-stack">
                  {m.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
