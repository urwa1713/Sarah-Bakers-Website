import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-frosting");

    let rx = 0, ry = 0, dx = 0, dy = 0;
    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx - 5}px, ${dy - 5}px, 0)`;
    };
    let raf = 0;
    const loop = () => {
      rx += (dx - rx) * 0.15;
      ry += (dy - ry) * 0.15;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-frosting");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-9 w-9 rounded-full border border-[var(--gold)]/60 mix-blend-multiply md:block"
        style={{ transition: "width 0.2s, height 0.2s" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2.5 w-2.5 rounded-full bg-[var(--rose)] shadow-[0_0_12px_var(--rose)] md:block"
      />
    </>
  );
}