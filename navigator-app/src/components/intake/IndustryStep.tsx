"use client";

import { cn } from "@/lib/utils";
import type { Industry } from "@/lib/types";
import {
  Building2,
  Heart,
  Shield,
  Scale,
  Cpu,
  ShoppingCart,
  MoreHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const industries: { id: Industry; label: string; icon: LucideIcon; desc: string }[] = [
  { id: "Financial Services", label: "Financial Services", icon: Building2, desc: "Banking, fintech, trading, payments" },
  { id: "Healthcare", label: "Healthcare", icon: Heart, desc: "Hospitals, pharma, medtech, telehealth" },
  { id: "Insurance", label: "Insurance", icon: Shield, desc: "Life, health, property, reinsurance" },
  { id: "Legal", label: "Legal", icon: Scale, desc: "Law firms, legal tech, compliance" },
  { id: "Technology", label: "Technology", icon: Cpu, desc: "SaaS, platforms, cloud, AI/ML" },
  { id: "E-commerce", label: "E-commerce", icon: ShoppingCart, desc: "Retail, marketplace, D2C" },
  { id: "Other", label: "Other", icon: MoreHorizontal, desc: "Manufacturing, education, government, etc." },
];

export function IndustryStep({
  selected,
  onChange,
}: {
  selected: Industry | null;
  onChange: (v: Industry) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        What industry are you in?
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Some regulations have industry-specific provisions that affect your risk
        profile.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {industries.map((ind) => {
          const isSelected = selected === ind.id;
          const Icon = ind.icon;
          return (
            <button
              key={ind.id}
              onClick={() => onChange(ind.id)}
              className={cn(
                "flex items-start gap-4 px-5 py-4 rounded-lg border text-left transition-all",
                isSelected
                  ? "border-electric-500 bg-electric-500/10"
                  : "border-navy-700 bg-navy-900 hover:border-navy-600 hover:bg-navy-800"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  isSelected ? "bg-electric-500/20 text-electric-400" : "bg-navy-800 text-slate-500"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-white" : "text-slate-300"
                  )}
                >
                  {ind.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{ind.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
