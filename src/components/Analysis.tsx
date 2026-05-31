import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";

const traits = [
  { label: "Body Type", value: "Athletic" },
  { label: "Skin Tone", value: "Warm" },
  { label: "Style DNA", value: "Elegant Ethnic" },
  { label: "Preferred Fit", value: "Relaxed Tailored" },
  { label: "Personality", value: "Confident Minimalist" },
];

export function Analysis() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Start the animation only when the section scrolls into view
  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);

    const start = performance.now();
    const duration = 2500;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, started]);

  return (
    <div ref={ref} className="space-y-5">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl glass-strong">
        <img src={heroPortrait} alt="AI body scan" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {!done && started && (
          <div className="scanline absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/40 to-transparent blur-md" />
        )}

        {[
          "top-3 left-3 border-l-2 border-t-2",
          "top-3 right-3 border-r-2 border-t-2",
          "bottom-3 left-3 border-l-2 border-b-2",
          "bottom-3 right-3 border-r-2 border-b-2",
        ].map((c) => (
          <div key={c} className={`absolute h-5 w-5 border-gold/80 ${c}`} />
        ))}

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between glass rounded-full px-4 py-2 text-xs">
          <span>{done ? "Style DNA unlocked ✓" : started ? "Scanning style DNA…" : "Waiting to scan…"}</span>
          <span className={done ? "text-green-400" : "text-gold"}>{progress}%</span>
        </div>

        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            {traits.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl glass p-4"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t.label}</div>
                <div className="mt-1 font-display text-lg">{t.value}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => document.getElementById("occasion")?.scrollIntoView({ behavior: "smooth" })}
            className="pulse-glow w-full rounded-full bg-gradient-primary py-4 text-sm font-medium text-primary-foreground shadow-glow transition active:scale-95"
          >
            Continue to Step 03 — Tell us your occasion →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
