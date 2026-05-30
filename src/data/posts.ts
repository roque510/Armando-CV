// Blog post metadata. Card text (title/excerpt) is translated via messages
// under the `Blog.posts` namespace, keyed by `id`. Full article bodies live in
// src/content/articles, keyed by slug.

export type PostCategory = "founder" | "ai" | "fullstack";

export type PostMeta = {
  id: string;
  slug: string;
  category: PostCategory;
  /** mono glyph rendered on the themed thumbnail */
  glyph: string;
  /** ISO date (publication) */
  date: string;
  /** reading time in minutes */
  readingMinutes: number;
  tags: string[];
};

export const POSTS: PostMeta[] = [
  {
    id: "cutting-llm-costs",
    slug: "cutting-llm-costs",
    category: "ai",
    glyph: "$ -60%",
    date: "2026-05-14",
    readingMinutes: 9,
    tags: ["LLM", "OpenAI", "Ollama"],
  },
  {
    id: "multi-tenant-saas-solo",
    slug: "multi-tenant-saas-solo",
    category: "founder",
    glyph: "{ }",
    date: "2026-04-28",
    readingMinutes: 11,
    tags: ["SaaS", "Founder", "Architecture"],
  },
  {
    id: "subdomains-nextjs",
    slug: "subdomains-nextjs",
    category: "fullstack",
    glyph: "*.tld",
    date: "2026-04-10",
    readingMinutes: 8,
    tags: ["Next.js", "Prisma", "Multi-tenant"],
  },
  {
    id: "private-rag-ollama",
    slug: "private-rag-ollama",
    category: "ai",
    glyph: "llama3",
    date: "2026-03-22",
    readingMinutes: 10,
    tags: ["LangChain", "Ollama", "RAG"],
  },
  {
    id: "stripe-billing-saas",
    slug: "stripe-billing-saas",
    category: "founder",
    glyph: "$$$",
    date: "2026-03-03",
    readingMinutes: 7,
    tags: ["Stripe", "SaaS", "Backend"],
  },
  {
    id: "type-safe-end-to-end",
    slug: "type-safe-end-to-end",
    category: "fullstack",
    glyph: "<T>",
    date: "2026-02-15",
    readingMinutes: 9,
    tags: ["TypeScript", "Prisma", "DX"],
  },
];

export const POST_BY_SLUG: Record<string, PostMeta> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p])
);

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}
