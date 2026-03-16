"use client";

import { createContext, useCallback, useState, type ReactNode } from "react";
import { ToastContainer } from "./ToastContainer";

// ─── Types ───────────────────────────────────────────────

export type ToastVariant = "info" | "success" | "warning" | "error" | "critical";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  /** Auto-dismiss delay in ms (default: 3000) */
  duration: number;
}

export type AddToastPayload = Omit<Toast, "id" | "duration"> & { duration?: number };

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: AddToastPayload) => void;
  removeToast: (id: string) => void;
}

// ─── Context ─────────────────────────────────────────────

export const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────

export interface NervToastProviderProps {
  children: ReactNode;
}

let counter = 0;

export function NervToastProvider({ children }: NervToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((payload: AddToastPayload) => {
    const id = `toast-${Date.now()}-${++counter}`;
    const toast: Toast = {
      id,
      message: payload.message,
      variant: payload.variant,
      duration: payload.duration ?? 3000,
    };
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
