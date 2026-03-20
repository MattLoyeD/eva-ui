"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const displayFont = { fontFamily: "var(--font-nerv-display)" };

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
      <path d="M8 0.2a8 8 0 0 0-2.53 15.59c0.4 0.07 0.55-0.17 0.55-0.39v-1.37C3.78 14.52 3.3 13 3.3 13c-0.36-0.92-0.88-1.16-0.88-1.16-0.72-0.49 0.05-0.48 0.05-0.48 0.79 0.06 1.21 0.82 1.21 0.82 0.71 1.2 1.85 0.86 2.3 0.66 0.07-0.51 0.28-0.86 0.5-1.06-1.78-0.2-3.65-0.89-3.65-3.96 0-0.88 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.22 2.2 0.82a7.54 7.54 0 0 1 4 0c1.52-1.04 2.19-0.82 2.19-0.82 0.45 1.1 0.17 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.08-1.88 3.75-3.67 3.95 0.29 0.25 0.54 0.74 0.54 1.49v2.21c0 0.22 0.14 0.47 0.55 0.39A8 8 0 0 0 8 0.2Z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
      <path d="M1 4.5h14v7H8.7V6.8H7.2v4.7H5.7V6.8H4.2v4.7H1V4.5Zm9.1 2.3v3.1h1.2V8h1.2v1.9h1.2V6.8H10.1Z" />
    </svg>
  );
}

function HeaderIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center border border-nerv-mid-gray/50 text-nerv-white/55 transition-colors hover:border-nerv-orange hover:text-nerv-orange"
    >
      {children}
    </a>
  );
}

const exampleLinks = [
  { href: "/examples", label: "INDEX", code: "00" },
  { href: "/examples/command-center", label: "COMMAND", code: "01" },
  { href: "/examples/dashboard", label: "OPS GRID", code: "02" },
  { href: "/examples/realtime", label: "MONITOR", code: "03" },
  { href: "/examples/comms", label: "COMMS", code: "04" },
  { href: "/examples/report", label: "REPORT", code: "05" },
  { href: "/examples/pilots", label: "PERSONNEL", code: "06" },
  { href: "/examples/files", label: "FILES", code: "07" },
  { href: "/examples/form", label: "DISPATCH", code: "08" },
  { href: "/examples/help", label: "HELPDESK", code: "09" },
  { href: "/examples/auth/login", label: "LOGIN", code: "10" },
  { href: "/examples/auth/register", label: "REGISTER", code: "11" },
  { href: "/examples/blog", label: "BRIEFING", code: "12" },
  { href: "/examples/inventory", label: "LOGISTICS", code: "13" },
  { href: "/examples/landing", label: "LIBRARY", code: "14" },
  { href: "/examples/splash", label: "SPLASH", code: "15" },
  { href: "/examples/saas", label: "PROCUREMENT", code: "16" },
  { href: "/examples/empty", label: "EMPTY", code: "17" },
  { href: "/examples/error", label: "ERROR", code: "18" },
  { href: "/examples/surveillance", label: "WATCHGRID", code: "19" },
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
                href="/examples/command-center"
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
              <HeaderIconLink href="https://github.com/mdrbx/nerv-ui" label="Open GitHub repository">
                <GitHubIcon />
              </HeaderIconLink>
              <HeaderIconLink href="https://www.npmjs.com/package/@mdrbx/nerv-ui" label="Open npm package">
                <NpmIcon />
              </HeaderIconLink>
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
                <HeaderIconLink href="https://github.com/mdrbx/nerv-ui" label="Open GitHub repository">
                  <GitHubIcon />
                </HeaderIconLink>
                <HeaderIconLink href="https://www.npmjs.com/package/@mdrbx/nerv-ui" label="Open npm package">
                  <NpmIcon />
                </HeaderIconLink>
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
