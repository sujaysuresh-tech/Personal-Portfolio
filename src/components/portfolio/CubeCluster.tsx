import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

const GRID = 3;
const SPACING = 0.62;
const CUBE_SIZE = 0.5;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function Cubes() {
  const groupRef = useRef<Group>(null);
  const reducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const offset = ((GRID - 1) * SPACING) / 2;
    const pts: [number, number, number][] = [];
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        for (let z = 0; z < GRID; z++) {
          pts.push([x * SPACING - offset, y * SPACING - offset, z * SPACING - offset]);
        }
      }
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#4c1d95"
            emissiveIntensity={0.4}
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

export function CubeCluster({ className = "" }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          camera={{ position: [2.4, 2.2, 2.8], fov: 45 }}
          style={{ pointerEvents: "none" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={1.2} color="#a78bfa" />
          <pointLight position={[-3, -2, -2]} intensity={0.6} color="#f472b6" />
          <Suspense fallback={null}>
            <Cubes />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
