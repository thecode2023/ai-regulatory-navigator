/**
 * HeroBanner — Visual hero section for the AI Regulations Tracker
 * Design: Dark command-center with gradient and grid pattern
 */

interface Props {
  totalJurisdictions: number;
  enactedCount: number;
  agentCount: number;
}

export default function HeroBanner({ totalJurisdictions, enactedCount, agentCount }: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border"
      style={{
        background: 'linear-gradient(135deg, oklch(0.15 0.04 260) 0%, oklch(0.12 0.02 240) 50%, oklch(0.14 0.03 280) 100%)',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.65 0.2 220 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.65 0.2 220 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'oklch(0.65 0.2 220)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-8 blur-3xl"
        style={{ background: 'oklch(0.65 0.18 150)' }}
      />

      <div className="relative px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded border"
                style={{
                  color: 'oklch(0.65 0.2 220)',
                  borderColor: 'oklch(0.65 0.2 220 / 0.3)',
                  background: 'oklch(0.65 0.2 220 / 0.1)',
                }}
              >
                RESEARCH REPORT · MARCH 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
              Global AI Regulations
              <span style={{ color: 'oklch(0.65 0.2 220)' }}> Tracker</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Comprehensive analysis of AI laws, enforcement regimes, and compliance requirements across {totalJurisdictions} jurisdictions — covering risk classification, penalties, autonomous agent provisions, and cross-border implications.
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <div className="text-center px-5 py-4 rounded-xl border" style={{ borderColor: 'oklch(0.65 0.2 220 / 0.3)', background: 'oklch(0.65 0.2 220 / 0.08)' }}>
              <div className="text-3xl font-bold mono" style={{ color: 'oklch(0.65 0.2 220)' }}>{totalJurisdictions}</div>
              <div className="text-xs text-muted-foreground mt-1">Jurisdictions</div>
            </div>
            <div className="text-center px-5 py-4 rounded-xl border" style={{ borderColor: 'oklch(0.65 0.18 150 / 0.3)', background: 'oklch(0.65 0.18 150 / 0.08)' }}>
              <div className="text-3xl font-bold mono" style={{ color: 'oklch(0.65 0.18 150)' }}>{enactedCount}</div>
              <div className="text-xs text-muted-foreground mt-1">Laws Active</div>
            </div>
            <div className="text-center px-5 py-4 rounded-xl border" style={{ borderColor: 'oklch(0.72 0.18 85 / 0.3)', background: 'oklch(0.72 0.18 85 / 0.08)' }}>
              <div className="text-3xl font-bold mono" style={{ color: 'oklch(0.72 0.18 85)' }}>{agentCount}</div>
              <div className="text-xs text-muted-foreground mt-1">Cover Agents</div>
            </div>
          </div>
        </div>

        {/* Timeline bar */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Key Regulatory Milestones</div>
          <div className="relative">
            <div className="h-px bg-border w-full absolute top-3"></div>
            <div className="flex justify-between relative">
              {[
                { date: 'Feb 2025', label: 'EU AI Act\nProhibitions', color: 'oklch(0.65 0.18 150)' },
                { date: 'Jan 2026', label: 'Texas TRAIGA\nIn Effect', color: 'oklch(0.72 0.18 85)' },
                { date: 'Jan 2026', label: 'Singapore Agentic\nAI Framework', color: 'oklch(0.65 0.2 220)' },
                { date: 'Jun 2026', label: 'Colorado AI Act\nIn Effect', color: 'oklch(0.72 0.18 85)' },
                { date: 'Aug 2026', label: 'EU AI Act\nCore Rules', color: 'oklch(0.65 0.18 150)' },
                { date: 'Dec 2026', label: 'Australia ADM\nTransparency', color: 'oklch(0.60 0.18 300)' },
              ].map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1 relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full border-2 border-background z-10"
                    style={{ background: m.color }}
                  />
                  <div className="text-xs font-mono text-muted-foreground mt-1 whitespace-nowrap">{m.date}</div>
                  <div className="text-xs text-center leading-tight max-w-[80px]" style={{ color: m.color, whiteSpace: 'pre-line' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
