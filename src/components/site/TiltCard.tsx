import type { ReactNode } from "react";
import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const tilt = useTilt(max);
  return (
    <div className="perspective-scene group">
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{ transition: "transform 0.35s ease-out, box-shadow 0.35s" }}
        className={cn(
          "relative rounded-2xl bg-card transition-shadow group-hover:gold-rim",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}