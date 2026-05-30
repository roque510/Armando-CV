import type { Article, ArticleBody } from "./types";
import cuttingLlmCosts from "./articles/cutting-llm-costs";
import multiTenantSaasSolo from "./articles/multi-tenant-saas-solo";
import subdomainsNextjs from "./articles/subdomains-nextjs";
import privateRagOllama from "./articles/private-rag-ollama";
import stripeBillingSaas from "./articles/stripe-billing-saas";
import typeSafeEndToEnd from "./articles/type-safe-end-to-end";

const LIST: Article[] = [
  cuttingLlmCosts,
  multiTenantSaasSolo,
  subdomainsNextjs,
  privateRagOllama,
  stripeBillingSaas,
  typeSafeEndToEnd,
];

const ARTICLES: Record<string, Article> = Object.fromEntries(
  LIST.map((a) => [a.slug, a])
);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES[slug];
}

export function getArticleBody(slug: string, locale: string): ArticleBody | undefined {
  const a = ARTICLES[slug];
  if (!a) return undefined;
  return locale === "es" ? a.es : a.en;
}
