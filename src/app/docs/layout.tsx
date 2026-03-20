import type { ReactNode } from "react";
import { DocsCommandPalette } from "@/components/docs/DocsCommandPalette";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

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
      className="flex h-9 w-9 items-center justify-center border border-nerv-mid-gray/70 text-nerv-white/58 transition-colors hover:border-nerv-orange hover:text-nerv-orange"
    >
      {children}
    </a>
  );
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-nerv-black text-nerv-white">
      <DocsSidebar />
      <main className="docs-main min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,153,0,0.07),transparent_24%),linear-gradient(180deg,#050505_0%,#020202_100%)] pt-14 lg:pt-0">
        <div className="border-b border-nerv-mid-gray/70 px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.26em] text-nerv-green"
                style={{ fontFamily: "var(--font-nerv-mono)" }}
              >
                doc.access // online
              </div>
              <div
                className="mt-1 text-lg uppercase tracking-[0.18em] text-nerv-orange"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                NERV COMPONENT INSPECTION
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <HeaderIconLink href="https://github.com/mdrbx/nerv-ui" label="Open GitHub repository">
                <GitHubIcon />
              </HeaderIconLink>
              <HeaderIconLink href="https://www.npmjs.com/package/@mdrbx/nerv-ui" label="Open npm package">
                <NpmIcon />
              </HeaderIconLink>
              <DocsCommandPalette />
              <div
                className="border border-nerv-mid-gray/70 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-nerv-white/45"
                style={{ fontFamily: "var(--font-nerv-mono)" }}
              >
                route integrity monitored
              </div>
            </div>
          </div>
        </div>
        <div
          className="
            docs-content
            mx-auto max-w-[82rem] px-4 py-6 sm:px-6 lg:px-10 lg:py-8
          "
          style={{ fontFamily: "var(--font-nerv-body)" }}
        >
          <article className="docs-mdx">{children}</article>
        </div>
      </main>
    </div>
  );
}
