import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "danger";
  title?: string;
  children: ReactNode;
}

const calloutStyles = {
  info: {
    border: "border-nerv-cyan",
    bg: "bg-nerv-cyan/5",
    title: "text-nerv-cyan",
    icon: "i",
  },
  warning: {
    border: "border-nerv-orange",
    bg: "bg-nerv-orange/5",
    title: "text-nerv-orange",
    icon: "!",
  },
  danger: {
    border: "border-nerv-red",
    bg: "bg-nerv-red/5",
    title: "text-nerv-red",
    icon: "!!",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = calloutStyles[type];
  return (
    <div className={`border-l-4 ${s.border} ${s.bg} p-4 mb-6`}>
      {title && (
        <div
          className={`text-xs uppercase tracking-[0.2em] font-bold ${s.title} mb-2`}
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          <span className="mr-2">[{s.icon}]</span>
          {title}
        </div>
      )}
      <div
        className="text-nerv-white text-[13px]"
        style={{ fontFamily: "var(--font-nerv-body)" }}
      >
        {children}
      </div>
    </div>
  );
}
