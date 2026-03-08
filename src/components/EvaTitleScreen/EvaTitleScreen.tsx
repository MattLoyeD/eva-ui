"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TitleFragment {
  text: string;
  /** Font size class override (e.g. "text-7xl", "text-2xl") */
  size?: string;
  /** Color override */
  color?: string;
  /** Whether this fragment starts on a new line */
  break?: boolean;
  /** Language hint for styling — "jp" uses serif title font */
  lang?: "en" | "jp";
}

export interface EvaTitleScreenProps {
  /** Title fragments with mixed sizes and styles */
  fragments: TitleFragment[];
  /** Whether the title is visible */
  visible?: boolean;
  /** Subtitle text below the main title */
  subtitle?: string;
  /** Episode number or classification */
  episodeNumber?: string;
  /** Alignment of the text block */
  align?: "left" | "center" | "right";
  /** Full-screen mode */
  fullScreen?: boolean;
  /** Optional children rendered below */
  children?: ReactNode;
  /** Optional className */
  className?: string;
}

export function EvaTitleScreen({
  fragments,
  visible = true,
  subtitle,
  episodeNumber,
  align = "center",
  fullScreen = true,
  children,
  className = "",
}: EvaTitleScreenProps) {
  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
        ? "text-right items-end"
        : "text-center items-center";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`
            ${fullScreen ? "fixed inset-0 z-50" : "relative w-full"}
            bg-eva-black flex flex-col justify-center ${alignClass}
            px-12 py-16 ${className}
          `}
        >
          {/* Episode number */}
          {episodeNumber && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <span
                className="text-sm tracking-[0.4em] uppercase text-eva-mid-gray"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {episodeNumber}
              </span>
            </motion.div>
          )}

          {/* Main title fragments */}
          <div className={`flex flex-wrap gap-x-4 gap-y-1 ${alignClass} max-w-5xl`}>
            {fragments.map((frag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                className={`
                  ${frag.break ? "basis-full" : ""}
                  ${frag.size || "text-6xl md:text-8xl"}
                  ${frag.color || "text-white"}
                  font-black uppercase leading-[0.9] tracking-tight select-none
                `}
                style={{
                  fontFamily:
                    frag.lang === "jp"
                      ? "var(--font-eva-title)"
                      : "var(--font-eva-title)",
                }}
              >
                {frag.text}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 text-lg tracking-[0.3em] uppercase text-eva-mid-gray"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            className="mt-8 h-px w-64 bg-eva-mid-gray origin-left"
          />

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
