"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const displayFont = { fontFamily: "var(--font-nerv-display)" };

const exampleLinks = [
  { href: "/examples", label: "INDEX", code: "00" },
  { href: "/examples/dashboard", label: "OPS GRID", code: "01" },
  { href: "/examples/realtime", label: "MONITOR", code: "02" },
  { href: "/examples/comms", label: "COMMS", code: "03" },
  { href: "/examples/report", label: "REPORT", code: "04" },
  { href: "/examples/pilots", label: "PERSONNEL", code: "05" },
  { href: "/examples/files", label: "FILES", code: "06" },
  { href: "/examples/form", label: "DISPATCH", code: "07" },
  { href: "/examples/help", label: "HELPDESK", code: "08" },
  { href: "/examples/auth/login", label: "LOGIN", code: "09" },
  { href: "/examples/auth/register", label: "REGISTER", code: "10" },
  { href: "/examples/blog", label: "BRIEFING", code: "11" },
  { href: "/examples/inventory", label: "LOGISTICS", code: "12" },
  { href: "/examples/landing", label: "LIBRARY", code: "13" },
  { href: "/examples/splash", label: "SPLASH", code: "14" },
  { href: "/examples/saas", label: "PROCUREMENT", code: "15" },
  { href: "/examples/empty", label: "EMPTY", code: "16" },
  { href: "/examples/error", label: "ERROR", code: "17" },
  { href: "/examples/surveillance", label: "WATCHGRID", code: "18" },
];

function ExampleRail({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2">
      {exampleLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`group shrink-0 border px-2.5 py-1.5 transition-colors ${
              isActive
                ? "border-nerv-orange bg-nerv-orange/10 text-nerv-orange"
                : "border-nerv-mid-gray/40 bg-nerv-black/70 text-nerv-white/50 hover:border-nerv-orange/40 hover:text-nerv-orange"
            }`}
            style={displayFont}
          >
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-[9px] opacity-45">{link.code}</span>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase">
                {link.label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function ExamplesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const isFullscreenRoute =
    normalizedPathname === "/examples/splash";

  const activeLabel = useMemo(() => {
    return exampleLinks.find((link) => link.href === normalizedPathname)?.label ?? "SYSTEM";
  }, [normalizedPathname]);

  if (isFullscreenRoute) {
    return children;
  }

  return (
    <div className="min-h-screen bg-nerv-black nerv-page-shell">
      <header className="nerv-topbar">
        <div className="nerv-page-frame">
          <div className="flex min-h-14 items-center justify-between gap-4 py-2">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/"
                className="border border-nerv-orange/30 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-nerv-orange transition-colors hover:border-nerv-orange hover:bg-nerv-orange/10"
                style={displayFont}
              >
                Command
              </Link>

              <div className="min-w-0">
                <div
                  className="truncate text-[10px] uppercase tracking-[0.24em] text-nerv-white/35"
                  style={displayFont}
                >
                  NERV Example Network
                </div>
                <div
                  className="truncate text-[13px] font-bold uppercase tracking-[0.18em] text-nerv-orange"
                  style={displayFont}
                >
                  {activeLabel}
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/docs"
                className="border border-nerv-cyan/30 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-nerv-cyan transition-colors hover:border-nerv-cyan hover:bg-nerv-cyan/10"
                style={displayFont}
              >
                Docs
              </Link>
              <Link
                href="/examples"
                className="border border-nerv-mid-gray/50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-nerv-white/50 transition-colors hover:border-nerv-orange/40 hover:text-nerv-orange"
                style={displayFont}
              >
                Catalog
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center border border-nerv-orange/30 text-nerv-orange transition-colors hover:border-nerv-orange hover:bg-nerv-orange/10 md:hidden"
              aria-label="Toggle navigation menu"
            >
              <div className="flex flex-col gap-1">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </div>
            </button>
          </div>

          <div className="hidden border-t border-nerv-orange/10 md:block">
            <ExampleRail pathname={normalizedPathname} />
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-nerv-orange/10 bg-nerv-black/95 md:hidden">
            <div className="nerv-page-frame py-3">
              <div className="mb-3 flex items-center gap-2">
                <Link
                  href="/docs"
                  onClick={() => setMobileOpen(false)}
                  className="border border-nerv-cyan/30 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-nerv-cyan"
                  style={displayFont}
                >
                  Docs
                </Link>
                <Link
                  href="/examples"
                  onClick={() => setMobileOpen(false)}
                  className="border border-nerv-mid-gray/50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-nerv-white/55"
                  style={displayFont}
                >
                  Catalog
                </Link>
              </div>
              <ExampleRail pathname={normalizedPathname} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <div className="pb-8">{children}</div>
    </div>
  );
}
