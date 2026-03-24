/**
 * Header component — Regulatory Intelligence Dashboard
 * Design: Dark command-center aesthetic with gradient accent
 */

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary text-sm font-bold">AI</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground leading-tight">
              Global AI Regulations Tracker
            </h1>
            <p className="text-xs text-muted-foreground">15 Jurisdictions · March 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Updated March 24, 2026
          </span>
          <a
            href="#executive-summary"
            className="text-xs text-primary hover:text-primary/80 transition-colors hidden md:block"
          >
            Executive Summary
          </a>
          <a
            href="#charts"
            className="text-xs text-primary hover:text-primary/80 transition-colors hidden md:block"
          >
            Charts
          </a>
          <a
            href="#table"
            className="text-xs text-primary hover:text-primary/80 transition-colors hidden md:block"
          >
            Full Table
          </a>
        </div>
      </div>
    </header>
  );
}
