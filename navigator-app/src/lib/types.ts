export type RegulationStatus =
  | "Enacted"
  | "In Effect"
  | "Proposed"
  | "Draft"
  | "Voluntary"
  | "Enacted (Delayed)";

export interface Regulation {
  id: string;
  jurisdiction: string;
  region: string;
  flag: string;
  lawName: string;
  billNumber?: string;
  status: RegulationStatus;
  effectiveDate: string;
  riskClassification: string;
  keyRequirements: string[];
  penalties: {
    amount: string;
    maxFineUSD: number | null;
    enforcementBody: string;
  };
  autonomousAgents: {
    addressed: boolean;
    details: string;
  };
  crossBorder: {
    applies: boolean;
    details: string;
  };
  sources: { title: string; url: string }[];
  lastUpdated: string;
}

export type Industry =
  | "Financial Services"
  | "Healthcare"
  | "Insurance"
  | "Legal"
  | "Technology"
  | "E-commerce"
  | "Other";

export type AiUseCase =
  | "customer-facing-agents"
  | "internal-automation"
  | "decision-making"
  | "content-generation"
  | "data-processing";

export interface IntakeFormData {
  jurisdictions: string[];
  industry: Industry | null;
  aiUseCases: AiUseCase[];
  usesAutonomousAgents: boolean | null;
}

export interface RiskAssessment {
  regulation: Regulation;
  riskScore: number;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  applicableRequirements: string[];
  checklistItems: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  category: string;
}
