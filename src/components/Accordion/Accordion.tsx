"use client";

import { forwardRef, useState, createContext, useContext, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

// --- Types ---

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  /** Accordion items */
  children: ReactNode;
  /** Allow multiple items open at once */
  multiple?: boolean;
  /** Default open item IDs */
  defaultOpen?: string[];
  /** Additional CSS classes */
  className?: string;
}

export interface AccordionItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className" | "id" | "title" | "color"> {
  /** Unique item identifier */
  id: string;
  /** Header label */
  title: string;
  /** Collapsible content */
  children: ReactNode;
  /** Header color */
  color?: "cyan" | "white" | "orange" | "green";
}

// --- Context ---

interface AccordionContextValue {
  openIds: Set<string>;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const COLOR_MAP: Record<string, string> = {
  cyan: "text-nerv-cyan",
  white: "text-nerv-white",
  orange: "text-nerv-orange",
  green: "text-nerv-green",
};

// --- Accordion Container ---

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      children,
      multiple = false,
      defaultOpen = [],
      className = "",
      ...rest
    },
    ref
  ) {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

    const toggle = useCallback(
      (id: string) => {
        setOpenIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            if (!multiple) next.clear();
            next.add(id);
          }
          return next;
        });
      },
      [multiple]
    );

    return (
      <AccordionContext.Provider value={{ openIds, toggle }}>
        <div
          ref={ref}
          className={`border border-nerv-mid-gray bg-nerv-black ${className}`}
          {...rest}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

// --- Accordion Item ---

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(
    {
      id,
      title,
      children,
      color = "cyan",
      ...rest
    },
    ref
  ) {
    const ctx = useContext(AccordionContext);
    if (!ctx) {
      throw new Error("[NERV-UI] AccordionItem must be used inside Accordion.");
    }

    const isOpen = ctx.openIds.has(id);
    const textColor = COLOR_MAP[color] ?? COLOR_MAP.cyan;

    return (
      <div ref={ref} className="border-b border-nerv-mid-gray/40 last:border-b-0" {...rest}>
        {/* Header -- clickable */}
        <button
          onClick={() => ctx.toggle(id)}
          className="w-full flex items-center justify-between px-4 py-3 text-left
            hover:bg-nerv-white/[0.03] transition-colors cursor-pointer group"
        >
          <span
            className={`text-xs uppercase tracking-[0.15em] ${textColor}`}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            {title}
          </span>

          {/* Terminal-style toggle icon */}
          <span
            className="text-[10px] text-nerv-white/50 group-hover:text-nerv-white/80 transition-colors"
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            {isOpen ? "[ - ]" : "[ + ]"}
          </span>
        </button>

        {/* Collapsible content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={`content-${id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "linear" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 border-t border-nerv-mid-gray/20">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
