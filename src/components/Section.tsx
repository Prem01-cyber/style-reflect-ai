import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 py-16 sm:py-20 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-gold" />
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="font-display text-[34px] leading-[1.05] tracking-tight sm:text-5xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        )}
        <div className="mt-8">{children}</div>
      </motion.div>
    </section>
  );
}
