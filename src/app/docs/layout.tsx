import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-eva-black">
      <DocsSidebar />
      <main className="docs-main">
        <div className="docs-content">
          {children}
        </div>
      </main>
    </div>
  );
}
