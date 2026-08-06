import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after the component has actually mounted in the browser.
 * This guarantees the import chain inside `children` never executes during
 * server-side rendering — stronger than React.lazy()+Suspense, which can still
 * get pulled into the SSR bundle by some meta-frameworks.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}
