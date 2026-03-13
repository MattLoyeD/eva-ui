import Link from "next/link";

const displayFont = { fontFamily: "var(--font-eva-display)" };

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
  { href: "/examples/landing", name: "Library Landing", description: "EvaUI component showcase page", category: "SHOWCASE" },
  { href: "/examples/auth/login", name: "Login", description: "Authentication terminal", category: "AUTH" },
  { href: "/examples/auth/register", name: "Register", description: "Personnel registration portal", category: "AUTH" },
  { href: "/examples/help", name: "Help Center", description: "FAQ & knowledge base", category: "SUPPORT" },
  { href: "/examples/error", name: "Error 404", description: "Signal lost page", category: "ERROR" },
  { href: "/examples/empty", name: "Empty State", description: "No data placeholder", category: "UTILITY" },
];

const categoryColors: Record<string, string> = {
  DASHBOARD: "border-eva-orange text-eva-orange",
  MONITORING: "border-eva-cyan text-eva-cyan",
  COMMUNICATION: "border-eva-green text-eva-green",
  FORMS: "border-eva-yellow text-eva-yellow",
  CONTENT: "border-eva-red text-eva-red",
  CRUD: "border-eva-orange text-eva-orange",
  DATA: "border-eva-cyan text-eva-cyan",
  DOCUMENT: "border-eva-green text-eva-green",
  FILES: "border-eva-yellow text-eva-yellow",
  MARKETING: "border-eva-red text-eva-red",
  SHOWCASE: "border-eva-cyan text-eva-cyan",
  AUTH: "border-eva-orange text-eva-orange",
  SUPPORT: "border-eva-green text-eva-green",
  ERROR: "border-eva-red text-eva-red",
  UTILITY: "border-eva-yellow text-eva-yellow",
};

export default function ExamplesGalleryPage() {
  return (
    <div className="min-h-screen bg-eva-black px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl text-center mb-16">
        <h1
          className="text-eva-orange text-4xl sm:text-5xl lg:text-6xl tracking-[0.3em] uppercase mb-4"
          style={displayFont}
        >
          Example Gallery
        </h1>
        <p
          className="text-eva-white/50 text-xs sm:text-sm tracking-[0.2em] uppercase"
          style={displayFont}
        >
          16 production-ready interface templates
        </p>
        <div className="mt-6 mx-auto w-48 h-px bg-gradient-to-r from-transparent via-eva-orange/60 to-transparent" />
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {examples.map((ex) => (
          <Link
            key={ex.href}
            href={ex.href}
            className="group relative block rounded border border-eva-mid-gray bg-eva-dark-gray/60 p-5 transition-all duration-200 hover:border-eva-orange hover:scale-[1.02]"
          >
            {/* Category badge */}
            <span
              className={`inline-block text-[9px] tracking-[0.2em] uppercase border px-2 py-0.5 mb-3 ${categoryColors[ex.category] ?? "border-eva-white/40 text-eva-white/40"}`}
              style={displayFont}
            >
              {ex.category}
            </span>

            {/* Name */}
            <h2
              className="text-eva-orange text-sm tracking-[0.15em] uppercase mb-2 group-hover:text-eva-cyan transition-colors"
              style={displayFont}
            >
              {ex.name}
            </h2>

            {/* Description */}
            <p className="text-eva-white/50 text-xs leading-relaxed">
              {ex.description}
            </p>

            {/* Arrow indicator */}
            <span className="absolute bottom-4 right-4 text-eva-mid-gray text-xs group-hover:text-eva-orange transition-colors">
              &rarr;
            </span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-7xl mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-eva-mid-gray to-transparent mb-8" />
        <div className="flex items-center justify-center gap-6 text-xs tracking-[0.15em] uppercase" style={displayFont}>
          <Link
            href="/docs"
            className="text-eva-cyan hover:text-eva-orange transition-colors"
          >
            Documentation
          </Link>
          <span className="text-eva-white/20">|</span>
          <Link
            href="/"
            className="text-eva-cyan hover:text-eva-orange transition-colors"
          >
            Command Center
          </Link>
        </div>
      </div>
    </div>
  );
}
