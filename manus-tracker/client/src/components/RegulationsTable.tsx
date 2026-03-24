/**
 * RegulationsTable — Sortable, interactive data table for AI regulations
 */
import { type Regulation, statusColors } from '@/lib/regulationsData';

interface Props {
  regulations: Regulation[];
  onSelect: (r: Regulation) => void;
  sortField: string;
  sortDir: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const SortIcon = ({ field, sortField, sortDir }: { field: string; sortField: string; sortDir: string }) => {
  if (sortField !== field) return <span className="text-muted-foreground/40 ml-1">⇅</span>;
  return <span className="text-primary ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
};

export default function RegulationsTable({ regulations, onSelect, sortField, sortDir, onSort }: Props) {
  return (
    <div id="table" className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground whitespace-nowrap"
                onClick={() => onSort('jurisdiction')}
              >
                Jurisdiction <SortIcon field="jurisdiction" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Primary Law / Bill
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground whitespace-nowrap"
                onClick={() => onSort('status')}
              >
                Status <SortIcon field="status" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Effective Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Risk Classification
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground whitespace-nowrap"
                onClick={() => onSort('maxFine')}
              >
                Max Penalty <SortIcon field="maxFine" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                AI Agents
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Cross-Border
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {regulations.map((reg, idx) => (
              <tr
                key={reg.id}
                className={`border-b border-border/50 transition-colors hover:bg-secondary/30 ${idx % 2 === 0 ? '' : 'bg-secondary/10'}`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{reg.flag}</span>
                    <div>
                      <div className="font-medium text-foreground text-xs leading-tight">{reg.jurisdiction}</div>
                      <div className="text-xs text-muted-foreground">{reg.region}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 max-w-[200px]">
                  <div className="text-xs text-foreground leading-tight">{reg.lawName}</div>
                  {reg.billNumber && (
                    <div className="text-xs text-muted-foreground mono mt-0.5 truncate">{reg.billNumber}</div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${statusColors[reg.status]}`}>
                    {reg.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground max-w-[140px]">
                  <span className="leading-tight">{reg.effectiveDate}</span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground max-w-[160px]">
                  {reg.riskClassification === 'None' || reg.riskClassification.includes('None') ? (
                    <span className="text-muted-foreground/50 italic">None</span>
                  ) : (
                    <span className="leading-tight">{reg.riskClassification}</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {reg.penalties.maxFineUSD ? (
                    <span className="text-xs font-mono text-amber-400 font-medium">
                      ${(reg.penalties.maxFineUSD / 1000000).toFixed(1)}M
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50 italic">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {reg.autonomousAgents.addressed ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-400/20 text-green-400 text-xs font-bold">✓</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted/30 text-muted-foreground text-xs">✗</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {reg.crossBorder.applies ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400/20 text-blue-400 text-xs font-bold">✓</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted/30 text-muted-foreground text-xs">✗</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onSelect(reg)}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors whitespace-nowrap hover:underline"
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {regulations.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">
          No jurisdictions match your current filters.
        </div>
      )}
    </div>
  );
}
