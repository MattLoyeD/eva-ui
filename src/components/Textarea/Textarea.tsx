"use client";

import {
  type TextareaHTMLAttributes,
  useState,
  forwardRef,
  useId,
} from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "color"> {
  /** Label text (displayed uppercase with // prefix) */
  label?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Error message */
  error?: string;
  /** Helper text */
  hint?: string;
  /** Optional className for the wrapper */
  wrapperClassName?: string;
}

const colorMap = {
  orange: {
    text: "text-nerv-orange",
    border: "border-nerv-orange",
    label: "text-nerv-orange",
  },
  green: {
    text: "text-nerv-green",
    border: "border-nerv-green",
    label: "text-nerv-green",
  },
  cyan: {
    text: "text-nerv-cyan",
    border: "border-nerv-cyan",
    label: "text-nerv-cyan",
  },
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      color = "orange",
      error,
      hint,
      wrapperClassName = "",
      className = "",
      id,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const [focused, setFocused] = useState(false);
    const c = colorMap[color];

    return (
      <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.label}`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            <span className="opacity-50 mr-1">//</span>
            {label}
          </label>
        )}

        {/* Textarea wrapper with brackets */}
        <div className="relative flex items-start">
          {/* Left bracket — appears on focus */}
          <span
            className={`
              text-lg font-mono mr-1 transition-all duration-100 mt-1
              ${focused ? `${c.text} opacity-100 translate-x-0` : "opacity-0 -translate-x-2"}
            `}
          >
            [
          </span>

          {/* Textarea */}
          <textarea
            id={textareaId}
            ref={ref}
            onFocus={(e) => {
              setFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              rest.onBlur?.(e);
            }}
            className={`
              flex-1 bg-nerv-black font-mono resize-vertical min-h-[80px]
              border ${focused ? `border-2 ${c.border}` : "border border-nerv-mid-gray"}
              ${error ? "border-nerv-red" : ""}
              ${c.text} placeholder:text-nerv-mid-gray
              px-4 py-2.5 text-sm
              outline-none transition-all duration-100
              ${className}
            `}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
            {...rest}
          />

          {/* Right bracket — appears on focus */}
          <span
            className={`
              text-lg font-mono ml-1 transition-all duration-100 mt-1
              ${focused ? `${c.text} opacity-100 translate-x-0` : "opacity-0 translate-x-2"}
            `}
          >
            ]
          </span>
        </div>

        {/* Error or hint */}
        {error && (
          <span className="text-xs text-nerv-red font-mono flex items-center gap-1">
            <span className="text-[10px]">!</span> {error}
          </span>
        )}
        {hint && !error && (
          <span className="text-xs text-nerv-mid-gray font-mono">{hint}</span>
        )}
      </div>
    );
  }
);
