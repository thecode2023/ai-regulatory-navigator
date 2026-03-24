/**
 * StatsBar — Summary statistics for the dashboard
 */
import { type Regulation } from '@/lib/regulationsData';

interface Props {
  regulations: Regulation[];
}

export default function StatsBar({ regulations }: Props) {
  const enacted = regulations.filter(r => r.status === 'Enacted' || r.status === 'In Effect' || r.status === 'Enacted (Delayed)').length;
  const proposed = regulations.filter(r => r.status === 'Proposed' || r.status === 'Draft').length;
  const voluntary = regulations.filter(r => r.status === 'Voluntary').length;
  const agentAddressed = regulations.filter(r => r.autonomousAgents.addressed).length;
  const crossBorder = regulations.filter(r => r.crossBorder.applies).length;

  const stats = [
    { label: 'Total Jurisdictions', value: regulations.length, color: 'text-foreground', bg: 'bg-card' },
    { label: 'Laws Enacted / In Effect', value: enacted, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
    { label: 'Proposed / Draft', value: proposed, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
    { label: 'Voluntary Frameworks', value: voluntary, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
    { label: 'Address Autonomous Agents', value: agentAddressed, color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    { label: 'Cross-Border Reach', value: crossBorder, color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map(stat => (
        <div
          key={stat.label}
          className={`${stat.bg} border border-border rounded-lg p-4 flex flex-col gap-1`}
        >
          <span className={`text-2xl font-bold ${stat.color} mono`}>{stat.value}</span>
          <span className="text-xs text-muted-foreground leading-tight">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
