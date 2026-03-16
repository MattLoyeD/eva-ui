import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (typeof prop === "string") {
          return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
            const {
              animate,
              initial,
              exit,
              transition,
              whileHover,
              whileTap,
              layout,
              ...rest
            } = props;
            return React.createElement(prop, { ...rest, ref });
          });
        }
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useReducedMotion: () => false,
}));
