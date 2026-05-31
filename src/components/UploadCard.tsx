import { motion } from "framer-motion";
import { useState } from "react";

const demos = [
  { name: "Wedding Guest", emoji: "💍", tag: "Festive · Ethnic" },
  { name: "College Student", emoji: "🎓", tag: "Trendy · Casual" },
  { name: "Young Professional", emoji: "💼", tag: "Smart · Modern" },
  { name: "Corporate Executive", emoji: "👔", tag: "Power · Luxe" },
];

export function UploadCard({ onPicked }: { onPicked?: (name: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-8 text-center">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full glass shadow-glow">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
          </svg>
        </div>
        <p className="relative mt-4 font-display text-xl">Upload your photo</p>
        <p className="relative mt-1 text-xs text-muted-foreground">Selfie or full body · Encrypted & auto-deleted</p>
        <div className="relative mt-5 flex justify-center gap-2">
          <button className="rounded-full glass px-4 py-2 text-xs">📷 Selfie</button>
          <button className="rounded-full glass px-4 py-2 text-xs">🧍 Full Body</button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Or try a demo profile</p>
        <div className="grid grid-cols-2 gap-3">
          {demos.map((d) => (
            <motion.button
              key={d.name}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setPicked(d.name); onPicked?.(d.name); }}
              className={`rounded-2xl p-4 text-left transition ${
                picked === d.name
                  ? "bg-gradient-primary shadow-glow"
                  : "glass hover:border-primary/40"
              }`}
            >
              <div className="text-2xl">{d.emoji}</div>
              <div className="mt-2 text-sm font-medium">{d.name}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{d.tag}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
