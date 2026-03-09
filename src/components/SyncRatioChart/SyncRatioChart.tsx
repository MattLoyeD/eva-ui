"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface SyncRatioChartProps {
  /** Frequency of wave A (data-blue/cyan) */
  frequencyA?: number;
  /** Frequency of wave B (magenta-wave) */
  frequencyB?: number;
  /** Amplitude of wave A in pixels */
  amplitudeA?: number;
  /** Amplitude of wave B in pixels */
  amplitudeB?: number;
  /** Phase offset of wave A in radians */
  phaseA?: number;
  /** Phase offset of wave B in radians */
  phaseB?: number;
  /** Show grid background */
  showGrid?: boolean;
  /** Title label */
  title?: string;
  /** Animate the wave paths drawing in */
  animated?: boolean;
  /** Optional className */
  className?: string;
}

/**
 * Generates an SVG path string for a sine wave.
 * Uses 100 sample points for smooth rendering.
 */
const generateSineWavePath = (
  width: number,
  height: number,
  phase: number,
  amplitude: number,
  frequency: number
): string => {
  let path = "";
  const points = 100;
  const step = width / points;
  const centerY = height / 2;

  for (let i = 0; i <= points; i++) {
    const x = i * step;
    const y = centerY + amplitude * Math.sin(x * frequency + phase);

    if (i === 0) {
      path += `M ${x},${y}`;
    } else {
      path += ` L ${x},${y}`;
    }
  }

  return path;
};

export function SyncRatioChart({
  frequencyA = 0.04,
  frequencyB = 0.055,
  amplitudeA = 50,
  amplitudeB = 40,
  phaseA = 0,
  phaseB = 1.2,
  showGrid = true,
  title,
  animated = true,
  className = "",
}: SyncRatioChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 200 });

  // Observe container size so SVG fills 100%
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width, height } = dimensions;

  // Generate grid lines
  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const gridSpacing = 20;

    for (let x = 0; x <= width; x += gridSpacing) {
      lines.push({ x1: x, y1: 0, x2: x, y2: height });
    }
    for (let y = 0; y <= height; y += gridSpacing) {
      lines.push({ x1: 0, y1: y, x2: width, y2: y });
    }

    return lines;
  }, [width, height]);

  // Wave paths using the exact generateSineWavePath function
  const pathA = useMemo(
    () => generateSineWavePath(width, height, phaseA, amplitudeA, frequencyA),
    [width, height, phaseA, amplitudeA, frequencyA]
  );

  const pathB = useMemo(
    () => generateSineWavePath(width, height, phaseB, amplitudeB, frequencyB),
    [width, height, phaseB, amplitudeB, frequencyB]
  );

  const centerY = height / 2;

  return (
    <div className={`bg-eva-black border border-eva-mid-gray flex flex-col ${className}`}>
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

      {/* Chart — fills container */}
      <div ref={containerRef} className="flex-1 min-h-[120px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          className="block"
        >
          {/* Grid (grid-green) */}
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

          {/* Center axis (heavier grid-green line) */}
          <line
            x1={0}
            y1={centerY}
            x2={width}
            y2={centerY}
            stroke="#00FF00"
            strokeWidth="0.6"
            opacity="0.25"
          />

          {/* Wave A — data-blue (cyan) */}
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

          {/* Wave B — magenta-wave */}
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
          <text x="4" y="12" fontSize="8" fill="#333333" fontFamily="var(--font-eva-mono)">
            +1.0
          </text>
          <text x="4" y={centerY + 3} fontSize="8" fill="#333333" fontFamily="var(--font-eva-mono)">
            0.0
          </text>
          <text x="4" y={height - 4} fontSize="8" fill="#333333" fontFamily="var(--font-eva-mono)">
            -1.0
          </text>
        </svg>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-1 border-t border-eva-mid-gray bg-eva-dark-gray text-[10px] font-mono text-eva-mid-gray">
        <span>
          FREQ: {frequencyA.toFixed(3)}Hz / {frequencyB.toFixed(3)}Hz
        </span>
        <span>
          AMP: {amplitudeA.toFixed(0)}px / {amplitudeB.toFixed(0)}px
        </span>
      </div>
    </div>
  );
}
