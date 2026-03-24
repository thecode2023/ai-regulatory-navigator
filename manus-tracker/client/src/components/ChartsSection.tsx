/**
 * ChartsSection — Interactive charts for the AI regulations dashboard
 * Uses recharts for visualizations
 */
import { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { type Regulation } from '@/lib/regulationsData';

interface Props {
  regulations: Regulation[];
}

const COLORS = {
  'Enacted': '#4ade80',
  'In Effect': '#22c55e',
  'Enacted (Delayed)': '#fb923c',
  'Proposed': '#facc15',
  'Draft': '#94a3b8',
  'Voluntary': '#60a5fa',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-xl text-sm">
        <p className="font-medium text-foreground mb-1">{label || payload[0]?.name}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || p.fill }} className="text-xs">
            {p.name}: <span className="font-mono font-medium">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartsSection({ regulations }: Props) {
  // Status distribution
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    regulations.forEach(r => {
      counts[r.status] = (counts[r.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  }, [regulations]);

  // Region distribution
  const regionData = useMemo(() => {
    const counts: Record<string, number> = {};
    regulations.forEach(r => {
      counts[r.region] = (counts[r.region] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [regulations]);

  // Penalty comparison (jurisdictions with known max fines)
  const penaltyData = useMemo(() => {
    return regulations
      .filter(r => r.penalties.maxFineUSD !== null && r.penalties.maxFineUSD > 0)
      .sort((a, b) => (b.penalties.maxFineUSD || 0) - (a.penalties.maxFineUSD || 0))
      .map(r => ({
        name: r.jurisdiction.replace('United States — ', 'US — '),
        fineM: Math.round((r.penalties.maxFineUSD || 0) / 1000000 * 10) / 10,
        flag: r.flag,
      }));
  }, [regulations]);

  // Compliance dimensions radar
  const radarData = useMemo(() => {
    const dims = [
      { subject: 'Enacted Laws', key: 'enacted' },
      { subject: 'Cross-Border', key: 'cross' },
      { subject: 'Agent Coverage', key: 'agent' },
      { subject: 'Risk Classification', key: 'risk' },
      { subject: 'Penalties Defined', key: 'penalty' },
    ];

    const regionGroups: Record<string, Regulation[]> = {};
    regulations.forEach(r => {
      if (!regionGroups[r.region]) regionGroups[r.region] = [];
      regionGroups[r.region].push(r);
    });

    return dims.map(d => {
      const point: Record<string, any> = { subject: d.subject };
      Object.entries(regionGroups).forEach(([region, regs]) => {
        let score = 0;
        if (d.key === 'enacted') score = regs.filter(r => ['Enacted', 'In Effect', 'Enacted (Delayed)'].includes(r.status)).length / regs.length * 10;
        if (d.key === 'cross') score = regs.filter(r => r.crossBorder.applies).length / regs.length * 10;
        if (d.key === 'agent') score = regs.filter(r => r.autonomousAgents.addressed).length / regs.length * 10;
        if (d.key === 'risk') score = regs.filter(r => r.riskClassification !== 'None' && !r.riskClassification.includes('None')).length / regs.length * 10;
        if (d.key === 'penalty') score = regs.filter(r => r.penalties.maxFineUSD !== null).length / regs.length * 10;
        point[region] = Math.round(score * 10) / 10;
      });
      return point;
    });
  }, [regulations]);

  const regionColors: Record<string, string> = {
    'Europe': '#60a5fa',
    'North America': '#4ade80',
    'Latin America': '#fb923c',
    'Asia-Pacific': '#c084fc',
  };

  return (
    <section id="charts" className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-lg font-semibold text-foreground">Regulatory Landscape Overview</h2>
        <div className="h-px flex-1 bg-border"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution Pie */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name as keyof typeof COLORS] || '#64748b'}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Penalty Comparison Bar */}
        <div className="bg-card border border-border rounded-xl p-5 lg:col-span-2">
          <h3 className="text-sm font-medium text-foreground mb-4">Maximum Penalties (USD Millions)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={penaltyData} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
                tickFormatter={v => `$${v}M`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} formatter={(v: any) => [`$${v}M USD`, 'Max Fine']} />
              <Bar dataKey="fineM" radius={[0, 4, 4, 0]}>
                {penaltyData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={`oklch(0.65 0.2 ${220 - index * 15})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Breakdown */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Jurisdictions by Region</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={regionData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Jurisdictions" radius={[4, 4, 0, 0]}>
                {regionData.map((entry) => (
                  <Cell key={entry.name} fill={regionColors[entry.name] || '#60a5fa'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Regulatory Maturity by Region</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#94a3b8', fontSize: 9 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: '#64748b', fontSize: 9 }}
                tickCount={3}
              />
              {Object.entries(regionColors).map(([region, color]) => (
                <Radar
                  key={region}
                  name={region}
                  dataKey={region}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                />
              ))}
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                iconSize={8}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
