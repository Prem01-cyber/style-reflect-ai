import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const examples = [
  "I have a haldi ceremony next month under ₹5000",
  "I want a classy date-night look",
  "I need outfits for a Goa vacation",
  "I want a rich CEO vibe",
];

type Tag = { k: string; v: string };

const exampleTags: Record<string, Tag[]> = {
  "I have a haldi ceremony next month under ₹5000": [
    { k: "Occasion", v: "Haldi" },
    { k: "Budget", v: "₹5,000" },
    { k: "Formality", v: "Festive" },
    { k: "Style Intent", v: "Ethnic Elegant" },
    { k: "Season", v: "Summer" },
    { k: "Event Type", v: "Day Function" },
  ],
  "I want a classy date-night look": [
    { k: "Occasion", v: "Date Night" },
    { k: "Budget", v: "Flexible" },
    { k: "Formality", v: "Semi-Formal" },
    { k: "Style Intent", v: "Sophisticated" },
    { k: "Season", v: "Evening" },
    { k: "Event Type", v: "Intimate Dinner" },
  ],
  "I need outfits for a Goa vacation": [
    { k: "Occasion", v: "Vacation" },
    { k: "Budget", v: "₹8,000" },
    { k: "Formality", v: "Casual" },
    { k: "Style Intent", v: "Breezy Boho" },
    { k: "Season", v: "Summer" },
    { k: "Event Type", v: "Multi-Day Trip" },
  ],
  "I want a rich CEO vibe": [
    { k: "Occasion", v: "Professional" },
    { k: "Budget", v: "₹15,000+" },
    { k: "Formality", v: "Power Formal" },
    { k: "Style Intent", v: "Luxe Minimal" },
    { k: "Season", v: "All Season" },
    { k: "Event Type", v: "Boardroom / Events" },
  ],
};

function inferTags(text: string): Tag[] {
  const t = text.toLowerCase();

  const occasion = t.includes("wedding") ? "Wedding"
    : t.includes("haldi") ? "Haldi"
    : t.includes("date") ? "Date Night"
    : t.includes("office") || t.includes("work") || t.includes("ceo") ? "Professional"
    : t.includes("party") ? "Party"
    : t.includes("vacation") || t.includes("goa") || t.includes("travel") ? "Vacation"
    : t.includes("casual") ? "Casual Outing"
    : "General";

  const budgetMatch = text.match(/₹\s?[\d,]+/);
  const budget = budgetMatch ? budgetMatch[0].replace(/\s/, "") : "Not specified";

  const formality = t.includes("formal") || t.includes("ceo") || t.includes("office") ? "Formal"
    : t.includes("casual") || t.includes("vacation") || t.includes("goa") ? "Casual"
    : t.includes("festive") || t.includes("haldi") || t.includes("wedding") ? "Festive"
    : "Semi-Formal";

  const styleIntent = t.includes("classy") || t.includes("elegant") ? "Elegant"
    : t.includes("trendy") || t.includes("cool") ? "Trendy"
    : t.includes("ceo") || t.includes("luxe") || t.includes("rich") ? "Luxe Minimal"
    : t.includes("boho") || t.includes("vacation") || t.includes("goa") ? "Breezy Boho"
    : "Balanced";

  return [
    { k: "Occasion", v: occasion },
    { k: "Budget", v: budget },
    { k: "Formality", v: formality },
    { k: "Style Intent", v: styleIntent },
    { k: "Season", v: "Summer" },
    { k: "Event Type", v: occasion },
  ];
}

export function OccasionChat() {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [parsed, setParsed] = useState(false);

  const interpret = (text: string) => {
    const resolved = exampleTags[text] ?? inferTags(text);
    setTags(resolved);
    setParsed(true);
  };

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
              onClick={() => { setValue(e); interpret(e); }}
              className="rounded-full glass px-3 py-1.5 text-[11px] text-muted-foreground hover:text-foreground transition"
            >
              {e.length > 28 ? e.slice(0, 28) + "…" : e}
            </button>
          ))}
        </div>
        <button
          onClick={() => value.trim() && interpret(value)}
          disabled={!value.trim()}
          className="mt-4 w-full rounded-2xl bg-gradient-primary py-3 text-sm font-medium text-primary-foreground shadow-glow transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ✨ Interpret with AI
        </button>
      </div>

      <AnimatePresence mode="wait">
        {parsed && tags.length > 0 && (
          <motion.div
            key={tags[0].v}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-3xl glass p-5"
          >
            <div className="text-[11px] uppercase tracking-[0.2em] text-gold">AI extracted</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {tags.map((t, i) => (
                <motion.div
                  key={t.k}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-xl glass-strong px-3 py-2"
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.k}</div>
                  <div className="text-sm">{t.v}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
