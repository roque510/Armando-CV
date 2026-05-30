import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeftIcon } from "@/components/ui/icons";
import ReadingProgress from "./ReadingProgress";

const EMAIL = "roque09215@gmail.com";

const rich = {
  strong: (c: React.ReactNode) => <strong>{c}</strong>,
  em: (c: React.ReactNode) => <em>{c}</em>,
  code: (c: React.ReactNode) => <code>{c}</code>,
};

function CodeBlock({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div className="code-block">
      <div className="code-head">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="fname">{filename}</span>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function ArticleCuttingLlmCosts() {
  const t = useTranslations("Article");

  return (
    <>
      <ReadingProgress />
      <div className="wrap">
        <article className="article">
          <div className="article-head">
            <div className="page-back" style={{ marginBottom: 18 }}>
              <Link href="/blog">
                <ArrowLeftIcon />
                {t("backAll")}
              </Link>
            </div>
            <span className="article-cat">{t("category")}</span>
            <h1 className="article-title">{t("title")}</h1>
            <p className="article-dek">{t("dek")}</p>
            <div className="article-meta">
              <span className="au">
                <span className="av">AR</span> <b>Armando Roque</b>
              </span>
              <span>{t("date")}</span>
              <span>· {t("readTime")}</span>
              <span className="article-tags-row">
                <span>#LLM</span>
                <span>#OpenAI</span>
                <span>#Ollama</span>
              </span>
            </div>
          </div>

          <div className="prose">
            <p>{t.rich("p_intro", rich)}</p>
            <p>{t("p_three_habits")}</p>

            <h2>{t("h_cache")}</h2>
            <p>{t("p_cache_1")}</p>
            <p>{t.rich("p_cache_2", rich)}</p>

            <CodeBlock filename="llm/cache.ts">
              <span className="tok-com">{t("code_cache_comment")}</span>
              {"\n"}
              <span className="tok-kw">async function</span>{" "}
              <span className="tok-fn">cachedComplete</span>(
              <span className="tok-pn">prompt</span>: <span className="tok-ty">string</span>) {"{"}
              {"\n  "}
              <span className="tok-kw">const</span> embedding = <span className="tok-kw">await</span>{" "}
              <span className="tok-fn">embed</span>(prompt);
              {"\n  "}
              <span className="tok-kw">const</span> hit = <span className="tok-kw">await</span>{" "}
              vectors.<span className="tok-fn">search</span>(embedding, {"{"} threshold:{" "}
              <span className="tok-num">0.96</span> {"}"});
              {"\n  "}
              <span className="tok-kw">if</span> (hit) <span className="tok-kw">return</span>{" "}
              hit.answer;          <span className="tok-com">{t("code_cache_hit")}</span>
              {"\n\n  "}
              <span className="tok-kw">const</span> answer = <span className="tok-kw">await</span>{" "}
              <span className="tok-fn">complete</span>(prompt);
              {"\n  "}
              <span className="tok-kw">await</span> vectors.<span className="tok-fn">put</span>
              (embedding, answer);
              {"\n  "}
              <span className="tok-kw">return</span> answer;
              {"\n"}
              {"}"}
            </CodeBlock>

            <p>{t("p_cache_3")}</p>

            <h2>{t("h_route")}</h2>
            <p>{t("p_route_1")}</p>
            <p>{t.rich("p_route_2", rich)}</p>

            <CodeBlock filename="llm/router.ts">
              <span className="tok-kw">type</span> <span className="tok-ty">Tier</span> ={" "}
              <span className="tok-str">&quot;local&quot;</span> |{" "}
              <span className="tok-str">&quot;small&quot;</span> |{" "}
              <span className="tok-str">&quot;frontier&quot;</span>;
              {"\n\n"}
              <span className="tok-kw">const</span> MODELS: <span className="tok-ty">Record</span>
              &lt;<span className="tok-ty">Tier</span>, <span className="tok-ty">string</span>&gt; ={" "}
              {"{"}
              {"\n  "}
              local:    <span className="tok-str">&quot;llama3:8b&quot;</span>,        {" "}
              <span className="tok-com">{t("code_route_local")}</span>
              {"\n  "}
              small:    <span className="tok-str">&quot;gpt-4o-mini&quot;</span>,
              {"\n  "}
              frontier: <span className="tok-str">&quot;gpt-4o&quot;</span>,
              {"\n"}
              {"}"};
              {"\n\n"}
              <span className="tok-kw">async function</span>{" "}
              <span className="tok-fn">route</span>(<span className="tok-pn">task</span>:{" "}
              <span className="tok-ty">Task</span>): <span className="tok-ty">Promise</span>&lt;
              <span className="tok-ty">Tier</span>&gt; {"{"}
              {"\n  "}
              <span className="tok-kw">if</span> (task.kind ==={" "}
              <span className="tok-str">&quot;classify&quot;</span> || task.kind ==={" "}
              <span className="tok-str">&quot;extract&quot;</span>) <span className="tok-kw">return</span>{" "}
              <span className="tok-str">&quot;local&quot;</span>;
              {"\n  "}
              <span className="tok-kw">if</span> (task.tokens &lt;{" "}
              <span className="tok-num">800</span> &amp;&amp; !task.needsReasoning){" "}
              <span className="tok-kw">return</span> <span className="tok-str">&quot;small&quot;</span>;
              {"\n  "}
              <span className="tok-kw">return</span>{" "}
              <span className="tok-str">&quot;frontier&quot;</span>;
              {"\n"}
              {"}"}
            </CodeBlock>

            <div className="callout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M12 16v-4m0-4h.01" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <div>{t.rich("callout", rich)}</div>
            </div>

            <h2>{t("h_rightsize")}</h2>
            <p>{t.rich("p_rightsize_1", rich)}</p>
            <ul>
              <li>{t.rich("li_1", rich)}</li>
              <li>{t.rich("li_2", rich)}</li>
              <li>{t.rich("li_3", rich)}</li>
            </ul>

            <blockquote>{t("blockquote")}</blockquote>

            <h2>{t("h_together")}</h2>
            <p>{t.rich("p_together_1", rich)}</p>
            <p>{t("p_together_2")}</p>
          </div>

          <div className="article-foot">
            <span className="crumb">
              <Link href="/blog">← {t("moreArticles")}</Link>
            </span>
            <a className="btn btn-primary btn-sm" href={`mailto:${EMAIL}`}>
              {t("footCta")}
            </a>
          </div>
        </article>
      </div>
    </>
  );
}
