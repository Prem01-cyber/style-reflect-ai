import { motion } from "framer-motion";

export function Splash({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-gradient-gold opacity-20 blur-3xl" />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative"
      >
        <div className="relative mx-auto h-28 w-28 rounded-full glass-strong shadow-glow">
          <div className="absolute inset-2 rounded-full bg-gradient-primary opacity-80 blur-md" />
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-background">
            <span className="font-display text-3xl text-gradient-gold">M</span>
          </div>
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gradient-gold shadow-gold" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-8 font-display text-5xl leading-none tracking-tight"
      >
        Mirror<span className="text-gradient-purple">Me</span>
        <span className="ml-2 text-gradient-gold">AI</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-4 text-[15px] tracking-wide text-muted-foreground"
      >
        See yourself before you buy.
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        onClick={onStart}
        className="pulse-glow mt-10 rounded-full bg-gradient-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-glow"
      >
        Start Styling →
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        scroll to explore
      </motion.div>
    </section>
  );
}
