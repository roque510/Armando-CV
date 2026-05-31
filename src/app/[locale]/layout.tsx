import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, buildAlternates, localizedUrl, AUTHOR } from "@/config/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClarityAnalytics from "@/components/analytics/ClarityAnalytics";
import ClarityInit from "@/components/analytics/ClarityInit";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    metadataBase: new URL(SITE_URL),
    alternates: buildAlternates(locale, ""),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      title: t("homeTitle"),
      description: t("ogDescription"),
      url: localizedUrl(locale, ""),
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("ogDescription"),
    },
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  url: SITE_URL,
  image: `${SITE_URL}/apple-touch-icon.png`,
  jobTitle: "Full Stack Engineer & SaaS Founder",
  email: `mailto:${AUTHOR.email}`,
  address: { "@type": "PostalAddress", addressCountry: "Honduras" },
  sameAs: [AUTHOR.linkedin, AUTHOR.github],
  knowsLanguage: ["en", "es"],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} data-hero="dossier" data-avail="bracket">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ClarityAnalytics />
        <NextIntlClientProvider>
          <ClarityInit locale={locale} />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
