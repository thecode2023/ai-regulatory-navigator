"use client";

import { cn } from "@/lib/utils";
import type { AiUseCase } from "@/lib/types";
import { Users, Cog, Brain, PenTool, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const useCases: { id: AiUseCase; label: string; icon: LucideIcon; desc: string }[] = [
  {
    id: "customer-facing-agents",
    label: "Customer-Facing Agents",
    icon: Users,
    desc: "Chatbots, virtual assistants, support agents",
  },
  {
    id: "internal-automation",
    label: "Internal Automation",
    icon: Cog,
    desc: "Workflow automation, document processing",
  },
  {
    id: "decision-making",
    label: "Decision-Making",
    icon: Brain,
    desc: "Credit scoring, hiring, risk assessment",
  },
  {
    id: "content-generation",
    label: "Content Generation",
    icon: PenTool,
    desc: "Marketing copy, reports, code generation",
  },
  {
    id: "data-processing",
    label: "Data Processing",
    icon: Database,
    desc: "Analytics, classification, profiling",
  },
];

export function AiUsageStep({
  selectedUseCases,
  usesAgents,
  onChangeUseCases,
  onChangeAgents,
}: {
  selectedUseCases: AiUseCase[];
  usesAgents: boolean | null;
  onChangeUseCases: (v: AiUseCase[]) => void;
  onChangeAgents: (v: boolean) => void;
}) {
  const toggleUseCase = (id: AiUseCase) => {
    onChangeUseCases(
      selectedUseCases.includes(id)
        ? selectedUseCases.filter((u) => u !== id)
        : [...selectedUseCases, id]
    );
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        How do you use AI?
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Select all that apply. This determines which specific requirements
        affect you.
      </p>

      <div className="space-y-3 mb-8">
        {useCases.map((uc) => {
          const isSelected = selectedUseCases.includes(uc.id);
          const Icon = uc.icon;
          return (
            <button
              key={uc.id}
              onClick={() => toggleUseCase(uc.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-3.5 rounded-lg border text-left transition-all",
                isSelected
                  ? "border-electric-500 bg-electric-500/10"
                  : "border-navy-700 bg-navy-900 hover:border-navy-600 hover:bg-navy-800"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isSelected ? "text-electric-400" : "text-slate-500"
                )}
              />
              <div className="flex-1">
                <div
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-white" : "text-slate-300"
                  )}
                >
                  {uc.label}
                </div>
                <div className="text-xs text-slate-500">{uc.desc}</div>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0",
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

      {/* Autonomous agents toggle */}
      <div className="border border-navy-700 rounded-lg bg-navy-900 p-5">
        <h4 className="text-sm font-semibold text-white mb-1">
          Do you use autonomous AI agents?
        </h4>
        <p className="text-xs text-slate-500 mb-4">
          Agents that can take actions, make transactions, or operate
          independently with minimal human oversight.
        </p>
        <div className="flex gap-3">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              onClick={() => onChangeAgents(val)}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all",
                usesAgents === val
                  ? "border-electric-500 bg-electric-500/10 text-white"
                  : "border-navy-700 bg-navy-800 text-slate-400 hover:border-navy-600"
              )}
            >
              {val ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
