"use client";

import { useContext } from "react";
import { ToastContext, type ToastContextValue } from "./ToastContext";

/**
 * Hook to trigger NERV-style toast notifications from anywhere in the app.
 *
 * Must be used inside an `<EvaToastProvider>`.
 *
 * @example
 * ```tsx
 * const { addToast } = useToast();
 * addToast({ message: "PATTERN BLUE DETECTED", variant: "critical" });
 * ```
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error(
      "[EvaUI] useToast must be used within an <EvaToastProvider>."
    );
  }
  return ctx;
}
