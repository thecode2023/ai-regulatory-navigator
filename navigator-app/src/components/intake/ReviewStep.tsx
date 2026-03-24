import type { IntakeFormData } from "@/lib/types";
import { regulations } from "@/lib/regulations";

const useCaseLabels: Record<string, string> = {
  "customer-facing-agents": "Customer-Facing Agents",
  "internal-automation": "Internal Automation",
  "decision-making": "Decision-Making",
  "content-generation": "Content Generation",
  "data-processing": "Data Processing",
};

export function ReviewStep({ formData }: { formData: IntakeFormData }) {
  const selectedRegs = regulations.filter((r) =>
    formData.jurisdictions.includes(r.id)
  );

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Review your inputs
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Confirm everything looks right before we analyze your regulatory
        exposure.
      </p>

      <div className="space-y-4">
        {/* Jurisdictions */}
        <div className="border border-navy-700 rounded-lg bg-navy-900 p-4">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Jurisdictions ({selectedRegs.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedRegs.map((r) => (
              <span
                key={r.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-navy-800 rounded-md text-sm text-slate-300"
              >
                <span>{r.flag}</span>
                {r.jurisdiction}
              </span>
            ))}
          </div>
        </div>

        {/* Industry */}
        <div className="border border-navy-700 rounded-lg bg-navy-900 p-4">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Industry
          </div>
          <div className="text-sm text-white">{formData.industry}</div>
        </div>

        {/* AI Use Cases */}
        <div className="border border-navy-700 rounded-lg bg-navy-900 p-4">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            AI Use Cases
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.aiUseCases.map((uc) => (
              <span
                key={uc}
                className="px-2.5 py-1 bg-navy-800 rounded-md text-sm text-slate-300"
              >
                {useCaseLabels[uc]}
              </span>
            ))}
          </div>
        </div>

        {/* Autonomous Agents */}
        <div className="border border-navy-700 rounded-lg bg-navy-900 p-4">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Autonomous AI Agents
          </div>
          <div className="text-sm text-white">
            {formData.usesAutonomousAgents ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}
