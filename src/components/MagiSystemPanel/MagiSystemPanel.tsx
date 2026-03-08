"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type MagiStatus = "idle" | "computing" | "accepted" | "rejected";

export interface MagiSystemPanelProps {
  /** Status of MELCHIOR-1 */
  melchior?: MagiStatus;
  /** Status of BALTHASAR-2 */
  balthasar?: MagiStatus;
  /** Status of CASPER-3 */
  casper?: MagiStatus;
  /** Title label */
  title?: string;
  /** Optional className */
  className?: string;
}

// Fake code lines for the "computing" state
const codeLines = [
  "0x7F3A >> PATTERN_ANALYSIS",
  "if (waveform.type === BLUE) {",
  "  exec PRIORITY_ALPHA;",
  "  sync_rate = calc(0.4123);",
  "}",
  "SIGNAL_PROC :: 0xAF02",
  "return MAGI_CONSENSUS;",
  "await harmonics.verify();",
  "deploy AT_FIELD_BARRIER;",
  "scan SECTOR_7G :: pass",
  "LCL_PRESSURE.normalize();",
  "PILOT_SYNC :: fluctuating",
  "OVERRIDE :: pending auth",
  "mem_alloc(PRIBNOW_BOX);",
  "NEURAL_LINK :: stable",
];

function MagiColumn({
  name,
  index,
  status,
}: {
  name: string;
  index: number;
  status: MagiStatus;
}) {
  const [scrollLines, setScrollLines] = useState<string[]>([]);

  // Generate scrolling code lines for "computing"
  useEffect(() => {
    if (status !== "computing") {
      setScrollLines([]);
      return;
    }

    const interval = setInterval(() => {
      setScrollLines((prev) => {
        const next = [
          ...prev,
          codeLines[Math.floor(Math.random() * codeLines.length)],
        ];
        return next.slice(-20);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [status]);

  const statusColor =
    status === "accepted"
      ? "text-eva-orange"
      : status === "rejected"
        ? "text-eva-red"
        : status === "computing"
          ? "text-eva-cyan"
          : "text-eva-mid-gray";

  const statusLabel =
    status === "accepted"
      ? "APPROVED"
      : status === "rejected"
        ? "REJECTED"
        : status === "computing"
          ? "COMPUTING..."
          : "STANDBY";

  return (
    <div className="flex flex-col border border-eva-mid-gray bg-eva-black overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-eva-mid-gray bg-eva-dark-gray">
        <span
          className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          {name}
        </span>
        <span className="text-[10px] font-mono text-eva-mid-gray">
          0{index + 1}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-[200px] relative">
        {/* IDLE state */}
        {status === "idle" && (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center">
              <div className="text-2xl font-mono text-eva-mid-gray/40 mb-2">
                —
              </div>
              <div className="text-xs font-mono text-eva-mid-gray/60 uppercase tracking-wider">
                STANDBY
              </div>
            </div>
          </div>
        )}

        {/* COMPUTING state — scrolling code */}
        {status === "computing" && (
          <div className="h-full overflow-hidden p-2">
            <div className="space-y-0.5">
              {scrollLines.map((line, i) => (
                <motion.div
                  key={`${i}-${line}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i === scrollLines.length - 1 ? 1 : 0.4, x: 0 }}
                  className="text-[10px] font-mono text-eva-cyan whitespace-nowrap"
                >
                  {line}
                </motion.div>
              ))}
            </div>
            {/* Scanning bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-eva-cyan/50"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        )}

        {/* ACCEPTED state */}
        {status === "accepted" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full bg-eva-orange"
          >
            <span
              className="text-3xl font-black uppercase tracking-[0.1em] text-eva-black"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              APPROVE
            </span>
          </motion.div>
        )}

        {/* REJECTED state */}
        {status === "rejected" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="flex items-center justify-center h-full bg-eva-red"
          >
            <span
              className="text-3xl font-black uppercase tracking-[0.1em] text-eva-black"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              REJECT
            </span>
          </motion.div>
        )}
      </div>

      {/* Footer status */}
      <div
        className={`flex items-center justify-center px-3 py-1.5 border-t border-eva-mid-gray bg-eva-dark-gray ${statusColor}`}
      >
        <motion.span
          className="text-[10px] font-mono font-bold uppercase tracking-wider"
          animate={
            status === "computing" ? { opacity: [1, 0.4, 1] } : {}
          }
          transition={
            status === "computing"
              ? { duration: 1, repeat: Infinity }
              : {}
          }
        >
          {statusLabel}
        </motion.span>
      </div>
    </div>
  );
}

export function MagiSystemPanel({
  melchior = "idle",
  balthasar = "idle",
  casper = "idle",
  title = "MAGI SUPER COMPUTER SYSTEM",
  className = "",
}: MagiSystemPanelProps) {
  return (
    <div className={`bg-eva-black ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between px-4 py-2 border border-eva-mid-gray border-b-0 bg-eva-dark-gray">
        <span
          className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          {title}
        </span>
        <div className="flex gap-1.5">
          {[melchior, balthasar, casper].map((s, i) => (
            <div
              key={i}
              className={`w-2 h-2 ${
                s === "accepted"
                  ? "bg-eva-orange"
                  : s === "rejected"
                    ? "bg-eva-red"
                    : s === "computing"
                      ? "bg-eva-cyan"
                      : "bg-eva-mid-gray"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-3 gap-px bg-eva-mid-gray border border-eva-mid-gray">
        <MagiColumn name="MELCHIOR" index={0} status={melchior} />
        <MagiColumn name="BALTHASAR" index={1} status={balthasar} />
        <MagiColumn name="CASPER" index={2} status={casper} />
      </div>
    </div>
  );
}
