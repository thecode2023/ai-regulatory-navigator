"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { RiskAssessment, ChecklistItem } from "@/lib/types";

const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const priorityColors = {
  Critical: "bg-risk-critical/20 text-risk-critical border-risk-critical/30",
  High: "bg-risk-high/20 text-risk-high border-risk-high/30",
  Medium: "bg-risk-medium/20 text-risk-medium border-risk-medium/30",
  Low: "bg-risk-low/20 text-risk-low border-risk-low/30",
};

export function ComplianceChecklist({
  assessments,
}: {
  assessments: RiskAssessment[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [filterPriority, setFilterPriority] = useState<string>("All");

  const allItems = useMemo(() => {
    const items: (ChecklistItem & { jurisdictionId: string; jurisdictionName: string; flag: string })[] = [];
    for (const a of assessments) {
      for (const item of a.checklistItems) {
        items.push({
          ...item,
          jurisdictionId: a.regulation.id,
          jurisdictionName: a.regulation.jurisdiction,
          flag: a.regulation.flag,
        });
      }
    }
    return items.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }, [assessments]);

  const filtered =
    filterPriority === "All"
      ? allItems
      : allItems.filter((i) => i.priority === filterPriority);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = allItems.length
    ? Math.round((checked.size / allItems.length) * 100)
    : 0;

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-electric-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-mono text-slate-400">
          {checked.size}/{allItems.length}
        </span>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Critical", "High", "Medium", "Low"].map((p) => (
          <button
            key={p}
            onClick={() => setFilterPriority(p)}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors",
              filterPriority === p
                ? "bg-electric-500 text-white"
                : "bg-navy-800 text-slate-400 hover:bg-navy-700"
            )}
          >
            {p}
            {p !== "All" && (
              <span className="ml-1 text-slate-500">
                ({allItems.filter((i) => i.priority === p).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border transition-colors",
              checked.has(item.id)
                ? "bg-navy-800/50 border-navy-700 opacity-60"
                : "bg-navy-900 border-navy-700"
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              className={cn(
                "w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                checked.has(item.id)
                  ? "border-electric-500 bg-electric-500"
                  : "border-navy-600 hover:border-navy-500"
              )}
            >
              {checked.has(item.id) && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] font-semibold rounded border",
                    priorityColors[item.priority]
                  )}
                >
                  {item.priority}
                </span>
                <span className="text-xs text-slate-500">
                  {item.flag} {item.jurisdictionName}
                </span>
                <span className="text-xs text-navy-600">&middot;</span>
                <span className="text-xs text-slate-600">{item.category}</span>
              </div>
              <p
                className={cn(
                  "text-sm",
                  checked.has(item.id)
                    ? "text-slate-500 line-through"
                    : "text-slate-300"
                )}
              >
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No checklist items match this filter.
        </div>
      )}
    </div>
  );
}
