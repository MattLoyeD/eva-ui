"use client";

import { motion } from "framer-motion";

export interface SeeleMonolithProps {
  /** Display label — typically a number like "01" */
  label?: string;
  /** Whether the monolith is currently "speaking" */
  isSpeaking?: boolean;
  /** Override the displayed text (default: SOUND ONLY) */
  text?: string;
  /** Optional className */
  className?: string;
}

function AudioWaveBar({ delay }: { delay: number }) {
  return (
    <motion.div
      className="w-[3px] bg-eva-orange"
      animate={{
        height: ["4px", "16px", "8px", "14px", "4px"],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function SeeleMonolith({
  label,
  isSpeaking = false,
  text = "SOUND ONLY",
  className = "",
}: SeeleMonolithProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-eva-black border border-eva-mid-gray/40 min-h-[120px] min-w-[100px] ${className}`}
    >
      {/* Label number top-left */}
      {label && (
        <span
          className="absolute top-2 left-3 text-[10px] font-mono text-eva-mid-gray/60 uppercase tracking-wider"
        >
          {label}
        </span>
      )}

      {/* SOUND ONLY text */}
      <span
        className="text-sm font-bold uppercase tracking-[0.15em] text-eva-orange"
        style={{ fontFamily: "var(--font-eva-display)" }}
      >
        {text}
      </span>

      {/* Audio wave indicator */}
      {isSpeaking && (
        <div className="flex items-end gap-[2px] mt-3 h-[18px]">
          <AudioWaveBar delay={0} />
          <AudioWaveBar delay={0.1} />
          <AudioWaveBar delay={0.2} />
          <AudioWaveBar delay={0.1} />
          <AudioWaveBar delay={0.15} />
        </div>
      )}
    </div>
  );
}
