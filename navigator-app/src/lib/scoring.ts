import type {
  AiUseCase,
  ChecklistItem,
  Industry,
  IntakeFormData,
  Regulation,
  RiskAssessment,
} from "./types";
import { regulations } from "./regulations";

// Industry-specific weight multipliers for risk scoring
const industryWeights: Record<Industry, Record<string, number>> = {
  "Financial Services": {
    "eu": 1.3, "us-colorado": 1.4, "us-illinois": 1.2, "uk": 1.3,
    "singapore": 1.2, "australia": 1.3, "india": 1.2,
  },
  Healthcare: {
    "eu": 1.4, "us-california": 1.3, "us-illinois": 1.3, "australia": 1.4,
    "india": 1.2, "indonesia": 1.2,
  },
  Insurance: {
    "eu": 1.3, "us-colorado": 1.5, "us-connecticut": 1.3, "uk": 1.2,
  },
  Legal: {
    "eu": 1.2, "us-colorado": 1.3, "canada": 1.2,
  },
  Technology: {
    "eu": 1.2, "us-california": 1.3, "us-federal": 1.1, "japan": 1.1,
    "singapore": 1.2,
  },
  "E-commerce": {
    "eu": 1.3, "us-california": 1.2, "brazil": 1.2, "india": 1.3,
    "indonesia": 1.3,
  },
  Other: {},
};

// Use-case risk contributions (added to base score)
const useCaseScores: Record<AiUseCase, number> = {
  "customer-facing-agents": 18,
  "decision-making": 22,
  "internal-automation": 8,
  "content-generation": 14,
  "data-processing": 12,
};

// Status-based base scores
function statusBaseScore(status: Regulation["status"]): number {
  switch (status) {
    case "In Effect": return 35;
    case "Enacted": return 30;
    case "Enacted (Delayed)": return 28;
    case "Proposed": return 15;
    case "Voluntary": return 10;
    case "Draft": return 8;
  }
}

function penaltyScore(maxFineUSD: number | null): number {
  if (!maxFineUSD) return 0;
  if (maxFineUSD >= 30000000) return 15;
  if (maxFineUSD >= 10000000) return 12;
  if (maxFineUSD >= 1000000) return 8;
  return 4;
}

function riskLevel(score: number): RiskAssessment["riskLevel"] {
  if (score >= 75) return "Critical";
  if (score >= 50) return "High";
  if (score >= 30) return "Medium";
  return "Low";
}

function generateChecklist(
  reg: Regulation,
  formData: IntakeFormData
): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  const isHighRisk =
    formData.aiUseCases.includes("decision-making") ||
    formData.aiUseCases.includes("customer-facing-agents");

  // Requirements-based items
  for (const req of reg.keyRequirements) {
    let priority: ChecklistItem["priority"] = "Medium";
    if (
      req.toLowerCase().includes("prohibited") ||
      req.toLowerCase().includes("mandatory")
    ) {
      priority = "Critical";
    } else if (
      req.toLowerCase().includes("consent") ||
      req.toLowerCase().includes("assessment")
    ) {
      priority = "High";
    } else if (
      req.toLowerCase().includes("voluntary") ||
      req.toLowerCase().includes("encouraged")
    ) {
      priority = "Low";
    }

    items.push({
      id: `${reg.id}-req-${items.length}`,
      text: req,
      priority,
      category: "Regulatory Requirement",
    });
  }

  // Autonomous agent checklist items
  if (formData.usesAutonomousAgents && reg.autonomousAgents.addressed) {
    items.push({
      id: `${reg.id}-agent-1`,
      text: `Review autonomous agent provisions: ${reg.autonomousAgents.details}`,
      priority: "Critical",
      category: "Autonomous Agents",
    });
  }

  // Cross-border items
  if (reg.crossBorder.applies) {
    items.push({
      id: `${reg.id}-xborder`,
      text: `Cross-border compliance: ${reg.crossBorder.details}`,
      priority: isHighRisk ? "High" : "Medium",
      category: "Cross-Border",
    });
  }

  return items;
}

export function assessRisk(formData: IntakeFormData): RiskAssessment[] {
  const selected = regulations.filter((r) =>
    formData.jurisdictions.includes(r.id)
  );

  return selected
    .map((reg) => {
      // Base score from enforcement status
      let score = statusBaseScore(reg.status);

      // Add penalty severity
      score += penaltyScore(reg.penalties.maxFineUSD);

      // Add use-case scores
      for (const uc of formData.aiUseCases) {
        score += useCaseScores[uc];
      }

      // Autonomous agents bump
      if (formData.usesAutonomousAgents && reg.autonomousAgents.addressed) {
        score += 12;
      }

      // Cross-border bump
      if (reg.crossBorder.applies) {
        score += 5;
      }

      // Industry multiplier
      const indWeights = formData.industry
        ? industryWeights[formData.industry]
        : {};
      const multiplier = indWeights[reg.id] ?? 1.0;
      score = Math.round(score * multiplier);

      // Clamp to 1-100
      score = Math.max(1, Math.min(100, score));

      const applicableRequirements = reg.keyRequirements;
      const checklistItems = generateChecklist(reg, formData);

      return {
        regulation: reg,
        riskScore: score,
        riskLevel: riskLevel(score),
        applicableRequirements,
        checklistItems,
      };
    })
    .sort((a, b) => b.riskScore - a.riskScore);
}
