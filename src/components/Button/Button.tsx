"use client";

import { forwardRef, type ReactNode, type MouseEventHandler } from "react";
import { motion } from "framer-motion";

type MotionSafeButtonAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "type" | "disabled" | "onClick" | "className" | "children" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface ButtonProps extends MotionSafeButtonAttributes {
  /** Visual variant */
  variant?: "primary" | "danger" | "ghost" | "terminal";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Show loading/processing state */
  loading?: boolean;
  /** Full-width button */
  fullWidth?: boolean;
  /** Button content */
  children?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Additional class names */
  className?: string;
  /** HTML type attribute */
  type?: "button" | "submit" | "reset";
}

const variants = {
  primary: {
    base: "border border-nerv-orange/60 bg-nerv-black text-nerv-orange",
    hover: "hover:border-nerv-orange hover:bg-nerv-orange/10",
    active: "active:border-nerv-amber active:text-nerv-amber",
  },
  danger: {
    base: "border border-nerv-red/70 bg-nerv-black text-nerv-red",
    hover: "hover:border-nerv-red hover:bg-nerv-red/10",
    active: "active:border-nerv-red active:text-nerv-white",
  },
  ghost: {
    base: "border border-nerv-mid-gray/60 bg-transparent text-nerv-white/72",
    hover: "hover:border-nerv-orange/40 hover:text-nerv-orange hover:bg-nerv-orange/8",
    active: "active:border-nerv-orange/60",
  },
  terminal: {
    base: "border border-nerv-green/70 bg-nerv-black text-nerv-green",
    hover: "hover:border-nerv-green hover:bg-nerv-green/10",
    active: "active:border-nerv-green active:text-nerv-white",
  },
};

const sizes = {
  sm: "min-h-8 px-3 py-1.5 text-[11px]",
  md: "min-h-10 px-4 py-2 text-xs",
  lg: "min-h-12 px-5 py-2.5 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      children,
      disabled,
      onClick,
      className = "",
      type = "button",
      ...rest
    },
    ref
  ) {
    const v = variants[variant];

    return (
      <motion.button
        ref={ref}
        {...rest}
        type={type}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        className={`
          relative overflow-hidden uppercase tracking-[0.2em] font-bold
          transition-colors duration-100 cursor-pointer
          select-none outline-none
          disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none
          ${v.base} ${v.hover} ${v.active}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        style={{
          fontFamily: "var(--font-nerv-display)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
        }}
        disabled={disabled || loading}
        onClick={onClick}
        aria-busy={loading ? true : undefined}
        aria-disabled={loading ? true : undefined}
      >
        <span className="absolute inset-x-2 top-0 h-px bg-current opacity-24" />
        <span className="absolute inset-x-2 bottom-0 h-px bg-current opacity-16" />

        {/* Loading indicator */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 bg-current"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          </span>
        )}

        {/* Content */}
        <span className={`relative z-10 inline-flex items-center gap-2 ${loading ? "invisible" : ""}`}>
          <span className="inline-block h-1.5 w-1.5 border border-current opacity-55" />
          <span className={loading ? "invisible" : ""}>{children}</span>
        </span>

        <span className="absolute left-0 top-0 bottom-0 w-1 bg-current opacity-[0.14]" />
      </motion.button>
    );
  }
);
