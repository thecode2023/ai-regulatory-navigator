"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { Results } from "@/components/results/Results";
import type { IntakeFormData } from "@/lib/types";

type View = "landing" | "intake" | "results";

export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [formData, setFormData] = useState<IntakeFormData | null>(null);

  const handleComplete = (data: IntakeFormData) => {
    setFormData(data);
    setView("results");
  };

  const handleReset = () => {
    setFormData(null);
    setView("landing");
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-navy-800 bg-navy-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-electric-500 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight">
                Regulatory Navigator
              </h1>
              <p className="text-xs text-slate-400">
                AI compliance mapping for global teams
              </p>
            </div>
          </button>
          {view !== "landing" && (
            <button
              onClick={handleReset}
              className="text-sm text-electric-400 hover:text-electric-300 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {view === "landing" && <LandingHero onStart={() => setView("intake")} />}
        {view === "intake" && <IntakeForm onComplete={handleComplete} />}
        {view === "results" && formData && (
          <Results formData={formData} onReset={handleReset} />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-navy-800 bg-navy-950">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-xs text-slate-500 leading-relaxed">
            Regulatory data last verified: March 24, 2026. Data is validated
            against primary sources but regulations change frequently. Always
            consult legal counsel for compliance decisions.{" "}
            <a
              href="https://github.com/thecode2023/ai-regulatory-navigator/blob/main/MANUS_RESEARCH_LOG.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-400 hover:text-electric-300 transition-colors"
            >
              See validation methodology
            </a>
          </p>
          <p className="text-xs text-slate-600 mt-3">
            Built with{" "}
            <span className="text-slate-500">Claude Code</span>
            {" "}&middot; Data researched by{" "}
            <span className="text-slate-500">Manus</span>
          </p>
        </div>
      </footer>
    </main>
  );
}

function LandingHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex items-center justify-center px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
          Which AI regulations apply to your company?
        </h2>
        <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          Map your regulatory exposure across 15 jurisdictions in 30 seconds.
          Free, no signup required.
        </p>
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold bg-electric-500 hover:bg-electric-400 text-white rounded-xl transition-colors"
        >
          Start Assessment
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
