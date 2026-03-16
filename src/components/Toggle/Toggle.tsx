"use client";

import { type HTMLAttributes, forwardRef } from "react";

export interface ToggleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  /** Controlled checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text (displayed uppercase) */
  label?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

const colorMap = {
  orange: {
    active: "bg-nerv-orange",
    text: "text-nerv-orange",
    border: "border-nerv-orange",
    label: "text-nerv-orange",
  },
  green: {
    active: "bg-nerv-green",
    text: "text-nerv-green",
    border: "border-nerv-green",
    label: "text-nerv-green",
  },
  cyan: {
    active: "bg-nerv-cyan",
    text: "text-nerv-cyan",
    border: "border-nerv-cyan",
    label: "text-nerv-cyan",
  },
};

const sizeMap = {
  sm: { track: "w-12 h-5", thumb: "w-5 h-3", text: "text-[8px]" },
  md: { track: "w-16 h-7", thumb: "w-7 h-5", text: "text-[10px]" },
  lg: { track: "w-20 h-9", thumb: "w-9 h-7", text: "text-xs" },
};

export const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
  function Toggle(
    {
      checked = false,
      onChange,
      label,
      color = "orange",
      size = "md",
      disabled = false,
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const s = sizeMap[size];

    const handleClick = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-2 ${className}`}
        {...rest}
      >
        {/* Toggle track */}
        <div
          role="switch"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`
            relative ${s.track} border
            ${checked ? c.border : "border-nerv-mid-gray"}
            bg-nerv-black
            ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
            transition-all duration-150 select-none
            flex items-center
          `}
        >
          {/* OFF text */}
          <span
            className={`
              absolute left-1 ${s.text} uppercase font-bold tracking-wider
              ${checked ? "opacity-20" : "opacity-60"} text-nerv-mid-gray
            `}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
            aria-hidden="true"
          >
            OFF
          </span>

          {/* ON text */}
          <span
            className={`
              absolute right-1 ${s.text} uppercase font-bold tracking-wider
              ${checked ? `${c.text} opacity-100` : "opacity-0"}
            `}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
            aria-hidden="true"
          >
            ON
          </span>

          {/* Sliding indicator */}
          <span
            className={`
              absolute top-0.5 ${s.thumb}
              transition-all duration-150
              ${checked ? `${c.active} right-0.5 left-auto` : "bg-nerv-mid-gray left-0.5 right-auto"}
            `}
            style={{
              boxShadow: checked
                ? `0 0 6px ${color === "orange" ? "#FF6A00" : color === "green" ? "#00FF00" : "#00FFFF"}`
                : "none",
            }}
          />
        </div>

        {/* Label */}
        {label && (
          <span
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.label}`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);
