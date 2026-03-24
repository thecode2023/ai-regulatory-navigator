"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IntakeFormData, Industry, AiUseCase } from "@/lib/types";
import { StepIndicator } from "./StepIndicator";
import { JurisdictionStep } from "./JurisdictionStep";
import { IndustryStep } from "./IndustryStep";
import { AiUsageStep } from "./AiUsageStep";
import { ReviewStep } from "./ReviewStep";

const STEPS = [
  { label: "Jurisdictions", description: "Where do you operate?" },
  { label: "Industry", description: "What's your sector?" },
  { label: "AI Usage", description: "How do you use AI?" },
  { label: "Review", description: "Confirm & analyze" },
];

export function IntakeForm({
  onComplete,
}: {
  onComplete: (data: IntakeFormData) => void;
}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<IntakeFormData>({
    jurisdictions: [],
    industry: null,
    aiUseCases: [],
    usesAutonomousAgents: null,
  });

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.jurisdictions.length > 0;
      case 1:
        return formData.industry !== null;
      case 2:
        return (
          formData.aiUseCases.length > 0 &&
          formData.usesAutonomousAgents !== null
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const next = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateField = <K extends keyof IntakeFormData>(
    key: K,
    value: IntakeFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Step indicator */}
      <StepIndicator steps={STEPS} currentStep={step} />

      {/* Step content */}
      <div className="mt-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <JurisdictionStep
                selected={formData.jurisdictions}
                onChange={(v) => updateField("jurisdictions", v)}
              />
            )}
            {step === 1 && (
              <IndustryStep
                selected={formData.industry}
                onChange={(v) => updateField("industry", v as Industry)}
              />
            )}
            {step === 2 && (
              <AiUsageStep
                selectedUseCases={formData.aiUseCases}
                usesAgents={formData.usesAutonomousAgents}
                onChangeUseCases={(v) =>
                  updateField("aiUseCases", v as AiUseCase[])
                }
                onChangeAgents={(v) => updateField("usesAutonomousAgents", v)}
              />
            )}
            {step === 3 && <ReviewStep formData={formData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          disabled={step === 0}
          className="px-6 py-2.5 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={next}
          disabled={!canProceed()}
          className="px-8 py-2.5 text-sm font-medium bg-electric-500 hover:bg-electric-400 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {step === 3 ? "Analyze My Risk" : "Continue"}
        </button>
      </div>
    </div>
  );
}
