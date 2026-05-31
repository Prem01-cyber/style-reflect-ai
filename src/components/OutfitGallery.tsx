import { motion } from "framer-motion";
import { useState } from "react";
import elegant from "@/assets/outfit-elegant.jpg";
import trendy from "@/assets/outfit-trendy.jpg";
import budget from "@/assets/outfit-budget.jpg";

export const outfits = [
  {
    id: "elegant",
    label: "Elegant Look",
    image: elegant,
    price: "₹4,900",
    scores: { style: 96, occasion: 98, comfort: 88, trend: 84 },
    accent: "from-gold/30 to-transparent",
    reason:
      "This pastel yellow chikankari kurta complements your warm undertone and creates a balanced silhouette ideal for a daytime haldi celebration.",
    best: "Best for family functions",
  },
  {
    id: "trendy",
    label: "Trendy Look",
    image: trendy,
    price: "₹3,400",
    scores: { style: 92, occasion: 86, comfort: 82, trend: 98 },
    accent: "from-primary/40 to-transparent",
    reason:
      "A sharp co-ord set with subtle gold layering — engineered to turn heads on socials while keeping your minimalist DNA intact.",
    best: "Best for social attention",
  },
  {
    id: "budget",
    label: "Budget Smart",
    image: budget,
    price: "₹2,200",
    scores: { style: 84, occasion: 80, comfort: 94, trend: 76 },
    accent: "from-muted to-transparent",
    reason:
      "Neutral linen tailoring you can rewear across 6+ occasions. Maximum versatility, zero compromise on the elegant aesthetic.",
    best: "Best value for money",
  },
];

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span><span className="text-foreground">{value}</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function OutfitGallery() {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [compared, setCompared] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) =>
    setSaved((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const toggleCompare = (id: string) =>
    setCompared((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const scrollToTryOn = () =>
    document.getElementById("tryon")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 no-scrollbar">
      {outfits.map((o, i) => (
        <motion.article
          key={o.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative w-[78vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-3xl glass-strong"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={o.image} alt={o.label} className="h-full w-full object-cover" loading="lazy" />
            <div className={`absolute inset-0 bg-gradient-to-t ${o.accent}`} />
            <div className="absolute left-3 top-3 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-wider">
              {o.label}
            </div>
            <div className="absolute right-3 top-3 rounded-full bg-gradient-gold px-3 py-1 text-[11px] font-medium text-gold-foreground">
              {o.scores.style}/100
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between glass rounded-2xl px-3 py-2">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Price</div>
                <div className="font-display text-lg">{o.price}</div>
              </div>
              <button
                onClick={scrollToTryOn}
                className="rounded-full bg-gradient-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-glow transition active:scale-95"
              >
                Try On
              </button>
            </div>
          </div>
          <div className="space-y-2 p-4">
            <Score label="Occasion" value={o.scores.occasion} />
            <Score label="Comfort" value={o.scores.comfort} />
            <Score label="Trend" value={o.scores.trend} />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => toggleCompare(o.id)}
                className={`flex-1 rounded-full py-2 text-xs transition ${compared.has(o.id) ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass"}`}
              >
                {compared.has(o.id) ? "✓ Compared" : "Compare"}
              </button>
              <button
                onClick={() => toggleSave(o.id)}
                className={`flex-1 rounded-full py-2 text-xs transition ${saved.has(o.id) ? "bg-gradient-gold text-gold-foreground shadow-gold" : "glass"}`}
              >
                {saved.has(o.id) ? "♥ Saved" : "Save"}
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
