"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ClassifiedOverlayProps {
  /** Whether the overlay is visible */
  visible?: boolean;
  /** Classification level label */
  level?: string;
  /** Text displayed under the classification stamp */
  subtitle?: string;
  /** If true, shows an unlock mechanism (button or code input) */
  unlockable?: boolean;
  /** Callback when unlocked */
  onUnlock?: () => void;
  /** Required code to unlock (if unlockable) */
  unlockCode?: string;
  /** Children rendered behind the overlay */
  children?: React.ReactNode;
  /** Optional className */
  className?: string;
}

export function ClassifiedOverlay({
  visible = true,
  level = "TOP SECRET",
  subtitle = "NERV AUTHORIZATION REQUIRED",
  unlockable = false,
  onUnlock,
  unlockCode = "NERV",
  children,
  className = "",
}: ClassifiedOverlayProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = useCallback(() => {
    if (inputValue.toUpperCase() === unlockCode.toUpperCase()) {
      setUnlocked(true);
      setError(false);
      onUnlock?.();
    } else {
      setError(true);
      setInputValue("");
      setTimeout(() => setError(false), 1000);
    }
  }, [inputValue, unlockCode, onUnlock]);

  const isVisible = visible && !unlocked;

  return (
    <div className={`relative ${className}`}>
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Diagonal stripe background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.92)",
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 20px,
                  rgba(255, 0, 0, 0.06) 20px,
                  rgba(255, 0, 0, 0.06) 40px
                )`,
              }}
            />

            {/* Border frame */}
            <div className="absolute inset-3 border-2 border-eva-red/30 pointer-events-none" />
            <div className="absolute inset-5 border border-eva-red/15 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 text-center px-8">
              {/* Classification stamp */}
              <motion.div
                initial={{ scale: 1.5, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: -3 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                className="mb-6"
              >
                <div className="inline-block border-4 border-eva-red px-8 py-3">
                  <span
                    className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-eva-red"
                    style={{ fontFamily: "var(--font-eva-display)" }}
                  >
                    {level}
                  </span>
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xs uppercase tracking-[0.3em] text-eva-orange/70 mb-8 font-mono"
              >
                {subtitle}
              </motion.p>

              {/* Unlock input */}
              {unlockable && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col items-center gap-3"
                >
                  <label className="text-[10px] uppercase tracking-[0.3em] text-eva-mid-gray font-mono">
                    ENTER AUTHORIZATION CODE
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-eva-orange/50 font-mono text-sm">[</span>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                      className={`bg-transparent border-b-2 ${
                        error ? "border-eva-red" : "border-eva-orange/40"
                      } text-eva-orange font-mono text-sm uppercase tracking-[0.2em] px-2 py-1 w-40 outline-none focus:border-eva-orange transition-colors text-center`}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <span className="text-eva-orange/50 font-mono text-sm">]</span>
                  </div>
                  <button
                    onClick={handleUnlock}
                    className="mt-2 px-6 py-1.5 border border-eva-orange/40 text-eva-orange text-xs uppercase tracking-[0.2em] font-mono hover:bg-eva-orange hover:text-eva-black transition-colors"
                  >
                    AUTHENTICATE
                  </button>
                  {error && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="text-[10px] text-eva-red font-mono uppercase tracking-wider"
                    >
                      ACCESS DENIED
                    </motion.span>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
