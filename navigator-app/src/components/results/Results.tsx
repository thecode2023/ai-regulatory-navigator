"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { IntakeFormData, RiskAssessment } from "@/lib/types";
import { assessRisk } from "@/lib/scoring";
import { RiskOverview } from "./RiskOverview";
import { RegulationCard } from "./RegulationCard";
import { ComplianceChecklist } from "./ComplianceChecklist";
import { ExportButton } from "./ExportButton";

export function Results({
  formData,
  onReset,
}: {
  formData: IntakeFormData;
  onReset: () => void;
}) {
  const assessments = useMemo(() => assessRisk(formData), [formData]);
  const [activeTab, setActiveTab] = useState<"overview" | "checklist">(
    "overview"
  );

  const criticalCount = assessments.filter(
    (a) => a.riskLevel === "Critical"
  ).length;
  const highCount = assessments.filter((a) => a.riskLevel === "High").length;
  const avgScore = Math.round(
    assessments.reduce((sum, a) => sum + a.riskScore, 0) / assessments.length
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Summary banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-navy-700 bg-navy-900 p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Your Regulatory Risk Profile
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {assessments.length} jurisdiction
              {assessments.length !== 1 ? "s" : ""} analyzed &middot;{" "}
              {formData.industry} &middot;{" "}
              {formData.usesAutonomousAgents
                ? "Uses autonomous agents"
                : "No autonomous agents"}
            </p>
          </div>
          <ExportButton assessments={assessments} formData={formData} />
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard
            label="Avg. Risk Score"
            value={String(avgScore)}
            color={
              avgScore >= 75
                ? "text-risk-critical"
                : avgScore >= 50
                  ? "text-risk-high"
                  : avgScore >= 30
                    ? "text-risk-medium"
                    : "text-risk-low"
            }
          />
          <MetricCard
            label="Critical"
            value={String(criticalCount)}
            color="text-risk-critical"
          />
          <MetricCard
            label="High"
            value={String(highCount)}
            color="text-risk-high"
          />
          <MetricCard
            label="Jurisdictions"
            value={String(assessments.length)}
            color="text-electric-400"
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-navy-900 rounded-lg p-1 w-fit">
        {(["overview", "checklist"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? "bg-navy-700 text-white"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            {tab === "overview" ? "Risk Overview" : "Compliance Checklist"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" ? (
        <div className="space-y-8">
          <RiskOverview assessments={assessments} />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Detailed Breakdown
            </h3>
            {assessments.map((a, i) => (
              <motion.div
                key={a.regulation.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <RegulationCard assessment={a} />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <ComplianceChecklist assessments={assessments} />
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-navy-800 rounded-lg p-4">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
    </div>
  );
}
