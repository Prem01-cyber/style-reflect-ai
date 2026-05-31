import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.jpg";

const traits = [
  { label: "Body Type", value: "Athletic" },
  { label: "Skin Tone", value: "Warm" },
  { label: "Style DNA", value: "Elegant Ethnic" },
  { label: "Preferred Fit", value: "Relaxed Tailored" },
  { label: "Personality", value: "Confident Minimalist" },
];

export function Analysis() {
  return (
    <div className="space-y-5">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl glass-strong">
        <img src={heroPortrait} alt="AI body scan" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {/* scanning line */}
        <div className="scanline absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/40 to-transparent blur-md" />
        {/* corner brackets */}
        {[
          "top-3 left-3 border-l-2 border-t-2",
          "top-3 right-3 border-r-2 border-t-2",
          "bottom-3 left-3 border-l-2 border-b-2",
          "bottom-3 right-3 border-r-2 border-b-2",
        ].map((c) => (
          <div key={c} className={`absolute h-5 w-5 border-gold/80 ${c}`} />
        ))}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between glass rounded-full px-4 py-2 text-xs">
          <span>Scanning style DNA…</span>
          <span className="text-gold">95%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {traits.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl glass p-4"
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t.label}</div>
            <div className="mt-1 font-display text-lg">{t.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
