import { motion } from "framer-motion";

export function Cake3D() {
  return (
    <div className="perspective-scene relative mx-auto flex h-[420px] w-[320px] items-end justify-center sm:h-[520px] sm:w-[420px]">
      {/* soft ground shadow */}
      <div
        aria-hidden
        className="absolute bottom-4 left-1/2 h-8 w-64 -translate-x-1/2 rounded-[50%] bg-[var(--chocolate)]/25 blur-2xl"
      />
      {/* spinning cake */}
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          animation: "cake-spin 32s linear infinite",
        }}
      >
        {/* plate */}
        <Tier
          delay={0}
          bottom={40}
          width={300}
          height={14}
          color="linear-gradient(180deg, #f5ead6 0%, #d9c9a8 100%)"
          rim="#c9a15c"
        />
        {/* tier 3 (base) */}
        <Tier
          delay={0.15}
          bottom={52}
          width={260}
          height={110}
          color="linear-gradient(180deg, #fbe9e3 0%, #d8a7a0 100%)"
          rim="#c9a15c"
          drip
        />
        {/* tier 2 */}
        <Tier
          delay={0.4}
          bottom={160}
          width={200}
          height={90}
          color="linear-gradient(180deg, #fdf3ec 0%, #e6c1b8 100%)"
          rim="#c9a15c"
          drip
        />
        {/* tier 1 (top) */}
        <Tier
          delay={0.65}
          bottom={248}
          width={140}
          height={70}
          color="linear-gradient(180deg, #fff6ee 0%, #f0d5cb 100%)"
          rim="#c9a15c"
        />
        {/* candle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 318 }}
        >
          <div className="mx-auto h-16 w-2 rounded-sm bg-gradient-to-b from-[#faf3e7] to-[#e0c9a8]" />
          <div
            className="absolute -top-4 left-1/2 h-5 w-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-b from-[#fff2a8] via-[#ffb347] to-[#ff6b3d]"
            style={{ animation: "flame-flicker 0.6s ease-in-out infinite", filter: "blur(0.4px)" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function Tier({
  delay,
  bottom,
  width,
  height,
  color,
  rim,
  drip,
}: {
  delay: number;
  bottom: number;
  width: number;
  height: number;
  color: string;
  rim: string;
  drip?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80, scaleY: 0.4 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2"
      style={{
        bottom,
        width,
        height,
        marginLeft: -width / 2,
        background: color,
        borderRadius: `${width / 2}px / ${Math.min(24, height / 2)}px`,
        boxShadow: `inset 0 -8px 20px rgba(59,42,34,0.18), inset 0 8px 14px rgba(255,255,255,0.7), 0 6px 14px -6px rgba(59,42,34,0.35), 0 0 0 1px ${rim}55`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* top ellipse highlight */}
      <div
        className="absolute left-0 right-0 top-[-6px] mx-auto h-3 rounded-[50%]"
        style={{
          width: width - 6,
          background: "linear-gradient(180deg, #fffaf2 0%, #f4dfd0 100%)",
          boxShadow: `0 1px 0 ${rim}55`,
        }}
      />
      {drip && (
        <div className="absolute -top-2 left-4 right-4 flex justify-between">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-3 rounded-b-full"
              style={{
                background: "linear-gradient(180deg, #fff6ee 0%, #e6c1b8 100%)",
                height: 8 + ((i * 7) % 10),
              }}
            />
          ))}
        </div>
      )}
      {/* sprinkle dots */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "inherit" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-2 rounded-full"
            style={{
              left: `${(i * 13 + 8) % 90}%`,
              top: `${(i * 23 + 20) % 70}%`,
              background: i % 2 ? "#c9a15c" : "#d8a7a0",
              transform: `rotate(${i * 37}deg)`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}