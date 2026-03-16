import Link from "next/link";

const displayFont = { fontFamily: "var(--font-nerv-display)" };
const monoFont = { fontFamily: "var(--font-nerv-mono)" };

const examples = [
  { href: "/examples/dashboard", name: "Dashboard", description: "Operations monitoring center", category: "DASHBOARD" },
  { href: "/examples/realtime", name: "Real-time", description: "Live sensor data & telemetry charts", category: "MONITORING" },
  { href: "/examples/comms", name: "Comms Terminal", description: "Military-grade chat interface", category: "COMMUNICATION" },
  { href: "/examples/form", name: "Dispatch Form", description: "Multi-field form with validation", category: "FORMS" },
  { href: "/examples/blog", name: "Intelligence Bulletin", description: "Classified content feed", category: "CONTENT" },
  { href: "/examples/inventory", name: "Equipment Requisition", description: "CRUD inventory management", category: "CRUD" },
  { href: "/examples/pilots", name: "Pilot Dossier", description: "Personnel profiles & sync history", category: "DATA" },
  { href: "/examples/report", name: "Mission Report", description: "After-action document template", category: "DOCUMENT" },
  { href: "/examples/files", name: "MAGI File System", description: "File browser with tree navigation", category: "FILES" },
  { href: "/examples/saas", name: "SaaS Landing", description: "Marketing page with pricing tiers", category: "MARKETING" },
  { href: "/examples/landing", name: "Library Landing", description: "NERV-UI component showcase page", category: "SHOWCASE" },
  { href: "/examples/auth/login", name: "Login", description: "Authentication terminal", category: "AUTH" },
  { href: "/examples/auth/register", name: "Register", description: "Personnel registration portal", category: "AUTH" },
  { href: "/examples/help", name: "Help Center", description: "FAQ & knowledge base", category: "SUPPORT" },
  { href: "/examples/error", name: "Error 404", description: "Signal lost page", category: "ERROR" },
  { href: "/examples/empty", name: "Empty State", description: "No data placeholder", category: "UTILITY" },
];

const categoryColors: Record<string, string> = {
  DASHBOARD: "border-nerv-orange text-nerv-orange",
  MONITORING: "border-nerv-cyan text-nerv-cyan",
  COMMUNICATION: "border-nerv-green text-nerv-green",
  FORMS: "border-nerv-amber text-nerv-amber",
  CONTENT: "border-nerv-red text-nerv-red",
  CRUD: "border-nerv-orange text-nerv-orange",
  DATA: "border-nerv-cyan text-nerv-cyan",
  DOCUMENT: "border-nerv-green text-nerv-green",
  FILES: "border-nerv-amber text-nerv-amber",
  MARKETING: "border-nerv-red text-nerv-red",
  SHOWCASE: "border-nerv-cyan text-nerv-cyan",
  AUTH: "border-nerv-orange text-nerv-orange",
  SUPPORT: "border-nerv-green text-nerv-green",
  ERROR: "border-nerv-red text-nerv-red",
  UTILITY: "border-nerv-amber text-nerv-amber",
};

export default function ExamplesGalleryPage() {
  return (
    <div className="min-h-screen bg-nerv-black px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl border border-nerv-mid-gray/80 bg-[linear-gradient(135deg,rgba(255,153,0,0.14),transparent_42%)] mb-8">
        <div className="border-b border-nerv-mid-gray/80 px-4 py-2 sm:px-5">
          <span
            className="text-[10px] uppercase tracking-[0.24em] text-nerv-green"
            style={monoFont}
          >
            [entry.node] example router
          </span>
        </div>
        <div className="grid gap-6 px-4 py-5 sm:px-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)]">
          <div>
            <h1
              className="text-nerv-orange text-3xl sm:text-4xl lg:text-5xl tracking-[0.26em] uppercase"
              style={displayFont}
            >
              Example Routes
            </h1>
            <p
              className="mt-3 max-w-3xl text-nerv-white/62 text-[13px] leading-7"
              style={monoFont}
            >
              Operational pages, support consoles, and NERV-flavoured product
              scenarios. Use this index as the live route board for shell,
              density, and interaction checks across the exported site.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/examples/dashboard"
                className="border border-nerv-orange px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-nerv-orange hover:bg-nerv-orange hover:text-black transition-colors"
                style={displayFont}
              >
                open operations
              </Link>
              <Link
                href="/examples/report"
                className="border border-nerv-cyan px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-nerv-cyan hover:bg-nerv-cyan hover:text-black transition-colors"
                style={displayFont}
              >
                inspect reports
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-nerv-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-nerv-white/35">
                routes
              </div>
              <div className="mt-1 text-2xl uppercase tracking-[0.16em] text-nerv-orange" style={displayFont}>
                {String(examples.length).padStart(2, "0")}
              </div>
            </div>
            <div className="border border-nerv-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-nerv-white/35">
                export
              </div>
              <div className="mt-1 text-2xl uppercase tracking-[0.16em] text-nerv-green" style={displayFont}>
                ready
              </div>
            </div>
            <div className="border border-nerv-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-nerv-white/35">
                primary
              </div>
              <div className="mt-1 text-sm uppercase tracking-[0.14em] text-nerv-cyan" style={displayFont}>
                dashboard
              </div>
            </div>
            <div className="border border-nerv-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-nerv-white/35">
                mode
              </div>
              <div className="mt-1 text-sm uppercase tracking-[0.14em] text-nerv-orange" style={displayFont}>
                live audit
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {examples.map((ex) => (
          <Link
            key={ex.href}
            href={ex.href}
            className="group relative block border border-nerv-mid-gray/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0.005))] p-4 transition-colors duration-200 hover:border-nerv-orange"
          >
            {/* Category badge */}
            <div className="flex items-center justify-between gap-3 border-b border-nerv-mid-gray/70 pb-2">
              <span
                className={`inline-block text-[9px] tracking-[0.18em] uppercase border px-2 py-0.5 ${categoryColors[ex.category] ?? "border-nerv-white/40 text-nerv-white/40"}`}
                style={displayFont}
              >
                {ex.category}
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.16em] text-nerv-white/28"
                style={monoFont}
              >
                route.live
              </span>
            </div>

            {/* Name */}
            <h2
              className="mt-3 text-nerv-orange text-sm tracking-[0.16em] uppercase group-hover:text-nerv-cyan transition-colors"
              style={displayFont}
            >
              {ex.name}
            </h2>

            {/* Description */}
            <p className="mt-2 min-h-[3rem] text-nerv-white/55 text-xs leading-relaxed" style={monoFont}>
              {ex.description}
            </p>

            {/* Arrow indicator */}
            <div className="mt-4 flex items-center justify-between border-t border-nerv-mid-gray/70 pt-2">
              <span
                className="text-[9px] uppercase tracking-[0.16em] text-nerv-white/28"
                style={monoFont}
              >
                {ex.href}
              </span>
              <span className="text-nerv-mid-gray text-xs group-hover:text-nerv-orange transition-colors">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-7xl mt-8 border-t border-nerv-mid-gray/80 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.15em] uppercase">
          <span className="text-nerv-white/30 text-[9px]" style={monoFont}>
            export board // stable
          </span>
          <div className="flex items-center gap-6" style={displayFont}>
          <Link
            href="/docs"
            className="text-nerv-cyan hover:text-nerv-orange transition-colors"
          >
            Documentation
          </Link>
          <span className="text-nerv-white/20">|</span>
          <Link
            href="/"
            className="text-nerv-cyan hover:text-nerv-orange transition-colors"
          >
            Command Center
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
