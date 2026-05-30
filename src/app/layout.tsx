import type { ReactNode } from "react";

// The root layout only forwards to the locale layout, which renders <html>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
