import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CaseForzive from "@/components/work/CaseForzive";
import CasePlayflow from "@/components/work/CasePlayflow";

const CASES = ["forzive", "playflow"] as const;
type CaseSlug = (typeof CASES)[number];

const NAMESPACE: Record<CaseSlug, string> = {
  forzive: "CaseForzive",
  playflow: "CasePlayflow",
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
  return {
    title: `${t("metaTitle")} — Armando Roque`,
    description: t("dek"),
    openGraph: { title: t("metaTitle"), description: t("dek") },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (slug === "forzive") return <CaseForzive />;
  if (slug === "playflow") return <CasePlayflow />;
  notFound();
}
