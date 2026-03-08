"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export interface SyncRatioChartProps {
  /** Width of the SVG */
  width?: number;
  /** Height of the SVG */
  height?: number;
  /** Frequency of wave A (blue) */
  frequencyA?: number;
  /** Frequency of wave B (magenta) */
  frequencyB?: number;
  /** Amplitude of wave A (0-1) */
  amplitudeA?: number;
  /** Amplitude of wave B (0-1) */
  amplitudeB?: number;
  /** Phase offset of wave B in radians */
  phaseB?: number;
  /** Show grid background */
  showGrid?: boolean;
  /** Title label */
  title?: string;
  /** Animate the waves */
  animated?: boolean;
  /** Optional className */
  className?: string;
}

function generateWavePath(
  width: number,
  height: number,
  frequency: number,
  amplitude: number,
  phase: number,
  points: number = 200
): string {
  const midY = height / 2;
  const amp = (height / 2) * amplitude * 0.8;
  const parts: string[] = [];

  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const y = midY + Math.sin((i / points) * Math.PI * 2 * frequency + phase) * amp;
    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return parts.join(" ");
}

export function SyncRatioChart({
  width = 600,
  height = 200,
  frequencyA = 3,
  frequencyB = 3.5,
  amplitudeA = 0.6,
  amplitudeB = 0.5,
  phaseB = 1.2,
  showGrid = true,
  title,
  animated = true,
  className = "",
}: SyncRatioChartProps) {
  // Generate grid lines
  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const gridSpacing = 20;

    // Vertical lines
    for (let x = 0; x <= width; x += gridSpacing) {
      lines.push({ x1: x, y1: 0, x2: x, y2: height });
    }
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSpacing) {
      lines.push({ x1: 0, y1: y, x2: width, y2: y });
    }

    return lines;
  }, [width, height]);

  // Wave paths
  const pathA = useMemo(
    () => generateWavePath(width, height, frequencyA, amplitudeA, 0),
    [width, height, frequencyA, amplitudeA]
  );

  const pathB = useMemo(
    () => generateWavePath(width, height, frequencyB, amplitudeB, phaseB),
    [width, height, frequencyB, amplitudeB, phaseB]
  );

  // Center axis
  const midY = height / 2;

  return (
    <div className={`bg-eva-black border border-eva-mid-gray ${className}`}>
      {/* Title bar */}
      {title && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-eva-mid-gray bg-eva-dark-gray">
          <span
            className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {title}
          </span>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-eva-cyan inline-block" />
              <span className="text-eva-cyan">WAVE-A</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-eva-magenta inline-block" />
              <span className="text-eva-magenta">WAVE-B</span>
            </span>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          className="overflow-visible"
        >
          {/* Grid */}
          {showGrid &&
            gridLines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#00FF00"
                strokeWidth="0.3"
                opacity="0.12"
              />
            ))}

          {/* Center axis (heavier) */}
          <line
            x1={0}
            y1={midY}
            x2={width}
            y2={midY}
            stroke="#00FF00"
            strokeWidth="0.6"
            opacity="0.25"
          />

          {/* Wave A (cyan/blue) */}
          <motion.path
            d={pathA}
            fill="none"
            stroke="#00FFFF"
            strokeWidth="1.5"
            opacity="0.9"
            initial={animated ? { pathLength: 0 } : undefined}
            animate={animated ? { pathLength: 1 } : undefined}
            transition={animated ? { duration: 1.5, ease: "easeOut" } : undefined}
            style={{
              filter: "drop-shadow(0 0 3px rgba(0, 255, 255, 0.5))",
            }}
          />

          {/* Wave B (magenta) */}
          <motion.path
            d={pathB}
            fill="none"
            stroke="#FF00FF"
            strokeWidth="1.5"
            opacity="0.9"
            initial={animated ? { pathLength: 0 } : undefined}
            animate={animated ? { pathLength: 1 } : undefined}
            transition={
              animated ? { duration: 1.5, ease: "easeOut", delay: 0.3 } : undefined
            }
            style={{
              filter: "drop-shadow(0 0 3px rgba(255, 0, 255, 0.5))",
            }}
          />

          {/* Axis labels */}
          <text x="4" y="12" fontSize="8" fill="#333" fontFamily="var(--font-eva-mono)">
            +1.0
          </text>
          <text x="4" y={midY + 3} fontSize="8" fill="#333" fontFamily="var(--font-eva-mono)">
            0.0
          </text>
          <text x="4" y={height - 4} fontSize="8" fill="#333" fontFamily="var(--font-eva-mono)">
            -1.0
          </text>
        </svg>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-1 border-t border-eva-mid-gray bg-eva-dark-gray text-[10px] font-mono text-eva-mid-gray">
        <span>
          FREQ: {frequencyA.toFixed(1)}Hz / {frequencyB.toFixed(1)}Hz
        </span>
        <span>
          AMP: {(amplitudeA * 100).toFixed(0)}% / {(amplitudeB * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
