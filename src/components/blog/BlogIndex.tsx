"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { POSTS, type PostCategory } from "@/data/posts";

type Filter = "all" | PostCategory;

const FILTERS: Filter[] = ["all", "founder", "ai", "fullstack"];
const THEME: Record<PostCategory, string> = {
  founder: "t-founder",
  ai: "t-ai",
  fullstack: "t-fullstack",
};

function useDateFormatter() {
  const locale = useLocale();
  return useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [locale]
  );
}

export default function BlogIndex() {
  const t = useTranslations("Blog");
  const fmt = useDateFormatter();
  const [active, setActive] = useState<Filter>("all");

  const shown = active === "all" ? POSTS : POSTS.filter((p) => p.category === active);

  return (
    <>
      <section className="page-band">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-glow a" />
        </div>
        <div className="wrap page-band-inner">
          <div className="page-back">
            <Link href="/">
              <ArrowLeftIcon />
              {t("backHome")}
            </Link>
          </div>
          <span className="eyebrow">
            <span className="tick" />
            {t("eyebrow")}
          </span>
          <h1 className="page-title">{t("title")}</h1>
          <p>{t("sub")}</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={active === f ? "on" : undefined}
                onClick={() => setActive(f)}
              >
                {t(`filters.${f}`)}
                {f === "all" && <span> {shown.length}</span>}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {shown.map((p, i) => {
              const meta = (
                <>
                  <div className={`post-thumb ${THEME[p.category]}`}>
                    <div className="grid-ov" />
                    <span className="cat">{t(`cat.${p.category}`)}</span>
                    <span className="glyph">{p.glyph}</span>
                  </div>
                  <div className="post-body">
                    <div className="post-meta">
                      <span>{fmt.format(new Date(p.date))}</span>
                      <span className="dot" />
                      <span>{t("minRead", { n: p.readingMinutes })}</span>
                    </div>
                    <h3>{t(`posts.${p.id}.title`)}</h3>
                    <p className="excerpt">{t(`posts.${p.id}.excerpt`)}</p>
                    <div className="post-tags">
                      {p.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="post-read">
                      {t("readArticle")}
                      <ArrowRightIcon />
                    </span>
                  </div>
                </>
              );

              const delay = (i % 3) as 0 | 1 | 2;
              const revealDelay = delay === 0 ? undefined : (delay as 1 | 2);

              return p.slug ? (
                <Reveal
                  as={Link}
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="card post-card hoverable"
                  delay={revealDelay}
                >
                  {meta}
                </Reveal>
              ) : (
                <Reveal key={p.id} className="card post-card hoverable" delay={revealDelay}>
                  {meta}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
