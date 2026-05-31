import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { POSTS, POST_BY_SLUG } from "@/data/posts";
import { getArticleBody } from "@/content";
import { buildAlternates, localizedUrl, AUTHOR, SITE_NAME } from "@/config/seo";
import Article from "@/components/blog/Article";
import ClarityPage from "@/components/analytics/ClarityPage";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    POSTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = POST_BY_SLUG[slug];
  const body = getArticleBody(slug, locale);
  if (!post || !body) return {};

  const path = `/blog/${slug}`;
  const url = localizedUrl(locale, path);
  return {
    title: `${body.title} — ${SITE_NAME}`,
    description: body.dek,
    alternates: buildAlternates(locale, path),
    keywords: post.tags,
    authors: [{ name: AUTHOR.name, url: AUTHOR.github }],
    openGraph: {
      type: "article",
      title: body.title,
      description: body.dek,
      url,
      publishedTime: post.date,
      authors: [AUTHOR.name],
      tags: post.tags,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image", title: body.title, description: body.dek },
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
  const body = getArticleBody(slug, locale);
  if (!post || !body) notFound();

  const url = localizedUrl(locale, `/blog/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: body.title,
    description: body.dek,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.github },
    publisher: { "@type": "Person", name: AUTHOR.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClarityPage
        tags={{ page_type: "post", post: slug, category: post.category }}
        event="blog_post_view"
      />
      <Article post={post} body={body} locale={locale} />
    </>
  );
}
