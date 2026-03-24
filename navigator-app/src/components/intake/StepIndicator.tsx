import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description: string;
}

export function StepIndicator({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                i < currentStep
                  ? "bg-electric-500 text-white"
                  : i === currentStep
                    ? "bg-electric-500/20 text-electric-400 ring-2 ring-electric-500"
                    : "bg-navy-800 text-slate-500"
              )}
            >
              {i < currentStep ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5 hidden sm:block",
                i <= currentStep ? "text-slate-300" : "text-slate-600"
              )}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-px mx-3 mt-[-1.25rem] sm:mt-[-0.5rem]",
                i < currentStep ? "bg-electric-500" : "bg-navy-700"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
