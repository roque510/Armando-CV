// Blog post metadata. Card text (title/excerpt) is translated via messages
// under the `Blog.posts` namespace, keyed by `id`. Only the first post links to
// a full article; the rest are placeholders (href: null) as in the design.

export type PostCategory = "founder" | "ai" | "fullstack";

export type PostMeta = {
  id: string;
  slug: string | null;
  category: PostCategory;
  /** mono glyph rendered on the themed thumbnail */
  glyph: string;
  /** category label shown on the thumbnail pill */
  catLabel: string;
  date: string;
  readingKey: string; // messages key suffix for "N min read"
  tags: string[];
};

export const POSTS: PostMeta[] = [
  {
    id: "cutting-llm-costs",
    slug: "cutting-llm-costs",
    category: "ai",
    glyph: "$ -60%",
    catLabel: "AI & LLM",
    date: "2026-05-14",
    readingKey: "9",
    tags: ["LLM", "OpenAI", "Ollama"],
  },
  {
    id: "multi-tenant-saas-solo",
    slug: null,
    category: "founder",
    glyph: "{ }",
    catLabel: "Founder",
    date: "2026-04-28",
    readingKey: "11",
    tags: ["SaaS", "Founder", "Architecture"],
  },
  {
    id: "subdomains-nextjs",
    slug: null,
    category: "fullstack",
    glyph: "*.tld",
    catLabel: "Full-Stack",
    date: "2026-04-10",
    readingKey: "8",
    tags: ["Next.js", "Prisma", "Multi-tenant"],
  },
  {
    id: "private-rag-ollama",
    slug: null,
    category: "ai",
    glyph: "llama3",
    catLabel: "AI & LLM",
    date: "2026-03-22",
    readingKey: "10",
    tags: ["LangChain", "Ollama", "RAG"],
  },
  {
    id: "stripe-billing-saas",
    slug: null,
    category: "founder",
    glyph: "$$$",
    catLabel: "Founder",
    date: "2026-03-03",
    readingKey: "7",
    tags: ["Stripe", "SaaS", "Backend"],
  },
  {
    id: "type-safe-end-to-end",
    slug: null,
    category: "fullstack",
    glyph: "<T>",
    catLabel: "Full-Stack",
    date: "2026-02-15",
    readingKey: "9",
    tags: ["TypeScript", "Prisma", "DX"],
  },
];

export const POST_BY_SLUG = Object.fromEntries(
  POSTS.filter((p) => p.slug).map((p) => [p.slug as string, p])
);
