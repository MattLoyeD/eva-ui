"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange" | "color"> {
  /** Total number of items */
  total: number;
  /** Items per page */
  pageSize: number;
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
}

const colorMap = {
  orange: {
    text: "text-nerv-orange",
    border: "border-nerv-orange",
    bg: "bg-nerv-orange",
    hoverBg: "hover:bg-nerv-orange hover:text-nerv-black",
    disabledText: "text-nerv-mid-gray",
    disabledBorder: "border-nerv-mid-gray",
  },
  green: {
    text: "text-nerv-green",
    border: "border-nerv-green",
    bg: "bg-nerv-green",
    hoverBg: "hover:bg-nerv-green hover:text-nerv-black",
    disabledText: "text-nerv-mid-gray",
    disabledBorder: "border-nerv-mid-gray",
  },
  cyan: {
    text: "text-nerv-cyan",
    border: "border-nerv-cyan",
    bg: "bg-nerv-cyan",
    hoverBg: "hover:bg-nerv-cyan hover:text-nerv-black",
    disabledText: "text-nerv-mid-gray",
    disabledBorder: "border-nerv-mid-gray",
  },
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      total,
      pageSize,
      currentPage,
      onPageChange,
      color = "orange",
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const isFirst = currentPage <= 1;
    const isLast = currentPage >= totalPages;

    const pageDisplay = String(currentPage).padStart(2, "0");
    const totalDisplay = String(totalPages).padStart(2, "0");

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={`flex items-center gap-3 ${className}`}
        {...rest}
      >
        {/* Previous button */}
        <button
          type="button"
          onClick={() => !isFirst && onPageChange(currentPage - 1)}
          disabled={isFirst}
          aria-label="Previous page"
          className={`
            px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold
            border transition-colors duration-100 cursor-pointer
            select-none bg-nerv-black
            disabled:opacity-30 disabled:cursor-not-allowed
            ${isFirst ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
          `}
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          &lt;&lt;
        </button>

        {/* LCD page display */}
        <div
          className={`
            px-4 py-1.5 border bg-nerv-black ${c.border}
            flex items-center gap-2
          `}
        >
          <span
            className={`text-[10px] uppercase tracking-[0.15em] ${c.text} opacity-60`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            PAGE
          </span>
          <span
            className={`text-sm font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            {pageDisplay}
          </span>
          <span
            className={`text-xs ${c.text} opacity-40`}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            /
          </span>
          <span
            className={`text-sm font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            {totalDisplay}
          </span>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => !isLast && onPageChange(currentPage + 1)}
          disabled={isLast}
          aria-label="Next page"
          className={`
            px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold
            border transition-colors duration-100 cursor-pointer
            select-none bg-nerv-black
            disabled:opacity-30 disabled:cursor-not-allowed
            ${isLast ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
          `}
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          &gt;&gt;
        </button>
      </nav>
    );
  }
);
