/**
 * JurisdictionModal — Detailed view for a single jurisdiction
 */
import { useEffect } from 'react';
import { type Regulation, statusColors } from '@/lib/regulationsData';

interface Props {
  regulation: Regulation;
  onClose: () => void;
}

export default function JurisdictionModal({ regulation: r, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-start justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{r.flag}</span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{r.jurisdiction}</h2>
              <p className="text-xs text-muted-foreground">{r.region} · Updated {r.lastUpdated}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none mt-1"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Law Name & Status */}
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Primary Law / Regulation</p>
              <p className="text-sm font-medium text-foreground">{r.lawName}</p>
              {r.billNumber && (
                <p className="text-xs text-muted-foreground mono mt-0.5">{r.billNumber}</p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-md text-xs font-medium ${statusColors[r.status]}`}>
              {r.status}
            </span>
          </div>

          {/* Grid of key facts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Effective Date</p>
              <p className="text-sm text-foreground">{r.effectiveDate}</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Risk Classification</p>
              <p className="text-sm text-foreground">
                {r.riskClassification.includes('None') ? <span className="text-muted-foreground italic">None defined</span> : r.riskClassification}
              </p>
            </div>
          </div>

          {/* Key Requirements */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Key Requirements for Companies
            </h3>
            <ul className="space-y-2">
              {r.keyRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-primary mt-0.5 shrink-0">›</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Penalties */}
          <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
              ⚠ Penalties for Non-Compliance
            </h3>
            <p className="text-sm text-foreground mb-1">{r.penalties.amount}</p>
            <p className="text-xs text-muted-foreground">Enforcement: {r.penalties.enforcementBody}</p>
          </div>

          {/* Autonomous Agents */}
          <div className={`rounded-lg p-4 border ${r.autonomousAgents.addressed ? 'bg-green-400/5 border-green-400/20' : 'bg-secondary/20 border-border'}`}>
            <h3 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${r.autonomousAgents.addressed ? 'text-green-400' : 'text-muted-foreground'}`}>
              {r.autonomousAgents.addressed ? '✓' : '✗'} Autonomous AI Agents
            </h3>
            <p className="text-xs text-muted-foreground">{r.autonomousAgents.details}</p>
          </div>

          {/* Cross-Border */}
          <div className={`rounded-lg p-4 border ${r.crossBorder.applies ? 'bg-blue-400/5 border-blue-400/20' : 'bg-secondary/20 border-border'}`}>
            <h3 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${r.crossBorder.applies ? 'text-blue-400' : 'text-muted-foreground'}`}>
              {r.crossBorder.applies ? '✓' : '✗'} Cross-Border Implications
            </h3>
            <p className="text-xs text-muted-foreground">{r.crossBorder.details}</p>
          </div>

          {/* Sources */}
          {r.sources.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sources</h3>
              <ul className="space-y-1">
                {r.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      [{i + 1}] {s.title} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
