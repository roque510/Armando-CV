import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { highlight } from "@/content/highlight";
import type { ArticleBody, Block, Inline } from "@/content/types";
import type { PostMeta } from "@/data/posts";
import ReadingProgress from "./ReadingProgress";

const EMAIL = "roque09215@gmail.com";

/** Tiny inline markdown: **bold**, `code`, _em_, [text](url). */
function parseInline(text: Inline): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))|(_[^_]+_)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("`")) {
      nodes.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("**")) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("[")) {
      const mm = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok);
      if (mm) {
        const external = /^https?:/.test(mm[2]);
        nodes.push(
          <a
            key={key++}
            href={mm[2]}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {mm[1]}
          </a>
        );
      }
    } else if (tok.startsWith("_")) {
      nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function CalloutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M12 16v-4m0-4h.01" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function renderBlock(block: Block, i: number): ReactNode {
  switch (block.t) {
    case "p":
      return <p key={i}>{parseInline(block.text)}</p>;
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((it, j) => (
            <li key={j}>{parseInline(it)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {block.items.map((it, j) => (
            <li key={j}>{parseInline(it)}</li>
          ))}
        </ol>
      );
    case "quote":
      return <blockquote key={i}>{parseInline(block.text)}</blockquote>;
    case "callout":
      return (
        <div className="callout" key={i}>
          <CalloutIcon />
          <div>{parseInline(block.text)}</div>
        </div>
      );
    case "code":
      return (
        <div className="code-block" key={i}>
          <div className="code-head">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="fname">{block.file}</span>
          </div>
          <pre>
            <code>{highlight(block.code, block.lang)}</code>
          </pre>
        </div>
      );
  }
}

export default function Article({
  post,
  body,
  locale,
}: {
  post: PostMeta;
  body: ArticleBody;
  locale: string;
}) {
  const t = useTranslations("Blog");
  const dateLabel = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  return (
    <>
      <ReadingProgress />
      <div className="wrap">
        <article className="article">
          <div className="article-head">
            <div className="page-back" style={{ marginBottom: 18 }}>
              <Link href="/blog">
                <ArrowLeftIcon />
                {t("articleBack")}
              </Link>
            </div>
            <span className="article-cat">{t(`cat.${post.category}`)}</span>
            <h1 className="article-title">{body.title}</h1>
            <p className="article-dek">{body.dek}</p>
            <div className="article-meta">
              <span className="au">
                <span className="av">AR</span> <b>Armando Roque</b>
              </span>
              <span>{dateLabel}</span>
              <span>· {t("minRead", { n: post.readingMinutes })}</span>
              <span className="article-tags-row">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </span>
            </div>
          </div>

          <div className="prose">{body.blocks.map(renderBlock)}</div>

          <div className="article-foot">
            <span className="crumb">
              <Link href="/blog">← {t("articleMore")}</Link>
            </span>
            <a className="btn btn-primary btn-sm" href={`mailto:${EMAIL}`}>
              {t("articleCta")}
            </a>
          </div>
        </article>
      </div>
    </>
  );
}
