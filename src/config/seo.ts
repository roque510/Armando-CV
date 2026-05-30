import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/** Production origin. Override per-environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aroqueb.com"
).replace(/\/$/, "");

export const SITE_NAME = "Armando Roque";

export const AUTHOR = {
  name: "Armando Roque",
  email: "roque09215@gmail.com",
  github: "https://github.com/roque510",
  linkedin: "https://www.linkedin.com/in/armando-roque-547914133/",
} as const;

/** Normalize a locale-less path into a leading-slash form ("" → "", "/blog"). */
function clean(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function localizedUrl(locale: string, path = ""): string {
  return `${SITE_URL}/${locale}${clean(path)}`;
}

/**
 * Build canonical + hreflang alternates for a page, given the current locale
 * and the locale-less pathname (e.g. "", "/blog", "/work/forzive").
 */
export function buildAlternates(
  locale: string,
  path = ""
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}
