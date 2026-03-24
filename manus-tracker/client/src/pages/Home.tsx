/**
 * AI Regulations Tracker — Home Page
 * Design: Regulatory Intelligence Dashboard
 * Dark-mode command-center aesthetic with color-coded status indicators
 * Typography: Space Grotesk (headlines) + Roboto Mono (data)
 * Color: Deep navy base, electric blue accents, semantic status colors
 */

import { useState, useMemo } from 'react';
import { regulations, regions, statusColors, type Regulation } from '@/lib/regulationsData';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import StatsBar from '@/components/StatsBar';
import ChartsSection from '@/components/ChartsSection';
import RegulationsTable from '@/components/RegulationsTable';
import JurisdictionModal from '@/components/JurisdictionModal';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Regulation | null>(null);
  const [sortField, setSortField] = useState<string>('jurisdiction');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [agentFilter, setAgentFilter] = useState<string>('All');

  const statuses = ['All', 'Enacted', 'In Effect', 'Enacted (Delayed)', 'Proposed', 'Draft', 'Voluntary'];

  const filtered = useMemo(() => {
    return regulations
      .filter(r => {
        const matchRegion = selectedRegion === 'All' || r.region === selectedRegion;
        const matchStatus = selectedStatus === 'All' || r.status === selectedStatus;
        const matchSearch = searchQuery === '' ||
          r.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.lawName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchAgent = agentFilter === 'All' ||
          (agentFilter === 'Yes' && r.autonomousAgents.addressed) ||
          (agentFilter === 'No' && !r.autonomousAgents.addressed);
        return matchRegion && matchStatus && matchSearch && matchAgent;
      })
      .sort((a, b) => {
        let aVal = '';
        let bVal = '';
        if (sortField === 'jurisdiction') { aVal = a.jurisdiction; bVal = b.jurisdiction; }
        else if (sortField === 'status') { aVal = a.status; bVal = b.status; }
        else if (sortField === 'region') { aVal = a.region; bVal = b.region; }
        else if (sortField === 'maxFine') {
          const aFine = a.penalties.maxFineUSD ?? -1;
          const bFine = b.penalties.maxFineUSD ?? -1;
          return sortDir === 'asc' ? aFine - bFine : bFine - aFine;
        }
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
  }, [selectedRegion, selectedStatus, searchQuery, sortField, sortDir, agentFilter]);

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container py-8 space-y-10">
        {/* Hero Banner */}
        <HeroBanner
          totalJurisdictions={regulations.length}
          enactedCount={regulations.filter(r => ['Enacted','In Effect','Enacted (Delayed)'].includes(r.status)).length}
          agentCount={regulations.filter(r => r.autonomousAgents.addressed).length}
        />

        {/* Stats Overview */}
        <StatsBar regulations={regulations} />

        {/* Executive Summary */}
        <ExecutiveSummary />

        {/* Charts Section */}
        <ChartsSection regulations={regulations} />

        {/* Filters */}
        <section>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <input
                type="text"
                placeholder="Search jurisdiction or law..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >✕</button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center">Region:</span>
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedRegion === r
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center">Status:</span>
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedStatus === s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted-foreground">Agents:</span>
              {['All', 'Yes', 'No'].map(v => (
                <button
                  key={v}
                  onClick={() => setAgentFilter(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    agentFilter === v
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-3">
            Showing <span className="text-foreground font-medium">{filtered.length}</span> of {regulations.length} jurisdictions
          </div>

          {/* Table */}
          <RegulationsTable
            regulations={filtered}
            onSelect={setSelectedJurisdiction}
            sortField={sortField}
            sortDir={sortDir}
            onSort={handleSort}
          />
        </section>
      </main>

      <Footer />

      {/* Detail Modal */}
      {selectedJurisdiction && (
        <JurisdictionModal
          regulation={selectedJurisdiction}
          onClose={() => setSelectedJurisdiction(null)}
        />
      )}
    </div>
  );
}
