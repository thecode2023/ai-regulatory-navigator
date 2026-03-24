"use client";

import { cn } from "@/lib/utils";
import type { RiskAssessment } from "@/lib/types";

const levelColors = {
  Critical: "bg-risk-critical",
  High: "bg-risk-high",
  Medium: "bg-risk-medium",
  Low: "bg-risk-low",
};

const levelText = {
  Critical: "text-risk-critical",
  High: "text-risk-high",
  Medium: "text-risk-medium",
  Low: "text-risk-low",
};

export function RiskOverview({
  assessments,
}: {
  assessments: RiskAssessment[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {assessments.map((a) => (
        <div
          key={a.regulation.id}
          className="border border-navy-700 rounded-lg bg-navy-900 p-4 flex items-center gap-4"
        >
          {/* Score ring */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-navy-800"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(a.riskScore / 100) * 150.8} 150.8`}
                strokeLinecap="round"
                className={levelText[a.riskLevel]}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  "text-sm font-bold font-mono",
                  levelText[a.riskLevel]
                )}
              >
                {a.riskScore}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{a.regulation.flag}</span>
              <span className="text-sm font-medium text-white truncate">
                {a.regulation.jurisdiction}
              </span>
            </div>
            <div className="text-xs text-slate-500 truncate mt-0.5">
              {a.regulation.lawName}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn(
                  "inline-block w-2 h-2 rounded-full",
                  levelColors[a.riskLevel]
                )}
              />
              <span className={cn("text-xs font-medium", levelText[a.riskLevel])}>
                {a.riskLevel}
              </span>
              <span className="text-xs text-slate-600">
                &middot; {a.regulation.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
