import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-eva-black">
      <DocsSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">{children}</div>
      </main>
    </div>
  );
}
