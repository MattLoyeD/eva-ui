"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

export interface CountdownTimerProps {
  /** Total duration in seconds */
  duration: number;
  /** Whether the timer is running */
  running?: boolean;
  /** Called when timer reaches zero */
  onComplete?: () => void;
  /** Label text */
  label?: string;
  /** Show the INTERNAL BATTERY label */
  showBatteryLabel?: boolean;
  /** Optional className */
  className?: string;
}

function formatTime(totalMs: number): string {
  const totalSeconds = Math.max(0, totalMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const ms = Math.floor((totalMs % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
}

function getTimerColor(remainingMs: number): string {
  if (remainingMs <= 10000) return "text-eva-red";
  if (remainingMs <= 60000) return "text-eva-red";
  return "text-eva-lcd-green";
}

export function CountdownTimer({
  duration,
  running = true,
  onComplete,
  label = "INTERNAL BATTERY",
  showBatteryLabel = true,
  className = "",
}: CountdownTimerProps) {
  const totalMs = duration * 1000;
  const [remaining, setRemaining] = useState(totalMs);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const tick = useCallback(() => {
    setRemaining((prev) => {
      const next = prev - 50;
      if (next <= 0) {
        onCompleteRef.current?.();
        return 0;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, [running, remaining, tick]);

  // Reset when duration changes
  useEffect(() => {
    setRemaining(duration * 1000);
  }, [duration]);

  const color = getTimerColor(remaining);
  const isUrgent = remaining <= 10000;
  const isCritical = remaining <= 60000;
  const percentage = (remaining / totalMs) * 100;

  return (
    <div className={`bg-eva-black border border-eva-mid-gray ${className}`}>
      {/* Header */}
      {showBatteryLabel && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-eva-mid-gray bg-eva-dark-gray">
          <span
            className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {label}
          </span>
          <span className={`text-[10px] font-mono ${color}`}>
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}

      {/* Timer display */}
      <div className="flex items-center justify-center py-6 px-4">
        <motion.div
          className={`text-5xl md:text-6xl font-bold tabular-nums ${color}`}
          style={{ fontFamily: "var(--font-eva-mono)" }}
          animate={
            isUrgent
              ? { opacity: [1, 0, 1] }
              : isCritical
                ? { opacity: [1, 0.6, 1] }
                : {}
          }
          transition={
            isUrgent
              ? { duration: 0.3, repeat: Infinity }
              : isCritical
                ? { duration: 0.8, repeat: Infinity }
                : {}
          }
        >
          {formatTime(remaining)}
        </motion.div>
      </div>

      {/* Battery bar */}
      <div className="px-3 pb-3">
        <div className="h-3 bg-eva-dark-gray border border-eva-mid-gray flex gap-[1px] p-[1px]">
          {Array.from({ length: 20 }, (_, i) => {
            const blockPct = ((i + 1) / 20) * 100;
            const filled = percentage >= blockPct;
            const blockColor =
              blockPct > 75
                ? "bg-eva-lcd-green"
                : blockPct > 25
                  ? "bg-eva-orange"
                  : "bg-eva-red";

            return (
              <div
                key={i}
                className={`flex-1 ${filled ? blockColor : "bg-eva-black/50"}`}
              />
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-1 border-t border-eva-mid-gray bg-eva-dark-gray text-[10px] font-mono text-eva-mid-gray">
        <span>{running ? "ACTIVE" : "PAUSED"}</span>
        <span>ACT. TIME: {formatTime(totalMs - remaining)}</span>
      </div>
    </div>
  );
}
