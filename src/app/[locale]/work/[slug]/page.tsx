import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildAlternates, localizedUrl, SITE_NAME, AUTHOR } from "@/config/seo";
import CaseForzive from "@/components/work/CaseForzive";
import CasePlayflow from "@/components/work/CasePlayflow";

const CASES = ["forzive", "playflow"] as const;
type CaseSlug = (typeof CASES)[number];

const NAMESPACE: Record<CaseSlug, string> = {
  forzive: "CaseForzive",
  playflow: "CasePlayflow",
};

const EXTERNAL: Record<CaseSlug, string> = {
  forzive: "https://forzive.com",
  playflow: "https://playflow.games",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CASES.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!CASES.includes(slug as CaseSlug)) return {};
  const t = await getTranslations({ locale, namespace: NAMESPACE[slug as CaseSlug] });
  const path = `/work/${slug}`;
  return {
    title: `${t("metaTitle")} — ${SITE_NAME}`,
    description: t("dek"),
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: "article",
      title: t("metaTitle"),
      description: t("dek"),
      url: localizedUrl(locale, path),
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t("metaTitle"), description: t("dek") },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!CASES.includes(slug as CaseSlug)) notFound();

  const t = await getTranslations({ locale, namespace: NAMESPACE[slug as CaseSlug] });
  const url = localizedUrl(locale, `/work/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: t("metaTitle"),
    description: t("dek"),
    url: EXTERNAL[slug as CaseSlug],
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.github },
    creator: { "@type": "Person", name: AUTHOR.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {slug === "forzive" ? <CaseForzive /> : <CasePlayflow />}
    </>
  );
}
