"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

const surveillanceHref =
  process.env.NODE_ENV === "production"
    ? "/nerv-ui/examples/surveillance/"
    : "/examples/surveillance/";

export default function HomePage() {
  useEffect(() => {
    window.location.replace(surveillanceHref);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-nerv-black px-4 py-10 text-nerv-white">
      <Script id="root-surveillance-redirect" strategy="beforeInteractive">
        {`window.location.replace(${JSON.stringify(surveillanceHref)});`}
      </Script>
      <div className="w-full max-w-xl border border-nerv-orange/40 bg-[linear-gradient(135deg,rgba(255,153,0,0.1),rgba(0,0,0,0.92)_45%)] p-6 sm:p-8">
        <div
          className="text-[10px] uppercase tracking-[0.26em] text-nerv-green"
          style={{ fontFamily: "var(--font-nerv-mono)" }}
        >
          route.override // github pages
        </div>
        <h1
          className="mt-3 text-3xl uppercase tracking-[0.18em] text-nerv-orange sm:text-4xl"
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          Redirecting
        </h1>
        <p
          className="mt-3 text-sm leading-7 text-nerv-white/68"
          style={{ fontFamily: "var(--font-nerv-mono)" }}
        >
          Default entry now forwards to the surveillance deck. If the redirect
          does not trigger, use one of the routes below.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/examples/surveillance"
            className="border border-nerv-red px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-nerv-red transition-colors hover:bg-nerv-red hover:text-black"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            open surveillance
          </Link>
          <Link
            href="/examples/command-center"
            className="border border-nerv-cyan px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-nerv-cyan transition-colors hover:bg-nerv-cyan hover:text-black"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            command center
          </Link>
        </div>
      </div>
    </main>
  );
}
