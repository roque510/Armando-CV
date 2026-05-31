"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon, DownloadIcon } from "@/components/ui/icons";

const EMAIL = "roque09215@gmail.com";
const RESUME = "/Armando-Roque-Resume-2026.pdf";
const RESUME_NAME = "Armando Roque - Resume 2026.pdf";
const CORE_STACK = ["Next.js", "TypeScript", "Node", "PostgreSQL", "AWS"];

type Stat = { pre: string; unit: string; post: string; lab: string; sub: string };

function TypedRoles({ roles }: { roles: string[] }) {
  const [text, setText] = useState(roles[0] ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || roles.length === 0) {
      setText(roles[0] ?? "");
      return;
    }

    let ri = 0;
    let ci = 0;
    let deleting = false;

    const tick = () => {
      const word = roles[ri];
      if (!deleting) {
        ci++;
        if (ci > word.length) {
          deleting = true;
          timer.current = setTimeout(tick, 1500);
          return;
        }
      } else {
        ci--;
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      setText(word.slice(0, ci));
      timer.current = setTimeout(tick, deleting ? 38 : 72);
    };

    timer.current = setTimeout(tick, 700);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [roles]);

  return (
    <div
      className="hero-roles mono"
      style={{
        marginTop: 20,
        fontSize: 14,
        color: "var(--accent-bright)",
        letterSpacing: "0.04em",
      }}
    >
      <span>{text}</span>
      <span className="type-cursor">|</span>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("Hero");
  const roles = t.raw("roles") as string[];
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow a" />
        <div className="hero-glow b" />
      </div>
      <div className="wrap hero-inner">
        <div className="hero-layout">
          <div className="hero-copy">
            <span className="avail">
              <span className="avail-dot" />
              {t("available")}
            </span>

            <TypedRoles roles={roles} />

            <h1 className="hero-headline">
              {t("headlineLead")}
              <br />
              <span className="ink-grad">{t("headlineInk")}</span>
            </h1>

            <p className="hero-sub">
              {t.rich("sub", { strong: (c) => <strong>{c}</strong> })}
            </p>

            <div className="looking">
              <span className="tag">{t("lookingTag")}</span>
              <span>{t.rich("lookingText", { b: (c) => <b>{c}</b> })}</span>
            </div>

            <div className="hero-ctas">
              <a
                className="btn btn-primary btn-lg"
                href={`mailto:${EMAIL}`}
                data-evt="contact_email"
              >
                {t("letsTalk")}
                <ArrowRightIcon />
              </a>
              <Link className="btn btn-ghost btn-lg" href="/blog">
                {t("readBlog")}
              </Link>
              <a
                className="btn btn-outline btn-lg"
                href={RESUME}
                download={RESUME_NAME}
                data-evt="resume_download"
              >
                <DownloadIcon />
                {t("downloadResume")}
              </a>
            </div>
          </div>

          {/* recruiter dossier */}
          <div className="hero-aside dossier-aside">
            <div className="dossier">
              <div className="dossier-head">
                <span className="mono">candidate.json</span>
                <span className="live">
                  <span className="d" />
                  {t("dossierAvailable")}
                </span>
              </div>
              <div className="dossier-rows">
                <div className="drow">
                  <span className="k">{t("d_role_k")}</span>
                  <span className="v">{t.rich("d_role_v", { b: (c) => <b>{c}</b> })}</span>
                </div>
                <div className="drow">
                  <span className="k">{t("d_seniority_k")}</span>
                  <span className="v">
                    {t.rich("d_seniority_v", { b: (c) => <b>{c}</b> })}
                  </span>
                </div>
                <div className="drow">
                  <span className="k">{t("d_avail_k")}</span>
                  <span className="v">
                    <span className="pill">
                      <span className="status-dot" style={{ width: 13, height: 13 }} />
                      {t("d_avail_v")}
                    </span>
                  </span>
                </div>
                <div className="drow">
                  <span className="k">{t("d_tz_k")}</span>
                  <span className="v">{t.rich("d_tz_v", { b: (c) => <b>{c}</b> })}</span>
                </div>
                <div className="drow">
                  <span className="k">{t("d_loc_k")}</span>
                  <span className="v">{t("d_loc_v")}</span>
                </div>
                <div className="drow">
                  <span className="k">{t("d_lang_k")}</span>
                  <span className="v">
                    {t.rich("d_lang_v", {
                      subtle: (c) => <span className="subtle">{c}</span>,
                    })}
                  </span>
                </div>
                <div className="drow">
                  <span className="k">{t("d_stack_k")}</span>
                  <span className="v">
                    <span className="dchips">
                      {CORE_STACK.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* stat callouts */}
        <div className="stats row" style={{ marginTop: 48 }}>
          {stats.map((s, i) => (
            <Reveal key={i} className="stat" delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="num">
                {s.pre}
                {s.unit && <span className="u">{s.unit}</span>}
                {s.post}
              </div>
              <div className="lab">{s.lab}</div>
              <div className="sub">{s.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
