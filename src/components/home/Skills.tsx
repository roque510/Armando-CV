import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

type Chip = { name: string; key?: boolean };
type Group = { id: string; icon: ReactNode; chips: Chip[] };

const GROUPS: Group[] = [
  {
    id: "frontend",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M3 8h18M8 21h8" />
      </>
    ),
    chips: [
      { name: "Next.js", key: true },
      { name: "React", key: true },
      { name: "React Native" },
      { name: "Vue" },
      { name: "Angular" },
      { name: "TypeScript", key: true },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01" />
      </>
    ),
    chips: [
      { name: "Node.js", key: true },
      { name: "Python", key: true },
      { name: "C#" },
      { name: "GraphQL" },
      { name: "Prisma" },
      { name: "PostgreSQL", key: true },
      { name: "REST APIs" },
    ],
  },
  {
    id: "ai",
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
      </>
    ),
    chips: [
      { name: "LangChain", key: true },
      { name: "Ollama" },
      { name: "LLaMA 3" },
      { name: "OpenAI", key: true },
      { name: "RAG pipelines" },
    ],
  },
  {
    id: "infra",
    icon: <path d="M17 16a4 4 0 0 0 0-8 6 6 0 0 0-11.5-2A4.5 4.5 0 0 0 6 16h11Z" />,
    chips: [
      { name: "AWS", key: true },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Firebase" },
      { name: "Cloudflare" },
      { name: "Stripe" },
      { name: "Twilio" },
    ],
  },
];

export default function Skills() {
  const t = useTranslations("Skills");

  return (
    <section
      className="section tight"
      id="skills"
      style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
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
        <div className="skills-grid">
          {GROUPS.map((g, i) => (
            <Reveal className="skill-group" key={g.id} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="skill-group-head">
                <span className="gi">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                    {g.icon}
                  </svg>
                </span>
                <h3>{t(`groups.${g.id}`)}</h3>
                <span className="ct">{g.chips.length}</span>
              </div>
              <div className="chips">
                {g.chips.map((c) => (
                  <span className={`chip${c.key ? " key" : ""}`} key={c.name}>
                    {c.name}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
