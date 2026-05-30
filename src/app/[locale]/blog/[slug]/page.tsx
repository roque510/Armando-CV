import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { POSTS, POST_BY_SLUG } from "@/data/posts";
import ArticleCuttingLlmCosts from "@/components/blog/ArticleCuttingLlmCosts";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    POSTS.filter((p) => p.slug).map((p) => ({ locale, slug: p.slug as string }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!POST_BY_SLUG[slug]) return {};
  const t = await getTranslations({ locale, namespace: "Article" });
  return {
    title: `${t("title")} — Armando Roque`,
    description: t("dek"),
    openGraph: { type: "article", title: t("title"), description: t("dek") },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = POST_BY_SLUG[slug];
  if (!post) notFound();

  // Only one full article exists in this build.
  if (slug === "cutting-llm-costs") return <ArticleCuttingLlmCosts />;
  notFound();
}
