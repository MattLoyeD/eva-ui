"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface NavigationTab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface NavigationTabsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "color" | "direction"> {
  /** Tab definitions */
  tabs: NavigationTab[];
  /** Currently active tab ID */
  activeTab: string;
  /** Called when a tab is clicked */
  onTabChange: (tabId: string) => void;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Optional className */
  className?: string;
}

const colorMap = {
  orange: {
    active: "bg-nerv-black text-nerv-orange border-nerv-orange",
    inactive: "bg-nerv-dark-gray text-nerv-mid-gray border-nerv-mid-gray hover:text-nerv-orange hover:border-nerv-orange/50",
    indicator: "bg-nerv-orange",
  },
  green: {
    active: "bg-nerv-black text-nerv-green border-nerv-green",
    inactive: "bg-nerv-dark-gray text-nerv-mid-gray border-nerv-mid-gray hover:text-nerv-green hover:border-nerv-green/50",
    indicator: "bg-nerv-green",
  },
  cyan: {
    active: "bg-nerv-black text-nerv-cyan border-nerv-cyan",
    inactive: "bg-nerv-dark-gray text-nerv-mid-gray border-nerv-mid-gray hover:text-nerv-cyan hover:border-nerv-cyan/50",
    indicator: "bg-nerv-cyan",
  },
};

export const NavigationTabs = forwardRef<HTMLElement, NavigationTabsProps>(
  function NavigationTabs(
    {
      tabs,
      activeTab,
      onTabChange,
      direction = "horizontal",
      color = "orange",
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const isVertical = direction === "vertical";

    return (
      <nav
        ref={ref}
        className={`
          flex ${isVertical ? "flex-col" : "flex-row"}
          ${className}
        `}
        role="tablist"
        {...rest}
      >
        {tabs.map((tab, i) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              className={`
                relative cursor-pointer select-none
                uppercase tracking-[0.15em] text-xs font-bold
                transition-colors duration-100 whitespace-nowrap
                disabled:opacity-30 disabled:cursor-not-allowed
                flex items-center overflow-hidden
                ${isVertical
                  ? `px-4 py-3 text-left border-l-2 ${isActive ? c.active : c.inactive}`
                  : `px-5 py-2.5 border-b-2 ${isActive ? c.active : c.inactive}`
                }
              `}
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              {/* Classification marker */}
              <span className="opacity-40 mr-2 text-[10px] shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Tab icon */}
              {tab.icon && <span className="mr-1.5 shrink-0">{tab.icon}</span>}

              {/* Label */}
              {tab.label}

              {/* Active status dot (inline) */}
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`ml-2 w-1.5 h-1.5 shrink-0 ${c.indicator}`}
                />
              )}

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId={`activeTab-${tabs[0]?.id ?? "nav"}`}
                  className={`absolute ${c.indicator} ${
                    isVertical
                      ? "left-0 top-0 bottom-0 w-0.5"
                      : "bottom-0 left-0 right-0 h-0.5"
                  }`}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    );
  }
);
