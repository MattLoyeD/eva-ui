"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DocsLanding() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/docs/getting-started/installation");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <span
        className="text-sm text-eva-mid-gray uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-eva-display)" }}
      >
        REDIRECTING...
      </span>
    </div>
  );
}
