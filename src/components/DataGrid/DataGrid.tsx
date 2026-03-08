"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface DataGridColumn {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface DataGridProps {
  /** Column definitions */
  columns: DataGridColumn[];
  /** Row data (array of objects keyed by column.key) */
  data: Record<string, string | number>[];
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Enable auto-scrolling (log mode) */
  autoScroll?: boolean;
  /** Auto-scroll speed in pixels per second */
  scrollSpeed?: number;
  /** Max visible height */
  maxHeight?: string;
  /** Title label */
  title?: string;
  /** Show row index column */
  showIndex?: boolean;
  /** Optional className */
  className?: string;
}

const colorMap = {
  orange: {
    header: "bg-eva-orange text-eva-black",
    row: "text-eva-orange",
    hoverRow: "hover:bg-eva-orange hover:text-eva-black",
    border: "border-eva-orange/20",
  },
  green: {
    header: "bg-eva-green text-eva-black",
    row: "text-eva-green",
    hoverRow: "hover:bg-eva-green hover:text-eva-black",
    border: "border-eva-green/20",
  },
  cyan: {
    header: "bg-eva-cyan text-eva-black",
    row: "text-eva-cyan",
    hoverRow: "hover:bg-eva-cyan hover:text-eva-black",
    border: "border-eva-cyan/20",
  },
};

export function DataGrid({
  columns,
  data,
  color = "green",
  autoScroll = false,
  scrollSpeed = 30,
  maxHeight = "400px",
  title,
  showIndex = false,
  className = "",
}: DataGridProps) {
  const c = colorMap[color];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || hovering) return;

    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      el.scrollTop += 1;
      // Reset to top when reached bottom
      if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
        el.scrollTop = 0;
      }
    }, 1000 / scrollSpeed);

    return () => clearInterval(interval);
  }, [autoScroll, scrollSpeed, hovering]);

  return (
    <div className={`bg-eva-black border border-eva-mid-gray ${className}`}>
      {/* Title bar */}
      {title && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-eva-mid-gray bg-eva-dark-gray">
          <span
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.row}`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {title}
          </span>
          <span className="text-[10px] font-mono text-eva-mid-gray">
            {data.length} ENTRIES
          </span>
        </div>
      )}

      {/* Table */}
      <div
        ref={scrollRef}
        className="overflow-auto"
        style={{ maxHeight }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <table className="w-full border-collapse" style={{ fontFamily: "var(--font-eva-mono)" }}>
          {/* Header */}
          <thead className="sticky top-0 z-10">
            <tr className={c.header}>
              {showIndex && (
                <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-left border-r border-black/20 w-12">
                  #
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold border-r border-black/20 last:border-r-0`}
                  style={{
                    width: col.width,
                    textAlign: col.align || "left",
                    fontFamily: "var(--font-eva-display)",
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`
                  ${c.row} ${c.hoverRow}
                  border-b border-eva-mid-gray/30
                  transition-colors duration-75 cursor-default text-xs
                `}
              >
                {showIndex && (
                  <td className="px-3 py-1.5 text-eva-mid-gray border-r border-eva-mid-gray/20">
                    {String(i + 1).padStart(3, "0")}
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 py-1.5 border-r border-eva-mid-gray/20 last:border-r-0 whitespace-nowrap"
                    style={{ textAlign: col.align || "left" }}
                  >
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between px-3 py-1 border-t border-eva-mid-gray bg-eva-dark-gray text-[10px] font-mono text-eva-mid-gray">
        <span>ROWS: {data.length}</span>
        {autoScroll && (
          <span className={hovering ? "text-eva-orange" : ""}>
            {hovering ? "SCROLL PAUSED" : "AUTO-SCROLL ACTIVE"}
          </span>
        )}
      </div>
    </div>
  );
}
