"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { RiskAssessment } from "@/lib/types";
import { ChevronDown, ExternalLink } from "lucide-react";

const levelColors = {
  Critical: "border-risk-critical/30 bg-risk-critical/5",
  High: "border-risk-high/30 bg-risk-high/5",
  Medium: "border-risk-medium/30 bg-risk-medium/5",
  Low: "border-risk-low/30 bg-risk-low/5",
};

const levelBadge = {
  Critical: "bg-risk-critical/20 text-risk-critical",
  High: "bg-risk-high/20 text-risk-high",
  Medium: "bg-risk-medium/20 text-risk-medium",
  Low: "bg-risk-low/20 text-risk-low",
};

const statusBadge: Record<string, string> = {
  Enacted: "bg-status-enacted/20 text-status-enacted",
  "In Effect": "bg-status-in-effect/20 text-status-in-effect",
  Proposed: "bg-status-proposed/20 text-status-proposed",
  Draft: "bg-status-draft/20 text-status-draft",
  Voluntary: "bg-status-voluntary/20 text-status-voluntary",
  "Enacted (Delayed)": "bg-status-delayed/20 text-status-delayed",
};

export function RegulationCard({
  assessment,
}: {
  assessment: RiskAssessment;
}) {
  const [expanded, setExpanded] = useState(false);
  const { regulation: reg, riskScore, riskLevel } = assessment;

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden transition-colors",
        levelColors[riskLevel]
      )}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <span className="text-2xl">{reg.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-white">
              {reg.jurisdiction}
            </span>
            <span
              className={cn(
                "px-2 py-0.5 text-xs font-medium rounded-full",
                statusBadge[reg.status] ?? "bg-navy-800 text-slate-400"
              )}
            >
              {reg.status}
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">{reg.lawName}</div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div
              className={cn("text-lg font-bold font-mono", {
                "text-risk-critical": riskLevel === "Critical",
                "text-risk-high": riskLevel === "High",
                "text-risk-medium": riskLevel === "Medium",
                "text-risk-low": riskLevel === "Low",
              })}
            >
              {riskScore}
            </div>
            <span
              className={cn(
                "text-xs font-medium px-1.5 py-0.5 rounded",
                levelBadge[riskLevel]
              )}
            >
              {riskLevel}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-slate-500 transition-transform",
              expanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-navy-700 p-4 space-y-4">
          {/* Key details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoBlock label="Effective Date" value={reg.effectiveDate} />
            <InfoBlock
              label="Risk Classification"
              value={reg.riskClassification}
            />
            <InfoBlock label="Penalties" value={reg.penalties.amount} />
            <InfoBlock
              label="Enforcement"
              value={reg.penalties.enforcementBody}
            />
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Key Requirements
            </h4>
            <ul className="space-y-1.5">
              {reg.keyRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-electric-500 mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Autonomous agents */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-800">
            <div
              className={cn(
                "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                reg.autonomousAgents.addressed
                  ? "bg-risk-high"
                  : "bg-slate-600"
              )}
            />
            <div>
              <div className="text-xs font-medium text-slate-400">
                Autonomous Agents:{" "}
                {reg.autonomousAgents.addressed
                  ? "Specifically Addressed"
                  : "Not Specifically Addressed"}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {reg.autonomousAgents.details}
              </div>
            </div>
          </div>

          {/* Sources */}
          {reg.sources.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {reg.sources.map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-electric-400 hover:text-electric-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  {src.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm text-slate-300 mt-0.5">{value}</div>
    </div>
  );
}
