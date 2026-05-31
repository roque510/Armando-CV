// Thin wrapper around Microsoft Clarity's global `clarity()` queue.
// Calls are retried briefly because the Clarity tag loads `afterInteractive`,
// so a tag/event fired on mount may arrive a beat before the script is ready.

type ClarityFn = (...args: unknown[]) => void;

function getClarity(): ClarityFn | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { clarity?: ClarityFn }).clarity;
}

function fire(args: unknown[], attempts = 20) {
  const c = getClarity();
  if (typeof c === "function") {
    c(...args);
    return;
  }
  if (attempts <= 0 || typeof window === "undefined") return;
  window.setTimeout(() => fire(args, attempts - 1), 250);
}

/** Set a custom tag (filterable dimension) on the current Clarity session. */
export function claritySet(key: string, value: string) {
  fire(["set", key, value]);
}

/** Record a custom Clarity event (e.g. "blog_post_view"). */
export function clarityEvent(name: string) {
  fire(["event", name]);
}

/** True if a cookie with the given name is set on the document. */
export function hasCookie(name: string): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(`${name}=`));
}
