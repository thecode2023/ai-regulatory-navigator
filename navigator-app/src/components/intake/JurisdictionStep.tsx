"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { regulations, regions } from "@/lib/regulations";

const jurisdictionsByRegion = regions
  .filter((r) => r !== "All")
  .map((region) => ({
    region,
    items: regulations.filter((r) => r.region === region),
  }));

export function JurisdictionStep({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const [filter, setFilter] = useState("All");

  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  const selectAll = () => onChange(regulations.map((r) => r.id));
  const clearAll = () => onChange([]);

  const filtered =
    filter === "All"
      ? jurisdictionsByRegion
      : jurisdictionsByRegion.filter((g) => g.region === filter);

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Where does your company operate?
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Select all jurisdictions where you deploy AI systems or serve customers.
      </p>

      {/* Region filter + bulk actions */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors",
              filter === r
                ? "bg-electric-500 text-white"
                : "bg-navy-800 text-slate-400 hover:bg-navy-700"
            )}
          >
            {r}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs text-electric-400 hover:text-electric-300"
          >
            Select all
          </button>
          <span className="text-navy-600">|</span>
          <button
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-slate-400"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Jurisdiction cards */}
      <div className="space-y-6">
        {filtered.map((group) => (
          <div key={group.region}>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              {group.region}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.items.map((reg) => {
                const isSelected = selected.includes(reg.id);
                return (
                  <button
                    key={reg.id}
                    onClick={() => toggle(reg.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all",
                      isSelected
                        ? "border-electric-500 bg-electric-500/10 text-white"
                        : "border-navy-700 bg-navy-900 text-slate-300 hover:border-navy-600 hover:bg-navy-800"
                    )}
                  >
                    <span className="text-xl">{reg.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {reg.jurisdiction}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {reg.lawName}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                        isSelected
                          ? "border-electric-500 bg-electric-500"
                          : "border-navy-600"
                      )}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <p className="text-xs text-slate-500 mt-4">
          {selected.length} jurisdiction{selected.length !== 1 ? "s" : ""}{" "}
          selected
        </p>
      )}
    </div>
  );
}
