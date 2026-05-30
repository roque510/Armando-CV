import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/config/seo";
import { POSTS } from "@/data/posts";

type Entry = {
  path: string;
  lastModified?: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const CASES = ["forzive", "playflow"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    ...POSTS.map((p) => ({
      path: `/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...CASES.map((slug) => ({
      path: `/work/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  const out: MetadataRoute.Sitemap = [];
  for (const e of entries) {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) languages[l] = localizedUrl(l, e.path);
    for (const locale of routing.locales) {
      out.push({
        url: localizedUrl(locale, e.path),
        lastModified: e.lastModified ?? undefined,
        changeFrequency: e.changeFrequency,
        priority: e.priority,
        alternates: { languages },
      });
    }
  }
  return out;
}
