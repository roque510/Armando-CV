"use client";

import { useEffect } from "react";
import { claritySet, clarityEvent } from "@/lib/clarity";

/**
 * Per-page Clarity tags + an optional event, so you can segment in Clarity
 * (e.g. "sessions where page_type = post" or filter by post/category).
 * Rendered from server pages; runs on mount in the browser.
 */
export default function ClarityPage({
  tags,
  event,
}: {
  tags: Record<string, string | undefined>;
  event?: string;
}) {
  // Serialize so the effect only re-fires when values actually change.
  const key = JSON.stringify({ tags, event });

  useEffect(() => {
    for (const [k, v] of Object.entries(tags)) {
      if (v) claritySet(k, v);
    }
    if (event) clarityEvent(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
