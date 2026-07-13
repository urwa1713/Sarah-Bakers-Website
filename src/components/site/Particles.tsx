import { useEffect, useRef } from "react";

type P = { x: number; y: number; s: number; c: string; d: number; r: number };

const COLORS = ["#D8A7A0", "#C9A15C", "#f5c9c0", "#e6b17a", "#f4dfd0"];

export function Particles({ count = 22 }: { count?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      wrap.style.setProperty("--px", `${cx * 20}px`);
      wrap.style.setProperty("--py", `${cy * 20}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const particles: P[] = Array.from({ length: count }, (_, i) => ({
    x: (i * 53) % 100,
    y: (i * 37 + 11) % 100,
    s: 4 + ((i * 7) % 10),
    c: COLORS[i % COLORS.length],
    d: (i % 5) * 0.6,
    r: (i * 41) % 360,
  }));

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ transform: "translate3d(var(--px,0), var(--py,0), 0)", transition: "transform 0.4s ease-out" }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s * (i % 3 === 0 ? 0.5 : 1),
            background: p.c,
            borderRadius: i % 3 === 0 ? "999px" : "50%",
            boxShadow: `0 0 8px ${p.c}80`,
            animation: `float-y ${6 + (i % 5)}s ease-in-out ${p.d}s infinite`,
            transform: `rotate(${p.r}deg)`,
          }}
        />
      ))}
    </div>
  );
}