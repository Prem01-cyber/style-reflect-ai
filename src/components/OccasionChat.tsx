import { motion } from "framer-motion";
import { useState } from "react";

const examples = [
  "I have a haldi ceremony next month under ₹5000",
  "I want a classy date-night look",
  "I need outfits for a Goa vacation",
  "I want a rich CEO vibe",
];

export function OccasionChat() {
  const [value, setValue] = useState(examples[0]);
  const [parsed, setParsed] = useState(true);

  const tags = [
    { k: "Occasion", v: "Haldi" },
    { k: "Budget", v: "₹5000" },
    { k: "Formality", v: "Festive" },
    { k: "Style Intent", v: "Elegant" },
    { k: "Season", v: "Summer" },
    { k: "Event Type", v: "Day Function" },
  ];

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-5">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-primary shadow-glow" />
          <textarea
            value={value}
            onChange={(e) => { setValue(e.target.value); setParsed(false); }}
            rows={3}
            className="w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground"
            placeholder="Describe your event…"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => { setValue(e); setParsed(true); }}
              className="rounded-full glass px-3 py-1.5 text-[11px] text-muted-foreground hover:text-foreground"
            >
              {e.length > 28 ? e.slice(0, 28) + "…" : e}
            </button>
          ))}
        </div>
        <button
          onClick={() => setParsed(true)}
          className="mt-4 w-full rounded-2xl bg-gradient-primary py-3 text-sm font-medium text-primary-foreground shadow-glow"
        >
          ✨ Interpret with AI
        </button>
      </div>

      {parsed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl glass p-5"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-gold">AI extracted</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {tags.map((t) => (
              <div key={t.k} className="rounded-xl glass-strong px-3 py-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.k}</div>
                <div className="text-sm">{t.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
