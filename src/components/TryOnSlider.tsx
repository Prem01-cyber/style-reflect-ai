import { useRef, useState } from "react";
import elegant from "@/assets/outfit-elegant.jpg";
import portrait from "@/assets/hero-portrait.jpg";

export function TryOnSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => { if (e.buttons === 1) move(e.clientX); }}
        className="relative aspect-[3/4] w-full select-none overflow-hidden rounded-3xl glass-strong touch-none"
      >
        <img src={portrait} alt="Before" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={elegant} alt="After" className="absolute inset-0 h-full w-full object-cover" style={{ width: `${10000 / Math.max(pos, 1)}%`, maxWidth: "none" }} />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-gradient-gold shadow-gold" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center text-gold-foreground text-lg">
            ⇆
          </div>
        </div>
        <div className="absolute left-3 top-3 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-wider">Before</div>
        <div className="absolute right-3 top-3 rounded-full bg-gradient-primary px-3 py-1 text-[10px] uppercase tracking-wider text-primary-foreground">After</div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 rounded-full glass py-3 text-sm">💾 Save Look</button>
        <button className="flex-1 rounded-full bg-gradient-primary py-3 text-sm font-medium text-primary-foreground shadow-glow">↗ Share Look</button>
      </div>
    </div>
  );
}
