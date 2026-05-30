// Lightweight structured content model for blog articles.
// Inline strings support a tiny markdown subset: **bold**, `code`, _em_, [text](url).

export type Inline = string;

export type CodeLang = "ts" | "bash" | "json";

export type Block =
  | { t: "p"; text: Inline }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: Inline[] }
  | { t: "ol"; items: Inline[] }
  | { t: "quote"; text: Inline }
  | { t: "callout"; text: Inline }
  | { t: "code"; file: string; lang?: CodeLang; code: string };

export type ArticleBody = {
  title: string;
  dek: string;
  blocks: Block[];
};

export type Article = {
  slug: string;
  en: ArticleBody;
  es: ArticleBody;
};
