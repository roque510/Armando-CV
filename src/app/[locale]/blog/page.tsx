import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildAlternates, localizedUrl, SITE_NAME } from "@/config/seo";
import BlogIndex from "@/components/blog/BlogIndex";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/blog"),
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: localizedUrl(locale, "/blog"),
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogIndex />;
}
