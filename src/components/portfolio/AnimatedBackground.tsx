import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.3 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* grid */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

      {/* floating orbs */}
      <div
        className="absolute h-[540px] w-[540px] rounded-full blur-[120px] opacity-40"
        style={{
          left: "-8%",
          top: "10%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          animation: "float-orb 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute h-[560px] w-[560px] rounded-full blur-[130px] opacity-30"
        style={{
          right: "-10%",
          top: "40%",
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          animation: "float-orb-2 18s ease-in-out infinite",
        }}
      />

      {/* mouse-following glow */}
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full blur-[100px] opacity-25"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
        }}
        animate={{
          left: `calc(${pos.x * 100}% - 210px)`,
          top: `calc(${pos.y * 100}% - 210px)`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 60, mass: 1.2 }}
      />

      {/* particles */}
      <Particles />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_60%,#000_100%)]" />
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="absolute inset-0">
      {particles.map((i) => {
        const left = (i * 37) % 100;
        const size = 1 + ((i * 13) % 3);
        const duration = 18 + ((i * 7) % 20);
        const delay = (i * 1.3) % 12;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{
              left: `${left}%`,
              bottom: `-${size * 4}px`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `drift ${duration}s linear ${delay}s infinite`,
              boxShadow: "0 0 8px rgba(255,255,255,0.6)",
            }}
          />
        );
      })}
    </div>
  );
}
