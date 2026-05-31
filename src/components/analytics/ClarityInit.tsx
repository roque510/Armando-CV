"use client";

import { useEffect } from "react";
import { claritySet, clarityEvent, hasCookie } from "@/lib/clarity";

/**
 * Session-level Clarity tags + global click tracking.
 *
 * Tags: language, and an `owner` flag when the private `contador` cookie is set,
 * so you can exclude your own visits in Clarity. To mark yourself as owner, run
 * once in the browser console:
 *   document.cookie = "contador=1; path=/; max-age=31536000";
 *
 * Click tracking: any element with a `data-evt="name"` attribute fires that
 * Clarity event when clicked (event delegation — works for server components too).
 */
export default function ClarityInit({ locale }: { locale: string }) {
  useEffect(() => {
    claritySet("locale", locale);
    claritySet("visitor", hasCookie("contador") ? "owner" : "visitor");
  }, [locale]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-evt]");
      const name = el?.dataset.evt;
      if (name) clarityEvent(name);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
