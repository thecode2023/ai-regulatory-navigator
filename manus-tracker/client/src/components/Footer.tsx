/**
 * Footer component
 */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-16">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">AI</span>
              </div>
              <span className="text-sm font-semibold text-foreground">Global AI Regulations Tracker</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Comprehensive research covering 15 jurisdictions across 8 regulatory dimensions. Updated March 2026.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Sources</h4>
            <ul className="space-y-1">
              {[
                { label: 'EU AI Act', url: 'https://artificialintelligenceact.eu/' },
                { label: 'Singapore Agentic AI Framework', url: 'https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/singapore-launches-model-ai-governance-framework-for-agentic-ai' },
                { label: 'Texas TRAIGA', url: 'https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149' },
                { label: 'Colorado AI Act', url: 'https://leg.colorado.gov/bills/sb24-205' },
              ].map(s => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Disclaimer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This tracker is for informational purposes only and does not constitute legal advice. Regulations change frequently. Consult qualified legal counsel for compliance decisions.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Research compiled March 24, 2026 · 15 jurisdictions · 8 data dimensions
          </p>
          <p className="text-xs text-muted-foreground">
            Data sourced from official government publications, legal analysis firms, and regulatory bodies
          </p>
        </div>
      </div>
    </footer>
  );
}
