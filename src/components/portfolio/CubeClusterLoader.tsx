import { useEffect, useState, type ComponentType } from "react";

type CubeClusterProps = { className?: string };

/**
 * Imports and mounts CubeCluster entirely inside useEffect — no React.lazy(),
 * no declarative <Suspense> boundary. This is intentional: TanStack Start's
 * SSR pipeline was still discovering and executing the module through a
 * declarative lazy()/Suspense tree (for asset-preloading), which crashed the
 * server because @react-three/fiber runs renderer setup code at import time
 * that isn't Node-compatible. A plain useEffect never runs on the server at
 * all, so this import() call is 100% client-only with no exceptions.
 */
export function CubeClusterLoader({ className = "" }: CubeClusterProps) {
  const [Comp, setComp] = useState<ComponentType<CubeClusterProps> | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("@/components/portfolio/CubeCluster").then((m) => {
      if (!cancelled) setComp(() => m.CubeCluster);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Comp) return null;
  return <Comp className={className} />;
}
